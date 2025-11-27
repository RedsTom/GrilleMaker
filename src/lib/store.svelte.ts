export type CellType = 'standard' | 'definition';
export type SelectionDirection = 'row' | 'column';
export type BorderStyle = 'solid' | 'dashed';

export type ArrowDirection =
    // Flèches courbées (pour les coins)
    | 'up-right'
    | 'up-left'
    | 'down-right'
    | 'down-left'
    | 'right-down'
    | 'right-up'
    | 'left-down'
    | 'left-up'
    // Flèches droites
    | 'up'
    | 'down'
    | 'left'
    | 'right';

export interface Definition {
    id: string;
    text: string;
    direction: 'horizontal' | 'vertical';
    arrow: ArrowDirection;
    fontSize?: number;
}

export interface CellData {
    value: string;
    type: CellType;
    borders?: {
        top?: BorderStyle;
        right?: BorderStyle;
        bottom?: BorderStyle;
        left?: BorderStyle;
    };
    definitions?: Definition[];
}

export class CrosswordStore {
    rows = $state(10);
    cols = $state(10);
    grid = $state<CellData[][]>([]);
    selectedCell = $state<{ x: number; y: number } | null>(null);
    mode = $state<'edit' | 'preview'>('edit');
    selectionDirection = $state<SelectionDirection>('row');
    lastClickedCell = $state<{ x: number; y: number } | null>(null);
    showSolution = $state(false);
    isColor = $state(true);

    constructor(rows = 10, cols = 10) {
        this.rows = rows;
        this.cols = cols;
        this.initializeGrid();
        this.load();
    }

    initializeGrid() {
        this.grid = Array.from({ length: this.rows }, () =>
            Array.from({ length: this.cols }, () => ({ value: '', type: 'standard', definitions: [] }))
        );
    }

    selectCell(x: number, y: number, isClick: boolean = false) {
        // Si c'est un clic (pas une navigation) sur la même cellule, on toggle la direction
        if (isClick && this.selectedCell?.x === x && this.selectedCell?.y === y) {
            this.selectionDirection = this.selectionDirection === 'row' ? 'column' : 'row';
        } else if (isClick && (this.selectedCell?.x !== x || this.selectedCell?.y !== y)) {
            // Nouveau clic sur une cellule différente, on commence en mode ligne
            this.selectionDirection = 'row';
        }
        // Si c'est une navigation (pas un clic), on ne change pas la direction
        this.selectedCell = { x, y };
    }

    deselectCell() {
        this.selectedCell = null;
        this.lastClickedCell = null;
    }

    isRowOrColumnSelected(x: number, y: number): boolean {
        if (!this.selectedCell) return false;

        const { x: sx, y: sy } = this.selectedCell;

        if (this.selectionDirection === 'row') {
            if (x !== sx) return false;

            // Si la cellule sélectionnée est une définition, on ne sélectionne qu'elle
            if (this.grid[sx][sy].type === 'definition') return x === sx && y === sy;

            // Si la cellule cible est une définition, elle ne fait pas partie du mot
            if (this.grid[x][y].type === 'definition') return false;

            // Vérifier s'il y a une définition entre la cellule sélectionnée et la cible
            const min = Math.min(y, sy);
            const max = Math.max(y, sy);
            for (let k = min + 1; k < max; k++) {
                if (this.grid[sx][k].type === 'definition') return false;
            }
            return true;
        } else {
            if (y !== sy) return false;

            // Si la cellule sélectionnée est une définition, on ne sélectionne qu'elle
            if (this.grid[sx][sy].type === 'definition') return x === sx && y === sy;

            // Si la cellule cible est une définition, elle ne fait pas partie du mot
            if (this.grid[x][y].type === 'definition') return false;

            // Vérifier s'il y a une définition entre la cellule sélectionnée et la cible
            const min = Math.min(x, sx);
            const max = Math.max(x, sx);
            for (let k = min + 1; k < max; k++) {
                if (this.grid[k][sy].type === 'definition') return false;
            }
            return true;
        }
    }

    setCellValue(x: number, y: number, value: string) {
        if (this.isValidCell(x, y)) {
            this.grid[x][y].value = value;
        }
    }

    toggleCellType(x: number, y: number) {
        if (this.isValidCell(x, y)) {
            const currentType = this.grid[x][y].type;
            this.grid[x][y].type = currentType === 'standard' ? 'definition' : 'standard';
            if (this.grid[x][y].type === 'definition' && !this.grid[x][y].definitions) {
                this.grid[x][y].definitions = [];
            }
        }
    }

    addDefinition(x: number, y: number, definition: Omit<Definition, 'id'>) {
        if (this.isValidCell(x, y)) {
            if (!this.grid[x][y].definitions) {
                this.grid[x][y].definitions = [];
            }
            this.grid[x][y].definitions!.push({
                ...definition,
                id: crypto.randomUUID()
            });
        }
    }

    removeDefinition(x: number, y: number, id: string) {
        if (this.isValidCell(x, y) && this.grid[x][y].definitions) {
            this.grid[x][y].definitions = this.grid[x][y].definitions!.filter(d => d.id !== id);
        }
    }

    updateDefinition(x: number, y: number, id: string, updates: Partial<Definition>) {
        if (this.isValidCell(x, y) && this.grid[x][y].definitions) {
            const index = this.grid[x][y].definitions!.findIndex(d => d.id === id);
            if (index !== -1) {
                this.grid[x][y].definitions![index] = { ...this.grid[x][y].definitions![index], ...updates };
            }
        }
    }

    setDefinitions(x: number, y: number, definitions: Definition[]) {
        if (this.isValidCell(x, y)) {
            this.grid[x][y].definitions = definitions;
        }
    }

    setBorderStyle(x: number, y: number, side: 'top' | 'right' | 'bottom' | 'left', style: BorderStyle) {
        if (this.isValidCell(x, y)) {
            if (!this.grid[x][y].borders) {
                this.grid[x][y].borders = {};
            }
            this.grid[x][y].borders![side] = style;

            // Synchroniser avec la cellule voisine pour qu'elle voie aussi les pointillés
            if (side === 'top' && this.isValidCell(x - 1, y)) {
                if (!this.grid[x - 1][y].borders) {
                    this.grid[x - 1][y].borders = {};
                }
                this.grid[x - 1][y].borders!['bottom'] = style;
            } else if (side === 'bottom' && this.isValidCell(x + 1, y)) {
                if (!this.grid[x + 1][y].borders) {
                    this.grid[x + 1][y].borders = {};
                }
                this.grid[x + 1][y].borders!['top'] = style;
            } else if (side === 'left' && this.isValidCell(x, y - 1)) {
                if (!this.grid[x][y - 1].borders) {
                    this.grid[x][y - 1].borders = {};
                }
                this.grid[x][y - 1].borders!['right'] = style;
            } else if (side === 'right' && this.isValidCell(x, y + 1)) {
                if (!this.grid[x][y + 1].borders) {
                    this.grid[x][y + 1].borders = {};
                }
                this.grid[x][y + 1].borders!['left'] = style;
            }
        }
    }

    getBorderStyle(x: number, y: number, side: 'top' | 'right' | 'bottom' | 'left'): BorderStyle {
        if (this.isValidCell(x, y) && this.grid[x][y].borders?.[side]) {
            return this.grid[x][y].borders![side];
        }
        return 'solid';
    }

    isValidCell(x: number, y: number) {
        return x >= 0 && x < this.rows && y >= 0 && y < this.cols;
    }

    addRow() {
        this.rows++;
        this.grid.push(Array.from({ length: this.cols }, () => ({ value: '', type: 'standard', definitions: [] })));
    }

    removeRow() {
        if (this.rows > 1) {
            this.rows--;
            this.grid.pop();
            if (this.selectedCell && this.selectedCell.x >= this.rows) {
                this.deselectCell();
            }
        }
    }

    addCol() {
        this.cols++;
        this.grid.forEach(row => {
            row.push({ value: '', type: 'standard', definitions: [] });
        });
    }

    removeCol() {
        if (this.cols > 1) {
            this.cols--;
            this.grid.forEach(row => {
                row.pop();
            });
            if (this.selectedCell && this.selectedCell.y >= this.cols) {
                this.deselectCell();
            }
        }
    }

    save() {
        if (typeof localStorage !== 'undefined') {
            const data = {
                rows: this.rows,
                cols: this.cols,
                grid: this.grid
            };
            localStorage.setItem('grillemaker_state', JSON.stringify(data));
        }
    }

    load() {
        if (typeof localStorage !== 'undefined') {
            const saved = localStorage.getItem('grillemaker_state');
            if (saved) {
                try {
                    const data = JSON.parse(saved);
                    this.rows = data.rows;
                    this.cols = data.cols;
                    this.grid = data.grid;

                    // Migration: convertir les anciennes flèches simples en flèches pliées
                    this.migrateOldArrows();
                } catch (e) {
                    console.error('Failed to load state', e);
                }
            }
        }
    }

    // Migration des anciennes flèches vers le nouveau format
    private migrateOldArrows() {
        const oldToNew: Record<string, ArrowDirection> = {
            'right': 'right',
            'left': 'left',
            'down': 'down',
            'up': 'up'
        };

        this.grid.forEach((row, x) => {
            row.forEach((cell, y) => {
                if (cell.type === 'definition' && cell.definitions) {
                    cell.definitions.forEach(def => {
                        // @ts-ignore - migration temporaire
                        if (def.arrow && oldToNew[def.arrow]) {
                            // @ts-ignore
                            def.arrow = oldToNew[def.arrow];
                        }
                    });
                }
            });
        });
    }

    exportState(): string {
        const data = {
            rows: this.rows,
            cols: this.cols,
            grid: this.grid
        };
        return JSON.stringify(data, null, 2);
    }

    importState(json: string) {
        try {
            const data = JSON.parse(json);
            if (data.rows && data.cols && data.grid) {
                this.rows = data.rows;
                this.cols = data.cols;
                this.grid = data.grid;
                this.migrateOldArrows();
                this.save(); // Sauvegarder immédiatement après l'import
            } else {
                console.error('Invalid grid file format');
            }
        } catch (e) {
            console.error('Failed to import state', e);
        }
    }
}

export const store = new CrosswordStore();

$effect.root(() => {
    $effect(() => {
        // Track dependencies
        store.rows;
        store.cols;
        store.grid;
        // Save
        store.save();
    });
});

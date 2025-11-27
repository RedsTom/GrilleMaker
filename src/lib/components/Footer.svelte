<script lang="ts">
    import { Github, MessageSquarePlus, ShieldCheck } from "lucide-svelte";
</script>

<footer class="app-footer">
    <div class="footer-content">
        <div class="footer-item">
            <Github size={16} />
            <span>
                Projet communautaire :
                <a
                    href="https://github.com/RedsTom/GrilleMaker"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="footer-link">GitHub</a
                >
            </span>
        </div>

        <div class="separator">•</div>

        <div class="footer-item">
            <MessageSquarePlus size={16} />
            <a
                href="https://github.com/RedsTom/GrilleMaker/issues/new"
                target="_blank"
                rel="noopener noreferrer"
                class="footer-link">Faire une suggestion</a
            >
        </div>

        <div class="separator">•</div>

        <div class="footer-item">
            <ShieldCheck size={16} />
            <span>Aucune donnée récoltée</span>
        </div>
    </div>
</footer>

<style>
    @reference "tailwindcss";

    .app-footer {
        @apply w-full py-2 mt-2 border-t border-orange-200/30;
        @apply text-stone-500 text-xs font-medium;
    }

    .footer-content {
        @apply flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4;
    }

    .footer-item {
        @apply flex items-center gap-1.5;
    }

    .footer-link {
        @apply text-orange-600 hover:text-orange-700 hover:underline transition-colors;
    }

    .separator {
        @apply hidden sm:block text-stone-300;
    }

    @media print {
        .app-footer {
            display: none;
        }
    }
</style>

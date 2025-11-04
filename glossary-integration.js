// Glossary Integration System
// Automatically links medical terms with hover tooltips

class GlossarySystem {
    constructor() {
        this.glossary = {};
        this.loadGlossary();
    }

    async loadGlossary() {
        try {
            const response = await fetch('glossary.json');
            this.glossary = await response.json();
            console.log('Glossary loaded:', Object.keys(this.glossary).length, 'terms');
        } catch (error) {
            console.warn('Could not load glossary:', error);
        }
    }

    // Process text and add glossary links
    processText(text) {
        if (!text || Object.keys(this.glossary).length === 0) return text;

        let processedText = text;
        
        // Sort terms by length (longest first) to avoid partial matches
        const sortedTerms = Object.keys(this.glossary).sort((a, b) => b.length - a.length);
        
        sortedTerms.forEach(term => {
            const definition = this.glossary[term];
            
            // Create regex for whole word matching (case insensitive)
            const regex = new RegExp(`\\b${this.escapeRegex(term)}\\b`, 'gi');
            
            processedText = processedText.replace(regex, (match) => {
                return `<span class="glossary-term" title="${this.escapeHtml(definition)}">${match}<span class="glossary-tooltip">${this.escapeHtml(definition)}</span></span>`;
            });
        });

        return processedText;
    }

    // Process DOM elements to add glossary links
    processElement(element) {
        if (!element || Object.keys(this.glossary).length === 0) return;

        // Get all text nodes
        const walker = document.createTreeWalker(
            element,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );

        const textNodes = [];
        let node;
        while (node = walker.nextNode()) {
            // Skip if parent already has glossary class
            if (!node.parentElement.closest('.glossary-term')) {
                textNodes.push(node);
            }
        }

        textNodes.forEach(textNode => {
            const processedText = this.processText(textNode.textContent);
            if (processedText !== textNode.textContent) {
                const wrapper = document.createElement('span');
                wrapper.innerHTML = processedText;
                textNode.parentNode.replaceChild(wrapper, textNode);
            }
        });
    }

    escapeRegex(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize glossary system
let glossarySystem;
document.addEventListener('DOMContentLoaded', () => {
    glossarySystem = new GlossarySystem();
    
    // Process existing content after a short delay to ensure glossary is loaded
    setTimeout(() => {
        const gameContainer = document.getElementById('game-container');
        if (gameContainer && glossarySystem) {
            glossarySystem.processElement(gameContainer);
        }
    }, 1000);
});

// Hook into game rendering to process new content
if (typeof window !== 'undefined') {
    window.processGlossaryTerms = function(element) {
        if (glossarySystem) {
            setTimeout(() => {
                glossarySystem.processElement(element || document.getElementById('game-container'));
            }, 100);
        }
    };
}
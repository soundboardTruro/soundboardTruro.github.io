document.addEventListener('DOMContentLoaded', () => {
    // Add click event handlers to all sound buttons
    document.querySelectorAll('.sound-button').forEach(button => {
        // The click handlers are already in the HTML, but we'll enhance them
        // with animation effects when a video is opened
        
        // These effects will apply to any new embed containers
        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                if (mutation.addedNodes.length) {
                    mutation.addedNodes.forEach(node => {
                        if (node.classList && node.classList.contains('youtube-embed')) {
                            handleNewEmbed(node);
                        }
                    });
                }
            });
        });
        
        observer.observe(document.body, { childList: true });
    });
    
    function handleNewEmbed(embed) {
        // First prevent any direct clicks from closing the container
        // while it's animating in
        embed.addEventListener('click', (e) => {
            if (e.target === embed) {
                closeEmbed(embed);
            }
        });
        
        // Get the close button and add click handler
        const closeButton = embed.querySelector('.close-embed');
        if (closeButton) {
            closeButton.addEventListener('click', () => {
                closeEmbed(embed);
            });
        }
        
        // Show with animation (small delay to ensure DOM is ready)
        setTimeout(() => {
            embed.classList.add('visible');
        }, 10);
        
        // Add escape key handler
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeEmbed(embed);
            }
        });
    }
    
    function closeEmbed(embed) {
        // Animate out
        embed.classList.remove('visible');
        
        // Remove after animation completes
        setTimeout(() => {
            if (embed.parentNode) {
                embed.parentNode.removeChild(embed);
            }
        }, 500); // Should match the CSS transition duration
    }
}); 
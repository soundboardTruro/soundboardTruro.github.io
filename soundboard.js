document.addEventListener('DOMContentLoaded', () => {
    // Set up event delegation for the soundboard container
    const soundboard = document.getElementById('soundboard');
    
    if (soundboard) {
        // Use event delegation to handle embed container management
        document.body.addEventListener('click', (e) => {
            const embed = e.target.closest('.youtube-embed');
            if (embed && (e.target === embed || e.target.classList.contains('close-embed'))) {
                closeEmbed(embed);
            }
        });
        
        // Handle escape key for closing embeds
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const embed = document.querySelector('.youtube-embed.visible');
                if (embed) {
                    closeEmbed(embed);
                }
            }
        });
    }
    
    // Function to handle the embed visibility
    window.showEmbed = function(embedContainer) {
        // Prevent body scrolling
        document.body.classList.add('modal-open');
        
        // Make the container visible with CSS animations
        requestAnimationFrame(() => {
            embedContainer.classList.add('visible');
        });
    };
    
    // Function to close embeds
    function closeEmbed(embed) {
        // Start animation out via CSS
        embed.classList.remove('visible');
        
        // Re-enable scrolling
        document.body.classList.remove('modal-open');
        
        // Remove after animation completes
        setTimeout(() => {
            if (embed.parentNode) {
                embed.parentNode.removeChild(embed);
            }
        }, 300); // Match the CSS transition duration
    }
}); 
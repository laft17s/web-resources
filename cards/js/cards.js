document.addEventListener('DOMContentLoaded', () => {
    const viewButtons = document.querySelectorAll('.btn-view');
    const modal = document.getElementById('code-modal');
    const closeModal = document.querySelector('.close-modal');
    const htmlCode = document.getElementById('html-code');
    const cssCode = document.getElementById('css-code');
    const copyButtons = document.querySelectorAll('.btn-copy');

    // View Code Button Click
    viewButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const cardId = btn.dataset.id;
            
            // Populate Code
            htmlCode.textContent = getCardHTML(cardId);
            cssCode.textContent = getCardCSS(cardId);
            
            // Show Modal
            modal.classList.remove('hidden');
            setTimeout(() => {
                modal.classList.add('show');
            }, 10);
        });
    });

    // Close Modal
    closeModal.addEventListener('click', () => {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.classList.add('hidden');
        }, 300);
    });

    // Close Modal on Outside Click
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.classList.add('hidden');
            }, 300);
        }
    });

    // Copy Buttons
    copyButtons.forEach(btn => {
        btn.addEventListener('click', async () => {
            const type = btn.dataset.copy; // 'html' or 'css'
            const contentToCopy = type === 'html' ? htmlCode.textContent : cssCode.textContent;

            try {
                await navigator.clipboard.writeText(contentToCopy);
                showToast('Copied to clipboard!');
            } catch (err) {
                console.error('Failed to copy:', err);
                showToast('Failed to copy', true);
            }
        });
    });
});

function showToast(message, isError = false) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    if (isError) toast.style.background = '#ef4444';

    container.appendChild(toast);

    requestAnimationFrame(() => {
        toast.classList.add('show');
    });

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            container.removeChild(toast);
        }, 300);
    }, 3000);
}

function getCardHTML(id) {
    const htmlMap = {
        'card-rounded': `<div class="futuristic-card card-rounded">
    <div class="card-icon">✦</div>
    <div class="card-title">Rounded Vision</div>
    <div class="card-desc">A classic futuristic look with smooth 24px rounded corners and a subtle glassmorphism effect.</div>
</div>`,
        'card-squircle': `<div class="futuristic-card card-squircle">
    <div class="card-icon">⬢</div>
    <div class="card-title">Squircle Core</div>
    <div class="card-desc">The perfect balance between a square and a circle, providing a modern, premium feel.</div>
</div>`,
        'card-rectangular': `<div class="futuristic-card card-rectangular">
    <div class="card-icon">◼</div>
    <div class="card-title">Industrial Edge</div>
    <div class="card-desc">Sharp, rectangular design with a bold accent border for a high-tech, industrial aesthetic.</div>
</div>`,
        'card-free': `<div class="futuristic-card card-free">
    <div class="card-icon">▲</div>
    <div class="card-title">Cyber Nexus</div>
    <div class="card-desc">Asymmetrical geometry and custom clip-paths for a truly unique, futuristic interface.</div>
</div>`
    };
    return htmlMap[id] || '';
}

function getCardCSS(id) {
    const baseCSS = `.futuristic-card {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(12px);
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    transition: all 0.4s ease;
}

.futuristic-card:hover {
    transform: translateY(-10px);
    border-color: #00f2ff;
    box-shadow: 0 10px 30px -10px rgba(0, 242, 255, 0.2);
}\n\n`;

    const specificCSS = {
        'card-rounded': `.card-rounded {
    border-radius: 24px;
}`,
        'card-squircle': `.card-squircle {
    border-radius: 40px;
}`,
        'card-rectangular': `.card-rectangular {
    border-radius: 0;
    border-left: 4px solid #00f2ff;
}`,
        'card-free': `.card-free {
    border-radius: 0 40px 0 40px;
    clip-path: polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%);
    position: relative;
}

.card-free::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 40px;
    height: 40px;
    background: #7000ff;
    opacity: 0.2;
    clip-path: polygon(100% 0, 0 0, 100% 100%);
}`
    };

    return baseCSS + (specificCSS[id] || '');
}

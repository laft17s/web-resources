document.addEventListener('DOMContentLoaded', () => {
    // Modal Trigger Logic
    const previewButtons = document.querySelectorAll('.btn-preview');
    const viewButtons = document.querySelectorAll('.btn-view');
    const metaModal = document.getElementById('meta-modal');
    const closeModalButtons = document.querySelectorAll('.close-modal');
    const htmlCode = document.getElementById('html-code');
    const cssCode = document.getElementById('css-code');
    const copyButtons = document.querySelectorAll('.btn-copy');

    // Show specific modal
    previewButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const modalId = btn.dataset.target;
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.add('show');
            }
        });
    });

    // Show code view modal
    viewButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const modalId = btn.dataset.id;
            htmlCode.textContent = getModalHTML(modalId);
            cssCode.textContent = getModalCSS(modalId);
            metaModal.classList.add('show');
        });
    });

    // Close Modals
    closeModalButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal-overlay');
            if (modal) {
                modal.classList.remove('show');
            }
        });
    });

    // Close on Outside Click
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            e.target.classList.remove('show');
        }
    });

    // Copy Functionality
    copyButtons.forEach(btn => {
        btn.addEventListener('click', async () => {
            const type = btn.dataset.copy;
            const content = type === 'html' ? htmlCode.textContent : cssCode.textContent;
            try {
                await navigator.clipboard.writeText(content);
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
    requestAnimationFrame(() => toast.classList.add('show'));
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => container.removeChild(toast), 300);
    }, 3000);
}

function getModalHTML(id) {
    const htmlMap = {
        'modal-rounded': `<div class="modal-overlay" id="modal-rounded">
    <div class="modal-content modal-rounded">
        <span class="close-modal">&times;</span>
        <h2>Rounded Vision</h2>
        <p>A smooth, futuristic modal with 32px rounded corners and glassmorphism.</p>
    </div>
</div>`,
        'modal-squircle': `<div class="modal-overlay" id="modal-squircle">
    <div class="modal-content modal-squircle">
        <span class="close-modal">&times;</span>
        <h2>Squircle Core</h2>
        <p>The perfect geometric balance for a premium interface.</p>
    </div>
</div>`,
        'modal-rectangular': `<div class="modal-overlay" id="modal-rectangular">
    <div class="modal-content modal-rectangular">
        <span class="close-modal">&times;</span>
        <h2>Industrial Edge</h2>
        <p>Sharp and technical design with a bold accent border.</p>
    </div>
</div>`,
        'modal-free': `<div class="modal-overlay" id="modal-free">
    <div class="modal-content modal-free">
        <span class="close-modal">&times;</span>
        <h2>Cyber Nexus</h2>
        <p>Asymmetrical geometry for a unique futuristic experience.</p>
    </div>
</div>`
    };
    return htmlMap[id] || '';
}

function getModalCSS(id) {
    const baseCSS = `.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.85);
    backdrop-filter: blur(10px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2000;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.4s ease;
}

.modal-overlay.show {
    opacity: 1;
    pointer-events: auto;
}

.modal-content {
    background: #111827;
    border: 1px solid rgba(255, 255, 255, 0.1);
    padding: 3rem;
    width: 90%;
    max-width: 500px;
    position: relative;
    transform: scale(0.9);
    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.modal-overlay.show .modal-content {
    transform: scale(1);
}\n\n`;

    const specificCSS = {
        'modal-rounded': `.modal-rounded {
    border-radius: 32px;
}`,
        'modal-squircle': `.modal-squircle {
    border-radius: 60px;
}`,
        'modal-rectangular': `.modal-rectangular {
    border-radius: 0;
    border-top: 4px solid #00f2ff;
}`,
        'modal-free': `.modal-free {
    border-radius: 0 40px 0 40px;
    clip-path: polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%);
}`
    };

    return baseCSS + (specificCSS[id] || '');
}

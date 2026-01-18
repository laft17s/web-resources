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
            const buttonId = btn.dataset.id;
            
            // Populate Code
            htmlCode.textContent = getButtonHTML(buttonId);
            cssCode.textContent = getButtonCSS(buttonId);
            
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

function getButtonHTML(id) {
    const htmlMap = {
        'btn-rounded': `<button class="f-btn btn-rounded primary">Primary</button>`,
        'btn-squircle': `<button class="f-btn btn-squircle primary">Primary</button>`,
        'btn-rectangular': `<button class="f-btn btn-rectangular primary">Primary</button>`,
        'btn-cyber': `<button class="f-btn btn-cyber primary">Primary</button>`
    };
    return htmlMap[id] || '';
}

function getButtonCSS(id) {
    const baseCSS = `.f-btn {
    padding: 0.8rem 1.8rem;
    font-size: 0.9rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border: none;
    font-family: 'Inter', sans-serif;
    position: relative;
    display: inline-block;
}\n\n`;

    const colorVariantsCSS = `/* Color Variants */
.primary { --btn-color: #00f2ff; }
.success { --btn-color: #00ff88; }
.warn    { --btn-color: #ffbb00; }
.danger  { --btn-color: #ff0055; }
.info    { --btn-color: #00a2ff; }
.contrast { --btn-color: #ffffff; }

.link {
    background: transparent !important;
    color: #00f2ff !important;
    text-decoration: underline;
    box-shadow: none !important;
}\n\n`;

    const specificCSS = {
        'btn-rounded': `.btn-rounded {
    background: var(--btn-color, #00f2ff);
    color: #0a0f1e;
    border-radius: 50px;
}

.btn-rounded:hover {
    box-shadow: 0 0 20px var(--btn-color, #00f2ff);
    transform: scale(1.05);
}`,
        'btn-squircle': `.btn-squircle {
    background: var(--btn-color, #7000ff);
    color: white;
    border-radius: 18px;
}

.btn-squircle:hover {
    border-radius: 10px;
    box-shadow: 0 0 20px var(--btn-color, #7000ff);
}`,
        'btn-rectangular': `.btn-rectangular {
    background: transparent;
    color: var(--btn-color, #00f2ff);
    border: 1px solid var(--btn-color, #00f2ff);
    border-radius: 0;
}

.btn-rectangular:hover {
    background: var(--btn-color, #00f2ff);
    color: #0a0f1e;
    box-shadow: 4px 4px 0 #7000ff;
}`,
        'btn-cyber': `.btn-cyber {
    background: var(--btn-color, #fff);
    color: #000;
    border-radius: 0;
    clip-path: polygon(10% 0, 100% 0, 90% 100%, 0 100%);
}

.btn-cyber:hover {
    background: #00f2ff;
    clip-path: polygon(0 0, 90% 0, 100% 100%, 10% 100%);
}`
    };

    return baseCSS + colorVariantsCSS + (specificCSS[id] || '');
}

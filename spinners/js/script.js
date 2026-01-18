document.addEventListener('DOMContentLoaded', () => {
    const viewButtons = document.querySelectorAll('.btn-view');
    const modal = document.getElementById('code-modal');
    const closeModal = document.querySelector('.close-modal');
    const htmlCode = document.getElementById('html-code');
    const cssCode = document.getElementById('css-code');
    const copyButtons = document.querySelectorAll('.modal .btn-copy');

    // View Code Button Click
    viewButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const spinnerId = btn.dataset.id;
            
            // Populate Code
            htmlCode.textContent = getSpinnerHTML(spinnerId);
            cssCode.textContent = getSpinnerCSS(spinnerId);
            
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

    // Copy Buttons in Modal
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
    
    toast.innerHTML = `
        <span class="toast-icon">${isError ? '✕' : '✓'}</span>
        <span class="toast-message">${message}</span>
    `;

    container.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(() => {
        toast.classList.add('show');
    });

    // Remove after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            container.removeChild(toast);
        }, 300);
    }, 3000);
}

function getSpinnerHTML(id) {
    return `<div class="${id}"></div>`;
}

function getSpinnerCSS(id) {
    const styles = {
        'spinner-1': `.spinner-1 {
    width: 48px;
    height: 48px;
    border: 4px solid rgba(255, 255, 255, 0.1);
    border-left-color: var(--accent-color);
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}`,
        'spinner-2': `.spinner-2 {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: 4px solid transparent;
    border-top-color: var(--accent-color);
    border-bottom-color: var(--accent-color);
    animation: spin 1.2s linear infinite;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}`,
        'spinner-3': `.spinner-3 {
    width: 48px;
    height: 48px;
    background: var(--accent-color);
    border-radius: 50%;
    animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
    0% { transform: scale(0); opacity: 1; }
    100% { transform: scale(1); opacity: 0; }
}`,
        'spinner-4': `.spinner-4 {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: conic-gradient(from 0deg, transparent 0%, var(--accent-color) 100%);
    position: relative;
    animation: spin 1s linear infinite;
    display: flex;
    align-items: center;
    justify-content: center;
}

.spinner-4::after {
    content: '';
    position: absolute;
    width: 40px;
    height: 40px;
    background: #252e42;
    border-radius: 50%;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}`
    };

    return styles[id] || '/* CSS not found */';
}

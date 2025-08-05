/**
 * Lógica para o menu de navegação mobile, rolagem suave e formulário de contato com popup.
 */
document.addEventListener('DOMContentLoaded', () => {
    
    // --- LÓGICA DE ROLAGEM SUAVE (COM AJUSTE PARA O HEADER) ---
    const header = document.querySelector('.header');
    const headerHeight = header ? header.offsetHeight : 0; // Pega a altura do header

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return; 
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- LÓGICA DO MENU MOBILE ---
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuToggle && mobileMenu) {
        const iconMenu = menuToggle.querySelector('.icon-menu');
        const iconClose = menuToggle.querySelector('.icon-close');

        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            iconMenu.classList.toggle('hidden');
            iconClose.classList.toggle('hidden');
        });

        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                iconMenu.classList.remove('hidden');
                iconClose.classList.add('hidden');
            });
        });
    }

    // --- LÓGICA DO FORMULÁRIO COM POPUP ---
    const contactForm = document.getElementById('contact-form');
    const popupContainer = document.getElementById('popup-container');
    const popupCloseBtn = document.getElementById('popup-close-btn');

    if (contactForm && popupContainer && popupCloseBtn) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault(); // Previne o envio padrão do formulário

            const formData = new FormData(this);
            const submitButton = this.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.textContent = 'Enviando...';
            submitButton.disabled = true;

            fetch('enviar-email.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    showPopup('success');
                    contactForm.reset(); // Limpa o formulário
                } else {
                    showPopup('error');
                }
            })
            .catch(error => {
                showPopup('error');
                console.error('Error:', error);
            })
            .finally(() => {
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
            });
        });

        // Função para mostrar o popup
        function showPopup(status) {
            const popupIcon = document.getElementById('popup-icon');
            const popupTitle = document.getElementById('popup-title');
            const popupMessage = document.getElementById('popup-message');
            const popupBox = popupContainer.querySelector('.popup-box');

            // Limpa classes anteriores
            popupBox.classList.remove('popup-success', 'popup-error');

            if (status === 'success') {
                popupBox.classList.add('popup-success');
                popupIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`;
                popupTitle.textContent = 'Mensagem Enviada!';
                popupMessage.textContent = 'Agradecemos o seu contato. Nossa equipe retornará o mais breve possível.';
            } else {
                popupBox.classList.add('popup-error');
                popupIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>`;
                popupTitle.textContent = 'Ocorreu um Erro';
                popupMessage.textContent = 'Não foi possível enviar sua mensagem. Por favor, tente novamente mais tarde.';
            }

            popupContainer.classList.remove('hidden');
            document.body.classList.add('no-scroll');
        }

        // Função para fechar o popup
        function closePopup() {
            popupContainer.classList.add('hidden');
            document.body.classList.remove('no-scroll');
        }

        popupCloseBtn.addEventListener('click', closePopup);
        popupContainer.querySelector('.popup-overlay').addEventListener('click', closePopup);
    }
});

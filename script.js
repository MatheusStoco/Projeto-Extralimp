/**
 * Lógica para o menu de navegação mobile e rolagem suave.
 */
document.addEventListener('DOMContentLoaded', () => {
    
    // --- LÓGICA DE ROLAGEM SUAVE ---
    // Seleciona todos os links que apontam para uma âncora (#) na página
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Previne o comportamento padrão de pular diretamente para a seção
            e.preventDefault();

            const targetId = this.getAttribute('href');
            // Ignora links que são apenas '#' e não têm destino
            if (targetId === '#') return; 

            const targetElement = document.querySelector(targetId);

            // Se o elemento de destino existir, rola suavemente até ele
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
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

        // Adiciona o evento de clique ao botão do menu
        menuToggle.addEventListener('click', () => {
            // Alterna a classe 'hidden' no menu mobile para mostrar/esconder
            mobileMenu.classList.toggle('hidden');
            
            // Alterna a visibilidade dos ícones de abrir/fechar
            iconMenu.classList.toggle('hidden');
            iconClose.classList.toggle('hidden');
        });

        // Adiciona um evento para fechar o menu ao clicar em um dos links
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                // A lógica de rolagem suave já é tratada pelo listener acima.
                // Aqui nós apenas garantimos que o menu mobile seja fechado.
                mobileMenu.classList.add('hidden');
                iconMenu.classList.remove('hidden');
                iconClose.classList.add('hidden');
            });
        });
    }
});

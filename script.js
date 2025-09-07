document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const iconMenu = document.querySelector(".icon-menu");
  const iconClose = document.querySelector(".icon-close");

  // Verifica se os elementos do menu existem antes de adicionar os eventos
  if (menuToggle && mobileMenu && iconMenu && iconClose) {
    // Lógica para abrir/fechar o menu mobile
    menuToggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("open");
      iconMenu.classList.toggle("hidden");
      iconClose.classList.toggle("hidden");
    });

    const navLinks = mobileMenu.querySelectorAll("a");
    // Lógica para fechar o menu ao clicar em um link
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (mobileMenu.classList.contains("open")) {
          mobileMenu.classList.remove("open");
          iconMenu.classList.remove("hidden");
          iconClose.classList.add("hidden");
        }
      });
    });
  }

  // Lógica para a rolagem suave com ajuste para o header
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");

      // Se o link for apenas "#", rola para o topo da página
      if (targetId === "#") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      const targetElement = document.querySelector(targetId);

      // Se o elemento de destino existir, executa a rolagem suave
      if (targetElement) {
        e.preventDefault();
        const header = document.querySelector(".header");
        const headerHeight = header ? header.offsetHeight : 0;
        const targetPosition =
          targetElement.getBoundingClientRect().top +
          window.pageYOffset -
          headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
});

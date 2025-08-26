document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contact-form");
  const popupContainer = document.getElementById("popup-container");
  const popupCloseBtn = document.getElementById("popup-close-btn");

  if (contactForm && popupContainer && popupCloseBtn) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(this);
      const submitButton = this.querySelector('button[type="submit"]');
      const originalButtonText = submitButton.textContent;

      submitButton.textContent = "Enviando...";
      submitButton.disabled = true;

      fetch(this.action, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      })
        .then(() => {
          showPopupSuccess();
          contactForm.reset(); // limpa o formulário
        })
        .catch((err) => {
          console.error("Erro ao enviar:", err);
        })
        .finally(() => {
          submitButton.textContent = originalButtonText;
          submitButton.disabled = false;
        });
    });

    function showPopupSuccess() {
      const popupIcon = document.getElementById("popup-icon");
      const popupTitle = document.getElementById("popup-title");
      const popupMessage = document.getElementById("popup-message");
      const popupBox = popupContainer.querySelector(".popup-box");

      popupBox.classList.remove("popup-error");
      popupBox.classList.add("popup-success");

      popupIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="green" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;
      popupTitle.textContent = "Mensagem Enviada!";
      popupMessage.textContent =
        "Agradecemos o seu contato. Nossa equipe retornará o mais breve possível.";

      popupContainer.classList.remove("hidden");
      document.body.classList.add("no-scroll");
    }

    function closePopup() {
      popupContainer.classList.add("hidden");
      document.body.classList.remove("no-scroll");
    }

    popupCloseBtn.addEventListener("click", closePopup);
    popupContainer
      .querySelector(".popup-overlay")
      .addEventListener("click", closePopup);
  }
});

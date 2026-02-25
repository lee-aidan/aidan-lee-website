(() => {
  const form = document.getElementById("contactForm");
  const rightCol = document.getElementById("contactRight");
  const sendBtn = document.getElementById("sendBtn");
  const errorEl = document.getElementById("contactError");

  if (!form || !rightCol || !sendBtn || !errorEl) return;

  const initialButtonText = sendBtn.textContent;

  const setError = (msg) => {
    errorEl.textContent = msg;
  };

  const clearError = () => {
    errorEl.textContent = "";
  };

  const setSubmittingState = (submitting) => {
    sendBtn.disabled = submitting;
    sendBtn.setAttribute("aria-busy", String(submitting));
    sendBtn.textContent = submitting ? "Sending..." : initialButtonText;
  };

  const showThankYou = () => {
    const wrapper = document.createElement("div");
    wrapper.className = "contact-thankyou-wrapper";
    wrapper.setAttribute("aria-live", "polite");

    const message = document.createElement("p");
    message.className = "contact-thankyou";
    message.textContent = "Thank you for your message!";

    wrapper.appendChild(message);
    rightCol.replaceChildren(wrapper);
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    clearError();

    if (sendBtn.disabled) return;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    setSubmittingState(true);

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      if (!response.ok) {
        throw new Error(`Submit failed (${response.status})`);
      }

      form.reset();
      showThankYou();
    } catch (error) {
      setSubmittingState(false);
      setError("Something went wrong. Please try again.");
      console.error(error);
    }
  });
})();

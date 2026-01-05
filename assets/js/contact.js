(() => {
  const form = document.getElementById("contactForm");
  const rightCol = document.getElementById("contactRight");
  const sendBtn = document.getElementById("sendBtn");
  const errorEl = document.getElementById("contactError");

  if (!form || !rightCol || !sendBtn || !errorEl) return;

  const setError = (msg) => { errorEl.textContent = msg; };
  const clearError = () => { errorEl.textContent = ""; };

  const showThankYou = () => {
    rightCol.innerHTML = `
      <div class="contact-thankyou-wrapper" aria-live="polite">
        <p class="contact-thankyou">Thank you for your message!</p>
      </div>
    `;
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    clearError();

    // native validation UI
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    sendBtn.disabled = true;

    try {
      const res = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      if (!res.ok) throw new Error("Submit failed");

      showThankYou();
    } catch (err) {
      sendBtn.disabled = false;
      setError("Something went wrong. Please try again.");
    }
  });
})();
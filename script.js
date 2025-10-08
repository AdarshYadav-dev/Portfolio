document.addEventListener('DOMContentLoaded', () => {
  feather.replace();

  const form = document.getElementById('contactForm');
  if (!form) return;

  const submitBtn = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // disable button while submitting
    if (submitBtn) submitBtn.disabled = true;

    const formData = new FormData(form);

    try {
      const response = await fetch('https://formspree.io/f/xnngzrkk', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: formData
      });

      if (response.ok) {
        Toastify({
          text: "Message sent successfully!",
          duration: 3000,
          gravity: "top",
          position: "center",
          style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
            color: "#fff",
            fontWeight: "600",
            borderRadius: "10px"
          }
        }).showToast();

        form.reset();
        form.scrollIntoView({ behavior: "smooth" });
      } else {
        const data = await response.json();
        const errorMsg = data.errors
          ? data.errors.map(e => e.message).join(", ")
          : "Oops! Something went wrong.";

        Toastify({
          text: errorMsg,
          duration: 4000,
          gravity: "top",
          position: "center",
          style: {
            background: "linear-gradient(to right, #ff416c, #ff4b2b)",
            color: "#fff",
            fontWeight: "600",
            borderRadius: "10px"
          }
        }).showToast();
      }
    } catch (err) {
      Toastify({
        text: "Network error. Please try again. ❌",
        duration: 4000,
        gravity: "top",
        position: "center",
        style: {
          background: "linear-gradient(to right, #ff416c, #ff4b2b)",
          color: "#fff",
          fontWeight: "600",
          borderRadius: "10px"
        }
      }).showToast();
    } finally {
      if (submitBtn) submitBtn.disabled = false;
    }
  });
});

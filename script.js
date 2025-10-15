document.addEventListener("DOMContentLoaded", () => {
  // Replace feather icons
  feather.replace();

  // =====================
  // Contact Form Submission
  // =====================
  const form = document.getElementById("contactForm");
  if (form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      if (submitBtn) submitBtn.disabled = true;
      const formData = new FormData(form);

      try {
        const response = await fetch("https://formspree.io/f/xnngzrkk", {
          method: "POST",
          headers: { Accept: "application/json" },
          body: formData,
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
              borderRadius: "10px",
            },
          }).showToast();

          form.reset();
          form.scrollIntoView({ behavior: "smooth" });
        } else {
          const data = await response.json();
          const errorMsg = data.errors
            ? data.errors.map((e) => e.message).join(", ")
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
              borderRadius: "10px",
            },
          }).showToast();
        }
      } catch (err) {
        Toastify({
          text: "Network error. Please try again !!",
          duration: 4000,
          gravity: "top",
          position: "center",
          style: {
            background: "linear-gradient(to right, #ff416c, #ff4b2b)",
            color: "#fff",
            fontWeight: "600",
            borderRadius: "10px",
          },
        }).showToast();
      } finally {
        if (submitBtn) submitBtn.disabled = false;
      }
    });
  }

  // =====================
  // Mobile Menu Toggle
  // =====================
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu on link click
    mobileMenu.querySelectorAll('a').forEach(item => {
      item.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // =====================
  // Swiper Slider
  // =====================
  if (document.querySelector(".swiper")) {
    new Swiper(".swiper", {
      loop: true,
      pagination: { el: ".swiper-pagination", clickable: true },
      autoplay: { delay: 3000 },
    });
  }

  // =====================
  // Vanta Globe
  // =====================
  if (document.getElementById("vanta-bg")) {
    VANTA.GLOBE({
      el: "#vanta-bg",
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      scale: 1.0,
      scaleMobile: 1.0,
      color: 0x6366f1,
      backgroundColor: 0x111827,
      size: 0.8,
    });
  }

  // =====================
  // AOS Animation
  // =====================
  if (AOS) {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true
    });
  }

  // =====================
  // Highlight Active Nav Link on Scroll
  // =====================
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("nav a");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 80;
      if (pageYOffset >= sectionTop) {
        current = section.getAttribute("id");
      }
    });
    navLinks.forEach((a) => {
      a.classList.remove("text-primary-500");
      if (a.getAttribute("href") === `#${current}`) {
        a.classList.add("text-primary-500");
      }
    });
  });
});

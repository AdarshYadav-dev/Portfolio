document.addEventListener("DOMContentLoaded", () => {
  feather.replace();

  const form = document.getElementById("contactForm");

  if (!form) return;

  const submitBtn = form.querySelector('button[type="submit"]');

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // disable button while submitting
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
        text: "Network error. Please try again. ❌",
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
});


// Navbar toggle
document.getElementById("mobile-menu-button").addEventListener("click", () => {
  document.getElementById("mobile-menu").classList.toggle("hidden");
});

// Feather icons
feather.replace();


// Swiper slider for projects
const swiper = new Swiper(".swiper", {
  loop: true,
  pagination: { el: ".swiper-pagination", clickable: true },
  autoplay: { delay: 3000 },
});

VANTA.GLOBE({
  el: "#vanta-bg",
  mouseControls: true,
  touchControls: true,
  gyroControls: false,
  minHeight: 200.00,
  minWidth: 200.00,
  scale: 1.00,
  scaleMobile: 1.00,
  color: 0x6366f1,
  backgroundColor: 0x111827,
  size: 0.8
});

// Initialize AOS
AOS.init({
  duration: 800,
  easing: 'ease-in-out',
  once: true
});

// Mobile menu toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('#mobile-menu a').forEach(item => {
  item.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
  });
});

// Replace feather icons
feather.replace();
// highlight active link
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
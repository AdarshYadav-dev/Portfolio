
AOS.init({
  duration: 800,          
  once: true,             
  offset: 100,            
  easing: 'ease-in-out',
  throttleDelay: 50       
});

const menuBtn = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });
}

feather.replace();


if (document.getElementById('vanta-bg')) {
  VANTA.GLOBE({
    el: "#vanta-bg",
    mouseControls: true,
    touchControls: true,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 1.00,
    scaleMobile: 1.00,
    color: 0x6366f1,
    color2: 0x10b981,
    backgroundColor: 0x000000
  });
}


if (document.querySelector('.swiper')) {
  const swiper = new Swiper('.swiper', {
    loop: true,               // infinite loop
    autoplay: {
      delay: 2500,            // 2.5 seconds per slide
      disableOnInteraction: false, // keeps autoplay even after user interacts
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });
}

const form = document.getElementById('contactForm');

if (form) {
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
    } catch (error) {
      Toastify({
        text: "Network error. Please try again.",
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
}


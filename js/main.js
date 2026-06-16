// =========================
// KALAM HUB - MAIN.JS
// =========================

// Navbar Shadow on Scroll

window.addEventListener("scroll", () => {

    const navbar = document.querySelector(".navbar");

    if (window.scrollY > 50) {
        navbar.style.boxShadow = "0 8px 25px rgba(0,0,0,0.1)";
    } else {
        navbar.style.boxShadow = "0 5px 20px rgba(0,0,0,0.05)";
    }

});

// Smooth Fade-In Animation

const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }

    });

}, {
    threshold: 0.1
});

document.querySelectorAll(
    ".about, .services, .projects, .contact, .service-card, .project-card"
).forEach((el) => {
    observer.observe(el);
});

// Button Click Animation

document.querySelectorAll(
    ".btn-primary, .btn-secondary"
).forEach((button) => {

    button.addEventListener("click", () => {

        button.style.transform = "scale(0.95)";

        setTimeout(() => {
            button.style.transform = "scale(1)";
        }, 150);

    });

});

// Dynamic Footer Year

const footerText = document.querySelector("footer p:last-child");

if (footerText) {

    footerText.innerHTML =
        `© ${new Date().getFullYear()} Kalam Hub. All Rights Reserved.`;

}

// Console Branding

console.log(`
=================================
       KALAM HUB
 Where Ideas Become Innovation
=================================
`);
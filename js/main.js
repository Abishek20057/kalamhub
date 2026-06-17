// ==========================================
// KALAM HUB 4.0 PREMIUM MAIN.JS
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    console.log(`
=================================
        KALAM HUB
 Where Ideas Become Innovation
=================================
    `);

    // ==========================
    // NAVBAR SHADOW ON SCROLL
    // ==========================

    const navbar = document.querySelector(".navbar");

    window.addEventListener("scroll", () => {

        if (!navbar) return;

        if (window.scrollY > 50) {

            navbar.style.background =
                "rgba(255,255,255,0.98)";

            navbar.style.boxShadow =
                "0 10px 30px rgba(0,0,0,0.12)";

        } else {

            navbar.style.background =
                "rgba(255,255,255,0.95)";

            navbar.style.boxShadow =
                "0 5px 20px rgba(0,0,0,0.08)";
        }

    });

    // ==========================
    // ACTIVE NAVIGATION
    // ==========================

    const currentPage =
        window.location.pathname.split("/").pop();

    document
        .querySelectorAll(".nav-links a")
        .forEach(link => {

            const href = link.getAttribute("href");

            if (href === currentPage) {

                link.style.color = "#2563eb";
                link.style.fontWeight = "700";
            }

        });

    // ==========================
    // SCROLL REVEAL ANIMATION
    // ==========================

    const revealElements =
        document.querySelectorAll(
            ".about, .services, .projects, .contact, .gallery, .service-card, .project-card, .gallery-card"
        );

    revealElements.forEach(el => {

        el.style.opacity = "0";
        el.style.transform = "translateY(50px)";
        el.style.transition =
            "all 0.8s ease";

    });

    const revealObserver =
        new IntersectionObserver(entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";

                    entry.target.style.transform =
                        "translateY(0)";
                }

            });

        }, {
            threshold: 0.15
        });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // ==========================
    // BUTTON CLICK EFFECT
    // ==========================

    document
        .querySelectorAll(
            ".btn-primary, .btn-secondary"
        )
        .forEach(button => {

            button.addEventListener("click", () => {

                button.style.transform =
                    "scale(0.95)";

                setTimeout(() => {

                    button.style.transform =
                        "scale(1)";

                }, 150);

            });

        });

    // ==========================
    // PROJECT CARD HOVER GLOW
    // ==========================

    document
        .querySelectorAll(
            ".project-card, .service-card"
        )
        .forEach(card => {

            card.addEventListener("mouseenter", () => {

                card.style.boxShadow =
                    "0 20px 45px rgba(37,99,235,0.25)";

            });

            card.addEventListener("mouseleave", () => {

                card.style.boxShadow = "";

            });

        });

    // ==========================
    // COUNTER ANIMATION
    // ==========================

    const counters =
        document.querySelectorAll(".counter");

    const counterObserver =
        new IntersectionObserver(entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                const counter =
                    entry.target;

                const target =
                    parseInt(
                        counter.dataset.target
                    );

                let current = 0;

                const increment =
                    Math.ceil(target / 100);

                const updateCounter = () => {

                    current += increment;

                    if (current >= target) {

                        counter.innerText =
                            target + "+";

                    } else {

                        counter.innerText =
                            current + "+";

                        requestAnimationFrame(
                            updateCounter
                        );
                    }

                };

                updateCounter();

                counterObserver.unobserve(counter);

            });

        });

    counters.forEach(counter => {

        counterObserver.observe(counter);

    });

    // ==========================
    // FOOTER YEAR
    // ==========================

    const footerYear =
        document.querySelector(
            ".footer-year"
        );

    if (footerYear) {

        footerYear.innerText =
            new Date().getFullYear();

    }

    // ==========================
    // PAGE LOADER EFFECT
    // ==========================

    document.body.style.opacity = "0";

    setTimeout(() => {

        document.body.style.transition =
            "opacity 0.8s ease";

        document.body.style.opacity = "1";

    }, 100);

});
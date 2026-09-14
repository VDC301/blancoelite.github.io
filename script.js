/* =========================================
   BLANCO ELITE™
   FASE 3 — INTERACTIVIDAD
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const header = document.querySelector("header");
    const navLinks = document.querySelectorAll("nav a");
    const sections = document.querySelectorAll("section[id]");
    const revealElements = document.querySelectorAll(".reveal");

    /* =========================================
       HEADER AL HACER SCROLL
       ========================================= */

    function updateHeader() {
        if (window.scrollY > 40) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }

    window.addEventListener("scroll", updateHeader);

    updateHeader();


    /* =========================================
       NAVEGACIÓN ACTIVA
       ========================================= */

    function updateActiveSection() {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 130;
            const sectionHeight = section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {
                currentSection = section.getAttribute("id");
            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            const target = link.getAttribute("href");

            if (target === `#${currentSection}`) {
                link.classList.add("active");
            }

        });
    }

    window.addEventListener("scroll", updateActiveSection);

    updateActiveSection();


    /* =========================================
       SCROLL REVEAL
       ========================================= */

    const observer = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach(element => {
        observer.observe(element);
    });


    /* =========================================
       CLICS DEL MENÚ
       ========================================= */

    navLinks.forEach(link => {

        link.addEventListener("click", event => {

            const targetId = link.getAttribute("href");

            if (!targetId.startsWith("#")) {
                return;
            }

            const targetSection = document.querySelector(targetId);

            if (!targetSection) {
                return;
            }

            event.preventDefault();

            targetSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });

});

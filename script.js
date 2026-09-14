document.addEventListener("DOMContentLoaded", () => {
    const header = document.getElementById("site-header");
    const navLinks = Array.from(
        document.querySelectorAll(".main-nav a[href^='#']")
    );
    const sections = navLinks
        .map((link) => document.querySelector(link.getAttribute("href")))
        .filter(Boolean);

    /* =========================
       HEADER SCROLL
    ========================= */

    function updateHeader() {
        if (!header) return;

        if (window.scrollY > 40) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }

    /* =========================
       ACTIVE NAVIGATION
    ========================= */

    function setActiveNav(sectionId) {
        navLinks.forEach((link) => {
            const targetId = link.getAttribute("href").replace("#", "");

            if (targetId === sectionId) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });
    }

    /*
       Detecta la sección que está ocupando
       la zona principal de la pantalla.

       Esto funciona tanto en:
       - escritorio
       - tablet
       - Android
       - iPhone
    */

    function updateActiveSection() {
        if (!sections.length) return;

        const headerHeight = header
            ? header.offsetHeight
            : 0;

        const checkPosition =
            window.scrollY +
            headerHeight +
            window.innerHeight * 0.30;

        let currentSection = sections[0];

        sections.forEach((section) => {
            if (checkPosition >= section.offsetTop) {
                currentSection = section;
            }
        });

        if (currentSection) {
            setActiveNav(currentSection.id);
        }
    }

    /* =========================
       INITIAL STATE
    ========================= */

    updateHeader();
    updateActiveSection();

    /* =========================
       SCROLL
    ========================= */

    let scrollTicking = false;

    window.addEventListener(
        "scroll",
        () => {
            updateHeader();

            if (!scrollTicking) {
                window.requestAnimationFrame(() => {
                    updateActiveSection();
                    scrollTicking = false;
                });

                scrollTicking = true;
            }
        },
        { passive: true }
    );

    window.addEventListener("resize", () => {
        updateActiveSection();
    });

    /* =========================
       NAVIGATION LINKS
    ========================= */

    navLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            const selector = link.getAttribute("href");
            const target = document.querySelector(selector);

            if (!target) return;

            event.preventDefault();

            const headerHeight = header
                ? header.offsetHeight
                : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight -
                12;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

            /*
               Actualizamos inmediatamente la línea
               para que el usuario vea el cambio
               mientras comienza el desplazamiento.
            */
            setActiveNav(target.id);
        });
    });

    /* =========================
       REVEAL ON SCROLL
    ========================= */

    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
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

        revealElements.forEach((element) => {
            revealObserver.observe(element);
        });
    } else {
        revealElements.forEach((element) => {
            element.classList.add("visible");
        });
    }

    /* =========================
       BUSINESS CARDS
    ========================= */

    const businessCards =
        document.querySelectorAll(".business-card");

    businessCards.forEach((card) => {
        const button =
            card.querySelector(".business-button");

        if (!button) return;

        button.addEventListener("click", () => {
            const wasSelected =
                card.classList.contains("selected");

            businessCards.forEach((otherCard) => {
                otherCard.classList.remove("selected");
            });

            if (!wasSelected) {
                card.classList.add("selected");
            }
        });
    });

    /* =========================
       CLOSE BUSINESS CARD
       WHEN CLICKING OUTSIDE
    ========================= */

    document.addEventListener("click", (event) => {
        const clickedInsideCard =
            event.target.closest(".business-card");

        if (clickedInsideCard) return;

        businessCards.forEach((card) => {
            card.classList.remove("selected");
        });
    });

    /* =========================
       ESCAPE KEY
    ========================= */

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            businessCards.forEach((card) => {
                card.classList.remove("selected");
            });
        }
    });
});

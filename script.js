/* =========================================
   BLANCO ELITE™
   SCRIPT.JS COMPLETO
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const header =
        document.querySelector("header");

    const navLinks =
        document.querySelectorAll("nav a");

    const sections =
        document.querySelectorAll("section[id]");

    const revealElements =
        document.querySelectorAll(".reveal");

    const businessCards =
        document.querySelectorAll(".business-card");


    /* =========================================
       HEADER AL HACER SCROLL
       ========================================= */

    function updateHeader() {

        if (!header) {
            return;
        }

        if (window.scrollY > 40) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }

    window.addEventListener(
        "scroll",
        updateHeader
    );

    updateHeader();


    /* =========================================
       NAVEGACIÓN ACTIVA
       ========================================= */

    function updateActiveSection() {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 150;

            const sectionHeight =
                section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY <
                sectionTop + sectionHeight
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navLinks.forEach(link => {

            link.classList.remove("active");

            const target =
                link.getAttribute("href");

            if (
                target ===
                `#${currentSection}`
            ) {

                link.classList.add("active");

            }

        });

    }

    window.addEventListener(
        "scroll",
        updateActiveSection
    );

    updateActiveSection();


    /* =========================================
       SCROLL REVEAL
       ========================================= */

    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target
                                .classList
                                .add("visible");

                            observer.unobserve(
                                entry.target
                            );

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

    } else {

        revealElements.forEach(element => {

            element.classList.add("visible");

        });

    }


    /* =========================================
       NAVEGACIÓN SUAVE
       ========================================= */

    navLinks.forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute("href");

                if (
                    !targetId ||
                    !targetId.startsWith("#")
                ) {

                    return;

                }

                const targetSection =
                    document.querySelector(
                        targetId
                    );

                if (!targetSection) {

                    return;

                }

                event.preventDefault();

                targetSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    });


    /* =========================================
       TARJETAS INTERACTIVAS
       ========================================= */

    businessCards.forEach(card => {

        card.addEventListener(
            "click",
            event => {

                const clickedButton =
                    event.target.closest(
                        ".business-button"
                    );

                businessCards.forEach(
                    otherCard => {

                        if (
                            otherCard !== card
                        ) {

                            otherCard.classList
                                .remove(
                                    "selected"
                                );

                        }

                    }
                );


                card.classList.toggle(
                    "selected"
                );

            }
        );

    });


    /* =========================================
       BOTÓN DE CONTACTO
       ========================================= */

    const contactButton =
        document.querySelector(
            "#contact-button"
        );

    if (contactButton) {

        contactButton.addEventListener(
            "click",
            event => {

                event.preventDefault();

                const contactSection =
                    document.querySelector(
                        "#contacto"
                    );

                if (contactSection) {

                    contactSection.scrollIntoView({
                        behavior: "smooth"
                    });

                }

            }
        );

    }

});

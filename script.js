document.addEventListener("DOMContentLoaded", () => {

    const header = document.getElementById("site-header");
    const nav = document.getElementById("main-nav");
    const menuToggle = document.getElementById("menu-toggle");

    const navLinks = document.querySelectorAll(".main-nav a");

    const sections = document.querySelectorAll("main section[id]");

    const revealElements = document.querySelectorAll(".reveal");

    const businessCards =
        document.querySelectorAll(".business-card");


    /* =========================
       HEADER SCROLL
    ========================== */

    const updateHeader = () => {

        if (!header) return;

        if (window.scrollY > 30) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    };

    updateHeader();

    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );


    /* =========================
       MOBILE MENU
    ========================== */

    if (menuToggle && nav) {

        menuToggle.addEventListener("click", () => {

            nav.classList.toggle("open");

            const isOpen =
                nav.classList.contains("open");

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

        });


        navLinks.forEach(link => {

            link.addEventListener("click", () => {

                nav.classList.remove("open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });

    }


    /* =========================
       ACTIVE NAVIGATION
    ========================== */

    const updateActiveNavigation = () => {

        let currentSection = "";

        const scrollPosition =
            window.scrollY + 180;

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop;

            const sectionHeight =
                section.offsetHeight;

            if (
                scrollPosition >= sectionTop &&
                scrollPosition < sectionTop + sectionHeight
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
                target === `#${currentSection}`
            ) {
                link.classList.add("active");
            }

        });

    };

    updateActiveNavigation();

    window.addEventListener(
        "scroll",
        updateActiveNavigation,
        { passive: true }
    );


    /* =========================
       SMOOTH NAVIGATION
    ========================== */

    navLinks.forEach(link => {

        link.addEventListener("click", event => {

            const target =
                link.getAttribute("href");

            if (
                !target ||
                !target.startsWith("#")
            ) {
                return;
            }

            const element =
                document.querySelector(target);

            if (!element) {
                return;
            }

            event.preventDefault();

            const headerHeight =
                header
                    ? header.offsetHeight
                    : 0;

            const targetPosition =
                element.offsetTop - headerHeight + 1;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* =========================
       REVEAL ON SCROLL
    ========================== */

    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "visible"
                            );

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


    /* =========================
       BUSINESS CARD SELECTION
    ========================== */

    businessCards.forEach(card => {

        card.addEventListener("click", event => {

            /*
             * Si se hace clic en un enlace,
             * dejamos que el navegador navegue
             * normalmente.
             */

            if (
                event.target.closest(
                    ".business-button"
                )
            ) {
                return;
            }


            businessCards.forEach(otherCard => {

                if (otherCard !== card) {

                    otherCard.classList.remove(
                        "selected"
                    );

                }

            });


            card.classList.toggle("selected");

        });

    });


    /* =========================
       CONTACT BUTTON
    ========================== */

    const contactLinks =
        document.querySelectorAll(
            'a[href="#contacto"]'
        );


    contactLinks.forEach(link => {

        link.addEventListener("click", event => {

            const contactSection =
                document.getElementById(
                    "contacto"
                );

            if (!contactSection) {
                return;
            }

            event.preventDefault();

            const headerHeight =
                header
                    ? header.offsetHeight
                    : 0;

            window.scrollTo({

                top:
                    contactSection.offsetTop -
                    headerHeight,

                behavior: "smooth"

            });

        });

    });

});

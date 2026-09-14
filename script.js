document.addEventListener("DOMContentLoaded", () => {

    const header =
        document.getElementById("site-header");

    const menuToggle =
        document.getElementById("menu-toggle");

    const nav =
        document.getElementById("main-nav");


    /*
    ========================================
    MOBILE MENU
    ========================================
    */

    function closeMenu() {

        if (!menuToggle || !nav) return;

        menuToggle.classList.remove("active");

        nav.classList.remove("open");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        document.body.classList.remove(
            "menu-open"
        );
    }


    function openMenu() {

        if (!menuToggle || !nav) return;

        menuToggle.classList.add("active");

        nav.classList.add("open");

        menuToggle.setAttribute(
            "aria-expanded",
            "true"
        );

        document.body.classList.add(
            "menu-open"
        );
    }


    if (menuToggle && nav) {

        menuToggle.addEventListener(
            "click",
            () => {

                const isOpen =
                    nav.classList.contains("open");

                if (isOpen) {
                    closeMenu();
                } else {
                    openMenu();
                }

            }
        );

    }


    /*
    ========================================
    NAVIGATION
    ========================================
    */

    const navLinks =
        Array.from(
            document.querySelectorAll(
                '.main-nav a[href^="#"]'
            )
        );


    const sections =
        navLinks
            .map((link) => {

                const selector =
                    link.getAttribute("href");

                return document.querySelector(
                    selector
                );

            })
            .filter(Boolean);


    function setActiveNav(sectionId) {

        navLinks.forEach((link) => {

            const targetId =
                link
                    .getAttribute("href")
                    .replace("#", "");

            link.classList.toggle(
                "active",
                targetId === sectionId
            );

        });

    }


    /*
    ========================================
    HEADER
    ========================================
    */

    function updateHeader() {

        if (!header) return;

        if (window.scrollY > 35) {

            header.classList.add(
                "scrolled"
            );

        } else {

            header.classList.remove(
                "scrolled"
            );

        }

    }


    /*
    ========================================
    ACTIVE SECTION
    ========================================
    */

    function updateActiveSection() {

        if (!sections.length) return;


        const headerHeight =
            header
                ? header.offsetHeight
                : 0;


        const checkPosition =
            window.scrollY +
            headerHeight +
            window.innerHeight * 0.30;


        let currentSection =
            sections[0];


        sections.forEach(
            (section) => {

                if (
                    checkPosition >=
                    section.offsetTop
                ) {

                    currentSection =
                        section;

                }

            }
        );


        if (currentSection) {

            setActiveNav(
                currentSection.id
            );

        }

    }


    updateHeader();
    updateActiveSection();


    let scrollTicking = false;


    window.addEventListener(
        "scroll",
        () => {

            updateHeader();


            if (!scrollTicking) {

                window.requestAnimationFrame(
                    () => {

                        updateActiveSection();

                        scrollTicking = false;

                    }
                );

                scrollTicking = true;

            }

        },
        {
            passive: true
        }
    );


    window.addEventListener(
        "resize",
        () => {

            updateActiveSection();

        }
    );


    /*
    ========================================
    NAV LINKS / SMOOTH SCROLL
    ========================================
    */

    navLinks.forEach(
        (link) => {

            link.addEventListener(
                "click",
                (event) => {

                    const selector =
                        link.getAttribute(
                            "href"
                        );


                    const target =
                        document.querySelector(
                            selector
                        );


                    if (!target) return;


                    event.preventDefault();


                    const headerHeight =
                        header
                            ? header.offsetHeight
                            : 0;


                    const targetPosition =
                        target.getBoundingClientRect()
                            .top +
                        window.scrollY -
                        headerHeight;


                    window.scrollTo({
                        top:
                            targetPosition,
                        behavior:
                            "smooth"
                    });


                    setActiveNav(
                        target.id
                    );


                    closeMenu();

                }
            );

        }
    );


    /*
    ========================================
    CLOSE MOBILE MENU WITH ESCAPE
    ========================================
    */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape"
            ) {

                closeMenu();

            }

        }
    );


    /*
    ========================================
    CLOSE MOBILE MENU WHEN CLICKING OUTSIDE
    ========================================
    */

    document.addEventListener(
        "click",
        (event) => {

            if (!nav || !menuToggle) {
                return;
            }


            const clickedMenu =
                nav.contains(event.target);

            const clickedButton =
                menuToggle.contains(
                    event.target
                );


            if (
                nav.classList.contains("open") &&
                !clickedMenu &&
                !clickedButton
            ) {

                closeMenu();

            }

        }
    );


    /*
    ========================================
    REVEAL ANIMATIONS
    ========================================
    */

    const revealElements =
        document.querySelectorAll(
            ".reveal"
        );


    if (
        "IntersectionObserver"
        in window
    ) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "visible"
                                );

                                observer.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach(
            (element) => {

                revealObserver.observe(
                    element
                );

            }
        );

    } else {

        revealElements.forEach(
            (element) => {

                element.classList.add(
                    "visible"
                );

            }
        );

    }


    /*
    ========================================
    BUSINESS CARDS
    ========================================
    */

    const businessCards =
        document.querySelectorAll(
            ".business-card"
        );


    businessCards.forEach(
        (card) => {

            const button =
                card.querySelector(
                    ".business-button"
                );


            if (!button) return;


            button.addEventListener(
                "click",
                () => {

                    const wasSelected =
                        card.classList.contains(
                            "selected"
                        );


                    businessCards.forEach(
                        (otherCard) => {

                            otherCard.classList.remove(
                                "selected"
                            );

                        }
                    );


                    if (!wasSelected) {

                        card.classList.add(
                            "selected"
                        );

                    }

                }
            );

        }
    );


    /*
    ========================================
    CLOSE BUSINESS CARDS
    ========================================
    */

    document.addEventListener(
        "click",
        (event) => {

            const clickedInsideCard =
                event.target.closest(
                    ".business-card"
                );


            if (clickedInsideCard) {
                return;
            }


            businessCards.forEach(
                (card) => {

                    card.classList.remove(
                        "selected"
                    );

                }
            );

        }
    );


    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape"
            ) {

                businessCards.forEach(
                    (card) => {

                        card.classList.remove(
                            "selected"
                        );

                    }
                );

            }

        }
    );

});

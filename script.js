/* =========================================================
   BLANCO ELITE™
   SCRIPT.JS
   ========================================================= */


/* =========================================================
   HEADER
   ========================================================= */

const header =
    document.getElementById("site-header");


function updateHeader() {

    if (!header) return;

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


/* =========================================================
   ACTIVE NAVIGATION
   ========================================================= */

const navLinks =
    document.querySelectorAll(".main-nav a");

const sections =
    document.querySelectorAll("main section[id]");


const sectionObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) {
                    return;
                }

                const currentId =
                    entry.target.id;


                navLinks.forEach((link) => {

                    const target =
                        link.getAttribute("href");


                    if (
                        target === `#${currentId}`
                    ) {

                        link.classList.add("active");

                    } else {

                        link.classList.remove("active");

                    }

                });

            });

        },
        {
            rootMargin:
                "-25% 0px -65% 0px",

            threshold: 0
        }
    );


sections.forEach((section) => {

    sectionObserver.observe(section);

});


/* =========================================================
   SMOOTH NAVIGATION
   ========================================================= */

navLinks.forEach((link) => {

    link.addEventListener(
        "click",
        (event) => {

            const targetId =
                link.getAttribute("href");


            if (
                !targetId ||
                !targetId.startsWith("#")
            ) {

                return;

            }


            const target =
                document.querySelector(targetId);


            if (!target) {
                return;
            }


            event.preventDefault();


            const headerHeight =
                header
                    ? header.offsetHeight
                    : 0;


            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight -
                10;


            window.scrollTo({

                top:
                    targetPosition,

                behavior:
                    "smooth"

            });

        }
    );

});


/* =========================================================
   SCROLL REVEAL
   ========================================================= */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) {
                    return;
                }


                entry.target.classList.add(
                    "visible"
                );


                observer.unobserve(
                    entry.target
                );

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach((element) => {

    revealObserver.observe(element);

});


/* =========================================================
   BUSINESS CARDS
   ========================================================= */

const businessCards =
    document.querySelectorAll(
        ".business-card"
    );


const businessButtons =
    document.querySelectorAll(
        ".business-button"
    );


businessButtons.forEach((button) => {

    button.addEventListener(
        "click",
        (event) => {

            event.preventDefault();

            event.stopPropagation();


            const card =
                button.closest(
                    ".business-card"
                );


            if (!card) {
                return;
            }


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

});


/* =========================================================
   KEYBOARD ACCESSIBILITY
   ========================================================= */

businessCards.forEach((card) => {

    card.setAttribute(
        "tabindex",
        "0"
    );


    card.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                event.preventDefault();

                const button =
                    card.querySelector(
                        ".business-button"
                    );


                if (button) {
                    button.click();
                }

            }

        }
    );

});


/* =========================================================
   PAGE LOADED
   ========================================================= */

window.addEventListener(
    "load",
    () => {

        document.body.classList.add(
            "page-loaded"
        );

    }
);

/* =========================================================
   BLANCO ELITE
   MAIN JAVASCRIPT
========================================================= */


/* =========================================================
   ELEMENTS
========================================================= */

const header = document.getElementById("site-header");
const navLinks = document.querySelectorAll(".main-nav a");
const sections = document.querySelectorAll("main section[id]");
const revealElements = document.querySelectorAll(".reveal");
const businessCards = document.querySelectorAll(".business-card");
const businessButtons = document.querySelectorAll(".business-button");


/* =========================================================
   PAGE LOADED
========================================================= */

window.addEventListener("load", () => {

    document.body.classList.add("page-loaded");

});


/* =========================================================
   HEADER SCROLL EFFECT
========================================================= */

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
    updateHeader,
    { passive: true }
);

updateHeader();


/* =========================================================
   ACTIVE NAVIGATION WHILE SCROLLING
========================================================= */

const sectionObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (!entry.isIntersecting) return;

            const sectionId = entry.target.id;

            navLinks.forEach((link) => {

                link.classList.remove("active");

                const href =
                    link.getAttribute("href");

                if (href === `#${sectionId}`) {

                    link.classList.add("active");

                }

            });

        });

    },
    {
        root: null,

        rootMargin:
            "-25% 0px -65% 0px",

        threshold:
            0
    }
);

sections.forEach((section) => {

    sectionObserver.observe(section);

});


/* =========================================================
   SMOOTH NAVIGATION
========================================================= */

navLinks.forEach((link) => {

    link.addEventListener("click", (event) => {

        const href =
            link.getAttribute("href");

        if (!href || !href.startsWith("#")) {
            return;
        }

        const target =
            document.querySelector(href);

        if (!target) {
            return;
        }

        event.preventDefault();

        const headerHeight =
            header
                ? header.offsetHeight
                : 0;

        const targetPosition =
            target.getBoundingClientRect().top
            + window.scrollY
            - headerHeight
            - 12;

        window.scrollTo({

            top:
                targetPosition,

            behavior:
                "smooth"

        });

    });

});


/* =========================================================
   REVEAL ON SCROLL
========================================================= */

const revealObserver = new IntersectionObserver(
    (entries, observer) => {

        entries.forEach((entry) => {

            if (!entry.isIntersecting) {
                return;
            }

            entry.target.classList.add("visible");

            observer.unobserve(
                entry.target
            );

        });

    },
    {
        root: null,

        threshold:
            0.12,

        rootMargin:
            "0px 0px -40px 0px"
    }
);


revealElements.forEach((element) => {

    revealObserver.observe(element);

});


/* =========================================================
   BUSINESS CARD EXPLORER
========================================================= */

businessButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const card =
            button.closest(".business-card");

        if (!card) return;


        const isSelected =
            card.classList.contains("selected");


        /* Close every other card */

        businessCards.forEach((otherCard) => {

            if (otherCard !== card) {

                otherCard.classList.remove(
                    "selected"
                );

                const otherButton =
                    otherCard.querySelector(
                        ".business-button"
                    );

                if (otherButton) {

                    otherButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

            }

        });


        /* Toggle current card */

        if (isSelected) {

            card.classList.remove(
                "selected"
            );

            button.setAttribute(
                "aria-expanded",
                "false"
            );

        } else {

            card.classList.add(
                "selected"
            );

            button.setAttribute(
                "aria-expanded",
                "true"
            );

        }

    });

});


/* =========================================================
   KEYBOARD ACCESSIBILITY
========================================================= */

businessButtons.forEach((button) => {

    button.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                event.preventDefault();

                button.click();

            }

        }
    );

});


/* =========================================================
   CLOSE BUSINESS CARDS WHEN CLICKING OUTSIDE
========================================================= */

document.addEventListener(
    "click",
    (event) => {

        if (
            event.target.closest(".business-card")
        ) {
            return;
        }

        businessCards.forEach((card) => {

            card.classList.remove(
                "selected"
            );

            const button =
                card.querySelector(
                    ".business-button"
                );

            if (button) {

                button.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        });

    }
);


/* =========================================================
   ESCAPE KEY
========================================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (event.key !== "Escape") {
            return;
        }

        businessCards.forEach((card) => {

            card.classList.remove(
                "selected"
            );

            const button =
                card.querySelector(
                    ".business-button"
                );

            if (button) {

                button.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        });

    }
);

/*Animated cursor  */

var cursor = document.getElementById("cursor");
var cursor2 = document.getElementById("cursor2");
var cursor3 = document.getElementById("cursor3");

if (cursor && cursor2 && cursor3) {
    document.body.addEventListener("mousemove", function (e) {
        "use strict";
        [cursor, cursor2, cursor3].forEach(function (c) {
            c.style.left = e.clientX + "px";
            c.style.top = e.clientY + "px";
        });
    });

    var cursorHover = function () {
        cursor2.classList.add("hover", "hover-2");
        cursor3.classList.add("hover", "hover-2");
    };
    var cursorLeave = function () {
        cursor2.classList.remove("hover", "hover-2");
        cursor3.classList.remove("hover", "hover-2");
    };

    document.querySelectorAll(".hover-target, .hover-target-2").forEach(function (el) {
        el.addEventListener("mouseover", cursorHover);
        el.addEventListener("mouseout", cursorLeave);
    });
}

/**** Contact: open the chat widget, fall back to email if it isn't available */

var CONTACT_EMAIL = "hello@marketingadda.com";

function openContact(e) {
    if (window.Tawk_API && typeof window.Tawk_API.toggle === "function") {
        if (e) e.preventDefault();
        window.Tawk_API.toggle();
    } else if (!e || !e.currentTarget || !e.currentTarget.href) {
        window.location.href = "mailto:" + CONTACT_EMAIL;
    }
}

document.querySelectorAll("[data-contact]").forEach(function (el) {
    el.addEventListener("click", openContact);
});

/**** Slider, dot navigation, side menu and hamburger menu */

const track = document.querySelector(".carousel_track");

if (track) {
    const slides = Array.from(track.children);
    const nextButton = document.querySelector(".carousel_button--right");
    const prevButton = document.querySelector(".carousel_button--left");
    const dots = Array.from(document.querySelectorAll(".carousel__indicator"));

    // Section keys, in slide order. They match the nav-active-<key> and
    // selected-nav-<key> classes used by the side menu and hamburger menu.
    const sections = ["ma", "design", "dev", "app", "digimarket", "price", "about"];
    const sideMenuItems = Array.from(document.querySelectorAll(".sticky-left-nav .nav-active"));
    const hamburgerLinks = Array.from(document.querySelectorAll(".menu .menu-nav"));
    const menuToggle = document.getElementById("toggle-checkbox");

    let currentIndex = 0;

    // Percent-based positions stay correct when the window is resized or rotated.
    slides.forEach((slide, index) => {
        slide.style.left = index * 100 + "%";
    });

    const goToSlide = (targetIndex) => {
        if (targetIndex < 0 || targetIndex >= slides.length || targetIndex === currentIndex) return;

        const currentSlide = slides[currentIndex];
        const targetSlide = slides[targetIndex];

        track.style.transform = "translateX(-" + targetIndex * 100 + "%)";
        currentSlide.classList.remove("current-slide");
        targetSlide.classList.add("current-slide");

        [".c-hero__headline", ".c-hero__subheadline", ".c-hero__Para"].forEach((selector) => {
            const from = currentSlide.querySelector(selector);
            const to = targetSlide.querySelector(selector);
            if (from) from.classList.remove("reveal-text");
            if (to) to.classList.add("reveal-text");
        });

        dots.forEach((dot, i) => dot.classList.toggle("current-slide", i === targetIndex));

        sideMenuItems.forEach((item, i) => {
            item.classList.toggle("selected-nav-" + sections[i], i === targetIndex);
        });

        if (prevButton) prevButton.classList.toggle("is-hidden", targetIndex === 0);
        if (nextButton) nextButton.classList.toggle("is-hidden", targetIndex === slides.length - 1);

        currentIndex = targetIndex;
    };

    if (nextButton) nextButton.addEventListener("click", () => goToSlide(currentIndex + 1));
    if (prevButton) prevButton.addEventListener("click", () => goToSlide(currentIndex - 1));

    dots.forEach((dot, i) => {
        dot.setAttribute("aria-label", "Go to slide " + (i + 1));
        dot.addEventListener("click", () => goToSlide(i));
    });

    sideMenuItems.forEach((item, i) => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            goToSlide(i);
        });
    });

    hamburgerLinks.forEach((link, i) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            goToSlide(i);
            if (menuToggle) menuToggle.checked = false;
        });
    });

    // Mouse wheel / trackpad: one slide per gesture.
    const WHEEL_LOCK_MS = 900;
    let wheelLocked = false;

    document.addEventListener(
        "wheel",
        (e) => {
            if (wheelLocked || Math.abs(e.deltaY) < 10) return;
            wheelLocked = true;
            setTimeout(() => {
                wheelLocked = false;
            }, WHEEL_LOCK_MS);
            goToSlide(currentIndex + (e.deltaY > 0 ? 1 : -1));
        },
        { passive: true }
    );

    // Touch swipe on phones and tablets.
    let touchStartX = null;
    let touchStartY = null;

    document.addEventListener(
        "touchstart",
        (e) => {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        },
        { passive: true }
    );

    document.addEventListener(
        "touchend",
        (e) => {
            if (touchStartX === null) return;
            const dx = e.changedTouches[0].clientX - touchStartX;
            const dy = e.changedTouches[0].clientY - touchStartY;
            touchStartX = touchStartY = null;
            if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy)) return;
            goToSlide(currentIndex + (dx < 0 ? 1 : -1));
        },
        { passive: true }
    );

    // Keyboard arrows.
    document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === "PageDown") {
            goToSlide(currentIndex + 1);
        } else if (e.key === "ArrowLeft" || e.key === "ArrowUp" || e.key === "PageUp") {
            goToSlide(currentIndex - 1);
        }
    });
}

/**** Video modal */

const modal = document.getElementById("modal");
const modalVideo = document.getElementById("modal-video");
const mdc = document.getElementById("mdc");
const closeButton = document.getElementById("close");

if (modal && modalVideo && mdc) {
    const closeModal = () => {
        mdc.style.transform = "scale(0)";

        setTimeout(() => {
            modal.style.visibility = "hidden";
            modal.style.opacity = "0";
            modalVideo.src = "";
        }, 500);
    };

    const showModal = (element) => {
        modal.style.visibility = "visible";
        modal.style.opacity = "1";
        modalVideo.src = element.href;
        mdc.style.width = "100%";

        setTimeout(() => {
            mdc.style.transform = "scale(1)";
        }, 300);
    };

    document.querySelectorAll("[data-vidup]").forEach((element) => {
        element.addEventListener("click", (e) => {
            e.preventDefault();
            showModal(element);
        });
    });

    if (closeButton) closeButton.addEventListener("click", closeModal);
    mdc.addEventListener("click", closeModal);
    modal.addEventListener("click", closeModal);
}

/*code to move background logo*/
var bg_logo = document.querySelector("#bg_logo");

if (bg_logo) {
    bg_logo.addEventListener("mousemove", (event) => {
        if (screen.width > 900) {
            bg_logo.style.backgroundPositionX = -event.offsetX / 100 + "px";
            bg_logo.style.backgroundPositionY = -event.offsetY / 100 + "px";
        }
    });
}

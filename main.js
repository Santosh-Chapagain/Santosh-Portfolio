// main.js - consolidated and fixed smooth scroll + scrollspy + menu handling

// Typed.js initialization
var typed = new Typed(".text", {
    strings: ["Data Scientist", "Python Programmer"],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

// Menu toggle
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
});

// Smooth scroll with header offset (handles "More About Me" and other anchors)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (!href || href === '#') return; // ignore empty anchors

        const targetId = href.slice(1);
        const targetEl = document.getElementById(targetId);
        if (!targetEl) return;

        e.preventDefault();

        const header = document.querySelector('header');
        const headerHeight = header ? header.offsetHeight : 0;
        const extraGap = 16; // extra spacing so section isn't flush under header

        const top = targetEl.getBoundingClientRect().top + window.pageYOffset - headerHeight - extraGap;

        window.scrollTo({ top: top, behavior: 'smooth' });

        // close mobile nav if open
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
    });
});

// Scrollspy and sticky header
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.addEventListener('scroll', () => {
    const top = window.scrollY;

    sections.forEach(sec => {
        const offset = sec.offsetTop - 150;
        const height = sec.offsetHeight;
        const id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => link.classList.remove('active'));
            const selector = 'header nav a[href*="' + id + '"]';
            const el = document.querySelector(selector);
            if (el) el.classList.add('active');
        }
    });

    const header = document.querySelector('header');
    if (header) header.classList.toggle('sticky', window.scrollY > 100);
});
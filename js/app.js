/**
 * Author: Giwoo G Lee
 * Date: 2020-08-21
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
*/

/**
 * Define Global Variables
 *
*/
const doc = document;
const sections = doc.querySelectorAll('section');
const navbarList = doc.querySelector('#navbar__list');
const navbarElementHeader = doc.querySelector('.page__header');
const scrollTopBtn = doc.querySelector('.scroll-top')

let navbarIimeout = {};

/**
 * End Global Variables
 * Start Helper Functions
 *
*/
const removeAllElementNodeClasses = (elementNodeArr, className) => {
    elementNodeArr.forEach(elementNode => elementNode.classList.remove(className));
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
*/

/**
 * @description Build the nav
 */
const buildMenu = () => {
    sections.forEach((section) => {
        const menuItem = doc.createElement('li');
        menuItem.innerText = section.dataset.nav;
        menuItem.classList.add('menu__link');
        menuItem.setAttribute('data-nav', section.id);

        navbarList.appendChild(menuItem);
    });
}

/**
 * @description Add class 'your-active-class' to section when near top of viewport
 */
const handleSetSectionAsActive = menuLinks => {
    let sectionsNode = [];

    for (let i = 0; i < sections.length; i++) {
        sectionsNode.push(sections[i]);
    }

    doc.addEventListener('scroll', e => {
        const scrollTop = doc.documentElement.scrollTop;

        // Toggle Navigation Bar
        navbarElementHeader.classList.remove('is-hidden');
        clearTimeout(navbarIimeout);
        setNavigationBarTimeout();

        // Toggle Scroll Back to Top Button
        showScrollBackToTopButton(scrollTop >= sectionsNode[0].offsetTop);

        sectionsNode.map(sectionNode => {
            if (scrollTop >= sectionNode.offsetTop - sectionNode.clientHeight &&
                scrollTop < sectionNode.offsetTop) {
                    removeAllElementNodeClasses(sections, 'your-active-class')
                    removeAllElementNodeClasses(menuLinks, 'is-active');

                    sectionNode.classList.add('your-active-class');
                    menuLinks.forEach(menuLink => {
                        if (menuLink.getAttribute('data-nav') == sectionNode.id) {
                            menuLink.classList.add('is-active');
                        }
                    });
            }
        });
    });
}

/**
 * @description Scroll to anchor ID using scrollTO event
 * @param {string} dataNav
 */
const handleScrollToSection = (dataNav) => {
    const offsetTop = doc.querySelector('#' + dataNav).offsetTop;
    const headerHeight = doc.querySelector('.page__header').clientHeight;

    window.scrollTo({
        top: offsetTop - headerHeight,
        behavior: 'smooth'
    });
}

/**
 * @description Hide navigation bar when not scrolling
 */
const setNavigationBarTimeout = () => {
    navbarIimeout = setTimeout(() => {
        navbarElementHeader.classList.add('is-hidden');
    }, 3000);
}

/**
 * @description Scroll back to Top
 */
const scrollBackToTop = () => {
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

const showScrollBackToTopButton = (isVisible = true) => {
    if (isVisible) {
        scrollTopBtn.classList.add('is-visible');
    } else {
        scrollTopBtn.classList.remove('is-visible');
    }
}

/**
 * End Main Functions
 * Begin Events
 *
*/
doc.addEventListener('DOMContentLoaded', () => {

    // Build menu
    buildMenu();

    // Scroll to section on link click
    const menuLinks = doc.querySelectorAll('.menu__link');
    menuLinks.forEach(menuLink => {
        menuLink.addEventListener('click', e => {
            let target = e.target;

            const dataNav = target.getAttribute('data-nav');
            handleScrollToSection(dataNav);
        });
    });

    // Set sections as active
    handleSetSectionAsActive(menuLinks);

    // Hide navigation bar when not scrolling
    setNavigationBarTimeout();

    // Set scroll back to top button event
    scrollBackToTop();
});



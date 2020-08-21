/**
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

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
const handleMenuItemClick = e => {
    console.log('Item clicked ', e)
};

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

const buildMenu = () => {
    // build the nav
    sections.forEach((section) => {
        // build individual 'div' element with title from the section tag
        const menuItem = document.createElement('li');
        menuItem.innerText = section.dataset.nav;
        menuItem.classList.add('menu__link');
        menuItem.setAttribute('data-nav', section.id);

        // append the new element as a child
        navbarList.appendChild(menuItem);
    });
}

const handleScrollToSection = (dataNav) => {
    console.log("dataNav", dataNav);
    const offsetTop = doc.querySelector('#' + dataNav).offsetTop;
    console.log('offsetTop', offsetTop);
    window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
    });
}

const handleSetSectionAsActive = () => {
    // Add class 'active' to section when near top of viewport
    let sectionsNode = [];
    for (let i = 0; i < sections.length; i++) {
        sectionsNode.push(sections[i]);
    }

    const [ sectionNode1, 
            sectionNode2, 
            sectionNode3 ] = sectionsNode;
    doc.addEventListener('scroll', e => {
        const scrollTop = doc.documentElement.scrollTop;
        
        if (scrollTop > 0 && scrollTop <= sectionNode1.offsetTop) {
            sectionNode1.classList.add('your-active-class');
            sectionNode2.classList.remove('your-active-class');
            sectionNode3.classList.remove('your-active-class');
        } else if (scrollTop > sectionNode2.offsetTop && scrollTop <= sectionNode3.offsetTop) {
            sectionNode1.classList.remove('your-active-class');
            sectionNode2.classList.add('your-active-class');
            sectionNode3.classList.remove('your-active-class');
        } else if (scrollTop > sectionNode3.offsetTop) {
            sectionNode1.classList.remove('your-active-class');
            sectionNode2.classList.remove('your-active-class');
            sectionNode3.classList.add('your-active-class');
        }
    });
}
    
// Scroll to anchor ID using scrollTO event

/**
 * End Main Functions
 * Begin Events
 * 
*/
// Build menu             
buildMenu();

// Scroll to section on link click
doc.querySelectorAll('.menu__link').forEach(menuLink => {
    menuLink.addEventListener('click', e => {
        const dataNav = e.target.getAttribute('data-nav');
        handleScrollToSection(dataNav);
    });
});

// Set sections as active
handleSetSectionAsActive();



const menuButton = document.querySelector('.menu-button');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-menu a');
const rotatingTitle = document.querySelector('#rotating-title');
const year = document.querySelector('#year');

function closeMenu() {
  mobileMenu.classList.remove('mobile-menu--active');
  mobileMenu.setAttribute('aria-hidden', 'true');
  menuButton.setAttribute('aria-expanded', 'false');
}

menuButton.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('mobile-menu--active');
  mobileMenu.setAttribute('aria-hidden', String(!isOpen));
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

mobileLinks.forEach((link) => link.addEventListener('click', closeMenu));

const roles = ['AI/ML student', 'frontend developer', 'data enthusiast', 'curious builder'];
let roleIndex = 0;
let characterIndex = 0;
let deleting = false;

function typeRole() {
  const role = roles[roleIndex];
  rotatingTitle.textContent = deleting
    ? role.slice(0, characterIndex - 1)
    : role.slice(0, characterIndex + 1);
  characterIndex += deleting ? -1 : 1;

  let delay = deleting ? 45 : 90;
  if (!deleting && characterIndex === role.length) {
    delay = 1800;
    deleting = true;
  } else if (deleting && characterIndex === 0) {
    deleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    delay = 350;
  }
  window.setTimeout(typeRole, delay);
}

window.setTimeout(typeRole, 700);
year.textContent = new Date().getFullYear();
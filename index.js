const menuButton = document.querySelector('.header__main-ham-menu-cont');
const smallMenu = document.querySelector('.header__sm-menu');
const smallMenuLinks = document.querySelectorAll('.header__sm-menu a');
const contactForm = document.querySelector('#contact-form');
const formStatus = document.querySelector('#form-status');

function closeMenu() {
  smallMenu.classList.remove('header__sm-menu--active');
  smallMenu.setAttribute('aria-hidden', 'true');
  menuButton.setAttribute('aria-expanded', 'false');
}

menuButton.addEventListener('click', () => {
  const isOpen = smallMenu.classList.toggle('header__sm-menu--active');
  smallMenu.setAttribute('aria-hidden', String(!isOpen));
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

smallMenuLinks.forEach((link) => link.addEventListener('click', closeMenu));

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(contactForm);
  const subject = encodeURIComponent(`Portfolio enquiry from ${formData.get('name')}`);
  const body = encodeURIComponent(
    `Name: ${formData.get('name')}\nEmail: ${formData.get('email')}\n\n${formData.get('message')}`,
  );
  window.location.href = `mailto:rahulparshant2003@gmail.com?subject=${subject}&body=${body}`;
  formStatus.textContent = 'Your email client is opening with the message ready to send.';
  contactForm.reset();
});

document.querySelector('#year').textContent = new Date().getFullYear();
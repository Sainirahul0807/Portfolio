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

const enquiryForm = document.querySelector('#enquiry');
const enquiryNote = document.querySelector('.enquiry__note');
const talkButtons = document.querySelectorAll('a[href="#enquiry"]');

talkButtons.forEach((link) => {
  link.addEventListener('click', () => {
    window.setTimeout(() => {
      document.querySelector('#enquiry-name')?.focus();
    }, 450);
  });
});

if (enquiryForm) {
  enquiryForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.querySelector('#enquiry-name').value.trim();
    const place = document.querySelector('#enquiry-place').value.trim();
    const phone = document.querySelector('#enquiry-phone').value.trim();
    const message = document.querySelector('#enquiry-message').value.trim();

    if (!name || !place || !phone || !message) {
      if (enquiryNote) enquiryNote.textContent = 'Please fill in every field before submitting.';
      return;
    }

    const subject = encodeURIComponent(`New enquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nPlace: ${place}\nPhone: ${phone}\n\nMessage:\n${message}`
    );

    window.location.href = `mailto:rahulparshant2003@gmail.com?subject=${subject}&body=${body}`;

    if (enquiryNote) {
      enquiryNote.textContent = 'Opening your email app to send this enquiry…';
    }
  });
}

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
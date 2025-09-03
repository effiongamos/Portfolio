// =====================
// DOM Elements
// =====================
const body = document.body;

// Mobile menu
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.getElementById('nav-links');
const navItems = document.querySelectorAll(".nav-links a");

// Theme toggle
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = themeToggle.querySelector('i');
const themeText = document.querySelector('.theme-text');

// Text customization
const textToggle = document.querySelector('.text-toggle');
const textControls = document.getElementById('text-controls');
const fontSizeInput = document.getElementById('font-size');
const lineSpacingInput = document.getElementById('line-spacing');
const fontFamilySelect = document.getElementById('font-family');
const textColorInput = document.getElementById('text-color');
const bgColorInput = document.getElementById('bg-color');
const resetBtn = document.getElementById('reset-settings');

// =====================
// Mobile Menu Toggle
// =====================
menuToggle.addEventListener('click', () => {
  const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!expanded));
  navLinks.classList.toggle('open');
  menuToggle.classList.toggle('active');
});

// Close menu on link click
navItems.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

// =====================
// Theme Toggle
// =====================

themeToggle.addEventListener('click', () => {
  const isDark = document.body.classList.toggle('dark-mode');
  themeToggle.setAttribute('aria-pressed', isDark);

  if (isDark) {
    // Dark mode is active → show Light Mode option
    themeIcon.className = "fa-solid fa-sun";
    themeText.textContent = "Light Mode";
  } else {
    // Light mode is active → show Dark Mode option
    themeIcon.className = "fa-solid fa-moon";
    themeText.textContent = "Dark Mode";
  }
});


// =====================
// Active link highlight
// =====================
const sections = document.querySelectorAll("section");
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(section => {
    if (pageYOffset >= section.offsetTop - 120) current = section.id;
  });

  navItems.forEach(link => {
    link.removeAttribute("aria-current");
    if (link.getAttribute("href") === `#${current}`) link.setAttribute("aria-current", "page");
  });
});

// =====================
// Text Customization Panel
// =====================
textToggle.addEventListener('click', () => {
  const expanded = textToggle.getAttribute('aria-expanded') === 'true';
  textToggle.setAttribute('aria-expanded', String(!expanded));
  textControls.hidden = expanded;
  requestAnimationFrame(() => textControls.classList.toggle('open'));
});

// Close panel when clicking outside
document.addEventListener('click', e => {
  if (!textControls.contains(e.target) && !textToggle.contains(e.target) && textControls.classList.contains('open')) {
    textControls.classList.remove('open');
    textToggle.setAttribute('aria-expanded', 'false');
    setTimeout(() => { textControls.hidden = true; }, 300);
  }
});

// Apply text settings
function applyTextSettings() {
  body.style.fontSize = fontSizeInput.value + "px";
  body.style.lineHeight = lineSpacingInput.value;
  body.style.fontFamily = fontFamilySelect.value;
  body.style.color = textColorInput.value;
  body.style.backgroundColor = bgColorInput.value;
  localStorage.setItem('text-settings', JSON.stringify({
    fontSize: fontSizeInput.value,
    lineSpacing: lineSpacingInput.value,
    fontFamily: fontFamilySelect.value,
    textColor: textColorInput.value,
    bgColor: bgColorInput.value
  }));
}

// Listen to input changes
[fontSizeInput, lineSpacingInput, fontFamilySelect, textColorInput, bgColorInput].forEach(el => {
  el.addEventListener('input', applyTextSettings);
});

// Reset
resetBtn.addEventListener('click', () => {
  fontSizeInput.value = 16;
  lineSpacingInput.value = 1.5;
  fontFamilySelect.value = "system-ui";
  textColorInput.value = "#111827";
  bgColorInput.value = "#FFFFFF";
  applyTextSettings();
  localStorage.removeItem('text-settings');
});

// Load saved settings
window.addEventListener('DOMContentLoaded', () => {
  const saved = JSON.parse(localStorage.getItem('text-settings'));
  if (saved) {
    fontSizeInput.value = saved.fontSize;
    lineSpacingInput.value = saved.lineSpacing;
    fontFamilySelect.value = saved.fontFamily;
    textColorInput.value = saved.textColor;
    bgColorInput.value = saved.bgColor;
    applyTextSettings();
  }
});


//  image slider
  const imageWrapper = document.querySelector('.image-wrapper');
  const box1 = document.querySelector('.box1');
  const box2 = document.querySelector('.box2');

  // Add a parallax-style hover effect
  imageWrapper.addEventListener('mousemove', (e) => {
    let x = (e.offsetX / imageWrapper.offsetWidth - 0.5) * 20;
    let y = (e.offsetY / imageWrapper.offsetHeight - 0.5) * 20;

    box1.style.transform = `translate(${x}px, ${y}px)`;
    box2.style.transform = `translate(${-x}px, ${-y}px)`;
  });

  // Reset on mouse leave
  imageWrapper.addEventListener('mouseleave', () => {
    box1.style.transform = "translate(0,0)";
    box2.style.transform = "translate(0,0)";
  });
  
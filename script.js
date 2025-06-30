// === Theme Toggle ===
const themeToggle = document.getElementById('themeToggle');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'light') {
  document.body.classList.add('light-mode');
} else if (!savedTheme && !prefersDark) {
  document.body.classList.add('light-mode');
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const theme = document.body.classList.contains('light-mode') ? 'light' : 'dark';
    localStorage.setItem('theme', theme);
  });
}

// === Build Path Toggle (Optional Future Use) ===
const buildToggle = document.getElementById('buildToggle');
if (buildToggle) {
  buildToggle.addEventListener('click', () => {
    document.body.classList.toggle('electro-mode');
  });
}

// === Scroll-To-Top Button ===
const backToTop = document.getElementById('backToTop');

if (backToTop) {
  window.addEventListener('scroll', () => {
    backToTop.style.display = window.scrollY > 400 ? 'block' : 'none';
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// === Dynamic Tooltips ===
document.querySelectorAll('[data-tooltip]').forEach(el => {
  el.addEventListener('mouseenter', () => {
    const tipBox = document.createElement('div');
    tipBox.className = 'tooltip-box';
    tipBox.innerText = el.dataset.tooltip;
    document.body.appendChild(tipBox);

    const rect = el.getBoundingClientRect();
    tipBox.style.position = 'absolute';
    tipBox.style.left = `${rect.left + window.scrollX}px`;
    tipBox.style.top = `${rect.bottom + window.scrollY + 6}px`;
    tipBox.style.background = '#222';
    tipBox.style.color = '#fff';
    tipBox.style.padding = '0.5rem 0.75rem';
    tipBox.style.borderRadius = '4px';
    tipBox.style.fontSize = '0.85rem';
    tipBox.style.pointerEvents = 'none';
    tipBox.style.zIndex = '1000';
    tipBox.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.3)';
    el._tooltip = tipBox;
  });

  el.addEventListener('mouseleave', () => {
    if (el._tooltip) {
      el._tooltip.remove();
      el._tooltip = null;
    }
  });
});

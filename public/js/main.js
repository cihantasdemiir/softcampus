// SoftCampus — main.js

// Mobile nav toggle
function toggleMobileNav() {
  const nav = document.getElementById('mobileNav');
  if (nav) {
    nav.classList.toggle('open');
  }
}

// Highlight active nav link based on current page
document.addEventListener('DOMContentLoaded', () => {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.sc-nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === page) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
});

// Smooth card click animations
document.querySelectorAll('.sc-card-clickable').forEach(card => {
  card.addEventListener('mousedown', () => {
    card.style.transform = 'translateY(0)';
  });
  card.addEventListener('mouseup', () => {
    card.style.transform = '';
  });
});

function toggleDropdown() {
  const dropdown = document.getElementById('userDropdown');
  if (dropdown) {
    dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
  }
}

// Dışarı tıklayınca kapat
document.addEventListener('click', function(e) {
  const dropdown = document.getElementById('userDropdown');
  if (dropdown && !e.target.closest('#userDropdown') && !e.target.closest('button[onclick="toggleDropdown()"]')) {
    dropdown.style.display = 'none';
  }
});

function openModal() {
  document.getElementById('maintenanceModal').style.display = 'flex';
}

function closeModal() {
  document.getElementById('maintenanceModal').style.display = 'none';
}

function openGptModal() {
  document.getElementById('gptModal').style.display = 'flex';
}

function closeGptModal() {
  document.getElementById('gptModal').style.display = 'none';
}

window.addEventListener('click', function(e) {
  if (e.target.id === 'maintenanceModal') closeModal();
  if (e.target.id === 'gptModal') closeGptModal();
});

// Smooth scroll behavior for nav links
window.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
});

// Toggle mobile menu
function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  menu.classList.toggle('show');
} 

// main.js — lightbox + booking form behavior + small helpers

// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// LIGHTBOX
(function () {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');

  function openLightbox(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    lightbox.style.display = 'flex';
    lightbox.setAttribute('aria-hidden', 'false');
    // trap focus on close button for accessibility
    lightboxClose.focus();
  }

  function closeLightbox() {
    lightbox.style.display = 'none';
    lightboxImg.src = '';
    lightbox.setAttribute('aria-hidden', 'true');
  }

  document.querySelectorAll('.gallery-grid img').forEach((img) => {
    img.addEventListener('click', () => {
      const full = img.dataset.full || img.src;
      openLightbox(full, img.alt);
    });
    img.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const full = img.dataset.full || img.src;
        openLightbox(full, img.alt);
      }
    });
    // make images keyboard-focusable
    img.tabIndex = 0;
  });

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });
})();

// BOOKING FORM -> WhatsApp
(function () {
  const form = document.getElementById('bookingForm');
  if (!form) return;

  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    const data = new FormData(form);
    const name = data.get('name') || '';
    const email = data.get('email') || '';
    const date = data.get('date') || '';
    const time = data.get('time') || '';
    const message = data.get('message') || '';

    const textLines = [
      'Booking Inquiry — CJINKAT',
      name ? `Name: ${name}` : '',
      email ? `Email: ${email}` : '',
      date ? `Date: ${date}` : '',
      time ? `Time: ${time}` : '',
      message ? `Message: ${message}` : ''
    ].filter(Boolean);

    const text = textLines.join('\n');
    const url = `https://wa.me/94701352870?text=${encodeURIComponent(text)}`;

    // Open WhatsApp in a new tab/window
    window.open(url, '_blank', 'noopener,noreferrer');
  });
})();
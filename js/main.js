/* =============================================
   SurpriseBox — main.js
   ============================================= */

// ---- CONFIG — apna WhatsApp number yahan daalo ----
const WHATSAPP_NUMBER = '919876543210'; // Example: 919876543210 (country code + number)

// ---- Pricing data ----
const PRICES = {
  b: ['₹99',  '₹199', '₹349'],
  a: ['₹149', '₹249', '₹399'],
  w: ['₹99',  '₹199', '₹349'],
};

// ---- State ----
let selOcc     = 'Birthday';
let selOccType = 'b';
let selPlan    = 'Premium';
let selSub     = 'Farewell';

/* =============================================
   PARTICLES
   ============================================= */
function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  const colors = ['#FF4D6D','#9B59B6','#1ABC9C','#FFBE0B','#FF8FA3'];
  for (let i = 0; i < 20; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = 4 + Math.random() * 8;
    p.style.cssText = `
      width:${size}px; height:${size}px;
      left:${Math.random() * 100}vw;
      background:${colors[Math.floor(Math.random() * colors.length)]};
      animation-delay:${Math.random() * 10}s;
      animation-duration:${7 + Math.random() * 6}s;
    `;
    container.appendChild(p);
  }
}

/* =============================================
   NAVBAR — scroll shrink + hamburger
   ============================================= */
function initNavbar() {
  const nav  = document.getElementById('navbar');
  const btn  = document.getElementById('hamburger');
  const menu = document.getElementById('mobileMenu');

  window.addEventListener('scroll', () => {
    nav.style.padding = window.scrollY > 40 ? '0.6rem 2.5rem' : '1rem 2.5rem';
  });

  btn.addEventListener('click', () => menu.classList.toggle('open'));
}

function closeMobileMenu() {
  document.getElementById('mobileMenu').classList.remove('open');
}

/* =============================================
   OCCASION TABS
   ============================================= */
function switchTab(id, btn) {
  document.querySelectorAll('.occasion-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => {
    b.classList.remove('active', 'birthday', 'anniversary', 'wishes');
  });
  document.getElementById('tab-' + id).classList.add('active');
  btn.classList.add('active', id);
}

/* =============================================
   PRICING TABS
   ============================================= */
function switchPricing(id, btn) {
  document.querySelectorAll('.pricing-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.ptab').forEach(b => b.classList.remove('active'));
  document.getElementById('pp-' + id).classList.add('active');
  btn.classList.add('active');
}

/* =============================================
   ORDER FORM — Occasion picker
   ============================================= */
function pickOcc(el, type) {
  document.querySelectorAll('.occ-opt').forEach(o => {
    o.className = 'occ-opt';
  });
  el.classList.add('sel-' + type);
  selOcc     = el.dataset.occ;
  selOccType = type;

  // Update plan prices based on occasion
  const prices = PRICES[type];
  document.getElementById('p1').textContent = prices[0];
  document.getElementById('p2').textContent = prices[1];
  document.getElementById('p3').textContent = prices[2];

  // Show sub-occasion chips only for Wishes
  const subWrap = document.getElementById('subOccWrap');
  subWrap.classList.toggle('show', type === 'w');
}

/* =============================================
   ORDER FORM — Sub-occasion picker
   ============================================= */
function pickSub(el) {
  document.querySelectorAll('.sub-chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  selSub = el.textContent.trim();
}

/* =============================================
   ORDER FORM — Plan picker
   ============================================= */
function pickPlan(el, plan) {
  document.querySelectorAll('.pm-opt').forEach(o => o.classList.remove('sel'));
  el.classList.add('sel');
  selPlan = plan;
}

/* =============================================
   PRICING SECTION — Auto-select plan on click
   ============================================= */
function autoSelectPlan(plan, occType) {
  // Map occType to occasion name
  const occMap = { b: 'Birthday', a: 'Anniversary', w: 'Wishes' };

  // Update state
  selPlan    = plan;
  selOccType = occType;
  selOcc     = occMap[occType];

  // Update form UI
  const occ = document.querySelector(`.occ-opt[data-occ="${selOcc}"]`);
  if (occ) pickOcc(occ, occType);

  document.querySelectorAll('.pm-opt').forEach(o => {
    o.classList.toggle('sel', o.dataset.plan === plan);
  });
}

/* =============================================
   FORM SUBMIT — WhatsApp redirect
   ============================================= */
function submitOrder() {
  const sName = document.getElementById('sName').value.trim();
  const sPhone= document.getElementById('sPhone').value.trim();
  const rName = document.getElementById('rName').value.trim();
  const style = document.getElementById('styleSelect').value;

  // Basic validation
  if (!sName || !sPhone || !rName || !style) {
    alert('Yeh fields zaroori hain:\n• Tumhara naam\n• WhatsApp number\n• Unka naam\n• Website style');
    return;
  }
  if (sPhone.length < 10) {
    alert('Sahi WhatsApp number daalo (10 digits).');
    return;
  }

  const occLabel  = selOcc === 'Wishes' ? `Wishes — ${selSub}` : selOcc;
  const priceList = PRICES[selOccType];
  const planIdx   = ['Basic','Premium','Luxury'].indexOf(selPlan);
  const priceStr  = priceList[planIdx] || '₹199';

  const occDate = document.getElementById('occDate').value;
  const photos  = document.getElementById('photos').value.trim();
  const msgs    = document.getElementById('msgs').value.trim();
  const song    = document.getElementById('song').value.trim();

  const message = [
    `🎁 *New SurpriseBox Order!*`,
    ``,
    `*Occasion:* ${occLabel}`,
    `*Plan:* ${selPlan} (${priceStr})`,
    `*From:* ${sName}`,
    `*WhatsApp:* ${sPhone}`,
    `*For:* ${rName}`,
    `*Date:* ${occDate || 'Not specified'}`,
    `*Style:* ${style}`,
    `*Photos:* ${photos || 'Will share separately'}`,
    `*Song:* ${song || 'Not specified'}`,
    `*Messages/Memory:* ${msgs || 'Not specified'}`,
  ].join('\n');

  const waURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(waURL, '_blank');

  // Show success state
  document.getElementById('formWrap').style.display = 'none';
  document.getElementById('successBox').classList.add('show');
}

/* =============================================
   SCROLL REVEAL — simple intersection observer
   ============================================= */
function initScrollReveal() {
  const targets = document.querySelectorAll('.occ-card, .p-card, .steps-list li');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.animation = 'fadeUp 0.5s ease both';
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  targets.forEach(t => observer.observe(t));
}

/* =============================================
   INIT
   ============================================= */
document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initNavbar();
  initScrollReveal();
});

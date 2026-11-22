// Apply page: works standalone and when embedded inside another page/iframe.
const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

const frame = document.getElementById('kobo-form');
const warning = document.getElementById('frame-warning');
if (frame && warning) {
  let loaded = false;
  frame.addEventListener('load', () => {
    loaded = true;
    warning.hidden = true;
  });
  // قد يبطئ KoboToolbox التحميل أو يحجب التضمين؛ نعرض بديلاً واضحاً بعد 15 ثانية.
  setTimeout(() => {
    if (!loaded) warning.hidden = false;
  }, 15000);
}

// عند تضمين الصفحة داخل متصفح المنصة نُخفي الواجهة التعريفية ونُبقي الاستمارة.
try {
  if (window.self !== window.top) {
    document.body.classList.add('embedded');
    document.querySelector('.apply-hero')?.remove();
    document.querySelector('.apply-form-header')?.remove();
    document.querySelector('.apply-note')?.remove();
    document.querySelector('.site-header')?.remove();
    document.querySelector('footer')?.remove();
  }
} catch (_) {}

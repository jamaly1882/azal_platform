const toggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-nav');
if (toggle && navigation) {
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'إغلاق القائمة' : 'فتح القائمة');
    navigation.classList.toggle('open', open);
  });
  navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    navigation.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'فتح القائمة');
  }));
}

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

const form = document.querySelector('#contact-form');
const status = document.querySelector('#form-status');
form?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const message = `مرحباً فريق أزال سوفت،\nالاسم: ${data.get('name')}\n${data.get('organization') ? `جهة العمل: ${data.get('organization')}\n` : ''}تفاصيل المشروع: ${data.get('message')}`;
  try {
    if (!navigator.clipboard || !window.isSecureContext) throw new Error('Clipboard unavailable');
    await navigator.clipboard.writeText(message);
    status.textContent = 'تم نسخ الرسالة. يمكنك الآن مشاركتها مع فريق أزال سوفت.';
    status.className = 'form-note success';
  } catch (_) {
    status.textContent = 'تعذر النسخ تلقائياً. يرجى نسخ التفاصيل من الحقول أعلاه ومشاركتها مع فريق أزال سوفت.';
    status.className = 'form-note error';
  }
});

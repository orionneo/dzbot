const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];

$('#year').textContent = new Date().getFullYear();

const menu = $('.menu-btn');
const nav = $('.nav');
menu?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(open));
});
$$('.nav a').forEach(a => a.addEventListener('click',()=>nav.classList.remove('open')));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
},{threshold:.12});
$$('.reveal').forEach(el => observer.observe(el));

$$('.tab').forEach(btn => btn.addEventListener('click', () => {
  $$('.tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const filter = btn.dataset.filter;
  $$('.catalog-card').forEach(card => {
    card.classList.toggle('hidden', filter !== 'all' && card.dataset.category !== filter);
  });
}));

$('#lead-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const fd = new FormData(e.currentTarget);
  const cfg = window.DZBOT_CONFIG || {};
  const msg = `Olá! Quero solicitar um orçamento do DZbot.\n\nNome: ${fd.get('nome')}\nGuild/Servidor: ${fd.get('guild')}\nContato: ${fd.get('contato')}\nInteresse: ${fd.get('interesse') || 'Quero conhecer as opções.'}`;
  const note = $('#form-note');

  if (cfg.whatsapp) {
    window.open(`https://wa.me/${cfg.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
    note.textContent = 'Abrindo WhatsApp com sua solicitação…';
    return;
  }
  if (cfg.email) {
    window.location.href = `mailto:${cfg.email}?subject=${encodeURIComponent('Orçamento DZbot')}&body=${encodeURIComponent(msg)}`;
    note.textContent = 'Abrindo seu aplicativo de e-mail…';
    return;
  }
  try {
    await navigator.clipboard.writeText(msg);
    note.textContent = 'Mensagem de orçamento copiada. Configure WhatsApp ou e-mail em config.js para envio direto.';
  } catch {
    note.textContent = 'Configure WhatsApp ou e-mail em config.js para ativar o envio direto.';
  }
});

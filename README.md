# DZbot — site comercial

Site estático pronto para subir em qualquer hospedagem (Hostinger, Cloudflare Pages, Netlify, GitHub Pages, Vercel ou servidor próprio).

## Publicação rápida

Envie **todos os arquivos desta pasta** para a raiz pública do domínio (`public_html`, `www`, etc.). Não há build nem banco de dados.

## Ativar o botão de orçamento

Abra `config.js` e preencha pelo menos um canal:

```js
window.DZBOT_CONFIG = {
  whatsapp: "5511999999999", // DDI + DDD + número, apenas dígitos
  email: "contato@seudominio.com.br",
  brandName: "DZbot"
};
```

Se WhatsApp estiver preenchido, o formulário abre uma conversa já com a solicitação montada. Se não houver WhatsApp e houver e-mail, abre o cliente de e-mail.

## Arquivos
- `index.html` — conteúdo e estrutura
- `styles.css` — identidade visual responsiva
- `script.js` — menu, filtros, animações e formulário
- `config.js` — contato comercial
- `assets/` — logo/favicon

## Ajustes recomendados antes de publicar
1. Inserir WhatsApp/e-mail comercial em `config.js`.
2. Se desejar, apontar um domínio próprio.
3. Revisar textos jurídicos/privacidade caso futuramente o site passe a armazenar leads em backend.

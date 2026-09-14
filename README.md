# DZbot V16 — Academy / Complete Product Guide

Site estático do DZbot, sem framework e sem etapa de build. Pronto para GitHub Pages.

## O que mudou nesta versão

- nova seção **Guia do bot / DZbot Academy**;
- catálogo pesquisável de **63 comandos** (58 do manual V26.6.3 + funções atuais documentadas: `/playerinfo`, `/pvp`, `/membros`, `/imbuement`, `/dzbot`);
- filtros por categoria e busca por intenção (boss, enemy, hunt, skill, respawn etc.);
- cada comando explica **para que serve, quando usar, exemplo e contexto**;
- botão de copiar exemplo;
- quick start para usuários novos;
- 12 automações 24/7 explicadas;
- 10 playbooks de uso real combinando funções do bot;
- FAQ atualizado;
- layout mobile preservado e ampliado;
- nenhuma dependência externa obrigatória.

## Estrutura

- `index.html` — página e seção Academy;
- `styles.css` — design atual + estilos Academy;
- `script.js` — interações, catálogo, busca, filtros e conteúdo;
- `config.js` — WhatsApp/e-mail;
- `assets/` — imagens e logos locais;
- `.nojekyll` — publicação estática pelo GitHub Pages.

## Publicação

Consulte `DEPLOY_GITHUB.md` ou execute `deploy-github.ps1` dentro da pasta do repositório.

## Observação de produto

O autocomplete do Discord continua sendo a referência de campos/subcomandos do release ativo. O site explica a capacidade e os fluxos de uso sem transformar sinais probabilísticos (ex.: Boss Intelligence) em promessas.


## V17 Academy Complete
- 57 comandos user-facing documentados (admin/restricted omitidos)
- /dashboard e /bazar incluídos
- Bazaar Watch, Castle Result Intelligence e Event Engine explicados
- 15 automações + 12 playbooks

# Publicar o DZbot no GitHub Pages

Repositório detectado no pacote original:

`https://github.com/orionneo/dzbot.git`

## Forma mais simples

1. Extraia o pacote pronto.
2. Copie **o conteúdo** da pasta para `D:\dzbot-site` substituindo os arquivos existentes.
3. **Não apague a pasta oculta `.git` que já existe em `D:\dzbot-site`.**
4. Abra PowerShell e rode:

```powershell
cd D:\dzbot-site
Set-ExecutionPolicy -Scope Process Bypass -Force
.\deploy-github.ps1
```

O script faz `git add`, cria o commit, sincroniza com `origin/main` via rebase e faz `push`.

## Comandos manuais equivalentes

```powershell
cd D:\dzbot-site

git status
git remote -v

git add -A
git commit -m "DZbot V16 - Academy complete user guide"

git pull --rebase origin main
git push origin main
```

Se `git commit` responder `nothing to commit`, continue com `git pull --rebase origin main` e `git push origin main`.

## Conferir GitHub Pages

No GitHub: **Settings → Pages** e confirme:

- Source: `Deploy from a branch`
- Branch: `main`
- Folder: `/(root)`

Depois do push, aguarde o deploy do GitHub Pages concluir. Use `Ctrl+F5` no navegador se o cache mostrar a versão anterior.

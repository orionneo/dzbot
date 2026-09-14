param(
  [string]$Message = "DZbot V16 - Academy complete user guide"
)

$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

Write-Host "========================================================" -ForegroundColor Cyan
Write-Host " DZBOT SITE - GITHUB SYNC" -ForegroundColor Cyan
Write-Host "========================================================" -ForegroundColor Cyan

if (-not (Test-Path ".git")) {
  throw "Esta pasta nao contem .git. Execute dentro de D:\dzbot-site preservando a pasta .git existente."
}

$inside = git rev-parse --is-inside-work-tree 2>$null
if ($LASTEXITCODE -ne 0 -or $inside.Trim() -ne "true") {
  throw "GIT_REPOSITORY_NOT_FOUND"
}

$remote = git remote get-url origin
if ($LASTEXITCODE -ne 0) { throw "ORIGIN_NOT_CONFIGURED" }
Write-Host "Origin: $remote" -ForegroundColor DarkGray

Write-Host "`n[1/5] STATUS" -ForegroundColor Yellow
git status --short

Write-Host "`n[2/5] STAGE" -ForegroundColor Yellow
git add -A

Write-Host "`n[3/5] COMMIT" -ForegroundColor Yellow
git diff --cached --quiet
if ($LASTEXITCODE -eq 0) {
  Write-Host "Nenhuma alteracao nova para commit." -ForegroundColor DarkYellow
} else {
  git commit -m $Message
  if ($LASTEXITCODE -ne 0) { throw "GIT_COMMIT_FAILED" }
}

Write-Host "`n[4/5] SYNC ORIGIN/MAIN" -ForegroundColor Yellow
git pull --rebase origin main
if ($LASTEXITCODE -ne 0) {
  throw "GIT_PULL_REBASE_FAILED - resolva o conflito antes do push; nenhum force-push foi executado."
}

Write-Host "`n[5/5] PUSH" -ForegroundColor Yellow
git push origin main
if ($LASTEXITCODE -ne 0) { throw "GIT_PUSH_FAILED" }

Write-Host "`n========================================================" -ForegroundColor Green
Write-Host " DZBOT SITE PUBLICADO NO GITHUB" -ForegroundColor Green
Write-Host "========================================================" -ForegroundColor Green

git status --short

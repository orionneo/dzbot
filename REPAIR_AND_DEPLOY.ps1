#requires -Version 5.1
[CmdletBinding()]
param()

$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest

$Root = 'D:\dzbot-site'
$ExpectedScript = '62e96de5089806b58d2b09a51999512ecdf7b9222430deeda70d8bc590902658'
$ExpectedCss    = 'f460f374494080a47ec29d2f9c50fa1099ebab393a14a9b58fb1017f941fa7c6'

Write-Host ''
Write-Host '========================================================' -ForegroundColor Cyan
Write-Host ' DZBOT SITE - SAFE REPAIR + GITHUB DEPLOY' -ForegroundColor Cyan
Write-Host '========================================================' -ForegroundColor Cyan

if (-not (Test-Path $Root)) { throw "SITE_NOT_FOUND $Root" }
Set-Location $Root
if (-not (Test-Path '.git')) { throw 'GIT_FOLDER_MISSING - nao continue' }

Write-Host '[1/6] Core visual integrity' -ForegroundColor Yellow
$scriptSha = (Get-FileHash '.\script.js' -Algorithm SHA256).Hash.ToLowerInvariant()
$cssSha    = (Get-FileHash '.\styles.css' -Algorithm SHA256).Hash.ToLowerInvariant()
Write-Host "script.js=$scriptSha"
Write-Host "styles.css=$cssSha"
if ($scriptSha -ne $ExpectedScript) { throw 'SCRIPT_JS_NOT_V15_ORIGINAL' }
if ($cssSha -ne $ExpectedCss) { throw 'STYLES_CSS_NOT_V15_ORIGINAL' }
Write-Host 'ORIGINAL_V15_CORE=PASS' -ForegroundColor Green

Write-Host '[2/6] Syntax checks' -ForegroundColor Yellow
$node = Get-Command node -ErrorAction SilentlyContinue
if ($node) {
  & node --check '.\script.js'
  if ($LASTEXITCODE -ne 0) { throw 'SCRIPT_JS_SYNTAX_FAILED' }
  & node --check '.\guide.js'
  if ($LASTEXITCODE -ne 0) { throw 'GUIDE_JS_SYNTAX_FAILED' }
  Write-Host 'JAVASCRIPT_SYNTAX=PASS' -ForegroundColor Green
} else {
  Write-Host 'Node nao encontrado; pulando node --check.' -ForegroundColor Yellow
}

Write-Host '[3/6] Required files' -ForegroundColor Yellow
foreach ($f in @('index.html','styles.css','script.js','guide.css','guide.js','config.js','.nojekyll')) {
  if (-not (Test-Path $f)) { throw "MISSING_FILE $f" }
}
Write-Host 'REQUIRED_FILES=PASS' -ForegroundColor Green

Write-Host '[4/6] Git diff safety' -ForegroundColor Yellow
& git diff --check
if ($LASTEXITCODE -ne 0) { throw 'GIT_DIFF_CHECK_FAILED' }
& git status --short

Write-Host '[5/6] Commit' -ForegroundColor Yellow
& git add -A
$pending = & git status --porcelain
if ($pending) {
  & git commit -m 'DZbot site repair - restore V15 visual and add isolated player guide'
  if ($LASTEXITCODE -ne 0) { throw 'GIT_COMMIT_FAILED' }
} else {
  Write-Host 'Nada novo para commit.'
}

Write-Host '[6/6] Sync + push' -ForegroundColor Yellow
& git pull --rebase origin main
if ($LASTEXITCODE -ne 0) { throw 'GIT_PULL_REBASE_FAILED' }
& git push origin main
if ($LASTEXITCODE -ne 0) { throw 'GIT_PUSH_FAILED' }

Write-Host ''
Write-Host '========================================================' -ForegroundColor Green
Write-Host ' DEPLOY CONCLUIDO' -ForegroundColor Green
Write-Host ' Core V15 preservado + Guia isolado em guide.css/guide.js' -ForegroundColor Green
Write-Host '========================================================' -ForegroundColor Green

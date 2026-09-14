param(
  [string]$Site = "D:\dzbot-site"
)

$ErrorActionPreference = "Stop"
Set-Location $Site

Write-Host "========================================================" -ForegroundColor Cyan
Write-Host " DZBOT SITE V20 - PRODUCTION AUDITED GUIDE DEPLOY" -ForegroundColor Cyan
Write-Host "========================================================" -ForegroundColor Cyan

$required = @(
  "index.html",
  "styles.css",
  "script.js",
  "guide.css",
  "guide.js",
  "config.js",
  ".nojekyll",
  "V20_PRODUCTION_AUDIT_PROOF.txt"
)

Write-Host "`n[1/7] Validando arquivos..." -ForegroundColor Yellow
foreach($f in $required){
  if(-not (Test-Path $f)){ throw "MISSING_FILE: $f" }
}
Write-Host "FILES=PASS" -ForegroundColor Green

Write-Host "`n[2/7] Validando JavaScript..." -ForegroundColor Yellow
node --check .\script.js
if($LASTEXITCODE -ne 0){ throw "SCRIPT_JS_SYNTAX_FAILED" }

node --check .\guide.js
if($LASTEXITCODE -ne 0){ throw "GUIDE_JS_SYNTAX_FAILED" }
Write-Host "JS_SYNTAX=PASS" -ForegroundColor Green

Write-Host "`n[3/7] Garantindo que comandos falsos sumiram..." -ForegroundColor Yellow
$all = (Get-Content .\index.html -Raw) + "`n" + (Get-Content .\guide.js -Raw)

foreach($bad in @("/dashboard","/playerinfo")){
  if($all.Contains($bad)){ throw "INVALID_COMMAND_STILL_PRESENT: $bad" }
}

if($all.Contains("/music ")){ throw "INVALID_MUSIC_COMMAND_STILL_PRESENT" }

if(-not $all.Contains("/bazar")){ throw "BAZAR_MISSING" }
if(-not $all.Contains("/imbuement")){ throw "IMBUEMENT_MISSING" }
if(-not $all.Contains("/respawn")){ throw "RESPAWN_MISSING" }
if(-not $all.Contains("/dz")){ throw "DZ_MISSING" }

Write-Host "COMMAND_GUARD=PASS" -ForegroundColor Green

Write-Host "`n[4/7] Git diff check..." -ForegroundColor Yellow
git diff --check
if($LASTEXITCODE -ne 0){ throw "GIT_DIFF_CHECK_FAILED" }

Write-Host "`n[5/7] Mudancas que serao publicadas:" -ForegroundColor Yellow
git status --short

Write-Host "`n[6/7] Commit + sincronizacao..." -ForegroundColor Yellow
git add -A

$changes = git status --porcelain
if($changes){
  git commit -m "DZbot V20 - production-audited complete player guide"
  if($LASTEXITCODE -ne 0){ throw "GIT_COMMIT_FAILED" }
} else {
  Write-Host "Nada novo para commit." -ForegroundColor DarkYellow
}

git pull --rebase origin main
if($LASTEXITCODE -ne 0){ throw "GIT_PULL_REBASE_FAILED" }

git push origin main
if($LASTEXITCODE -ne 0){ throw "GIT_PUSH_FAILED" }

Write-Host "`n[7/7] Estado final:" -ForegroundColor Yellow
git status

Write-Host ""
Write-Host "========================================================" -ForegroundColor Green
Write-Host " DZBOT SITE V20 PUBLICADO" -ForegroundColor Green
Write-Host "========================================================" -ForegroundColor Green
Write-Host "Abra:"
Write-Host "https://orionneo.github.io/dzbot/?v=20"

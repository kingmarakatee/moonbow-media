#!/usr/bin/env pwsh

# Moonbow Media - Git Push Script
# Uso: .\push.ps1

Write-Host "`n🌙 Moonbow Media - Atualizar site`n" -ForegroundColor Cyan

# Verificar se estamos na pasta correta
if (-not (Test-Path ".git")) {
    Write-Host "❌ Erro: Não estamos num repositório git!" -ForegroundColor Red
    exit 1
}

# Adicionar ficheiros
Write-Host "📦 Adicionando ficheiros..." -ForegroundColor Yellow
git add .

# Verificar se há mudanças
$status = git status --porcelain
if (-not $status) {
    Write-Host "✅ Nenhuma alteração para fazer commit!" -ForegroundColor Green
    exit 0
}

# Pedir mensagem de commit
Write-Host ""
$commitMsg = Read-Host "📝 Mensagem do commit"

if ([string]::IsNullOrWhiteSpace($commitMsg)) {
    $commitMsg = "Atualizar site"
}

# Fazer commit
Write-Host ""
Write-Host "💾 Fazendo commit..." -ForegroundColor Yellow
git commit -m $commitMsg

# Fazer push
Write-Host ""
Write-Host "🚀 Enviando para GitHub..." -ForegroundColor Yellow
git push

Write-Host ""
Write-Host "✅ Pronto! O site atualiza em 30 segundos a 1 minuto." -ForegroundColor Green
Write-Host "🌐 https://kingmarakatee.github.io/moonbow-media/`n" -ForegroundColor Cyan

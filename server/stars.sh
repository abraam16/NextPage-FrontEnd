Write-Host "Iniciando JSON Server en puerto 3000..." -ForegroundColor Green
json-server --watch server/db.json --port 3000 --routes server/routes.json

# Verificacion rapida del Laboratorio 15
# Uso: con el backend corriendo (python manage.py runserver), ejecutar:
#   powershell -ExecutionPolicy Bypass -File .\verificar.ps1

$base = 'http://127.0.0.1:8000'

function Show-Result($nombre, $ok, $detalle) {
    $estado = if ($ok) { 'OK' } else { 'FALLO' }
    $color = if ($ok) { 'Green' } else { 'Red' }
    Write-Host "[$estado] $nombre -> $detalle" -ForegroundColor $color
}

Write-Host "Verificando $base" -ForegroundColor Cyan

# 1. Obtener token
try {
    $t = Invoke-RestMethod -Method Post -Uri "$base/api/token/" `
        -ContentType 'application/json' `
        -Body '{"username":"labuser","password":"LabPass123!"}'
    Show-Result 'POST /api/token/' ($null -ne $t.access) 'devuelve access y refresh'
} catch {
    Show-Result 'POST /api/token/' $false "HTTP $($_.Exception.Response.StatusCode.value__) - revisa credenciales y que el backend este activo"
    exit 1
}

# 2. Endpoint publico sin token
try {
    $pub = Invoke-RestMethod -Uri "$base/api/publico"
    Show-Result 'GET /api/publico' ($pub.mensaje -eq 'acceso publico') "mensaje=$($pub.mensaje)"
} catch {
    Show-Result 'GET /api/publico' $false $_.Exception.Message
}

# 3. Endpoint privado SIN token debe dar 401
$sinToken = $false
try {
    Invoke-RestMethod -Uri "$base/api/privado" | Out-Null
} catch {
    $sinToken = ($_.Exception.Response.StatusCode.value__ -eq 401)
}
Show-Result 'GET /api/privado sin token' $sinToken 'debe devolver 401 Unauthorized'

# 4. Endpoint privado CON token debe dar 200
try {
    $priv = Invoke-RestMethod -Uri "$base/api/privado" `
        -Headers @{ Authorization = "Bearer $($t.access)" }
    Show-Result 'GET /api/privado con token' ($priv.mensaje -eq 'acceso privado') "mensaje=$($priv.mensaje), usuario=$($priv.usuario)"
} catch {
    Show-Result 'GET /api/privado con token' $false $_.Exception.Message
}

# 5. Refresh token
try {
    $ref = Invoke-RestMethod -Method Post -Uri "$base/api/token/refresh/" `
        -ContentType 'application/json' `
        -Body (@{ refresh = $t.refresh } | ConvertTo-Json)
    Show-Result 'POST /api/token/refresh/' ($null -ne $ref.access) 'genera un nuevo access'
} catch {
    Show-Result 'POST /api/token/refresh/' $false $_.Exception.Message
}

# 6. CORS
try {
    $c = Invoke-WebRequest -Uri "$base/api/publico" `
        -Headers @{ Origin = 'http://localhost:5173' } -UseBasicParsing
    $origen = $c.Headers['Access-Control-Allow-Origin']
    Show-Result 'CORS' ($origen -eq '*') "Access-Control-Allow-Origin=$origen"
} catch {
    Show-Result 'CORS' $false $_.Exception.Message
}

Write-Host "`nSi todo sale en verde, el backend esta correcto. Prueba ahora React en http://localhost:5173" -ForegroundColor Cyan

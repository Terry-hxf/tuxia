param(
  [int]$Port = 1313,
  [string]$Bind = "0.0.0.0"
)

$ErrorActionPreference = "Stop"

$route = Get-NetRoute -DestinationPrefix "0.0.0.0/0" |
  Where-Object { $_.NextHop -ne "0.0.0.0" } |
  Sort-Object RouteMetric, InterfaceMetric |
  Select-Object -First 1

if (-not $route) {
  throw "No default IPv4 route found."
}

$ip = Get-NetIPAddress -AddressFamily IPv4 -InterfaceIndex $route.InterfaceIndex |
  Where-Object { $_.IPAddress -notlike "127.*" -and $_.IPAddress -notlike "169.254.*" } |
  Select-Object -First 1 -ExpandProperty IPAddress

if (-not $ip) {
  throw "No usable IPv4 address found for interface $($route.InterfaceAlias)."
}

$baseUrl = "http://$ip`:$Port/"
Write-Host "Starting Hugo on $baseUrl"
Write-Host "Local URL: http://127.0.0.1:$Port/"
Write-Host "LAN URL:   $baseUrl"

hugo server --bind $Bind --port $Port --baseURL $baseUrl --disableFastRender

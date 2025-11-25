# link-fonts.ps1
# Copy local font files into Android assets/fonts and list them for verification.
# Run this from the project root in PowerShell:
#   .\scripts\link-fonts.ps1

$source = Join-Path $PSScriptRoot "..\src\assets\fonts"
$dest = Join-Path $PSScriptRoot "..\android\app\src\main\assets\fonts"

Write-Output "Source fonts folder: $source"
Write-Output "Destination fonts folder: $dest"

if (-Not (Test-Path $source)) {
    Write-Error "Source fonts folder not found. Make sure fonts are in 'src/assets/fonts'"
    exit 1
}

# Create destination if missing
if (-Not (Test-Path $dest)) {
    Write-Output "Creating destination folder..."
    New-Item -ItemType Directory -Force -Path $dest | Out-Null
}

# Copy files
Write-Output "Copying font files..."
Get-ChildItem -Path $source -Filter *.ttf -File -ErrorAction SilentlyContinue | ForEach-Object {
    $srcFile = $_.FullName
    $dstFile = Join-Path $dest $_.Name
    Copy-Item -Path $srcFile -Destination $dstFile -Force
    Write-Output "Copied: $($_.Name)"
}
Get-ChildItem -Path $source -Filter *.otf -File -ErrorAction SilentlyContinue | ForEach-Object {
    $srcFile = $_.FullName
    $dstFile = Join-Path $dest $_.Name
    Copy-Item -Path $srcFile -Destination $dstFile -Force
    Write-Output "Copied: $($_.Name)"
}

Write-Output "\nFiles in destination folder:"
Get-ChildItem -Path $dest -File | Select-Object Name | ForEach-Object { Write-Output " - $($_.Name)" }

Write-Output "\nNext steps:"
Write-Output "1) (Optional) Run: npx react-native link"
Write-Output "2) Clear Metro cache and rebuild:\n   npx react-native start --reset-cache\n   npx react-native run-android\n(For iOS: open Xcode and ensure fonts are added to the app target, or run pod install and rebuild.)"

Write-Output "\nIf you still don't see the fonts applied in the app, try different fontFamily names (e.g. filename without extension, internal PostScript name). I can add a diagnostic screen to try more names if needed."
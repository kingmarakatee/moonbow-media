$content = Get-Content -Path "c:\moonbow_site\index (1).html" -Raw -Encoding UTF8
$headerPattern = '(?s)<!-- Header & Navigation -->(.*?)</header>'
$footerPattern = '(?s)<!-- Footer -->(.*?)</footer>'
$headerBlock = [regex]::Match($content, $headerPattern).Value
$footerBlock = [regex]::Match($content, $footerPattern).Value

Write-Host "Header length: $($headerBlock.Length)"
Write-Host "Footer length: $($footerBlock.Length)"

Get-ChildItem -Path "c:\moonbow_site" -Filter "*.html" | Where-Object { $_.Name -ne "index (1).html" -and $_.Name -ne "index.html" } | ForEach-Object {
    Write-Host "Processing: $($_.Name)"
    $fileContent = Get-Content $_.FullName -Raw -Encoding UTF8
    
    # Replace header
    $fileContent = [regex]::Replace($fileContent, $headerPattern, $headerBlock)
    
    # Replace footer
    if ($fileContent -match '(?s)<!-- Footer.*?</footer>') {
        $fileContent = [regex]::Replace($fileContent, '(?s)<!-- Footer -->(.*?)</footer>', $footerBlock)
        $fileContent = [regex]::Replace($fileContent, '(?s)<!-- Site Footer -->(.*?)</footer>', $footerBlock)
    } else {
        # just replace standard footer tag if comment differs
        $fileContent = [regex]::Replace($fileContent, '(?s)<footer>(.*?)</footer>', $footerBlock)
    }
    
    Set-Content -Path $_.FullName -Value $fileContent -Encoding UTF8
}

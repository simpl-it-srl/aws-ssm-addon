$param1=$args[0]
$param1=$param1.replace("ext+wsl2:",'')
$param1=$param1.replace("'",'')
$param1=$param1.replace('%20',':')
$params=$param1.split(':');
$method=$params[0]
$profile=$params[1]
$instance=$params[2]
if ($method -like 'connect') { 
    start-process -FilePath "$env:WINDIR\system32\wsl.exe" -ArgumentList "--exec zsh  -c `"aws ssm start-session  --profile $profile --target $instance `""
} else{ 
    $internal_port=$params[3]
    $external_port=$params[4]
    start-process -FilePath "$env:WINDIR\system32\wsl.exe" -ArgumentList "--exec zsh  -c `"aws ssm start-session  --document-name AWS-StartPortForwardingSession --parameters `"localPortNumber=$internal_port,portNumber=$external_port`" --profile $profile --target $instance`""
}


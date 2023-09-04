$param1=$args[0]
$param1=$param1.replace("ext+wsl2:",'')
$param1=$param1.replace("'",'')
$param1=$param1.replace('%20',':')
$params=$param1.split(':');
$method=$params[0]
$profile_arg=$params[1]
$wsl_profile=$params[-1]

$instance=$params[2]
if ($method -like 'connect') { 
    start-process -FilePath "wt" -ArgumentList "-w 0 nt -p $wsl_profile wsl -e zsh -c `"aws ssm start-session  --profile $profile_arg --target $instance \; /bin/zsh -i `""
} else{ 
    $internal_port=$params[3]
    $external_port=$params[4]
    start-process -FilePath "wt" -ArgumentList "-w 0 nt -p $wsl_profile wsl -e zsh -c `"aws ssm start-session  --document-name AWS-StartPortForwardingSession --parameters `"localPortNumber=$internal_port,portNumber=$external_port`" --profile $profile_arg --target $instance`""
}


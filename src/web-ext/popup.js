$(document).ready(function() {
    $(body).attr('data-bs-theme',(window.matchMedia && !!window.matchMedia('(prefers-color-scheme: dark)').matches)?"dark":"light");
  
    // Load recent port combinations
    const recentPorts = JSON.parse(localStorage.getItem('recentPorts') || '[]');
    recentPorts.forEach(function(ports) {
      $('#recentPorts').append(`<option value="${ports.internal},${ports.external}">${ports.internal} -> ${ports.external}</option>`);
    });
  
    // Populate fields when a recent port combination is selected
    $('#recentPorts').change(function() {
      const [internal, external] = $(this).val().split(',');
      $('#internalPort').val(internal);
      $('#externalPort').val(external);
    });
  
    // Save ports and perform forwarding
    $('#savePorts').click(function() {
      const internalPort = $('#internalPort').val();
      const externalPort = $('#externalPort').val();
  
      // Save to recent port combinations
      recentPorts.push({ internal: internalPort, external: externalPort });
      localStorage.setItem('recentPorts', JSON.stringify(recentPorts));
  
                            
      const instance_id = getInstanceId();
      const aws_profile_var = getProfileVar();
      const win_terminal_profile = localStorage.getItem('profile') || "defaultProfile";
      
      const url = `ext+wsl2:'forward ${aws_profile_var} ${instance_id} ${internalPort} ${externalPort} ${win_terminal_profile}'`;
      window.location.href = url;
  
      $('#portModal').modal('hide');
    });
  });
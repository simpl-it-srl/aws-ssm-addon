$(document).ready(function() {
   $(body).attr('data-bs-theme',(window.matchMedia && !!window.matchMedia('(prefers-color-scheme: dark)').matches)?"dark":"light");

    // Load saved profile
    const savedProfile = localStorage.getItem('profile');
    if (savedProfile) {
      $('#profile').val(savedProfile);
    }
  
    // Save profile
    $('#save').click(function() {
      const profile = $('#profile').val();
      localStorage.setItem('profile', profile);
    });
  });
  
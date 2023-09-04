$(document).ready(function() {
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
  
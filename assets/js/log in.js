let submitBtn = document.getElementById('loginSubmit');
let seekerSign = document.getElementById('seekerSignUp');
let employerSign = document.getElementById('employerSignUp');

seekerSign.addEventListener('click', () => {
  window.open('signUpSeeker.html', '_self');
});

employerSign.addEventListener('click', () => {
  window.open('signUpEmployer.html', '_self');
});

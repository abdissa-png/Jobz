let submitSeekerSignUp = document.getElementById('submitSeekerSignUp');
let loginBtn = document.getElementById('login');
let employerSignUp = document.getElementById('employerSignUp');

loginBtn.addEventListener('click', () => {
  window.open('Login.html', '_self');
});

employerSignUp.addEventListener('click', () => {
  window.open('signUpEmployer.html', '_self');
});

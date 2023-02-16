let employerSignUpSubmit = document.getElementById('submitEmployerSignUp');
let loginBtn = document.getElementById('login');
let seekerSignUp = document.getElementById('seekerSignUp');

loginBtn.addEventListener('click', () => {
  window.open('Login.html', '_self');
});

seekerSignUp.addEventListener('click', () => {
  window.open('signUpSeeker.html', '_self');
});

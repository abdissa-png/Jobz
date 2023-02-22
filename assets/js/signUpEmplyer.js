let employerSignUpSubmit = document.getElementById('submitEmployerSignUp');
let loginBtn = document.getElementById('login');
let seekerSignUp = document.getElementById('seekerSignUp');

seekerSignUp.addEventListener('click', () => {
  window.open('signUpSeeker.html', '_self');
});

let name = document.getElementById('companyName');
let email = document.getElementById('email');
let locationo = document.getElementById('Location');
let webAddress = document.getElementById('web');
let description = document.getElementById('desc');
let password = document.getElementById('pwd');

employerSignUpSubmit.addEventListener('click', function () {
  signup(
    name.value,
    email.value,
    password.value,
    locationo.value,
    webAddress.value,
    description.value,
  );

  localStorage.setItem('email', email.value);
  window.open('Login.html', '_self');
});
async function signup(
  name,
  email,
  password,
  locationo,
  webAddress,
  description,
) {
  result = await fetch('http://localhost:4000/auth/signup/employer', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: name,
      email: email,
      password: password,
      location: locationo,
      webAddress: webAddress,
      description: description,
    }),
  });
}

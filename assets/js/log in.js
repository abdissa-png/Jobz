let submitBtn = document.getElementById('loginSubmit');
let seekerSign = document.getElementById('seekerSignUp');
let employerSign = document.getElementById('employerSignUp');

seekerSign.addEventListener('click', () => {
  window.open('signUpSeeker.html', '_self');
});

employerSign.addEventListener('click', () => {
  window.open('signUpEmployer.html', '_self');
});

submitBtn.addEventListener('click', async () => {
  let email = document.getElementById('email').value;
  let password = document.getElementById('pwd').value;

  if (email == 'admin@gmail.com' && password == 'admin123') {
    localStorage.setItem('email', 'admin@gmail.com');
    window.open('http://127.0.0.1:5501/assets/admin/admin.html');
  }

  try {
    result = await fetch('http://localhost:4000/auth/login', {
      method: 'Post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    result = await result.json();
    console.log(result);
    if (result.role == 'job-seeker') {
      localStorage.setItem('email', email);
      window.open(
        'http://127.0.0.1:5501/assets/jobSeeker/mainProfile.html',
        '_self',
      );
    } else if (result.role == 'employer') {
      localStorage.setItem('email', email);
      window.open(
        'http://127.0.0.1:5501/assets/Company/mainProfile.html',
        '_self',
      );
    }
  } catch {
    let errorDiv = document.getElementById('errMsg');
    errorDiv.innerHTML = `<p class= "text-warning small">Invalid email or password</p>`;
  }
});

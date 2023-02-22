const name = document.getElementById('name');
const email = document.getElementById('email');
const submitbtn = document.getElementById('submitSeekerSignUp');
const password = document.getElementById('pwd');
const skills = document.getElementById('Skills');
const qualifications = document.getElementById('qualifications');
const institution = document.getElementById('institution')
const fieldOfStudy = document.getElementById('field')
const cgpa = document.getElementById('cgpa')
const admissionYear = document.getElementById('admissionYear')
const graduationYear = document.getElementById('graduationYear')
const degree = document.getElementById('degree')
const title = document.getElementById('job')
const company = document.getElementById('company')
const start = document.getElementById('start')
const end = document.getElementById('end')
const reference = document.getElementById('reference')

function btncorrect() {
  var ele = document.getElementsByName('Sex');
  for (i = 0; i < ele.length; i++) {
    if (ele[i].checked) {
      const Sex = ele[i].value;
      return Sex;
    }
  }
}

submitbtn.addEventListener('click', async () => {
  gender = btncorrect();
  const namestr = name.value;
  const emailstr = email.value;
  const skillsStr = skills.value;
  const qualificationsStr = qualifications.value;
  const passwordStr = password.value;
  try {
    if (namestr == '' || email == '')
      throw 'please Fill the required information';
    else {
      result = await fetch('http://localhost:4000/auth/signup/jobSeeker', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: namestr,
          email: emailstr,
          sex: gender,
          skills: skillsStr,
          qualifications: qualificationsStr,
          password: passwordStr,
        }),
      });
      result = await result.json();

      another = fetch('http://localhost:4000/job-seeker/createProfile', {
        method: 'Post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: namestr,
          email: emailstr,
          sex: gender,
          skills: skillsStr,
          qualifications: qualificationsStr,
          institution: institution.value,
          fieldOfStudy: fieldOfStudy.value,
          gpa: cgpa.value,
          admissionYear: admissionYear.value,
          graduationYear: graduationYear.value,
          degreeLevel: degree.value,
          jobTitle: title.value,
          companyName: company.value,
          startDate: start.value,
          endDate: end.value,
          reference: reference.value
        })
      })
      another = another[0].json()
      localStorage.setItem('email', emailstr);
      window.open('jobSeeker/mainProfile.html', '_self')
    }
  } catch (err) {
    console.log(err);
  }
})


let loginBtn = document.getElementById('login');
let employerSignUp = document.getElementById('employerSignUp');

loginBtn.addEventListener('click', () => {
  window.open('Login.html', '_self');
});

employerSignUp.addEventListener('click', () => {
  window.open('signUpEmployer.html', '_self');
});

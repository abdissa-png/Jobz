const name = document.getElementById('name');
    const email = document.getElementById('email');
    const submitbtn = document.getElementById('submitSeekerSignUp');
    const password = document.getElementById('pwd')
    const skills = document.getElementById('Skills');
    const qualifications = document.getElementById('qualifications');


function btncorrect() {
  var ele = document.getElementsByName('Sex');
        for(i = 0; i < ele.length; i++) {
            if(ele[i].checked){
            const Sex = ele[i].value;
            return Sex;

            }
        }

}






async function displayRadioValue() {
        
        gender = btncorrect();
        console.log(gender)
        const namestr = name.value;
        console.log(namestr)
        const emailstr = email.value;
        console.log(emailstr);
        const skillsStr = skills.value;
        console.log(skillsStr)
        const qualificationsStr = qualifications.value;
        console.log(qualificationsStr)
        const passwordStr = password.value;
        console.log(passwordStr)


        try {
          if(namestr == "" || email == ""  ) throw "please Fill the required information";

          else {
            result = await fetch("http://localhost:4000/auth/signup/jobSeeker", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name:namestr,
                email: emailstr,
                sex: gender,
                skills: skillsStr,
                qualifications: qualificationsStr,
                password: passwordStr
              }),
            });
            result = await result.json();
            console.log(result.access_token);
            localStorage.setItem("email",emailstr);
            let emailfromlocal = localStorage.getItem("email");
            console.log(`email: ${emailfromlocal}`);
            
          
            
            window.open("jobSeeker/mainProfile.html", '_self');
            
          }

        }
        catch (err) {
          console.log(err);
        }
      }

submitbtn.addEventListener('click', displayRadioValue)
// console.log(`my name is ${result.name}`);


let loginBtn = document.getElementById('login');
let employerSignUp = document.getElementById('employerSignUp');

loginBtn.addEventListener('click', () => {
  window.open('Login.html', '_self');
});

employerSignUp.addEventListener('click', () => {
  window.open('signUpEmployer.html', '_self');
});

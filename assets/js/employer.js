localStorage.setItem('userEmail', 'newCorp@gmail.com');
const userEmail = localStorage.getItem('userEmail');
async function getUser() {
  result = await fetch('http://localhost:4000/employer/getUser', {
    method: 'Post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: userEmail,
    }),
  });
  let user = await result.json();
  let username = document.getElementById('mainUsername');
  username.innerText = user.name;

  let secondUsername = document.getElementById('username');
  secondUsername.innerText = user.name;

  let postJobBtn = document.getElementById('postJobBtn');
  let postJobContainer = document.getElementById('postJobContainer');
  let jobPostSubmit = document.getElementById('jobPostSubmit');

  //Get all available jobs
  async function getJobs() {
    result = await fetch('http://localhost:4000/employer/getAllJobs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        company: user.name,
      }),
    });
    result = await result.json();
    let jobsSection = document.getElementById('jobsSection');
    let i = 0;
    result.forEach(async (job) => {
      let constant = i;
      jobsSection.innerHTML += `
    <div class = "row">
      <div class= "col-md-4"><h3>${job.title}</h3></div>
      <div class= "col-md-4">
        Location: <span class = "text-light">${job.location}</span><br/>
        Salary: <span class = "text-light">${job.salary}</span><br/>
        Benefits: <span class = "text-light">${job.benefits}</span><br/>
        Number of Slots Available: <span class = "text-light">${job.numOfSlots}</span><br/r>
        Description: <span class = "text-light">${job.description}</span><br/>
        Deadline: <span class = "text-light">${job.deadline}</span>
      </div>
      <div class= "col-md-4">
        <button value = "${constant}" class="btn btn-warning text-white seeAppicants">
          See apllicants
        </button>
      </div>
    <div class="row bg-white" style="display: none;" id = "div${constant}"></div>
    <div class = "row bg-dark text-white" style = "display: none;" id = "detail${constant}"></div>
    </div>`;
      i += 1;
      appliedJobSeeker = await fetch(
        'http://localhost:4000/employer/viewDetails',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: job.title,
            company: user.name,
          }),
        },
      );
      appliedJobSeeker = await appliedJobSeeker.json();
      appliedJobSeeker.forEach(async (seeker) => {
        let applicantsDiv = document.getElementById(`div${constant}`);
        applicantsDiv.innerHTML = `
          <div class= "col-md-4">
            Name: <span class = "text-light fs-5">${seeker.name}</span>
          </div>
          <div class = "col-md-4">
          <button class = "btn btn-warning seeDetails" value= "${constant}>See Details</button>"
          </div>
          <div class = "col-md-4">
          <button class = "btn btn-warning accept" value= "p${constant}>Accept</button>"
          <button class = "btn btn-warning reject" value= "p${constant}>Reject</button>"
          </div>
            `;
        let seekerEmail = seeker.email;
        jobSeekerDetails = await fetch(
          'http://localhost:4000/job-seeker/getEducation',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: seekerEmail,
            }),
          },
        );
        try {
          jobSeekerDetails = await jobSeekerDetails.json();
        } catch {
          console.log('error');
        }

        jobSeekerExperience = await fetch(
          'http://localhost:4000/job-seeker/getExperience',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email,
            }),
          },
        );

        try {
          jobSeekerExperience = await jobSeekerExperience.json();
        } catch {
          console.log('error');
        }

        let deatailsDiv = document.getElementById(`detail${constant}`);
        deatailsDiv.innerHTML = `
          <div class = "col-md-12 m-auto">
            Name: <span class = "text-light">${seeker.name}</span><br/>
            Sex: <span class = "text-light">${seeker.sex}</span><br/>
          </div>
          <div class = "row">
            <div class= "col-md-6 border rounded m-3 p-3 shadow">
              Skills: <span class = "text-light">${seeker.skills}</span><br/>
              Qualification: <span class = "text-light">${seeker.qualifications}</span><br/>
              Institution of Study: <span class = "text-light">${jobSeekerDetails.institution}</span><br/>
              Field Of Study: <span class = "text-light">${jobSeekerDetails.fieldOfStudy}</span><br/>
              CGPA: <span class = "text-light"><span class = "text-light">${jobSeekerDetails.gpa}</span><br/>
              Graduation Year: <span class = "text-light">${jobSeekerDetails.graduationYear}</span><br/>
              Degree Level: <span class = "text-light">${jobSeekerDetails.degreeLevel}</span>
            </div>
        
            <div class = "col-md-6 border rounded m-3 p-3 shadow">
              Job Title: <span class = "text-light">${jobSeekerExperience.jobTitle}</span><br/>
              Company Name: <span class = "text-light">${jobSeekerExperience.companyName}</span><br/>
              Start Date: <span class = "text-light">${jobSeekerExperience.startDate}</span><br/>
              End Date: <span class = "text-light">${jobSeekerExperience.endDate}</span><br/>
              Reference: <span class = "text-light">${jobSeekerExperience.reference}</span>
            </div>
          </div>`;
      });
      let seeApplicants = document.getElementsByClassName('seeAppicants');
      let btn;
      for (let i = 0; i < seeApplicants.length; i++) {
        btn = seeApplicants[i];
        btn.addEventListener('click', () => {
          myValue = btn.value;
          let appDiv = document.getElementById(`div${myValue}`);
          if (appDiv.style.display == 'none') {
            appDiv.style.display = 'block';
          } else {
            appDiv.style.display = 'none';
          }
        });

        let seeAppDetailsBtn = document.getElementsByClassName('seeDetails');
        for (let i = 0; i < seeAppDetailsBtn.length; i++) {
          btn = seeAppDetailsBtn[i];
          btn.addEventListener('click', () => {
            let btnValue = btn.value;
            let appDetailsDiv = document.getElementById(`detail${btnValue}`);
            if (appDetailsDiv.style.display == 'none') {
              appDetailsDiv.style.display = 'block';
            } else {
              appDetailsDiv.style.display = 'none';
            }
          });
        }
      }
    });
  }

  getJobs();

  // Post job
  postJobBtn.addEventListener('click', () => {
    if (postJobContainer.style.display == 'none') {
      postJobContainer.style.display = 'block';
    } else {
      postJobContainer.style.display = 'none';
    }
  });

  jobPostSubmit.addEventListener('click', async () => {
    let title = document.getElementById('title').value;
    let jobType = document.getElementById('Jobtype').value;
    let jobCatagory = jobType;
    let description = document.getElementById('description').value;
    let location = document.getElementById('location').value;
    let salary = document.getElementById('salary').value;
    let benefits = document.getElementById('benefits').value;
    let slots = document.getElementById('slots').value;
    let startDate = new Date();
    let endDate = document.getElementById('deadline').value;

    let result;
    result = await fetch('http://localhost:4000/employer/postJobs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title,
        jobType: jobType,
        location: location,
        company: user.name,
        salary: salary,
        benefits: benefits,
        numOfSlots: slots,
        description: description,
        dayPosted: startDate,
        deadline: endDate,
        jobCategory: jobCatagory,
      }),
    });
    result = await result.json();
    let success = document.getElementById('jobSuccess');
    success.innerText += 'Job created successfully';
  });

  let submitEdit = document.getElementById('submitEmployerEdit');
  let name1 = document.getElementById('companyName').value;
  let email = document.getElementById('email').value;
  let location1 = document.getElementById('Location').value;
  let web = document.getElementById('web').value;
  let description = document.getElementById('desc').value;

  submitEdit.addEventListener('click', async () => {
    let updated = await fetch('http://localhost:4000/employer/editProfile', {
      method: 'Patch',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        oldEmail: user.email,
        name: name1,
        email,
        location: location1,
        webAddress: web,
        description,
      },
    });
  });
}
getUser();

//show applicants
function showApplicants() {
  let applicants = document.getElementsByClassName('applicantsHolder');
  for (let i = 0; i < applicants.length; i++) {
    if (applicants[i].style.display == 'none') {
      applicants[i].style.display = 'contents';
    } else {
      applicants[i].style.display = 'none';
    }
  }
}

// show applicantsDetail
function showApplicantDetail(idName) {
  let component = document.getElementById(idName);
  if (component.style.display == 'none') {
    component.style.display = 'block';
  } else {
    component.style.display = 'none';
  }
}

// accept application
async function changeApplicant(eleID, elementMail, jobID) {
  let Btn = document.getElementById(eleID);
  let Jobstatus;
  if (Btn.value == '1') {
    Jobstatus = 'Accepted';
  } else {
    Jobstatus = 'Rejected';
  }
  Btn.addEventListener('click', async () => {
    result = await fetch('http://localhost:4000/employer/updateStatus', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jobSeekerEmail: elementMail,
        jobId: jobID,
        jobStatus: Jobstatus,
      }),
    });
    result = await result.json();
    Btn.innerText = result[0].status;
  });
}

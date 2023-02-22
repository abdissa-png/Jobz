localStorage.setItem('email', 'abdulmelikambaw619@gmail.com');
const userEmail = localStorage.getItem('email');
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
  return user;
}

//Get all available jobs
async function getJobs() {
  let user = await getUser();
  let username = document.getElementById('mainUsername');
  username.innerText = user.name;

  let secondUsername = document.getElementById('username');
  secondUsername.innerText = user.name;
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
  for (let i = 0; i < result.length; i++) {
    job = result[i];
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
        <button value = "${i}" class="btn btn-warning text-white seeAppicants">
          See Applicants
        </button>
      </div>
    <div value = "0" style = "display: none;" class="bg-dark row" id = "div${i}"></div>
    </div>`;
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
    j = 0;
    for (let j = 0; j < appliedJobSeeker.length; j++) {
      let seeker = appliedJobSeeker[j];
      let applicantsDiv = document.getElementById(`div${i}`);
      applicantsDiv.innerHTML += `
          <div class= "col-md-4">
            Name: <span class = "text-light fs-5">${seeker.name}</span>
          </div>
          <div class= "col-md-4">
          <button class = "btn btn-warning m-2 seeDetails" value= "${i}${j}">See Details</button>
          </div>
          <div class= "col-md-2">
          <button class = "btn btn-warning m-2 accept d-block" value= "p${i}">Accept</button>
          </div>
          <div class= "col-md-2">
          <button class = "btn btn-warning m-2 reject d-block" value= "p${i}">Reject</button>
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
        jobSeekerDetails = {};
      }

      jobSeekerExperience = await fetch(
        'http://localhost:4000/job-seeker/getExperience',
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
        jobSeekerExperience = await jobSeekerExperience.json();
      } catch {
        console.log('error experience');
      }
      jobsSection.innerHTML += `<div class= "row bg-primary" style = "display: none;" id = "divs${i}${j}"></div>`;
      let deatailsDiv = document.getElementById(`divs${i}${j}`);
      deatailsDiv.innerHTML += `
          <div class = "col-md-12 m-auto">
            Name: <span class = "text-light">${seeker.name}</span><br/>
            Sex: <span class = "text-light">${seeker.sex}</span><br/>
          </div>
          <div class = "row">
            <div class= "col-md-6 border rounded m-3 p-3 shadow">
              <h5>Education Details</h5>
              Skills: <span class = "text-light">${seeker.skills}</span><br/>
              Qualification: <span class = "text-light">${seeker.qualifications}</span><br/>
              Institution of Study: <span class = "text-light">${jobSeekerDetails.institution}</span><br/>
              Field Of Study: <span class = "text-light">${jobSeekerDetails.fieldOfStudy}</span><br/>
              CGPA: <span class = "text-light"><span class = "text-light">${jobSeekerDetails.gpa}</span><br/>
              Graduation Year: <span class = "text-light">${jobSeekerDetails.graduationYear}</span><br/>
              Degree Level: <span class = "text-light">${jobSeekerDetails.degreeLevel}</span>
            </div>
        
            <div class = "col-md-6 border rounded m-3 p-3 shadow">
            <h5>Experience Details</h5>
              Job Title: <span class = "text-light">${jobSeekerExperience.jobTitle}</span><br/>
              Company Name: <span class = "text-light">${jobSeekerExperience.companyName}</span><br/>
              Start Date: <span class = "text-light">${jobSeekerExperience.startDate}</span><br/>
              End Date: <span class = "text-light">${jobSeekerExperience.endDate}</span><br/>
              Reference: <span class = "text-light">${jobSeekerExperience.reference}</span>
            </div>
          </div>
        `;
    }
  }
}

async function seeAppicantsFun() {
  let seeApplicants = document.getElementsByClassName('seeAppicants');
  let btn;
  for (let i = 0; i < seeApplicants.length; i++) {
    btn = seeApplicants[i];
    btn.addEventListener('click', () => {
      let divId = `div${i}`;
      let appDiv = document.getElementById(divId);
      if (appDiv.style.display == 'none') {
        appDiv.style.display = 'block';
      } else {
        appDiv.style.display = 'none';
      }
    });
  }
}

async function seeAppicantsDetails() {
  let seeAppDetailsBtn = document.getElementsByClassName('seeDetails');
  let btn;
  for (let i = 0; i < seeAppDetailsBtn.length; i++) {
    btn = seeAppDetailsBtn[i];
    btn.addEventListener('click', () => {
      let divId = `divs${btn.value}`;
      let appDetailsDiv = document.getElementById(divId);
      if (appDetailsDiv.style.display == 'none') {
        appDetailsDiv.style.display = 'block';
      } else {
        appDetailsDiv.style.display = 'none';
      }
    });
  }
}
// Post job
function postJobs() {
  let postJobBtn = document.getElementById('postJobBtn');
  let postJobContainer = document.getElementById('postJobContainer');
  postJobBtn.addEventListener('click', () => {
    if (postJobContainer.style.display == 'none') {
      postJobContainer.style.display = 'block';
    } else {
      postJobContainer.style.display = 'none';
    }
  });
}

async function submitJobPost() {
  let jobPostSubmit = document.getElementById('jobPostSubmit');
  let user = await getUser();
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
}
// accept application
async function changeApplicant() {
  let Btn = document.getElementsByClassName('accept');
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

async function run() {
  let logout = document.getElementById('logout');
  logout.addEventListener('click', () => {
    localStorage.clear();
    window.open('../Login.html', '_self');
  });
  await getJobs();
  await seeAppicantsFun();
  await seeAppicantsDetails();
  postJobs();
  await submitJobPost();
}

run();

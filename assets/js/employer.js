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
      company: 'Abdulmelik',
    }),
  });
  result = await result.json();
  let jobsSection = document.getElementById('jobsSection');
  result.forEach(async (job) => {
    jobsSection.innerHTML += `
    <div class= "col-md-4"><h3>${job.title}</h3></div>
    <div class= "col-md-4">
      Location: <span class = "text-light">${job.location}</span></br>
      Salary: <span class = "text-light">${job.salary}</span></br>
      Benefits: <span class = "text-light">${job.benefits}</span></br>
      Number of Slots Available: <span class = "text-light">${job.numOfSlots}</span></br>
      Description: <span class = "text-light">${job.description}</span></br>
      Deadline: <span class = "text-light">${job.deadline}</span>
    </div>
    <div class= "col-md-4">
      <button class="btn btn-warning text-white" onclick="showApplicants()">
        See apllicants
      </button>
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
          company: 'Abdulmelik',
        }),
      },
    );
    appliedJobSeeker = await appliedJobSeeker.json();
    appliedJobSeeker.forEach(async (element) => {
      email = element.email
      jobSeekerDetails = await fetch("http://localhost:4000/job-seeker/getEducation", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify ({
          email
        }),
      });
      try{
        jobSeekerDetails = await jobSeekerDetails.json()
      }
      catch {
        console.log("error")
      }

      jobSeekerExperience = await fetch("http://localhost:4000/job-seeker/getExperience", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify ({
          email
        }),
      });

      try {
        jobSeekerExperience = await jobSeekerExperience.json()
      }
      catch {
        console.log("error")
      }
      jobsSection.innerHTML += `
      <div class = "applicantsHolder" style = "display: none;">
      <div class= "col-md-4">
        Name: <span class = "text-light fs-5">${element.name}</span>
      </div>

    <div class= "col-md-4">
      <button id = "${element.name.split(" ").join("")}" onclick= "showApplicantDetail('show${element.name.split(" ").join("")}')" class = "btn btn-warning">See Details</button>
    </div>
    <div class= "col-md-4">
      <button value = "1" id = "${element.email.split(" ").join("")}" onclick = "changeApplicant('${element.email.split(" ").join("")}', '${element.email}', '${job._id}')" class = "btn btn-warning">Accept</button>
      <button value = "2" id = "r${element.email.split(" ").join("")}" onclick = "changeApplicant('${element.email.split(" ").join("")}', '${element.email}', '${job.id}')" class = "btn btn-warning">Reject</button>
    </div>
    
    <div id= "show${element.name.split(" ").join("")}" class = "container row" style = "display: none;">
    <div class = "col-md-12 m-auto">
      Name: <span class = "text-light">${element.name}</span></br>
      Sex: <span class = "text-light">${element.sex}</span></br>
    </div>
    <div class = "row">
    <div class= "col-md-6 border rounded p-3 shadow">
      Skills: <span class = "text-light">${element.skills}</span></br>
      Qualification: <span class = "text-light">${element.qualifications}</span></br>
      Institution of Study: <span class = "text-light">${jobSeekerDetails.institution}</span></br>
      Field Of Study: <span class = "text-light">${jobSeekerDetails.fieldOfStudy}</span></br>
      CGPA: <span class = "text-light"><span class = "text-light">${jobSeekerDetails.gpa}</span></br>
      Graduation Year: <span class = "text-light">${jobSeekerDetails.graduationYear}</span></br>
      Degree Level: <span class = "text-light">${jobSeekerDetails.degreeLevel}</span>
    </div>
      
    <div class = "col-md-6 border rounded p-3 shadow">
      Job Title: <span class = "text-light">${jobSeekerExperience.jobTitle}</span></br>
      Company Name: <span class = "text-light">${jobSeekerExperience.companyName}</span></br>
      Start Date: <span class = "text-light">${jobSeekerExperience.startDate}</span></br>
      End Date: <span class = "text-light">${jobSeekerExperience.endDate}</span></br>
      Reference: <span class = "text-light">${jobSeekerExperience.reference}</span>
    </div>
    </div>`;
    });
  });
}

getJobs();

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
function showApplicantDetail(idName){
  let component = document.getElementById(idName)
  if (component.style.display == 'none'){
    component.style.display = 'block'
  }
  else {
    component.style.display = 'none'
  }
}

// accept application
async function changeApplicant(eleID, elementMail, jobID){
  let Btn = document.getElementById(eleID)
  let Jobstatus;
  if (Btn.value == "1"){
    Jobstatus = "Accepted"
  }
  else{
    Jobstatus = "Rejected"
  }
  Btn.addEventListener("click",async () => {
    result = await fetch('http://localhost:4000/employer/updateStatus', {
      method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify ({
          jobSeekerEmail: elementMail,
          jobId: jobID,
          jobStatus: Jobstatus
        }),
    })
    result = await result.json()
    Btn.innerText = result[0].status
  })

}


// Post job
postJobBtn.addEventListener('click', () => {
  postJobContainer.style.display = 'flex';
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
      company: 'Abdulmelik',
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
  console.log(result);
});

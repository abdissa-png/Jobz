let btn1 = document.getElementById('1');
let btn2 = document.getElementById('2');
let btn3 = document.getElementById('3');

let tab1 = document.getElementById('tab1');
let tab2 = document.getElementById('tab2');
let tab3 = document.getElementById('tab3');

btn1.addEventListener('click', function () {
  tab1.style.display = 'block';
  tab2.style.display = 'none';
  tab3.style.display = 'none';
});
btn2.addEventListener('click', function () {
  tab2.style.display = 'block';
  tab3.style.display = 'none';
  tab1.style.display = 'none';
});
btn3.addEventListener('click', function () {
  tab3.style.display = 'block';
  tab2.style.display = 'none';
  tab1.style.display = 'none';
});

async function getUser(email) {
  result = await fetch('http://localhost:4000/job-seeker/getUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
    }),
  });
  result = await result.json();
  result = await result.name;
  // console.log(result)
  return result;
}
async function getEmails() {
  result = await fetch('http://localhost:4000/job-seeker/getComplaints', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  result = await result.json();
  let size = result.length;
  let gh = await result.email;
  return gh;
}
async function getComplaints() {
  result = await fetch('http://localhost:4000/job-seeker/getComplaints', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  result = await result.json();
  htmla = '';
  thetable = document.getElementById('thetable');
  let size = result.length;
  for (let i = 0; i < size; i++) {
    let que = result[i].email;
    let name = await getUser(que);
    let email = await getEmails();
    htmla += `
        <tr>
        <td>${name}</td>
        <td>
          ${result[i].email}
        </td>
        <td>
          <button class="btn btn-warning text-dark" onclick="toggler(\'complain${i}\')">See details</button>
        </td>
        </tr>
        <td id="complain${i}" class="d-none bg-warning" colspan="3">${result[i].complaint}</td>
      `;
  }
  thetable.innerHTML = htmla;
}

getComplaints();
function toggler(ele) {
  console.log(ele);
  aa = document.getElementById(ele);
  aa.classList.toggle('d-none');
}

async function getUserf(email) {
  result = await fetch('http://localhost:4000/job-seeker/getUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
    }),
  });
  result = await result.json();
  result = await result;
  // console.log(result)
  return result;
}

let searchbtn = document.getElementById('searchbtn');
searchbtn.addEventListener('click', async function () {
  let sval = document.getElementById('searchinput').value;
  result = await getUserf(sval);
  // console.log(result)
  document.getElementById('thetabledel');

  htmly = `
    <tr>
        <td>${result.name}</td>
        <td>
          ${result.email}
        </td>
        <td>
          <button class="btn btn-warning text-dark" onclick="deleteUser(\'${result.email}\')">Delete</button>
        </td>
        </tr>
        <td id="complain" class="d-none bg-warning" colspan="3">deleted</td>
    `;
  if (result.name) {
    thetabledel.style.display = 'contents';
    thetabledel.innerHTML = htmly;
  } else {
    thetabledel.innerHTML = `
        <tr class="bg-warning" colspan="3" ><td colspan='3'>User Does Not Exist</td></tr>      
        `;
  }
});

async function deleteUser(email) {
  result = await fetch('http://localhost:4000/job-seeker/deleteUser', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: email,
    }),
  });
  thetabledel.style.display = 'none';
}

let uni = document.getElementById('adduni');
let uemail = document.getElementById('uemail');
let upwd = document.getElementById('upwd');
let uCpwd = document.getElementById('uCpwd');
uni.addEventListener('click', async function () {
  result = await fetch('http://localhost:4000/university/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: uemail.value,
      password: upwd.value,
    }),
  });
});

let logout = document.getElementById('logout');
logout.addEventListener('click', () => {
  localStorage.clear();
  window.open('../Login.html', '_self');
});

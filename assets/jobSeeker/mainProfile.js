let searchInput = document.getElementById("searchInput")
let searchbtn = document.getElementById("searchbtn")
let suggestdiv = document.getElementById("suggestdiv")
let applieddiv = document.getElementById("applieddiv")

async function listSuggested() {
    let url = new URL('http://127.0.0.1:4000/job-seeker/getJobs');
    let result = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Connection: 'keep-alive',
        },
    });
    result = await result.json()
    console.log(result)
}
listSuggested()
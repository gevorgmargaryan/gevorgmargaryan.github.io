function findJobSectionByParent(el) {
    let job = el;
    do {
        job = job.parentElement
    } while (job.tagName != 'SECTION');return job;
}
function hidePaymentUnverified() {
    let stupids = document.getElementsByClassName('payment-status badge badge-unverified');

    for (let stupid of stupids) {
        let job = findJobSectionByParent(stupid);

        job.hidden = true;
    }
}

function getJobUrl(job) {
    return job.querySelector('.job-title a').href;
}
function getJob(job) {
    let req = new Request(getJobUrl(job),{
        redirect: 'follow'
    });

    fetch(req).then(res=>{
        return res.text();
    }
    ).then(html=>{
        let blockingText = 'You do not meet this qualification';

        if (html.includes(blockingText)) {
            job.hidden = true;
        }
    }
    )
}

function filterUnsuported() {
    hidePaymentUnverified();

    if (!window.filteredJobs) {
        window.filteredJobs = [];
    }
    let jobs = document.getElementsByClassName('job-tile ');
    for (let job of jobs) {
        let jobUrl = getJobUrl(job);
        if (!job.hidden && !window.filteredJobs.includes(jobUrl)) {
            window.filteredJobs.push(jobUrl);
            getJob(job);
        }
    }
}

function find () {
    let els = angular.element(document).find('div');
    for (let i in els) {
        let el = els[i];

        if (el.id == 'nav-main' && el.className == 'nav-collapse d-lg-flex d-none flex-1') {
            return angular.element(el);
        }
    }
}
function addControlles() {
    let nav = find();
    let newDiv = document.createElement('DIV');
    newDiv.innerHTML = '<button onclick="filterUnsuported();" class="qa-search-button btn btn-primary p-sm-left-right m-0-right">Filter out</button>';
    nav.append(newDiv);

}
addControlles();

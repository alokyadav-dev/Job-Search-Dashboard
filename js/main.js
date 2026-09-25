// DOM elements

const themeButton = document.getElementById("theme-btn");
const addJobButton = document.getElementById("add-job-btn");
const jobForm = document.getElementById("job-form");
const jobList = document.getElementById("job-list");
const cancelButton = document.getElementById("cancel-btn");

const emptyState = document.getElementById("empty-state");
const emptyAddButton = document.getElementById("empty-add-btn");

const totalJobs = document.getElementById("total-jobs");
const appliedJobs = document.getElementById("applied-jobs");
const interviewJobs = document.getElementById("interview-jobs");


// Used to know whether we are adding or editing

let editingJobId = null;


// Add Job button

addJobButton.addEventListener("click", function () {

    editingJobId = null;

    jobForm.reset();

    jobForm.hidden = false;

});


// Empty state Add Job button

emptyAddButton.addEventListener("click", function () {

    editingJobId = null;

    jobForm.reset();

    jobForm.hidden = false;

});


// Update dashboard statistics

function updateDashboard() {

    const jobs =
        JSON.parse(localStorage.getItem("jobs")) || [];


    // Total jobs

    totalJobs.textContent = jobs.length;


    // Applied jobs

    const applied =
        jobs.filter(function (job) {

            return job.status === "Applied";

        });

    appliedJobs.textContent = applied.length;


    // Interview jobs

    const interviews =
        jobs.filter(function (job) {

            return job.status === "Interview";

        });

    interviewJobs.textContent = interviews.length;


    // Show or hide empty state

    if (jobs.length === 0) {

        emptyState.style.display = "block";

    } else {

        emptyState.style.display = "none";

    }

}


// Create job card

function createJobCard(jobData) {

    const jobCard = document.createElement("div");

    jobCard.classList.add("job-card");


    // Job title

    const jobTitle = document.createElement("h3");

    jobTitle.textContent = jobData.title;

    jobCard.append(jobTitle);


    // Company

    const jobCompany = document.createElement("p");

    jobCompany.textContent =
        `Company: ${jobData.company}`;

    jobCard.append(jobCompany);


    // Location

    const jobLocation = document.createElement("p");

    jobLocation.textContent =
        `Location: ${jobData.location}`;

    jobCard.append(jobLocation);


    // Source

    const jobSource = document.createElement("p");

    jobSource.textContent =
        `Source: ${jobData.source}`;

    jobCard.append(jobSource);


    // Deadline

    const jobDeadline = document.createElement("p");

    jobDeadline.textContent =
        `Deadline: ${jobData.deadline}`;

    jobCard.append(jobDeadline);


    // Status

    const jobStatus = document.createElement("p");

    jobStatus.textContent =
        `Status: ${jobData.status}`;

    jobCard.append(jobStatus);


    // Notes

    const jobNotes = document.createElement("p");

    jobNotes.textContent =
        `Notes: ${jobData.notes || "No notes"}`;

    jobCard.append(jobNotes);


    // Apply button

    const applyLink = document.createElement("a");

    applyLink.href = jobData.applyUrl;

    applyLink.textContent = "Apply Now";

    applyLink.target = "_blank";

    applyLink.rel = "noopener noreferrer";

    applyLink.classList.add("apply-btn");

    jobCard.append(applyLink);


    // Edit button

    const editButton = document.createElement("button");

    editButton.textContent = "Edit";

    editButton.classList.add("edit-btn");

    jobCard.append(editButton);


    editButton.addEventListener("click", function () {

        // Store the ID of job being edited

        editingJobId = jobData.id;


        // Put existing data into form

        jobForm.elements["title"].value =
            jobData.title;

        jobForm.elements["company"].value =
            jobData.company;

        jobForm.elements["location"].value =
            jobData.location;

        jobForm.elements["source"].value =
            jobData.source;

        jobForm.elements["applyUrl"].value =
            jobData.applyUrl;

        jobForm.elements["deadline"].value =
            jobData.deadline;

        jobForm.elements["status"].value =
            jobData.status;

        jobForm.elements["notes"].value =
            jobData.notes || "";


        // Show form

        jobForm.hidden = false;

    });


    // Delete button

    const deleteButton = document.createElement("button");

    deleteButton.textContent = "Delete";

    deleteButton.classList.add("delete-btn");

    jobCard.append(deleteButton);


    deleteButton.addEventListener("click", function () {

        const jobs =
            JSON.parse(localStorage.getItem("jobs")) || [];


        const updatedJobs =
            jobs.filter(function (savedJob) {

                return savedJob.id !== jobData.id;

            });


        localStorage.setItem(
            "jobs",
            JSON.stringify(updatedJobs)
        );


        // Remove card from page

        jobCard.remove();


        // Update dashboard

        updateDashboard();

    });


    // Add card to page

    jobList.append(jobCard);

}


// Form submit

jobForm.addEventListener("submit", function (event) {

    event.preventDefault();


    // Get form data

    const formData = new FormData(jobForm);


    const title = formData.get("title");

    const company = formData.get("company");

    const location = formData.get("location");

    const source = formData.get("source");

    const applyUrl = formData.get("applyUrl");

    const deadline = formData.get("deadline");

    const status = formData.get("status");

    const notes = formData.get("notes");


    // ADD NEW JOB

    if (editingJobId === null) {

        const job = {

            id: crypto.randomUUID(),

            title,

            company,

            location,

            source,

            applyUrl,

            deadline,

            status,

            notes

        };


        // Get existing jobs

        const jobs =
            JSON.parse(localStorage.getItem("jobs")) || [];


        // Add new job

        jobs.push(job);


        // Save jobs

        localStorage.setItem(
            "jobs",
            JSON.stringify(jobs)
        );


        // Display new job

        createJobCard(job);


        // Update dashboard

        updateDashboard();

    }


    // EDIT EXISTING JOB

    else {

        const jobs =
            JSON.parse(localStorage.getItem("jobs")) || [];


        const updatedJobs =
            jobs.map(function (savedJob) {

                if (savedJob.id === editingJobId) {

                    return {

                        id: savedJob.id,

                        title,

                        company,

                        location,

                        source,

                        applyUrl,

                        deadline,

                        status,

                        notes

                    };

                }


                return savedJob;

            });


        // Save updated jobs

        localStorage.setItem(
            "jobs",
            JSON.stringify(updatedJobs)
        );


        // Clear old cards

        jobList.innerHTML = "";


        // Display updated jobs

        updatedJobs.forEach(function (job) {

            createJobCard(job);

        });


        // Exit edit mode

        editingJobId = null;


        // Update dashboard

        updateDashboard();

    }


    // Clear form

    jobForm.reset();


    // Hide form

    jobForm.hidden = true;

});


// Cancel button

cancelButton.addEventListener("click", function () {

    editingJobId = null;

    jobForm.reset();

    jobForm.hidden = true;

});


// Load saved jobs after page refresh

const savedJobs =
    JSON.parse(localStorage.getItem("jobs")) || [];


savedJobs.forEach(function (job) {

    createJobCard(job);

});


// Update dashboard when page loads

updateDashboard();

// Theme

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    themeButton.textContent = "☀️ Light";
}


themeButton.addEventListener("click", function () {

    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {

        localStorage.setItem("theme", "dark");

        themeButton.textContent = "☀️ Light";

    } else {

        localStorage.setItem("theme", "light");

        themeButton.textContent = "🌙 Dark";

    }

});
const gallery = document.querySelector(".gallery");

const file = "../json/data.json";

const JobItem = {
  jobsPerPage: 12,
  currentPage: 1,
};

async function retrieveJobs(file) {
  const response = await fetch(file);
  const jobData = await response.json();

  console.log(jobData.length);

  appendJobs(jobData);
}

retrieveJobs(file);

const appendJobs = (jobs) => {
  jobs.forEach((job) => {
    const {
      logo,
      logoBackground,
      postedAt,
      contract,
      position,
      company,
      location,
    } = job;

    const jobCard = document.createElement("div");
    jobCard.classList.add("card");

    jobCard.insertAdjacentHTML(
      "beforeend",
      `
	<div style="background-color:${logoBackground}" class="logo-div">
		<img src="${logo}" alt="" />
	</div>
	<div class="info-container">
		<div class="card-info">
	  		<div class="posted-time">
				<p class="posted">${postedAt}</p>
				<div class="bullet">&#8226;</div>
				<p class="time">${contract}</p>
	 		 </div>
	  		<h3 class="job-title">${position}</h3>
	  		<p class="company">${company}</p>
		</div>
		<div class="location">
	  		<h4>${location}</h4>
		</div>
  	</div>
	`
    );

    gallery.appendChild(jobCard);
  });
};

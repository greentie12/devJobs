const gallery = document.querySelector(".gallery");
const loadMore = document.querySelector(".load-more");

const file = "../json/data.json";

const jobItems = {
  jobsPerPage: 12,
  currentPage: 1,
  maxPage: null,
};

async function retrieveJobs(file) {
  const response = await fetch(file);
  const jobData = await response.json();

  jobItems.maxPage = Math.ceil(jobData.length / jobItems.jobsPerPage);

  appendJobs(jobData, jobItems.currentPage);
}

retrieveJobs(file);

const appendJobs = (jobs, page) => {
  gallery.innerHTML = "";
  jobItems.currentPage = page;
  let startIndex = (jobItems.currentPage - 1) * jobItems.jobsPerPage;
  let endIndex;

  if (startIndex + jobItems.jobsPerPage > jobs.length) {
    endIndex = jobs.length;
  } else {
    endIndex = startIndex + jobItems.jobsPerPage;
  }

  for (let x = startIndex; x < endIndex; x++) {
    let jobDataList = jobs[x];
    let job = {
      logo: jobDataList.logo,
      logoBackground: jobDataList.logoBackground,
      postedAt: jobDataList.postedAt,
      contract: jobDataList.contract,
      position: jobDataList.position,
      company: jobDataList.company,
      location: jobDataList.location,
    };

    let jobCard = document.createElement("div");
    jobCard.classList.add("card");

    jobCard.insertAdjacentHTML(
      "beforeend",
      `
	<div style="background-color:${job.logoBackground}" class="logo-div">
		<img src="${job.logo}" alt="" />
	</div>
	<div class="info-container">
		<div class="card-info">
	  		<div class="posted-time">
				<p class="posted">${job.postedAt}</p>
				<div class="bullet">&#8226;</div>
				<p class="time">${job.contract}</p>
	 		 </div>
	  		<h3 class="job-title">${job.position}</h3>
	  		<p class="company">${job.company}</p>
		</div>
		<div class="location">
	  		<h4>${job.location}</h4>
		</div>
  	</div>
	`
    );

    gallery.appendChild(jobCard);
  }
};

loadMore.addEventListener("click", function () {
  if (jobItems.currentPage >= jobItems.maxPage) {
    jobItems.currentPage = 1;
  } else {
    jobItems.currentPage++;
  }

  retrieveJobs(file);
});

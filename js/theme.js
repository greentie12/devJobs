const body = document.querySelector("body");
const toggleSwitch = document.getElementById("flexSwitchCheckDefault");

toggleSwitch.addEventListener("click", function () {
  body.classList.toggle("dark-theme");
});

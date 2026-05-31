import { States } from "./States.js";
import { Stats } from "./Stats.js";

const stats = new Stats();
const states = new States();

const eventSource = new EventSource("/stream");

eventSource.addEventListener("stats", function (event) {
  const buffer = atob(event.data);

  stats.set(buffer);
  states.set(buffer);

  stats.update();
});

document.getElementById("eat-button").addEventListener("click", () => {
  fetch("/eat", {
    method: "POST",
    // No body or headers needed since you requested an empty POST
  })
    .then((response) => response.text())
    .then((data) => {
      console.log("Server responded:", data);
    })
    .catch((error) => console.error("Error:", error));
});

document.getElementById("play-button").addEventListener("click", () => {
  fetch("/play", {
    method: "POST",
    // No body or headers needed since you requested an empty POST
  })
    .then((response) => response.text())
    .then((data) => {
      console.log("Server responded:", data);
    })
    .catch((error) => console.error("Error:", error));
});

document.getElementById("sleep-button").addEventListener("click", () => {
  fetch("/sleep", {
    method: "POST",
    // No body or headers needed since you requested an empty POST
  })
    .then((response) => response.text())
    .then((data) => {
      console.log("Server responded:", data);
    })
    .catch((error) => console.error("Error:", error));
});

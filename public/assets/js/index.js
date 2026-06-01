import { States } from "./States.js";
import { Stats } from "./Stats.js";

const eatBtn = document.querySelector("#eat");
const playBtn = document.querySelector("#play");
const sleepBtn = document.querySelector("#sleep");

eatBtn.addEventListener("click", () => Action("/eat"));
playBtn.addEventListener("click", () => Action("/play"));
sleepBtn.addEventListener("click", () => Action("/sleep"));

const stats = new Stats();

const states = new States();

const eventSource = new EventSource("/stream");

eventSource.addEventListener("stats", function (event) {
  const buffer = atob(event.data);

  stats.set(buffer);
  states.set(buffer);

  stats.update();
});

function Action(endpoint) {
  fetch(endpoint, {
    method: "POST",
  })
    .then((response) => response.text())
    .then((data) => {
      console.log("Server responded:", data);
    })
    .catch((error) => console.error("Error:", error));
}

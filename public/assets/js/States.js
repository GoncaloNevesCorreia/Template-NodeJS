import { Animate } from "./animations/animate.js";

import { deadAnimation } from "./animations/dead.js";
import { eatingAnimation } from "./animations/eating.js";
import { fallingAsleepAnimation } from "./animations/falling_asleep.js";
import { happyAnimation } from "./animations/happy.js";
import { hungryAnimation } from "./animations/hungry.js";
import { idleAnimation } from "./animations/idle.js";
import { playingAnimation } from "./animations/playing.js";
import { sadAnimation } from "./animations/sad.js";
import { sleepingAnimation } from "./animations/sleeping.js";
import { tiredAnimation } from "./animations/tired.js";
import { wakingUpAnimation } from "./animations/waking_up.js";

class States {
  #petAnimation;

  #STATES = {
    HAPPY: 0,
    IDLE: 1,
    SAD: 2,
    PLAYING: 3,
    HUNGRY: 4,
    EATING: 5,
    TIRED: 6,
    FALLING_ASLEEP: 7,
    SLEEPING: 8,
    WAKING_UP: 9,
    DEAD: 10,
    OFFLINE: 11,
  };

  #currentState;

  #stateEl;

  constructor() {
    this.#stateEl = document.querySelector("#status");

    this.#petAnimation = new Animate();

    this.#petAnimation.set(sleepingAnimation);

    this.#currentState = this.#STATES.OFFLINE;
  }

  set(buffer) {
    const newState = buffer.charCodeAt(0);

    if (this.#currentState == newState) return;

    this.#currentState = newState;

    switch (this.#currentState) {
      case this.#STATES.HAPPY:
        this.#petAnimation.set(happyAnimation);
        this.#stateEl.textContent = "HAPPY";
        break;

      case this.#STATES.SAD:
        this.#petAnimation.set(sadAnimation);
        this.#stateEl.textContent = "SAD";
        break;

      case this.#STATES.PLAYING:
        this.#petAnimation.set(playingAnimation);
        this.#stateEl.textContent = "PLAYING";
        break;

      case this.#STATES.HUNGRY:
        this.#petAnimation.set(hungryAnimation);
        this.#stateEl.textContent = "HUNGRY";
        break;

      case this.#STATES.EATING:
        this.#petAnimation.set(eatingAnimation);
        this.#stateEl.textContent = "EATING";
        break;

      case this.#STATES.TIRED:
        this.#petAnimation.set(tiredAnimation);
        this.#stateEl.textContent = "TIRED";
        break;

      case this.#STATES.FALLING_ASLEEP:
        this.#petAnimation.set(fallingAsleepAnimation);
        this.#stateEl.textContent = "FALLING ASLEEP";
        break;

      case this.#STATES.SLEEPING:
        this.#petAnimation.set(sleepingAnimation);
        this.#stateEl.textContent = "SLEEPING";
        break;

      case this.#STATES.WAKING_UP:
        this.#petAnimation.set(wakingUpAnimation);
        this.#stateEl.textContent = "WAKING UP";
        break;

      case this.#STATES.DEAD:
        this.#petAnimation.set(deadAnimation);
        this.#stateEl.textContent = "DEAD";
        break;

      case this.#STATES.OFFLINE:
        this.#petAnimation.set(sleepingAnimation);
        this.#stateEl.textContent = "OFFLINE";
        break;

      default:
        this.#petAnimation.set(idleAnimation);
        this.#stateEl.textContent = "IDLE";
        break;
    }
  }
}

export { States };

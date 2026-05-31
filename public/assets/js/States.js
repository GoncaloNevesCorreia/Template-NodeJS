import { Animate } from "./animations/animate.js";
import { idleAnimation } from "./animations/idle.js";
import { eatingAnimation } from "./animations/eating.js";

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
  };

  #currentState;

  constructor() {
    this.#petAnimation = new Animate();

    this.#petAnimation.set(idleAnimation);
  }

  set(buffer) {
    const newState = buffer.charCodeAt(0);

    if (this.#currentState == newState) return;

    this.#currentState = newState;

    console.log(this.#currentState);

    switch (this.#currentState) {
      case this.#STATES.EATING:
        this.#petAnimation.set(eatingAnimation);
        break;

      default:
        this.#petAnimation.set(idleAnimation);
        break;
    }
  }
}

export { States };

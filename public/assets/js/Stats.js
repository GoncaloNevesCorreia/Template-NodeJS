class Stats {
  #healthEl;
  #hungerEl;
  #energyEl;
  #funEl;

  #health;
  #hunger;
  #energy;
  #fun;

  constructor() {
    this.#healthEl = document.querySelector("#health");
    this.#hungerEl = document.querySelector("#hunger");
    this.#energyEl = document.querySelector("#energy");
    this.#funEl = document.querySelector("#fun");
  }

  set(buffer) {
    this.#health = buffer.charCodeAt(1);
    this.#hunger = buffer.charCodeAt(2);
    this.#energy = buffer.charCodeAt(3);
    this.#fun = buffer.charCodeAt(4);
  }

  update() {
    this.#healthEl.textContent = this.#health;
    this.#hungerEl.textContent = this.#hunger;
    this.#energyEl.textContent = this.#energy;
    this.#funEl.textContent = this.#fun;
  }
}

export { Stats };

class Animate {
  #canvas;
  #ctx;

  #animation;

  #animationRequest;
  #lastFrameTime = 0;
  #currentFrame = 0;

  constructor() {
    this.#canvas = document.querySelector("#screen");
    this.#ctx = this.#canvas.getContext("2d");

    this.#ctx.imageSmoothingEnabled = false;
  }

  set(animation) {
    this.#stop();

    this.#animation = animation;
    this.#lastFrameTime = 0;
    this.#currentFrame = 0;

    this.#start();
  }

  #start() {
    if (this.#animationRequest !== null) {
      return;
    }

    this.#animationRequest = requestAnimationFrame(this.#render);
  }

  #stop() {
    if (this.#animationRequest === null) {
      return;
    }

    cancelAnimationFrame(this.#animationRequest);
    this.#animationRequest = null;
  }

  #clear() {
    this.#ctx.fillStyle = "black";
    this.#ctx.fillRect(0, 0, this.#canvas.width, this.#canvas.height);
  }

  #drawFrame() {
    if (!this.#canvas || !this.#animation) return;

    const frame = this.#animation.frames[this.#currentFrame];

    this.#clear();

    this.#drawBitmap(
      frame,
      this.#animation.x,
      this.#animation.y,
      this.#animation.width,
      this.#animation.height,
    );
  }

  #drawBitmap(bitmap, x, y, width, height) {
    const bytesPerRow = Math.ceil(width / 8);

    this.#ctx.fillStyle = "white";

    for (let row = 0; row < height; row++) {
      for (let col = 0; col < width; col++) {
        const byteIndex = row * bytesPerRow + Math.floor(col / 8);
        const bitIndex = 7 - (col % 8);

        const pixelOn = (bitmap[byteIndex] >> bitIndex) & 1;

        if (pixelOn) {
          this.#ctx.fillRect(x + col, y + row, 1, 1);
        }
      }
    }
  }

  #render = (now) => {
    this.#drawFrame();

    const animation = this.#animation;

    if (now - this.#lastFrameTime >= animation.delay) {
      this.#currentFrame = (this.#currentFrame + 1) % animation.frames.length;

      this.#lastFrameTime = now;
    }

    this.#animationRequest = requestAnimationFrame(this.#render);
  };
}

export { Animate };

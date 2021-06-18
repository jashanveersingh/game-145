import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Tyre2 extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("car", "./Tyre2/costumes/car.png", { x: 34, y: 60 })
    ];

    this.sounds = [new Sound("pop", "./Tyre2/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.BROADCAST, { name: "tick" }, this.whenIReceiveTick)
    ];

    this.vars.sa4 = 0;
    this.vars.x24 = -9999;
    this.vars.y24 = 208.6410561049461;
    this.vars.pid3 = 17;
    this.vars.GetDirection4 = 180;
    this.vars.rotatingVelocity = -0.40043149543288237;
    this.vars.Distance = 1;
  }

  *whenGreenFlagClicked() {
    this.vars.pid3 = this.sprites["Game"].vars["pnt"] * 2 + 1;
    this.vars.rotatingVelocity = 0;
    this.visible = true;
  }

  *whenIReceiveTick() {
    if (this.sprites["Game"].vars["vehicle"] == 1) {
      this.goto(
        this.stage.vars.points[this.vars.pid3 - 1] -
          this.stage.vars.scrollX +
          Math.sin(this.degToRad(this.sprites["Game"].vars["actualDir"] - 25)) *
            -35,
        this.stage.vars.points[this.vars.pid3 + 1 - 1] -
          this.stage.vars.scrollY +
          Math.cos(this.degToRad(this.sprites["Game"].vars["actualDir"] - 25)) *
            -35
      );
    } else {
      this.goto(
        this.stage.vars.points[this.vars.pid3 - 1] -
          this.stage.vars.scrollX +
          Math.sin(this.degToRad(this.sprites["Game"].vars["actualDir"] - 32)) *
            -40,
        this.stage.vars.points[this.vars.pid3 + 1 - 1] -
          this.stage.vars.scrollY +
          Math.cos(this.degToRad(this.sprites["Game"].vars["actualDir"] - 32)) *
            -40
      );
    }
    this.vars.rotatingVelocity =
      this.vars.rotatingVelocity * 0.9 +
      (2500 / (50 + this.sprites["Game"].vars["accelerationValue"]) - 50) *
        Math.sin(
          this.degToRad(
            ((this.direction -
              this.sprites["Game"].vars["accelerationDirection"] +
              200) %
              360) -
              180
          )
        ) +
      0.2 *
        (((this.sprites["Game"].vars["actualDir"] - this.direction + 180) %
          360) -
          180);
    this.direction += this.vars.rotatingVelocity;
    if (
      (this.sprites["Game"].vars["actualDir"] - this.direction + 40) % 360 >
      180
    ) {
      this.direction = this.sprites["Game"].vars["actualDir"] + 40;
    }
    if (
      (this.sprites["Game"].vars["actualDir"] - this.direction + -30) % 360 <
      180
    ) {
      this.direction = this.sprites["Game"].vars["actualDir"] - 30;
    }
  }
}

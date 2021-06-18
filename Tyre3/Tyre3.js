import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Tyre3 extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("car2", "./Tyre3/costumes/car2.png", { x: 30, y: 67 })
    ];

    this.sounds = [new Sound("pop", "./Tyre3/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.BROADCAST, { name: "tick" }, this.whenIReceiveTick)
    ];

    this.vars.sa5 = 0;
    this.vars.x25 = -9999;
    this.vars.y25 = 208.6410561049461;
    this.vars.pid4 = 17;
    this.vars.GetDirection5 = 180;
    this.vars.rotatingVelocity2 = 0.3664705124778186;
    this.vars.Distance2 = 1;
    this.vars.xSit = -96.27491542252264;
    this.vars.ySit = 19.037238793075378;
    this.vars.directionSit = 89.26683575190648;
    this.vars.xCar = 0;
    this.vars.realCarDirection = 0;
    this.vars.yCar = 0;
  }

  *whenGreenFlagClicked() {
    this.vars.pid4 = this.sprites["Game"].vars["pnt"] * 2 + 1;
    this.vars.rotatingVelocity2 = 0;
    this.visible = true;
  }

  *whenIReceiveTick() {
    this.vars.xSit =
      this.stage.vars.points[this.vars.pid4 - 1] -
      this.stage.vars.scrollX +
      Math.sin(this.degToRad(this.sprites["Game"].vars["actualDir"] - 70)) *
        -20;
    this.vars.ySit =
      this.stage.vars.points[this.vars.pid4 + 1 - 1] -
      this.stage.vars.scrollY +
      Math.cos(this.degToRad(this.sprites["Game"].vars["actualDir"] - 70)) *
        -20;
    this.goto(this.vars.xSit, this.vars.ySit);
    this.vars.rotatingVelocity2 =
      this.vars.rotatingVelocity2 * 0.6 +
      (2500 / (50 + this.sprites["Game"].vars["accelerationValue"]) - 50) *
        Math.sin(
          this.degToRad(
            ((this.direction -
              this.sprites["Game"].vars["accelerationDirection"] -
              90) %
              360) -
              180
          )
        ) +
      0.2 *
        (((this.sprites["Game"].vars["actualDir"] - this.direction + 180) %
          360) -
          180);
    this.direction += this.vars.rotatingVelocity2;
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
    this.vars.directionSit = this.direction + this.vars.rotatingVelocity2;
  }
}

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Tyre4 extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("car2", "./Tyre4/costumes/car2.png", { x: 35, y: 67 })
    ];

    this.sounds = [new Sound("pop", "./Tyre4/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.BROADCAST, { name: "tick" }, this.whenIReceiveTick)
    ];

    this.vars.sa6 = 0;
    this.vars.x26 = -9999;
    this.vars.y26 = 208.6410561049461;
    this.vars.pid5 = 17;
    this.vars.GetDirection6 = 180;
    this.vars.rotatingVelocity3 = 0.4578351477154762;
    this.vars.Distance3 = 1;
    this.vars.breakNeck2 = 0;
    this.vars.xAcceleration2 = 0;
    this.vars.headTouchGround = 0;
  }

  *whenGreenFlagClicked() {
    this.vars.rotatingVelocity3 = 0;
  }

  *whenIReceiveTick() {
    this.goto(
      this.sprites["Tyre3"].vars["xSit"] +
        Math.sin(
          this.degToRad(this.sprites["Tyre3"].vars["directionSit"] - 80)
        ) *
          18,
      this.sprites["Tyre3"].vars["ySit"] +
        Math.cos(
          this.degToRad(this.sprites["Tyre3"].vars["directionSit"] - 80)
        ) *
          18
    );
    this.vars.rotatingVelocity3 =
      this.vars.rotatingVelocity3 *
        (0.6 + 0.4 * this.sprites["Game"].vars["breakNeck"]) +
      this.sprites["Game"].vars["xAcceleration"] *
        1 *
        this.sprites["Game"].vars["headTouching"] +
      (2 - this.sprites["Game"].vars["headTouching"]) *
        (2500 / (50 + this.sprites["Game"].vars["accelerationValue"]) - 50) *
        Math.sin(
          this.degToRad(
            ((this.direction -
              (this.sprites["Game"].vars["accelerationDirection"] + 90)) %
              360) -
              180
          )
        ) +
      0.3 *
        (1 - this.sprites["Game"].vars["breakNeck"]) *
        (((this.sprites["Tyre3"].vars["directionSit"] - this.direction + 180) %
          360) -
          180);
    this.direction += this.vars.rotatingVelocity3;
    if (
      (this.sprites["Game"].vars["actualDir"] - this.direction + 70) % 360 >
      180
    ) {
      this.vars.rotatingVelocity3 +=
        0.2 *
        (((this.sprites["Game"].vars["actualDir"] + 180 + 70 - this.direction) %
          360) -
          180);
      this.direction +=
        ((this.sprites["Game"].vars["actualDir"] + 180 + 70 - this.direction) %
          360) -
        180;
    }
    if (
      (this.sprites["Game"].vars["actualDir"] - this.direction - 50) % 360 <
      180
    ) {
      this.vars.rotatingVelocity3 +=
        0.2 *
        (((this.sprites["Game"].vars["actualDir"] + 180 - 50 - this.direction) %
          360) -
          180);
      this.direction +=
        ((this.sprites["Game"].vars["actualDir"] + 180 - 50 - this.direction) %
          360) -
        180;
    }
  }
}

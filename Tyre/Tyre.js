import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Tyre extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("wheel", "./Tyre/costumes/wheel.png", { x: 38, y: 36 })
    ];

    this.sounds = [new Sound("pop", "./Tyre/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.BROADCAST, { name: "tick" }, this.whenIReceiveTick),
      new Trigger(Trigger.BROADCAST, { name: "reset" }, this.whenIReceiveReset)
    ];

    this.vars.sa2 = 7.482571350075347;
    this.vars.x16 = -9999;
    this.vars.y16 = 208.6410561049461;
    this.vars.pid = 9;
    this.vars.GetDirection2 = 137.06168195189136;
  }

  *whenGreenFlagClicked() {
    this.goto(0, 0);
    this.vars.sa2 = 0;
    this.vars.pid = 1;
    this.vars.x16 = -9999;
    this.costume = "wheel";
    this.createClone();
    this.vars.pid += this.sprites["Game"].vars["pnt"];
  }

  *whenIReceiveTick() {
    this.vars.sa2 = this.stage.vars.points[this.vars.pid + 5 - 1];
    this.goto(
      this.stage.vars.points[this.vars.pid - 1] - this.stage.vars.scrollX,
      this.stage.vars.points[this.vars.pid + 1 - 1] - this.stage.vars.scrollY
    );
    if (this.sprites["Game"].vars["dirt"] == 0 || this.vars.pid > 1) {
      this.direction += (this.vars.sa2 / 24) * 57.3 * 3;
    } else {
      if (this.keyPressed("right arrow")) {
        this.direction += (6 / 24) * 57.3 * 3;
      } else {
        this.direction += (-6 / 24) * 57.3 * 3;
      }
    }
  }

  *getAngleChange(x17, y17, rad) {
    if (x17 > 0) {
      this.vars.sa2 = Math.sqrt(x17 * x17 + y17 * y17);
    } else {
      this.vars.sa2 = 0 - Math.sqrt(x17 * x17 + y17 * y17);
    }
  }

  *getDirection(dx2, dy2) {
    if (dy2 == 0) {
      if (dx2 > 0) {
        this.vars.GetDirection2 = 90;
      } else {
        this.vars.GetDirection2 = -90;
      }
    } else {
      this.vars.GetDirection2 = this.radToDeg(Math.atan(dx2 / dy2));
      if (dy2 < 0) {
        if (dx2 > 0) {
          this.vars.GetDirection2 += 180;
        } else {
          if (dx2 < 0) {
            this.vars.GetDirection2 += -180;
          } else {
            this.vars.GetDirection2 = 180;
          }
        }
      }
    }
  }

  *whenIReceiveReset() {}
}

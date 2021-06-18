import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Car extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("car", "./Car/costumes/car.png", { x: 164, y: 30 }),
      new Costume("bike", "./Car/costumes/bike.png", { x: 122, y: -10 }),
      new Costume("car2", "./Car/costumes/car2.png", { x: 164, y: 68 }),
      new Costume("car3", "./Car/costumes/car3.png", { x: 164, y: 68 })
    ];

    this.sounds = [new Sound("pop", "./Car/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.BROADCAST, { name: "tick" }, this.whenIReceiveTick),
      new Trigger(Trigger.BROADCAST, { name: "init" }, this.whenIReceiveInit),
      new Trigger(Trigger.BROADCAST, { name: "reset" }, this.whenIReceiveReset)
    ];

    this.vars.sa3 = 0;
    this.vars.x18 = -9999;
    this.vars.y18 = 208.6410561049461;
    this.vars.pid2 = 17;
    this.vars.GetDirection3 = 94.97135080777484;
  }

  *whenIReceiveTick() {
    this.vars.sa3 = this.stage.vars.points[this.vars.pid2 + 5 - 1];
    this.goto(
      this.stage.vars.points[this.vars.pid2 - 1] - this.stage.vars.scrollX,
      this.stage.vars.points[this.vars.pid2 + 1 - 1] - this.stage.vars.scrollY
    );
    this.direction = this.sprites["Game"].vars["actualDir"];
  }

  *getAngleChange(x19, y19, rad2) {
    if (x19 > 0) {
      this.vars.sa3 = Math.sqrt(x19 * x19 + y19 * y19);
    } else {
      this.vars.sa3 = 0 - Math.sqrt(x19 * x19 + y19 * y19);
    }
  }

  *getDirection(dx3, dy3) {
    if (dy3 == 0) {
      if (dx3 > 0) {
        this.vars.GetDirection3 = 90;
      } else {
        this.vars.GetDirection3 = -90;
      }
    } else {
      this.vars.GetDirection3 = this.radToDeg(Math.atan(dx3 / dy3));
      if (dy3 < 0) {
        if (dx3 > 0) {
          this.vars.GetDirection3 += 180;
        } else {
          if (dx3 < 0) {
            this.vars.GetDirection3 += -180;
          } else {
            this.vars.GetDirection3 = 180;
          }
        }
      }
    }
  }

  *getCarAngle(id1, id2) {
    this.warp(this.getDirection)(
      this.stage.vars.points[id2 - 1] - this.stage.vars.points[id1 - 1],
      this.stage.vars.points[id2 + 1 - 1] - this.stage.vars.points[id1 + 1 - 1]
    );
    this.direction = this.vars.GetDirection3;
  }

  *whenIReceiveInit() {
    this.goto(0, 0);
    this.vars.sa3 = 0;
    this.vars.pid2 = this.sprites["Game"].vars["pnt"] * 2 + 1;
    this.vars.x18 = -9999;
    this.costume = this.sprites["Game"].vars["vehicle"];
  }

  *whenIReceiveReset() {
    this.costume = this.sprites["Game"].vars["vehicle"];
  }
}

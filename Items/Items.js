import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Items extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("coin_5", "./Items/costumes/coin_5.png", { x: 40, y: 40 }),
      new Costume("coin_25", "./Items/costumes/coin_25.png", { x: 40, y: 38 }),
      new Costume("coin_100", "./Items/costumes/coin_100.png", {
        x: 40,
        y: 40
      }),
      new Costume("coin_500", "./Items/costumes/coin_500.png", {
        x: 40,
        y: 40
      }),
      new Costume("fuel", "./Items/costumes/fuel.png", { x: 28, y: 38 })
    ];

    this.sounds = [
      new Sound("pop", "./Items/sounds/pop.wav"),
      new Sound("ping.mp3", "./Items/sounds/ping.mp3.wav")
    ];

    this.triggers = [
      new Trigger(Trigger.BROADCAST, { name: "init" }, this.whenIReceiveInit),
      new Trigger(Trigger.BROADCAST, { name: "tick" }, this.whenIReceiveTick),
      new Trigger(Trigger.BROADCAST, { name: "reset" }, this.whenIReceiveReset)
    ];

    this.vars.id = -7;
    this.vars.x22 = 4886;
    this.vars.y22 = 234;
  }

  *whenIReceiveInit() {
    this.audioEffects.volume = 100;
    this.visible = false;
    yield* this.init();
  }

  *whenIReceiveTick() {
    if (this.vars.id < 0) {
      this.vars.id += -1;
      this.vars.y22 += 8;
      if (this.vars.id < -20) {
        this.vars.id = 0;
        this.visible = false;
      } else {
        yield* this.position(
          Math.round(this.vars.x22 - this.stage.vars.scrollX),
          Math.round(this.vars.y22 - this.stage.vars.scrollY)
        );
      }
    } else {
      if (this.vars.id == 0 && this.stage.vars.newItems > 0) {
        yield* this.claim();
      }
      if (this.vars.id > 0) {
        if (
          this.vars.id < this.sprites["Game"].vars["itemMin"] ||
          this.vars.id > this.sprites["Game"].vars["itemMax"]
        ) {
          this.visible = false;
          this.stage.vars.items.splice(this.vars.id + 3 - 1, 1, 0);
          this.vars.id = 0;
        } else {
          yield* this.position(
            Math.round(this.vars.x22 - this.stage.vars.scrollX),
            Math.round(this.vars.y22 - this.stage.vars.scrollY)
          );
          if (
            Math.hypot(
              this.sprites["Car"].x - this.x,
              this.sprites["Car"].y - this.y
            ) < 100
          ) {
            yield* this.startSound("ping.mp3");
            this.stage.vars.items.splice(this.vars.id + 3 - 1, 1, -1);
            this.vars.id = -1;
            if (this.costumeNumber == 1) {
              this.stage.vars.score += 5;
            } else {
              if (this.costumeNumber == 2) {
                this.stage.vars.score += 25;
              } else {
                if (this.costumeNumber == 3) {
                  this.stage.vars.score += 100;
                } else {
                  if (this.costumeNumber == 4) {
                    this.stage.vars.score += 500;
                  } else {
                    if (this.costumeNumber == 5) {
                      this.stage.vars.fuel = 10;
                    } else {
                      0;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  *position(x23, y23) {
    this.goto(x23, y23);
    if (x23 == this.x && y23 == this.y) {
      this.visible = true;
    } else {
      this.visible = false;
    }
  }

  *claim() {
    this.stage.vars.newItems += -1;
    this.vars.id = this.sprites["Game"].vars["itemMin"];
    while (!(this.stage.vars.items[this.vars.id + 3 - 1] == 0)) {
      this.vars.id += 4;
      yield;
    }
    this.stage.vars.items.splice(this.vars.id + 3 - 1, 1, 1);
    this.costume = this.stage.vars.items[this.vars.id + 2 - 1];
    this.vars.x22 = this.stage.vars.items[this.vars.id - 1];
    this.vars.y22 = this.stage.vars.items[this.vars.id + 1 - 1];
  }

  *whenIReceiveReset() {
    this.vars.id = 0;
    this.visible = false;
  }

  *init() {
    this.vars.id = 0;
    for (let i = 0; i < 8; i++) {
      this.createClone();
      yield;
    }
  }
}

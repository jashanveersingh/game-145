import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Level extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("level", "./Level/costumes/level.png", { x: 0, y: 0 })
    ];

    this.sounds = [new Sound("pop", "./Level/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.BROADCAST, { name: "init" }, this.whenIReceiveInit),
      new Trigger(Trigger.BROADCAST, { name: "reset" }, this.whenIReceiveReset)
    ];

    this.vars.soilBase = 1;
    this.vars.groundBase = 15;
  }

  *whenIReceiveInit() {
    this.vars.soilBase = this.sprites["Game"].vars["vehicle"];
    this.vars.groundBase = (this.vars.soilBase - 1) * 29 + 15;
  }

  *whenIReceiveReset() {
    this.vars.soilBase = this.sprites["Game"].vars["vehicle"];
    this.vars.groundBase = (this.vars.soilBase - 1) * 29 + 15;
  }
}

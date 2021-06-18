import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Fuel extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Fuel0", "./Fuel/costumes/Fuel0.png", { x: 94, y: 20 }),
      new Costume("Fuel10", "./Fuel/costumes/Fuel10.png", { x: 94, y: 20 }),
      new Costume("Fuel20", "./Fuel/costumes/Fuel20.png", { x: 94, y: 20 }),
      new Costume("Fuel30", "./Fuel/costumes/Fuel30.png", { x: 94, y: 20 }),
      new Costume("Fuel40", "./Fuel/costumes/Fuel40.png", { x: 94, y: 20 }),
      new Costume("Fuel50", "./Fuel/costumes/Fuel50.png", { x: 94, y: 20 }),
      new Costume("Fuel60", "./Fuel/costumes/Fuel60.png", { x: 94, y: 20 }),
      new Costume("Fuel70", "./Fuel/costumes/Fuel70.png", { x: 94, y: 20 }),
      new Costume("Fuel80", "./Fuel/costumes/Fuel80.png", { x: 94, y: 20 }),
      new Costume("Fuel90", "./Fuel/costumes/Fuel90.png", { x: 94, y: 20 }),
      new Costume("Fuel100", "./Fuel/costumes/Fuel100.png", { x: 94, y: 20 })
    ];

    this.sounds = [new Sound("pop", "./Fuel/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.BROADCAST, { name: "tick" }, this.whenIReceiveTick)
    ];

    this.vars.i = 0;
    this.vars.number = 0;
    this.vars.cIndex = 0;
    this.vars.ascii = 0;
    this.vars.text = 0;
    this.vars.full = 0;
    this.vars.c = 0;
    this.vars.c2 = 0;
    this.vars.prevLength = 0;
    this.vars.backup = 0;
    this.vars.bestScore = 0;
    this.vars.bestRank = 0;
    this.vars.found = 0;
    this.vars.temp = [];
    this.vars.scores = [];
    this.vars.users = [];
    this.vars.highScoreTable = [];
  }

  *whenGreenFlagClicked() {
    this.goto(-139, 157);
    this.costume = "Fuel100";
    this.visible = true;
  }

  *whenIReceiveTick() {
    if (this.stage.vars.fuel > 0) {
      this.costume = Math.ceil(this.stage.vars.fuel) + 1;
    } else {
      this.costume = "Fuel0";
    }
  }
}

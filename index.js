import { Project } from "https://unpkg.com/leopard@^1/dist/index.esm.js";

import Stage from "./Stage/Stage.js";
import Game from "./Game/Game.js";
import Ground from "./Ground/Ground.js";
import Tyre from "./Tyre/Tyre.js";
import Car from "./Car/Car.js";
import Soil from "./Soil/Soil.js";
import Items from "./Items/Items.js";
import Message from "./Message/Message.js";
import Event from "./Event/Event.js";
import Fuel from "./Fuel/Fuel.js";
import Tyre2 from "./Tyre2/Tyre2.js";
import Tyre3 from "./Tyre3/Tyre3.js";
import Tyre4 from "./Tyre4/Tyre4.js";
import Sound from "./Sound/Sound.js";
import Cloud from "./Cloud/Cloud.js";
import Dirt from "./Dirt/Dirt.js";
import Level from "./Level/Level.js";

const stage = new Stage({ costumeNumber: 1 });

const sprites = {
  Game: new Game({
    x: -61.1790874991857,
    y: -11.444323470695728,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 7
  }),
  Ground: new Ground({
    x: -133,
    y: -102,
    direction: 90,
    costumeNumber: 13,
    size: 100,
    visible: true,
    layerOrder: 2
  }),
  Tyre: new Tyre({
    x: -36.14705239962768,
    y: -21.191026234429614,
    direction: -59.93491435623292,
    costumeNumber: 1,
    size: 100,
    visible: true,
    layerOrder: 8
  }),
  Car: new Car({
    x: -89.79119655852264,
    y: 37.95710638507538,
    direction: 88.91626290554625,
    costumeNumber: 1,
    size: 100,
    visible: true,
    layerOrder: 10
  }),
  Soil: new Soil({
    x: -133,
    y: -302,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: true,
    layerOrder: 1
  }),
  Items: new Items({
    x: -133,
    y: 44,
    direction: 90,
    costumeNumber: 5,
    size: 100,
    visible: true,
    layerOrder: 3
  }),
  Message: new Message({
    x: 0,
    y: 32,
    direction: 90,
    costumeNumber: 2,
    size: 100,
    visible: false,
    layerOrder: 9
  }),
  Event: new Event({
    x: 0,
    y: 32,
    direction: 90,
    costumeNumber: 3,
    size: 100,
    visible: false,
    layerOrder: 16
  }),
  Fuel: new Fuel({
    x: -139,
    y: 157,
    direction: 90,
    costumeNumber: 11,
    size: 100,
    visible: true,
    layerOrder: 11
  }),
  Tyre2: new Tyre2({
    x: -121.22653099602265,
    y: 22.568157463575375,
    direction: 85.60118628628567,
    costumeNumber: 1,
    size: 100,
    visible: true,
    layerOrder: 6
  }),
  Tyre3: new Tyre3({
    x: -96.27491542252264,
    y: 19.037238793075378,
    direction: 88.90036523942867,
    costumeNumber: 1,
    size: 100,
    visible: true,
    layerOrder: 5
  }),
  Tyre4: new Tyre4({
    x: -93.37632903652263,
    y: 36.80232244007538,
    direction: 89.61285241990808,
    costumeNumber: 1,
    size: 100,
    visible: true,
    layerOrder: 4
  }),
  Sound: new Sound({
    x: 94,
    y: 36,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: true,
    layerOrder: 12
  }),
  Cloud: new Cloud({
    x: 4,
    y: 10,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: true,
    layerOrder: 13
  }),
  Dirt: new Dirt({
    x: -241,
    y: -40,
    direction: 90,
    costumeNumber: 3,
    size: 100,
    visible: false,
    layerOrder: 14
  }),
  Level: new Level({
    x: 68,
    y: -22,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: true,
    layerOrder: 15
  })
};

const project = new Project(stage, sprites, {
  frameRate: 30 // Set to 60 to make your project run faster
});
export default project;

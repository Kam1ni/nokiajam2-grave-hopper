import {Engine, Vector2, OrthographicCamera } from "scrapy-engine";
import { LightColor } from "./utils/colors";

let gameContainer = document.getElementById("canvas-container");
let canvas = document.createElement("canvas");
gameContainer.append(canvas);

let engine = new Engine(canvas);
engine.init();
let camera = new OrthographicCamera(engine);
engine.setCamera(camera);
engine.setCanvasSize(new Vector2(84, 48));
engine.setClearColor(LightColor);
engine.start();
import {Engine, Vector2, OrthographicCamera } from "scrapy-engine";
import { LightColor } from "./utils/colors";
import { Level1 } from "./game/levels/level1";

let gameContainer = document.getElementById("canvas-container");
let canvas = document.createElement("canvas");
gameContainer.append(canvas);

let engine = new Engine(canvas);
engine.init();
let camera = new OrthographicCamera(engine);
camera.transform.position.x = 2;
engine.setCamera(camera);
engine.setCanvasSize(new Vector2(84, 48));
engine.setClearColor(LightColor);
engine.setWorld(new Level1(engine));
engine.renderBoundingBoxes = false;

async function load(){
	await engine.assetLoaders.textureLoader.getAsset("player.png").load()
	await engine.assetLoaders.textureLoader.getAsset("tiles.png").load();
	engine.start();
}

load();

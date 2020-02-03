import {Engine, Vector2, OrthographicCamera } from "scrapy-engine";
import { LightColor } from "./utils/colors";
import { Level1 } from "./game/levels/level1";
import { Level2 } from "./game/levels/level2";
import { Level3 } from "./game/levels/level3";
import { Level4 } from "./game/levels/level4";
import { Level5 } from "./game/levels/level5";
import { StartScreen } from "./game/levels/start-screen";
import { NokiaShader } from "./game/shaders/nokia-shader";
import { Actions, actionIsPressed, actionIsReleased } from "./utils/actions";


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
engine.setWorld(new StartScreen(engine));
let shader = new NokiaShader(engine);
shader.load();
shader.use();
engine.setShader(shader);

function registerButtons(className:string, action:Actions){
	let buttons = document.getElementsByClassName(className) as HTMLCollectionOf<HTMLButtonElement>;
	for (let button of buttons){
		button.addEventListener("mousedown", ()=>actionIsPressed(action));
		button.addEventListener("mouseup", ()=>actionIsReleased(action));
		button.addEventListener("touchstart", ()=>actionIsPressed(action));
		button.addEventListener("touchend", ()=>actionIsReleased(action));
	}
}

registerButtons("up", Actions.JUMP);
registerButtons("left", Actions.MOVE_LEFT);
registerButtons("right", Actions.MOVE_RIGHT);
//engine.renderBoundingBoxes = true;

async function load(){
	await engine.assetLoaders.textureLoader.getAsset("start-screen.png").load();
	await engine.assetLoaders.textureLoader.getAsset("player.png").load();
	await engine.assetLoaders.textureLoader.getAsset("tiles.png").load();
	await engine.assetLoaders.audioLoader.getAsset("entry.mp3").load();
	await engine.assetLoaders.audioLoader.getAsset("exit.mp3").load();
	await engine.assetLoaders.audioLoader.getAsset("dead.mp3").load();
	engine.start();
}

function updateScaling():void{
	let width = window.innerWidth;
	let height = window.innerHeight - 240;
	let widthMultiplier = width / 84;
	let heightMultiplier = height / 48;
	if (widthMultiplier > heightMultiplier){
		var scaling = heightMultiplier;
	}else{
		var scaling = widthMultiplier;
	}
	gameContainer.style.transform = `scale(${scaling}, ${scaling})`
}

updateScaling();
window.addEventListener("resize", updateScaling);
load();

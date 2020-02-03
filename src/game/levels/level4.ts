import { Level } from "./level";
import {Vector2} from "scrapy-engine";
import { TileBox } from "../entities/tile-box";
import { Door } from "../entities/door";
import { DrawBridge } from "../entities/draw-bridge";
import { RoofSpikeRow } from "../entities/roof-spike-row";
import { Button } from "../entities/button";
import { Bin } from "../entities/bin";
import { Level5 } from "./level5";

export class Level4 extends Level{
	public entry: Vector2 = new Vector2(2, 4);
	public exit: Vector2 = new Vector2(0,1);
	protected buildLevel(): void {
		this.buildFloor();
		this.buildRoof();

		let drawBridge = new DrawBridge(this.engine, 2, 6, 2);
		drawBridge.activate();
		this.addTile(drawBridge);

		this.addTile(new TileBox(this.engine, 4, 1, 0, 3));
		this.addTile(new TileBox(this.engine, 1, 1, 5, 2));
		this.addTile(new TileBox(this.engine, 1, 1, 9, 1));
		this.addTile(new RoofSpikeRow(this.engine, 1, 6, 4));
		this.addTile(new Bin(this.engine, 7, 1));
		this.addTile(new Bin(this.engine, 5, 1));

		let door1 = new Door(this.engine, 2, 1, 1);
		door1.activate();
		let door2 = new Door(this.engine, 2, 3, 1);
		
		this.addTile(door1);
		this.addTile(door2);


		let button1 = new Button(this.engine, 6, 1);
		this.addTile(button1);

		let button2 = new Button(this.engine, 2, 1);
		this.addTile(button2);

		button1.setOnPress(()=>{
			door1.deactive();
			door2.activate();
		});

		button1.setOnRelease(()=>{
			door1.activate();
			door2.deactive();
		});

		button2.setOnPress(()=>{
			drawBridge.deactive();
		});

		button2.setOnRelease(()=>{
			drawBridge.activate();
		});
	}
	public onFinish(): void {
		this.engine.setWorld(new Level5(this.engine));
	}


}
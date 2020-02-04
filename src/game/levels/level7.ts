import { Level } from "./level";
import {Vector2} from "scrapy-engine";
import { TileBox } from "../entities/tile-box";
import { Bin } from "../entities/bin";
import { RoofSpikeRow } from "../entities/roof-spike-row";
import { DrawBridge } from "../entities/draw-bridge";
import { Button } from "../entities/button";
import { SpikeRow } from "../entities/spike-row";
import { Door } from "../entities/door";
import { EndScreen } from "./end-screen";

export class Level7 extends Level {
	public entry: Vector2 = new Vector2(2, 4);
	public exit: Vector2 = new Vector2(9, 1);

	protected buildLevel(): void {
		this.buildFloor();
		this.addTile(new TileBox(this.engine, 3, 2, 0, 2));
		this.addTile(new TileBox(this.engine, 3, 1, 0, 5));
		this.addTile(new Bin(this.engine, 0, 4));
		this.addTile(new RoofSpikeRow(this.engine, 3, 3, 5));

		this.addTile(new TileBox(this.engine, 4, 1, 6, 5));
		this.addTile(new SpikeRow(this.engine, 3, 0, 1));

		this.addTile(new TileBox(this.engine, 3, 2, 6, 2));
		this.addTile(new TileBox(this.engine, 1, 1, 8, 1));
		this.addTile(new SpikeRow(this.engine, 2, 6, 1));
		
		let bridge1 = new DrawBridge(this.engine, 1, 3, 2);
		this.addTile(new TileBox(this.engine, 1, 2, 4, 1));
		let bridge2 = new DrawBridge(this.engine, 1, 5, 2);
		let bridge3 = new DrawBridge(this.engine, 1, 9, 3);
		bridge1.activate();
		bridge2.activate();
		bridge3.deactive();
		this.addTile(bridge1);
		this.addTile(bridge2);
		this.addTile(bridge3);


		let button1 = new Button(this.engine, 3, 1);
		let button2 = new Button(this.engine, 5, 1);
		let button3 = new Button(this.engine, 6, 4);
		this.addTile(button1);
		this.addTile(button2);
		this.addTile(button3);

		button3.setOnPress(()=>{
			bridge2.deactive();
		});
		button3.setOnRelease(()=>{
			bridge2.activate();
		});

		button2.setOnPress(()=>{
			bridge1.deactive();
		});
		button2.setOnRelease(()=>{
			bridge1.activate();
		});

		let door = new Door(this.engine, 1, 7, 4);
		door.activate();
		this.addTile(door);

		button1.setOnPress(()=>{
			door.deactive();
			bridge3.activate();
		});
		button1.setOnRelease(()=>{
			door.activate();
			bridge3.deactive();
		});

		this.addTile(new Bin(this.engine, 8, 4))
	}
	public onFinish(): void {
		console.log("On finish")
		this.engine.setWorld(new EndScreen(this.engine))
	}


}
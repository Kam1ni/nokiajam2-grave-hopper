import { Level } from "./level";
import {Vector2} from "scrapy-engine";
import { TileBox } from "../entities/tile-box";
import { DrawBridge } from "../entities/draw-bridge";
import { Button } from "../entities/button";
import { SpikeRow } from "../entities/spike-row";
import { RoofSpikeRow } from "../entities/roof-spike-row";
import { Bin } from "../entities/bin";
import { Level6 } from "./level6";

export class Level5 extends Level{
	public entry: Vector2 = new Vector2(3,3);
	public exit: Vector2 = new Vector2(9, 1);

	protected buildLevel(): void {
		this.buildFloor();
		this.buildRoof();

		let bridge = new DrawBridge(this.engine, 1, 9, 2);
		bridge.activate();
		this.addTile(bridge);

		let bridge2 = new DrawBridge(this.engine, 1, 5, 2);
		bridge2.activate();
		this.addTile(bridge2);

		this.addTile(new SpikeRow(this.engine, 5, 0, 1));
		this.addTile(new SpikeRow(this.engine, 2, 6, 1));

		this.addTile(new TileBox(this.engine, 5, 1, 0, 2));
		this.addTile(new TileBox(this.engine, 3, 1, 6, 2));
		this.addTile(new TileBox(this.engine, 1, 1, 8, 1));

		let button1 = new Button(this.engine, 1, 3);
		this.addTile(button1);

		let button2 = new Button(this.engine, 5, 1);
		this.addTile(button2);

		button1.setOnPress(()=>{
			bridge2.deactive();
		})

		button1.setOnRelease(()=>{
			bridge2.activate();
		})

		button2.setOnPress(()=>{
			bridge.deactive();
		});

		button2.setOnRelease(()=>{
			bridge.activate();
		})

		this.addTile(new RoofSpikeRow(this.engine, 1, 5, 4));
		this.addTile(new Bin(this.engine, 0, 3));
	}
	public onFinish(): void {
		this.engine.setWorld(new Level6(this.engine));
	}


}
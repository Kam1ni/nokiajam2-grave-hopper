import { Level } from "./level";
import { Vector2 } from "scrapy-engine";
import { TileBox } from "../entities/tile-box";
import { SpikeRow } from "../entities/spike-row";
import { DrawBridge } from "../entities/draw-bridge";
import { Button } from "../entities/button";
import { RoofSpikeRow } from "../entities/roof-spike-row";
import { Bin } from "../entities/bin";
import { Level3 } from "./level3";

export class Level2 extends Level {
	
	public entry: Vector2 = new Vector2(2, 1);
	public exit: Vector2 = new Vector2(9, 1);
	
	protected buildLevel(): void {
		this.addTile(new TileBox(this.engine, 5, 1, 0, 0))
		this.addTile(new TileBox(this.engine, 1, 1, 9, 0))
		this.addTile(new RoofSpikeRow(this.engine, 1, 4, 4));
		this.addTile(new TileBox(this.engine, 1, 1, 3, 1));
		this.addTile(new TileBox(this.engine, 10, 1, 0, 5))

		let bridge = new DrawBridge(this.engine, 4, 5, 0);
		this.addTile(bridge);

		let button = new Button(this.engine, 4, 1);
		this.addTile(button);
		button.setOnPress(()=>bridge.activate());
		button.setOnRelease(()=>bridge.deactive());

		this.addTile(new Bin(this.engine, 0, 1));
	}

	public onFinish(): void {
		this.engine.setWorld(new Level3(this.engine));
	}
}
import { Level } from "./level";
import { Vector2 } from "scrapy-engine";
import { Tile } from "../entities/tile";
import { TileBox } from "../entities/tile-box";
import { SpikeRow } from "../entities/spike-row";
import { Level2 } from "./level2";

export class Level1 extends Level {
	public entry:Vector2 = new Vector2(0, 1);
	public exit: Vector2 = new Vector2(9, 1);

	public buildLevel(): void {
		this.buildRoof();
		this.addTile(new TileBox(this.engine, 3, 1, 0, 0))
		this.addTile(new TileBox(this.engine, 3, 1, 7, 0))
		this.addTile(new SpikeRow(this.engine, 4, 3, 0));
	}

	public onFinish(): void {
		this.engine.setWorld(new Level2(this.engine));
	}
}
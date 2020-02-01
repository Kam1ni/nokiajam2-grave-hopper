import { Level } from "./level";
import { Vector2 } from "scrapy-engine";
import { Tile } from "../entities/tile";
import { TileBox } from "../entities/tile-box";

export class Level1 extends Level {
	public entry:Vector2 = new Vector2(0, 1);
	public exit: Vector2 = new Vector2(9, 1);

	public buildLevel(): void {
		this.addTile(new TileBox(this.engine, 3, 1, 0, 0))
		this.addTile(new TileBox(this.engine, 3, 1, 7, 0))
	}
}
import { Level } from "./level";
import { Vector2 } from "scrapy-engine";
import { TileBox } from "../entities/tile-box";
import { ArrowDispenser } from "../entities/arrow-dispenser";
import { Direction } from "@/utils/direction";

export class Level3 extends Level {
	public entry: Vector2 = new Vector2(0, 4);	
	public exit: Vector2 = new Vector2(9, 4);

	protected buildLevel(): void {
		this.buildRoof();
		this.buildFloor();
		this.addTile(new TileBox(this.engine, 1, 1, 0, 3));
		this.addTile(new TileBox(this.engine, 1, 1, 9, 3));
		this.addTile(new ArrowDispenser(this.engine, Direction.UP, 1, 1))
	}
	public onFinish(): void {
		throw new Error("Method not implemented.");
	}

}
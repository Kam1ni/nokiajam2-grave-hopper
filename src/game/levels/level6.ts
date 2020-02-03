import { Level } from "./level";
import {Vector2 } from "scrapy-engine";
import { TileBox } from "../entities/tile-box";
import { ArrowDispenser } from "../entities/arrow-dispenser";
import { Direction } from "@/utils/direction";
import { Door } from "../entities/door";
import { Bin } from "../entities/bin";
import { Button } from "../entities/button";

export class Level6 extends Level {
	public entry: Vector2 = new Vector2(2, 1);	
	public exit: Vector2 = new Vector2(9, 4);

	protected buildLevel(): void {
		this.buildFloor();
		this.buildRoof();
		this.addTile(new TileBox(this.engine, 1, 1, 9, 3));
		this.addTile(new TileBox(this.engine, 2, 1, 8, 2));
		this.addTile(new TileBox(this.engine, 3, 1, 7, 1));
		this.addTile(new TileBox(this.engine, 1, 1, 3, 1));
		let door = new Door(this.engine, 1, 8, 4);
		door.activate();
		let dispenser1 = new ArrowDispenser(this.engine, Direction.LEFT, 6, 1);
		let dispenser2 = new ArrowDispenser(this.engine, Direction.LEFT, 7, 2);
		let dispenser3 = new ArrowDispenser(this.engine, Direction.LEFT, 8, 3);
		this.addTile(door);
		this.addTile(dispenser1);
		this.addTile(dispenser2);
		this.addTile(dispenser3);

		dispenser1.interval = 4000;
		dispenser2.interval = 4000;
		dispenser3.interval = 4000;

		let now = new Date().getTime() - dispenser1.interval;
		dispenser1.lastFired = now;
		dispenser2.lastFired = now + 1000;
		dispenser3.lastFired = now + 2000;

		this.addTile(new Bin(this.engine, 0, 1));

		let b = new Button(this.engine, 4, 1);
		this.addTile(b);

		b.setOnRelease(()=>door.activate());
		b.setOnPress(()=>door.deactive());
	}

	public onFinish(): void {
		throw new Error("Method not implemented.");
	}
}
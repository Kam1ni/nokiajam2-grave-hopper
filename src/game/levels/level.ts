import { GameWorld, Vector2, Engine, Vector3, SimObject } from "scrapy-engine";
import { Player } from "../entities/player";
import { Tile } from "../entities/tile";
import { entityPosToTilePos } from "@/utils/position";

export abstract class Level extends GameWorld{
	public abstract entry:Vector2;
	public abstract exit:Vector2;

	public constructor(engine:Engine){
		super(engine);
		this.player = new Player(this.engine);
		this.addChild(this.player)
	}

	protected abstract buildLevel():void;
	public player:Player;

	private ready:boolean = false;

	private tiles:Tile[] = [];

	protected addTile(tile:Tile){
		this.tiles.push(tile);
		this.addChild(tile);
	}

	private resetPlayer():void{
		this.player.transform.position.x = this.entry.x * 8;
		this.player.transform.position.y = this.entry.y * 8;
	}

	public update(dt:number):void{
		if (!this.ready){
			this.buildLevel();
			this.resetPlayer();
			this.ready = true;
		}
		
		super.update(dt);

		let playerPos = entityPosToTilePos(this.player.transform.position)
		if (playerPos.x < 0 || playerPos.x >= 10){
			this.resetPlayer();
		}
		if (playerPos.y < 0 || playerPos.y >= 6){
			this.resetPlayer();
		}

		for (let tile of this.tiles){
			let collision = this.player.hitbox.isTouching(tile.hitbox);
			if (collision){
				tile.onPlayerCollision(this.player, collision);
			}
		}
	}
}
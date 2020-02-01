import { GameWorld, Vector2, Engine, Vector3, SimObject } from "scrapy-engine";
import { Player } from "../entities/player";
import { Tile } from "../entities/tile";

export abstract class Level extends GameWorld{
	public abstract entry:Vector2;
	public abstract exit:Vector2;

	protected abstract buildLevel():void;
	public player:Player;

	private ready:boolean = false;

	private tiles:Tile[] = [];

	protected addTile(tile:Tile){
		this.tiles.push(tile);
		this.addChild(tile);
	}

	private setPlayer():void{
		this.player = new Player(this.engine);
		this.player.transform.position.x = this.entry.x * 8;
		this.player.transform.position.y = this.entry.y * 8;
		this.addChild(this.player);
	}

	public update(dt:number):void{
		if (!this.ready){
			this.buildLevel();
			this.setPlayer();
			this.ready = true;
		}
		
		super.update(dt);

		for (let tile of this.tiles){
			let collision = this.player.hitbox.isTouching(tile.hitbox);
			if (collision){
				tile.onPlayerCollision(this.player, collision);
			}
		}
	}
}
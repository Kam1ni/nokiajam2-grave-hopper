import { GameWorld, Vector2, Engine, Vector3 } from "scrapy-engine";
import { Player } from "../entities/player";

export abstract class Level extends GameWorld{
	public abstract entry:Vector2;
	public abstract exit:Vector2;

	public abstract buildLevel():void;
	public player:Player;

	private ready:boolean = false;

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
	}
}
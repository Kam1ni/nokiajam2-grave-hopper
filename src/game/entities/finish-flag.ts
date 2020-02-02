import { Tile } from "./tile";
import { Engine, Vector2, Vector3, AnimatedSprite } from "scrapy-engine";
import { tilePosToEntityPosInt, entityPosToTilePos } from "@/utils/position";
import { Player } from "./player";
import { Level } from "../levels/level";

export class FinishFlag extends Tile{
	public constructor(engine:Engine, exit:Vector2){
		super(engine);
		this.transform.position.x = tilePosToEntityPosInt(exit.x);
		this.transform.position.y = tilePosToEntityPosInt(exit.y);

		let sprite = new AnimatedSprite(this.engine, "tiles.png", 4, 4);
		sprite.setRenderedLocation(1,2);
		this.addChild(sprite);

		this.hitbox.size.x = tilePosToEntityPosInt(1);
		this.hitbox.size.y = tilePosToEntityPosInt(1);
		this.hitbox.transform.position.x = this.hitbox.size.x / 2;
		this.hitbox.transform.position.y = this.hitbox.size.y / 2;
	}

	public onPlayerCollision(player:Player, collision:Vector3):void{
		let playerCoord = entityPosToTilePos(player.transform.position);
		let thisCoord = entityPosToTilePos(this.transform.position);

		if (playerCoord.x != thisCoord.x){
			return;
		}

		if (playerCoord.y != thisCoord.y){
			return;
		}

		let level = this.getParent() as Level;
		if (level){
			level.levelFinished();
		}
	}
}
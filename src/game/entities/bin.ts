import { Tile } from "./tile";
import { Engine, AnimatedSprite, Vector3 } from "scrapy-engine";
import { tilePosToEntityPosInt, entityPosToTilePos } from "@/utils/position";
import { Player } from "./player";
import { Level } from "../levels/level";

export class Bin extends Tile {
	public constructor(engine:Engine, posX:number = 0, posY:number = 0){
		super(engine);
		let sprite = new AnimatedSprite(this.engine, "tiles.png", 4, 4);
		sprite.setRenderedLocation(2, 1);
		this.addChild(sprite);
		this.hitbox.size.x = tilePosToEntityPosInt(1);
		this.hitbox.size.y = tilePosToEntityPosInt(1);
		this.hitbox.transform.position.x += this.hitbox.size.x / 2;
		this.hitbox.transform.position.y += this.hitbox.size.y / 2;
		this.transform.position.x = tilePosToEntityPosInt(posX);
		this.transform.position.y = tilePosToEntityPosInt(posY);
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
		level.clearTombstones();
	}
}
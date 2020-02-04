import { Tile } from "./tile";
import { Engine, AnimatedSprite, Vector3, Color } from "scrapy-engine";
import { tilePosToEntityPos, tilePosToEntityPosInt, entityPosToTilePos } from "@/utils/position";
import { Player } from "./player";
import { TombStone } from "./tombstone";

export class RoofSpikeRow extends Tile{
	public constructor(engine:Engine, width:number, posX:number = 0, posY:number = 0){
		super(engine);
		for (let i = 0; i < width; i++){
			let tile = new AnimatedSprite(this.engine, "tiles.png", 4, 4);
			tile.setRenderedLocation(0,1);
			tile.transform.position.x = tilePosToEntityPosInt(i);
			this.addChild(tile);
		}

		this.hitbox.size.y = tilePosToEntityPosInt(.5);
		this.hitbox.size.x = tilePosToEntityPosInt(width);
		this.hitbox.transform.position.x += this.hitbox.size.x / 2;
		this.hitbox.transform.position.y += this.hitbox.size.y / 2 + 4;
		this.hitbox.color = Color.red();

		this.transform.position = tilePosToEntityPos(new Vector3(posX, posY));
	}

	public onPlayerCollision(player:Player, collision:Vector3):void{
		player.transform.position.copyFrom(tilePosToEntityPos(entityPosToTilePos(player.transform.position)));
		player.kill();
	}

	public onTombstoneCollision(tombstone:TombStone, collision:Vector3):void{
		return;
	}
}
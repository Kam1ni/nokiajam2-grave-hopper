import { Tile } from "./tile";
import { Engine, Vector3, AnimatedSprite } from "scrapy-engine";
import { entityPosToTilePos, tilePosToEntityPos } from "@/utils/position";

export class TombStone extends Tile {
	public constructor(engine:Engine, tilePos:Vector3){
		super(engine);

		this.hitbox.size.x = 8;
		this.hitbox.size.y = 8;
		this.hitbox.transform.position.x = 4;
		this.hitbox.transform.position.y = 4;
		
		this.transform.position = tilePosToEntityPos(tilePos);
		this.transform.position.z = 1;
		let tile = new AnimatedSprite(this.engine, "tiles.png", 4, 4);
		tile.setRenderedLocation(3,1);
		this.addChild(tile);
	}
}
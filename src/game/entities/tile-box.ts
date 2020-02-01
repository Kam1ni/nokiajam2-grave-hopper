import { SimObject, AnimatedSprite, Engine, BoundingBox, Color } from "scrapy-engine";
import { Tile } from "./tile";
import { tilePosToEntityPosInt } from "@/utils/position";

export class TileBox extends Tile {
	protected tiles:AnimatedSprite[] = [];
	public hitbox:BoundingBox;

	public constructor(engine:Engine, width:number, height:number, posX:number = 0, posY:number = 0){
		super(engine);
		for (let x = 0; x < width; x++){
			for (let y = 0; y < height; y++){
				let tile = new AnimatedSprite(this.engine, "tiles.png", 4, 4);
				tile.setRenderedLocation(1,0);
				tile.transform.position.x = tilePosToEntityPosInt(x);
				tile.transform.position.y = tilePosToEntityPosInt(y);
				this.tiles.push(tile);
				this.addChild(tile);
			}
		}
		this.hitbox.size.x = tilePosToEntityPosInt(width);
		this.hitbox.size.y = tilePosToEntityPosInt(height);
		this.hitbox.transform.position.x += this.hitbox.size.x / 2;
		this.hitbox.transform.position.y += this.hitbox.size.y / 2;
		this.transform.position.x = tilePosToEntityPosInt(posX);
		this.transform.position.y = tilePosToEntityPosInt(posY);
	}
}
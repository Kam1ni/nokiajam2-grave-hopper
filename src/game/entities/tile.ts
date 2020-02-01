import { SimObject, Sprite, Engine, AnimatedSprite, Vector3 } from "scrapy-engine";

export class Tile extends AnimatedSprite {
	public constructor(engine:Engine){
		super(engine, "tiles.png", 4, 4);
		this.setRenderedLocation(1, 0);
	}
}
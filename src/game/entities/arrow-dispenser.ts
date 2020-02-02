import { Tile } from "./tile";
import { Engine, AnimatedSprite } from "scrapy-engine";
import { Direction } from "@/utils/direction";
import { tilePosToEntityPosInt, entityPosToTilePos } from "@/utils/position";
import { degToRad } from "scrapy-engine";
import { Arrow } from "./arrow";
import { Level } from "../levels/level";

export class ArrowDispenser extends Tile {
	public direction:Direction;
	public interval:number = 3000;
	public lastFired:number = new Date().getTime();
	
	public constructor(engine:Engine, direction:Direction, posX:number = 0, posY:number = 0){
		super(engine);
		this.direction = direction;

		let sprite = new AnimatedSprite(this.engine, "tiles.png", 4, 4);
		sprite.setRenderedLocation(2, 2);
		this.addChild(sprite);

		if (direction == Direction.DOWN){
			sprite.transform.rotation.z = degToRad(-90);
			sprite.transform.position.y = tilePosToEntityPosInt(1);
		}
		if (direction == Direction.UP){
			sprite.transform.rotation.z = degToRad(90);
			sprite.transform.position.x = tilePosToEntityPosInt(1);
		}
		if (direction == Direction.LEFT){
			sprite.transform.scale.x = -1;
			sprite.transform.position.x = tilePosToEntityPosInt(1);
		}

		this.transform.position.x = tilePosToEntityPosInt(posX);
		this.transform.position.y = tilePosToEntityPosInt(posY);
		this.transform.position.z = .1;

		this.hitbox.size.x = tilePosToEntityPosInt(1);
		this.hitbox.size.y = tilePosToEntityPosInt(1);
		this.hitbox.transform.position.x = this.hitbox.size.x/2;
		this.hitbox.transform.position.y = this.hitbox.size.y/2;
	}

	public fire(){
		let coord = entityPosToTilePos(this.transform.position);
		if (this.direction == Direction.DOWN){
			coord.y -= 1;
		} else if (this.direction == Direction.UP){
			coord.y += 1;
		} else if (this.direction == Direction.RIGHT){
			coord.x += 1;
		} else {
			coord.x -= 1;
		}

		let arrow = new Arrow(this.engine, this.direction, coord.x, coord.y);
		let level = this.getParent() as Level;
		level.spawnArrow(arrow);
	}

	public update(dt:number):void {
		let diff = new Date().getTime() - (this.lastFired + this.interval);
		if (diff > 0){
			this.lastFired = new Date().getTime() - diff;
			this.fire();
		}

		super.update(dt);
	}
}
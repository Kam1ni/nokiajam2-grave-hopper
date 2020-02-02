import { Engine, SimObject, BoundingBox, AnimatedSprite, degToRad } from "scrapy-engine";
import { Direction } from "@/utils/direction";
import { tilePosToEntityPos, tilePosToEntityPosInt } from "@/utils/position";

const SPEED = 30;

export class Arrow extends SimObject {
	public hitbox:BoundingBox;
	public direction:Direction;

	public constructor(engine:Engine, direction:Direction, posX:number = 0, posY:number = 0){
		super(engine);
		this.direction = direction;
		let sprite = new AnimatedSprite(this.engine, "tiles.png", 4, 4);
		sprite.setRenderedLocation(3, 2);
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

		sprite.transform.position.z = .2;
		
		this.hitbox = new BoundingBox(this.engine);
		this.addChild(this.hitbox);
		this.hitbox.size.x = tilePosToEntityPosInt(1);
		this.hitbox.size.y = tilePosToEntityPosInt(1);
		this.hitbox.transform.position.x = this.hitbox.size.x / 2;
		this.hitbox.transform.position.y = this.hitbox.size.y / 2;

		this.transform.position.x = tilePosToEntityPosInt(posX);
		this.transform.position.y = tilePosToEntityPosInt(posY);
	}

	public update(dt:number){
		let diff = SPEED * (dt / 1000);
		if (this.direction == Direction.RIGHT){
			this.transform.position.x += diff;
		} else if (this.direction == Direction.LEFT){
			this.transform.position.x -= diff;
		} else if (this.direction == Direction.UP){
			this.transform.position.y += diff;
		} else {
			this.transform.position.y -= diff;
		}

		super.update(dt);
	}
}
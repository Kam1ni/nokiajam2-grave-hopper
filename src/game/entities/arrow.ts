import { Engine, SimObject, BoundingBox, AnimatedSprite, degToRad, Color } from "scrapy-engine";
import { Direction } from "@/utils/direction";
import { tilePosToEntityPos, tilePosToEntityPosInt, entityPosToTilePosInt } from "@/utils/position";
import { ArrowDispenser } from "./arrow-dispenser";

const SPEED = 30;

export class Arrow extends SimObject {
	public hitbox:BoundingBox;
	public direction:Direction;
	public sender:ArrowDispenser;

	public constructor(engine:Engine, sender:ArrowDispenser){
		super(engine);
		this.sender = sender;
		this.direction = sender.direction;
		let sprite = new AnimatedSprite(this.engine, "tiles.png", 4, 4);
		sprite.setRenderedLocation(3, 2);
		this.addChild(sprite);

		this.hitbox = new BoundingBox(this.engine);
		this.addChild(this.hitbox);

		this.hitbox.size.x = tilePosToEntityPosInt(1);
		this.hitbox.size.y = tilePosToEntityPosInt(.5);
		this.hitbox.transform.position.x = this.hitbox.size.x / 2;
		this.hitbox.transform.position.y = tilePosToEntityPosInt(.5);
		if (this.direction == Direction.DOWN){
			sprite.transform.rotation.z = degToRad(-90);
			sprite.transform.position.y = tilePosToEntityPosInt(1);
			this.hitbox.size.x = tilePosToEntityPosInt(.5);
			this.hitbox.size.y = tilePosToEntityPosInt(1);
			this.hitbox.transform.position.x = tilePosToEntityPosInt(.5);
			this.hitbox.transform.position.y = this.hitbox.size.y / 2;
		}
		if (this.direction == Direction.UP){
			sprite.transform.rotation.z = degToRad(90);
			sprite.transform.position.x = tilePosToEntityPosInt(1);
			this.hitbox.size.x = tilePosToEntityPosInt(.5);
			this.hitbox.size.y = tilePosToEntityPosInt(1);
			this.hitbox.transform.position.x = tilePosToEntityPosInt(.5);
			this.hitbox.transform.position.y = this.hitbox.size.y / 2; 
		}
		if (this.direction == Direction.LEFT){
			sprite.transform.scale.x = -1;
			sprite.transform.position.x = tilePosToEntityPosInt(1);
		}

		this.hitbox.color = Color.red();

		

		this.transform.position.x = tilePosToEntityPosInt(entityPosToTilePosInt(sender.transform.position.x));
		this.transform.position.y = tilePosToEntityPosInt(entityPosToTilePosInt(sender.transform.position.y));

		this.transform.position.z = .1;
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
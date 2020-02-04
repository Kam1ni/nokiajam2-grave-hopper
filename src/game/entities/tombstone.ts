import { Tile } from "./tile";
import { Engine, Vector3, AnimatedSprite, Vector2, approach } from "scrapy-engine";
import { entityPosToTilePos, tilePosToEntityPos, entityPosToTilePosInt, tilePosToEntityPosInt } from "@/utils/position";
import { Arrow } from "./arrow";

const TERMINAL_VELOCITY = 50;
export class TombStone extends Tile {
	public velocity:Vector2 = new Vector2(0, 0);
	public onGround:boolean = false;

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

	public update(dt:number){
		if (!this.onGround){
			this.velocity.y = approach(this.velocity.y, -TERMINAL_VELOCITY, dt);
			this.transform.position.y += this.velocity.y * dt / 1000;
			if (this.transform.position.y < 0){
				this.transform.position.y = 0;
			}
		}else{
			this.onGround = false;
		}
		super.update(dt);
	}

	public onTombstoneCollision(tombstone:TombStone, collision:Vector3):void{
		if (tombstone.transform.position.y < this.transform.position.y){
			return;
		}
		if (collision.x == 0 && collision.y == 0){
			return;
		}
		if (Math.abs(collision.y) <= Math.abs(collision.x)){
			if (collision.y > 0){
				return;
			}
			tombstone.velocity.y = 0;
			tombstone.onGround = true;
			let coord = entityPosToTilePosInt(this.transform.position.y)
			tombstone.transform.position.y = tilePosToEntityPosInt(coord + 1);
		}
	}

}
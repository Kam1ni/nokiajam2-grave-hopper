import { SimObject, BoundingBox, Vector3, Engine, Color } from "scrapy-engine";
import { Player } from "./player";
import { TombStone } from "./tombstone";
import { entityPosToTilePosInt, tilePosToEntityPosInt, entityPosToTilePos } from "@/utils/position";
import { Arrow } from "./arrow";
import { Direction } from "@/utils/direction";

export abstract class Tile extends SimObject {
	public hitbox:BoundingBox;
	
	public constructor(engine:Engine){
		super(engine)
		this.hitbox = new BoundingBox(engine);
		this.hitbox.color = Color.blue();
		this.addChild(this.hitbox);
	}

	public onPlayerCollision(player:Player, collision:Vector3){
		if (Math.abs(collision.y) < Math.abs(collision.x)) {
			player.transform.position.y -= collision.y;
			if (collision.y > 0 && player.velocity.y > 0) {
				player.velocity.y = 0;
			}else if (collision.y < 0 && player.velocity.y < 0) {
				player.velocity.y = 0;
				player.touchedTheGround = true;
			}
		}else {
			player.transform.position.x -= collision.x;
			if (collision.x > 0 && player.velocity.x > 0) {
				player.velocity.x = 0;
			}else if (collision.x < 0 && player.velocity.x < 0) {
				player.velocity.x = 0;
			}
		}
		player.updateMatrices();
	}

	public onTombstoneCollision(tombstone:TombStone, collision:Vector3):void{
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

	public onArrowCollision(arrow:Arrow, collision:Vector3):boolean{
		if (Math.abs(collision.y) < Math.abs(collision.x)) {
			if (collision.y > 0 && arrow.direction == Direction.UP) {
				return true;
			}else if (collision.y < 0 && arrow.direction == Direction.DOWN) {
				return true;
			}
		}else {
			if (collision.x > 0 && arrow.direction == Direction.RIGHT) {
				return true;
			}else if (collision.x < 0 && arrow.direction == Direction.LEFT) {
				return true;
			}
		}
		return false;
	}

	public getIsActive():boolean {
		return true;
	}
}
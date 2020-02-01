import { SimObject, BoundingBox, Vector3, Engine, Color } from "scrapy-engine";
import { Player } from "./player";

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
}
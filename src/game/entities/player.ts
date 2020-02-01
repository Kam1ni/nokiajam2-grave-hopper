import { Engine, Sprite, Vector2, Keys, approach, BoundingBox } from "scrapy-engine";
import { Level } from "../levels/level";

const MAX_SPEED = 50;
const VERTICAL_SPEED = 150;

export class Player extends Sprite {
	public velocity:Vector2 = new Vector2(0,0);
	public touchedTheGround:boolean = true;
	public hitbox:BoundingBox;


	public constructor(engine:Engine){
		super(engine, "player.png");
		this.hitbox = new BoundingBox(engine);
		this.hitbox.size.x = 8;
		this.hitbox.size.y = 8;
		this.hitbox.transform.position.x += 4;
		this.hitbox.transform.position.y += 4;
		this.addChild(this.hitbox);
	}

	public update(dt:number){
		let acc = dt;
		if (this.engine.input.isKeyDown(Keys.D)){
			this.velocity.x = approach(this.velocity.x, MAX_SPEED, acc)
		}else if (this.engine.input.isKeyDown(Keys.A)){
			this.velocity.x = approach(this.velocity.x, -MAX_SPEED, acc)
		}else {
			this.velocity.x = approach(this.velocity.x, 0, acc);
		}

		if (this.touchedTheGround && this.engine.input.isKeyPressed(Keys.W)){
			this.velocity.y = VERTICAL_SPEED;
			this.touchedTheGround = false;
		}else{
			this.velocity.y = approach(this.velocity.y, -VERTICAL_SPEED, dt);
		}

		this.transform.position.x += this.velocity.x * (dt / 1000);
		this.transform.position.y += this.velocity.y * (dt / 1000);

		super.update(dt);
	}

	public kill():void{
		let parent = this.getParent() as Level;
		parent.killPlayer();
	}
}
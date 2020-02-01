import { Engine, Sprite, Vector2, Keys, approach, BoundingBox } from "scrapy-engine";

const MAX_SPEED = .5;

export class Player extends Sprite {
	public velocity:Vector2 = new Vector2(0,0);
	private touchedTheGround:boolean = true;
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
		let acc = dt/5;
		if (this.engine.input.isKeyDown(Keys.D)){
			this.velocity.x = approach(this.velocity.x, MAX_SPEED, acc)
		}else if (this.engine.input.isKeyDown(Keys.A)){
			this.velocity.x = approach(this.velocity.x, -MAX_SPEED, acc)
		}else {
			this.velocity.x = approach(this.velocity.x, 0, acc);
		}


		this.transform.position.x += this.velocity.x;

		super.update(dt);
	}
}
import { Screen } from "./screen";
import { Level1 } from "./level1";
import { Engine, Sprite, Keys } from "scrapy-engine";

export class StartScreen extends Screen {
	public constructor(engine:Engine){
		super(engine);

		let sprite = new Sprite(this.engine, "start-screen.png");
		sprite.transform.position.x = -2;
		this.addChild(sprite);
		this.fadeIn();
	}

	public onFadeOutFinish(): void {
		this.engine.setWorld(new Level1(this.engine));
	}

	public update(dt:number){
		if (this.engine.input.isKeyReleased(Keys.D)){
			this.fadeOut();
		}
		if (this.engine.input.isKeyReleased(Keys.A)){
			this.fadeOut();
		}
		if (this.engine.input.isKeyReleased(Keys.W)){
			this.fadeOut();
		}
		super.update(dt);
	}
}
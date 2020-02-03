import { Screen } from "./screen";
import { Level1 } from "./level1";
import { Engine, Sprite, Keys } from "scrapy-engine";
import { isActionPressed, Actions, isActionDown } from "@/utils/actions";

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
		super.update(dt);
		if (isActionDown(Actions.JUMP)){
			this.fadeOut();
		}
		if (isActionDown(Actions.MOVE_LEFT)){
			this.fadeOut();
		}
		if (isActionDown(Actions.MOVE_RIGHT)){
			this.fadeOut();
		}
	}
}
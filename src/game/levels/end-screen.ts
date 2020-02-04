import { Screen } from "./screen";
import { StartScreen } from "./start-screen";
import { isActionDown, Actions, isActionReleased } from "@/utils/actions";
import { Engine, Sprite } from "scrapy-engine";

export class EndScreen extends Screen {
	public constructor(engine:Engine){
		super(engine);

		let sprite = new Sprite(this.engine, "end-screen.png");
		sprite.transform.position.x = -2;
		this.addChild(sprite);
		this.fadeIn();
	}

	public update(dt:number):void{
		super.update(dt);
		if (isActionReleased(Actions.JUMP)){
			this.fadeOut();
		}
		if (isActionReleased(Actions.MOVE_LEFT)){
			this.fadeOut();
		}
		if (isActionReleased(Actions.MOVE_RIGHT)){
			this.fadeOut();
		}
	}

	public onFadeOutFinish(): void {
		this.engine.setWorld(new StartScreen(this.engine));
	}

}
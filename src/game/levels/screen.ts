import { GameWorld, Engine, Rect, Keys } from "scrapy-engine";
import { DarkColor } from "@/utils/colors";
import { actionIsPressed, updateActions, Actions, actionIsReleased } from "@/utils/actions";

const VERTICAL_FADE_SPEED = 25;
const HORIZONTAL_FADE_SPEED = 50;

export abstract class Screen extends GameWorld {
	protected fadeBlockLeft:Rect;
	protected fadeBlockRight:Rect;
	protected fadeBlockTop:Rect;
	protected fadeBlockBottom:Rect;
	protected isFadingIn:boolean = false;
	protected isFadingOut:boolean = false;

	public constructor(engine:Engine){
		super(engine);
		this.createFadeBlocks();
	}
	
	private createFadeBlocks(){
		this.fadeBlockBottom = new Rect(this.engine, 88, 24, DarkColor);
		this.fadeBlockTop = new Rect(this.engine, 88, 24, DarkColor);
		this.fadeBlockLeft = new Rect(this.engine, 48, 48, DarkColor);
		this.fadeBlockRight = new Rect(this.engine, 48, 48, DarkColor);

		this.addChild(this.fadeBlockTop);
		this.addChild(this.fadeBlockBottom);
		this.addChild(this.fadeBlockRight);
		this.addChild(this.fadeBlockLeft);
		
		this.fadeBlockTop.transform.position.x = -4;
		this.fadeBlockTop.transform.position.y = 24;

		this.fadeBlockBottom.transform.position.x = -4;
		this.fadeBlockBottom.transform.position.y = 0;

		this.fadeBlockLeft.transform.position.x = -8;
		this.fadeBlockLeft.transform.position.y = 0;

		this.fadeBlockRight.transform.position.x = 40;
		this.fadeBlockRight.transform.position.y = 0;

		this.fadeBlockBottom.transform.position.z = 10;
		this.fadeBlockTop.transform.position.z = 10;
		this.fadeBlockLeft.transform.position.z = 10;
		this.fadeBlockRight.transform.position.z = 10;
	}

	public update(dt:number){
		updateActions();
		if (this.engine.input.isKeyPressed(Keys.W)){
			actionIsPressed(Actions.JUMP);
		}
		if (this.engine.input.isKeyPressed(Keys.A)){
			actionIsPressed(Actions.MOVE_LEFT);
		}
		if (this.engine.input.isKeyPressed(Keys.D)){
			actionIsPressed(Actions.MOVE_RIGHT);
		}

		if (this.engine.input.isKeyReleased(Keys.W)){
			actionIsReleased(Actions.JUMP);
		}
		if (this.engine.input.isKeyReleased(Keys.A)){
			actionIsReleased(Actions.MOVE_LEFT);
		}
		if (this.engine.input.isKeyReleased(Keys.D)){
			actionIsReleased(Actions.MOVE_RIGHT);
		}

		if (this.isFadingIn){
			this.doFadeInFrame(dt);
		}

		if (this.isFadingOut){
			this.doFadeOutFrame(dt);
		}

		super.update(dt);
	}

	
	private doFadeInFrame(dt:number){
		let t = dt/1000;
		this.fadeBlockBottom.transform.position.y -= VERTICAL_FADE_SPEED * t;
		this.fadeBlockTop.transform.position.y += VERTICAL_FADE_SPEED * t;
		this.fadeBlockLeft.transform.position.x -= HORIZONTAL_FADE_SPEED * t;
		this.fadeBlockRight.transform.position.x += HORIZONTAL_FADE_SPEED * t;

		let fadeBottomReached = false;
		let fadeTopReached = false;
		let fadeLeftReached = false;
		let fadeRightReached = false;
		if (this.fadeBlockBottom.transform.position.y <= -24){
			fadeBottomReached = true;
			this.fadeBlockBottom.transform.position.y = -24;
		}
		if (this.fadeBlockTop.transform.position.y >= 48){
			fadeTopReached = true;
			this.fadeBlockTop.transform.position.y = 48;
		}
		if (this.fadeBlockLeft.transform.position.x <= -50){
			fadeLeftReached = true;
			this.fadeBlockLeft.transform.position.x = -50;
		}
		if (this.fadeBlockRight.transform.position.x >= 84){
			fadeRightReached = true;
			this.fadeBlockRight.transform.position.x = 84;
		}

		if (fadeBottomReached && fadeTopReached && fadeLeftReached && fadeRightReached){
			this.isFadingIn = false;
		}
	}

	private doFadeOutFrame(dt:number){
		let t = dt/1000;
		this.fadeBlockBottom.transform.position.y += VERTICAL_FADE_SPEED * t;
		this.fadeBlockTop.transform.position.y -= VERTICAL_FADE_SPEED * t;
		this.fadeBlockLeft.transform.position.x += HORIZONTAL_FADE_SPEED * t;
		this.fadeBlockRight.transform.position.x -= HORIZONTAL_FADE_SPEED * t;

		let fadeBottomReached = false;
		let fadeTopReached = false;
		let fadeLeftReached = false;
		let fadeRightReached = false;
		if (this.fadeBlockBottom.transform.position.y >= 0){
			fadeBottomReached = true;
			this.fadeBlockBottom.transform.position.y = 0;
		}
		if (this.fadeBlockTop.transform.position.y <= 24){
			fadeTopReached = true;
			this.fadeBlockTop.transform.position.y = 24;
		}
		if (this.fadeBlockLeft.transform.position.x >= -8){
			fadeLeftReached = true;
			this.fadeBlockLeft.transform.position.x = -8;
		}
		if (this.fadeBlockRight.transform.position.x <= 40){
			fadeRightReached = true;
			this.fadeBlockRight.transform.position.x = 40;
		}

		if (fadeBottomReached && fadeTopReached && fadeLeftReached && fadeRightReached){
			this.isFadingOut = false;
			this.onFadeOutFinish();
		}
	}

	public fadeOut():void{
		if (this.isFadingOut){
			return;
		}
		this.isFadingOut = true;
		this.isFadingIn = false;
	}

	public fadeIn():void{
		if (this.isFadingIn){
			return;
		}
		this.isFadingOut = false;
		this.isFadingIn = true;
	}

	public abstract onFadeOutFinish():void;
}
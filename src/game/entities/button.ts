import { Tile } from "./tile";
import { Engine, AnimatedSprite, Vector2, Vector3 } from "scrapy-engine";
import { Player } from "./player";
import { TombStone } from "./tombstone";
import { tilePosToEntityPos, tilePosToEntityPosInt, entityPosToTilePos, entityPosToTilePosInt } from "@/utils/position";
import { Arrow } from "./arrow";

export class Button extends Tile {
	private pressed:boolean = false;
	private hasBeenPressedThisFrame:boolean = false;
	private onPress:Function;
	private onRelease:Function;

	public constructor(engine:Engine, posX:number = 0, posY:number = 0){
		super(engine);
		let sprite = new AnimatedSprite(engine, "tiles.png", 4, 4);
		sprite.setRenderedLocation(3,0);
		this.addChild(sprite);
		this.transform.position.x = tilePosToEntityPosInt(posX);
		this.transform.position.y = tilePosToEntityPosInt(posY);
		this.hitbox.size.x = tilePosToEntityPosInt(1);
		this.hitbox.size.y = tilePosToEntityPosInt(.4);
		this.hitbox.transform.position.x = this.hitbox.size.x / 2;
		this.hitbox.transform.position.y = this.hitbox.size.y / 2;
	}

	public isPressed():boolean{
		return this.pressed;
	}

	public press():void{
		this.hasBeenPressedThisFrame = true;
		if(this.pressed){
			return;
		}
		this.pressed = true;
		if(this.onPress){
			this.onPress();
		}
	}

	public release():void{
		if(!this.isPressed){
			return;
		}
		this.pressed = false;
		if (this.onRelease){
			this.onRelease();
		}
	}

	public setOnPress(onPress:Function):void{
		this.onPress = onPress;
	}

	public setOnRelease(onRelease:Function):void{
		this.onRelease = onRelease;
	}

	public update(dt:number):void{
		if (!this.hasBeenPressedThisFrame){
			this.release();
		}
		this.hasBeenPressedThisFrame = false;
		super.update(dt);
	}


	public onPlayerCollision(player:Player, collision:Vector3):void{
		this.press();
	}

	public onTombstoneCollision(tombstone:TombStone, collision:Vector3):void{
		let tombstoneCoordX = entityPosToTilePosInt(tombstone.transform.position.x);
		let thisCoordX = entityPosToTilePosInt(this.transform.position.x);
		if (tombstoneCoordX != thisCoordX){
			return;
		}
		this.press();
	}

	public onArrowCollision(arrow:Arrow, collision:Vector3):boolean{
		return false;
	}
}
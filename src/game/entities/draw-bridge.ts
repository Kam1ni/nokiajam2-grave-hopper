import { Tile } from "./tile";
import { TileBox } from "./tile-box";
import { Engine } from "scrapy-engine";
import { tilePosToEntityPos, tilePosToEntityPosInt } from "@/utils/position";

export class DrawBridge extends TileBox {
	private isActive:boolean = false;

	public constructor(engine:Engine, width:number, posX:number = 0, posY:number = 0){
		super(engine, width, 1, posX, posY);
		for(let tile of this.tiles){
			tile.setRenderedLocation(2, 0);
		}
		this.hitbox.size.y = tilePosToEntityPosInt(0.5);
		this.hitbox.transform.position.y = this.hitbox.size.y + 2;
	}

	public activate():void{
		this.isActive = true;
	}

	public deactive():void {
		this.isActive = false;
	}

	public setActiveState(active:boolean):void {
		this.isActive = active;
	}

	public getIsActive():boolean{
		return this.isActive;
	}

	public render():void{
		if (!this.isActive){
			return;
		}
		super.render();
	}
}
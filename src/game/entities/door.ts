import { Tile } from "./tile";
import { Engine } from "scrapy-engine";
import { TileBox } from "./tile-box";
import { tilePosToEntityPosInt } from "@/utils/position";

export class Door extends TileBox {
	private isActive:boolean = false;

	public constructor(engine:Engine, height:number, posX:number = 0, posY:number = 0){
		super(engine, 1, height, posX, posY);
		for(let tile of this.tiles){
			tile.setRenderedLocation(0, 3);
		}
		this.hitbox.size.x = tilePosToEntityPosInt(1);
		this.hitbox.size.y = tilePosToEntityPosInt(height);
		this.hitbox.transform.position.x = this.hitbox.size.x / 2;
		this.hitbox.transform.position.y = this.hitbox.size.y / 2;
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
import { Vector3 } from "scrapy-engine";

export function entityPosToTilePosInt(pos:number):number{
	return Math.round(pos/8);
}

export function entityPosToTilePos(pos:Vector3):Vector3 {
	return new Vector3(entityPosToTilePosInt(pos.x), entityPosToTilePosInt(pos.y), 0);
}

export function tilePosToEntityPosInt(pos:number):number{
	return pos*8;
}

export function tilePosToEntityPos(pos:Vector3):Vector3{
	return new Vector3(tilePosToEntityPosInt(pos.x), tilePosToEntityPosInt(pos.y), 0);
}
import { GameWorld, Vector2, Engine, Vector3, SimObject } from "scrapy-engine";
import { Player } from "../entities/player";
import { Tile } from "../entities/tile";
import { entityPosToTilePos, entityPosToTilePosInt } from "@/utils/position";
import { TombStone } from "../entities/tombstone";
import { FinishFlag } from "../entities/finish-flag";
import { TileBox } from "../entities/tile-box";
import { Arrow } from "../entities/arrow";

const MAX_TOMBSTONES = 10;
export abstract class Level extends GameWorld{
	public abstract entry:Vector2;
	public abstract exit:Vector2;

	public constructor(engine:Engine){
		super(engine);
		this.player = new Player(this.engine);
		this.addChild(this.player)
	}

	protected abstract buildLevel():void;
	public player:Player;

	private ready:boolean = false;

	private tiles:Tile[] = [];
	private tombStones:TombStone[] = [];
	private arrows:Arrow[] = [];

	protected addTile(tile:Tile){
		this.tiles.push(tile);
		this.addChild(tile);
	}

	private resetPlayer():void{
		this.player.transform.position.x = this.entry.x * 8;
		this.player.transform.position.y = this.entry.y * 8;
	}

	private buildFrame():void{
		this.addTile(new TileBox(this.engine, 1, 6, -1, 0));
		this.addTile(new TileBox(this.engine, 1, 6, 10, 0));
	}

	protected buildFloor():void{
		this.addTile(new TileBox(this.engine, 10, 1, 0, 0))
	}

	protected buildRoof():void{
		this.addTile(new TileBox(this.engine, 10, 1, 0, 5))
	}

	public update(dt:number):void{
		if (!this.ready){
			this.buildLevel();
			this.buildFrame();
			this.resetPlayer();
			this.addTile(new FinishFlag(this.engine, this.exit));
			this.ready = true;
		}
		
		super.update(dt);

		let playerPos = entityPosToTilePos(this.player.transform.position)
		if (playerPos.x < 0 || playerPos.x >= 10){
			this.resetPlayer();
		}
		if (playerPos.y < 0 || playerPos.y >= 6){
			this.resetPlayer();
		}

		for (let tombstone of this.tombStones){
			if (!tombstone.getIsActive()){
				return;
			}
			for (let tile of this.tiles){
				if (tile == tombstone) {
					continue;
				}
				if (!tile.getIsActive()){
					continue;
				}
				let collision = tombstone.hitbox.isTouching(tile.hitbox);
				if (!collision){
					continue;
				}
				tile.onTombstoneCollision(tombstone, collision);
			}
		}

		for (let i = this.arrows.length - 1; i >= 0; i--){
			let arrow = this.arrows[i];
			let collision = arrow.hitbox.isTouching(this.player.hitbox);
			if (collision){
				if (collision.x != 0 && collision.y != 0){
					this.killPlayer();
					this.arrows.splice(i, 1);
					this.removeChild(arrow);
					continue;
				}
			}
			
			for (let tile of this.tiles){
				collision = arrow.hitbox.isTouching(tile.hitbox);
				if (collision){
					if (tile.onArrowCollision(arrow, collision)){
						this.arrows.splice(i, 1);
						this.removeChild(arrow);
						break;
					}
				}
			}
		}

		for (let tile of this.tiles){
			if (!tile.getIsActive()){
				continue;
			}
			let collision = this.player.hitbox.isTouching(tile.hitbox);
			if (collision){
				tile.onPlayerCollision(this.player, collision);
			}
		}
	}


	public levelFinished():void{
		//TODO: implement fadeout
		this.onFinish();
	}

	public abstract onFinish():void;

	public killPlayer():void{
		let tilePos = entityPosToTilePos(this.player.transform.position)
		let tombstone = new TombStone(this.engine, tilePos);
		let position = tombstone.transform.position;
		this.resetPlayer();

		if (this.tombStones.length >= MAX_TOMBSTONES){
			return;
		}

		for (let tombstone of this.tombStones){
			if (tombstone.transform.position.x == position.x){
				if (tombstone.transform.position.y == position.y){
					return;
				}
			}
		}
		this.addTile(tombstone);
		this.tombStones.push(tombstone);
	}

	private removeTombstone(tombstone:TombStone){
		let i = this.tombStones.indexOf(tombstone);
		for (let c = this.tiles.length -1; c >= 0; c--){
			if (tombstone == this.tiles[c]){
				this.tiles.splice(c, 1);
			}
		}
		this.tombStones.splice(i, 1);
		this.removeChild(tombstone);
	}

	public clearTombstones():void {
		for (let i = this.tombStones.length - 1; i >= 0; i--){
			let tombstone = this.tombStones[i];
			for (let c = this.tiles.length -1; c >= 0; c--){
				if (tombstone == this.tiles[c]){
					this.tiles.splice(c, 1);
				}
			}
			this.tombStones.splice(i, 1);
			this.removeChild(tombstone);
		}
	}

	public spawnArrow(arrow:Arrow){
		this.arrows.push(arrow);
		this.addChild(arrow);
	}
}
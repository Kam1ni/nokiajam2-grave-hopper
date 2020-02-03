export enum Actions {
	MOVE_LEFT,
	MOVE_RIGHT,
	JUMP
}

let justPressedActions = [] as Actions[];
let justReleasedActions = [] as Actions[];
let pressedActions = [] as Actions[];
let queuedPressedActions = [] as Actions[];
let queuedReleaseActions = [] as Actions[];

function addActionToList(action:Actions, list:Actions[]){
	if (list.indexOf(action) == -1){
		list.push(action);
	}
}

export function isActionDown(action:Actions):boolean{
	return pressedActions.indexOf(action) != -1;
}

export function isActionPressed(action:Actions):boolean {
	return justPressedActions.indexOf(action) != -1;
}

export function isActionReleased(action:Actions):boolean {
	return justReleasedActions.indexOf(action) != -1;
}

export function updateActions():void{
	justPressedActions = [];
	justReleasedActions = [];
	for (let action of queuedPressedActions){
		actionIsPressed(action);
	}
	for (let action of queuedReleaseActions){
		actionIsReleased(action);
	}
	queuedPressedActions = [];
	queuedReleaseActions = [];
}

export function actionIsPressed(action:Actions):void {
	addActionToList(action, justPressedActions);
	addActionToList(action, pressedActions);
}

export function actionIsReleased(action:Actions):void {
	addActionToList(action, justReleasedActions);
	let i = pressedActions.indexOf(action);
	if (i != -1){
		pressedActions.splice(i, 1);
	}
}

export function queuePressedAction(action:Actions):void{
	addActionToList(action, queuedPressedActions);
}

export function queueReleasedAction(action:Actions):void{
	addActionToList(action, queuedReleaseActions);
}
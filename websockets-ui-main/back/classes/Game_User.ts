import User from "./User";
import WebSocket from "ws";
export default class Game_User extends User {
    gameId: string;
    ws_connection: WebSocket | null;
    ships: Array<{
        position: {x: number, y: number},
        direction: boolean,
        length: number,
        type: "small"|"medium"|"large"|"huge"
    }> = []
    your_turn: Boolean = false;
    matrix: Array<Array<number>> = Array.from({ length: 10 }, () => Array(10).fill(0));
    constructor(name:string, index:string, ws_connection: WebSocket|null = null, password:string, gameId:string){
        super(name, index, password);
        this.gameId = gameId;
        this.ws_connection = ws_connection as WebSocket;
    }
}
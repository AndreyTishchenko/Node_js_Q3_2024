import WebSocket from "ws";
import { winners } from "../../database";
import WebSocketSend from "../ws/WsSend";
export default function updateWinners(ws_connection: WebSocket) {
    let winnersArray: {name: string, wins: number}[] = [];
    for (const [key, value] of winners) {
        winnersArray.push(value);
    }

    WebSocketSend(ws_connection, JSON.stringify({
        type: 'update_winners',
        data: JSON.stringify(winnersArray),
        id: 0
    }))
}
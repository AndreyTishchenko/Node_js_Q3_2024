import Room from "../../classes/Room";
import {users, rooms} from "../../database"
import crypto from 'crypto'
import WebSocket from "ws";
import WebSocketSend from "../ws/WsSend";
export default function createRoom(ws: WebSocket){
    // Use Map's values() method to find the user
    const user = Array.from(users.values()).find(element => element.ws_connection === ws) || null;
    if (user) { // TypeScript already knows user is not null here
        const id = user.index;
        const RoomId = crypto.createHash('md5').update(String(id)).digest('hex');
        rooms.set(RoomId, new Room(RoomId));
        const room = rooms.get(RoomId);
        if (room) {
            room.users.push({id: id, name: user.name});
        }
        let freeRooms = Array<{roomId: string, roomUsers: Array<{id: string, name: string}>}>();
        rooms.forEach((room) => {
            if (room.users.length < 2) {
                freeRooms.push(({roomId: room.RoomId, roomUsers: room.users}));
            }
        });
        users.forEach((client) => {
            if (client.ws_connection !== null) {
                let freeRoomsForThisUser = freeRooms.filter(room => !room.roomUsers.some(user => user.id === client.index));
                WebSocketSend(client.ws_connection, JSON.stringify({
                    type: "update_room",
                    data: JSON.stringify(freeRoomsForThisUser),
                    id: 0,
                }))
            }
        });
    } else {
        console.error("User not found for the given WebSocket connection.");
    }
}
import WebSocket from 'ws'
import {rooms, users} from '../../database'
import User from '../../classes/User';
import WebSocketSend from '../ws/WsSend'
import createGame from '../game/createGame';
export default function AddUserToRoom(ws: WebSocket, data: {indexRoom: string}){
    const room = rooms.get(data.indexRoom);
    if (!room) {
        return;
    }
    let user: User|undefined;
    users.forEach( (user1) => {
        if (user1.ws_connection == ws) { 
            user = user1;
        }
    })
    if (user !== undefined) {
        room.users.push({name: user.name, id: user.index});
    }

    rooms.set(data.indexRoom, room);
    let freeRooms = Array<{roomId: string, roomUsers: Array<{id: string, name: string}>}>();
    rooms.forEach((room) => {
        if (room.users.length < 2) {
            freeRooms.push(({roomId: room.RoomId, roomUsers: room.users}));
        }
    });
    users.forEach((client) => {
        if (client.ws_connection !== null) {
            let freeRoomsFroThisUser = freeRooms.filter(room => !room.roomUsers.some(user => user.id === client.index));
            WebSocketSend(client.ws_connection, JSON.stringify({
                type: "update_room",
                data: JSON.stringify(freeRoomsFroThisUser),
                id: 0,
            }))
        }
    });
    createGame(data.indexRoom)
}
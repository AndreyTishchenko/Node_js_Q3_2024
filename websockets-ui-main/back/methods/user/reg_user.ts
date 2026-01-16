import User_Creds from '../../types/User_creds';
import {rooms, users} from '../../database';
import WebSocket from "ws";
import crypto from 'crypto';
import WebSocketSend from '../ws/WsSend';
import { wss } from '../../websocketServer';
import { json } from 'stream/consumers';
import updateWinners from './updateWinners';

export default function reg_user(dataObject: User_Creds, ws: WebSocket) {
    const id = crypto.createHash('md5').update(String(dataObject.name)).digest('hex');
    const user = users.get(id);
    if (user && user.password === dataObject.password) {
        if (user.ws_connection) {
            WebSocketSend(ws, JSON.stringify({
                type: "reg",
                data: JSON.stringify({
                    name: dataObject.name,
                    index: id,
                    error: true,
                    errorText: 'User is already logged in'
                }),
                id: 0,
            }))
        } else {
            user.ws_connection = ws;
            WebSocketSend(user.ws_connection, JSON.stringify({
                type: "reg",
                data: JSON.stringify({
                    name: dataObject.name,
                    index: users.size,
                    error: false,
                    errorText: ''
                }),
                id: 0,
            }))

            users.forEach((client) => {
                if (client.ws_connection !== null) {
                    updateWinners(client.ws_connection)
                }
            });

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
        }
    } else {
        WebSocketSend(ws, JSON.stringify({
            type: "reg",
            data: JSON.stringify({
                name: dataObject.name,
                index: id,
                error: true,
                errorText: 'Wrong password'
            }),
            id: 0,
        }))
    }
}
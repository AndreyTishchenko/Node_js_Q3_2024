import WebSocket from 'ws';
import crypto from 'crypto'
import { wss } from './websocketServer';
import reg_user from './methods/user/reg_user';
import {users} from './database';
import addUserToDB from './methods/user/addUserToDB'
import createRoom from './methods/room/createRoom';
import AddUserToRoom from './methods/room/addUserToRoom'
import User from './classes/User';
import ShipsRequestValidation from './methods/validation/ShipsRequestValidation'
import attackHandler from "./methods/game/Attack"
export default function router(data: string, ws: WebSocket) {
    let dataObject = JSON.parse(data);
    switch (dataObject.type) {
        case "reg":
            let userData = JSON.parse(dataObject.data)
            const userCreds = JSON.parse(dataObject.data)
            const id = crypto.createHash('md5').update(String(userData.name)).digest('hex');
            ws.on('close', () => {
                (users.get(id) as User).ws_connection = null;
            })
            if (users.has(id)){
                reg_user(userCreds, ws);
            }else{
                addUserToDB(userCreds, ws)
            }
            break;
        case "create_room":
            createRoom(ws);
            break
        case "add_user_to_room":
            AddUserToRoom(ws, JSON.parse(dataObject.data))
            break;
        case "add_ships":
            ShipsRequestValidation(JSON.parse(dataObject.data))
            break;
        case "attack":
            attackHandler(JSON.parse(dataObject.data))
            break;
        case "randomAttack":
            attackHandler(dataObject.data)
            break;
        default:
            throw new Error("Unknown type");
    }
}
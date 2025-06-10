import UserCreds from '../../types/User_creds'
import {users} from '../../database';
import User from '../../classes/User'
import WebSocket from "ws";
import crypto from 'crypto';
import reg_user from './reg_user';

export default function addUserToDB(dataObject: UserCreds, ws: WebSocket) {
    const id = crypto.createHash('md5').update(String(dataObject.name)).digest('hex');
    users.set(id, new User(String(dataObject.name), id, String(dataObject.password)))
    reg_user(dataObject, ws)
}
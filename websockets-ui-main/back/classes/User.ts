import WebSocket from 'ws'
export default class User {
    name: string;
    index: string;
    ws_connection: WebSocket|null = null;
    password: string;
    
    constructor(name:string, index:string, password:string){
        this.name = name
        this.index = index
        this.password = password
    }
}

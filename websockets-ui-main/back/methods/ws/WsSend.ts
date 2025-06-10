import WebSocket from 'ws'
export default function WebSocketSend (ws_connection: WebSocket, body: string): void{
    ws_connection.send(body)
}
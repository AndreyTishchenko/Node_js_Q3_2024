import WebSocket, { WebSocketServer } from 'ws';
import router from './Router';
const wss = new WebSocketServer({
    port: 3000,
})
wss.on('connection', (ws) => {
//Optional: listen for messages from the client
    ws.on('message', function message(data) {
        let string_data = data.toString();
        router(string_data, ws);
    });
});
export { wss }

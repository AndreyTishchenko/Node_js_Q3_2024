export default class Room {
    RoomId: string;
    users: Array<{id:string, name:string}> = [];
    constructor(index: string) {
        this.RoomId = index;
    }
}
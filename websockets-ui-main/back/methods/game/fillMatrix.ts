import Game_User from '../../classes/Game_User'
export default function fillMatrix(player: Game_User):void {
    let filledMatrix: Array<Array<number>> = player.matrix;
    player.ships.forEach((ship) => {
        if(ship.type == 'small'){
            filledMatrix[ship.position.y][ship.position.x] = 1;
        }else{
            let length = ship.length;
            let direction = ship.direction ? 'vertical' : 'horizontal'
            for (let i = 0; i < length; i++){
                if(direction === 'horizontal'){
                    filledMatrix[ship.position.y][ship.position.x + i] = 1; 
                }else if(direction === 'vertical'){
                    filledMatrix[ship.position.y + i][ship.position.x] = 1; 
                }
            }
        }
    })
    player.matrix = filledMatrix;
}
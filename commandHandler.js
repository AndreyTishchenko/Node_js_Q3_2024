import process from 'node:process';
import cd from './commands/cd.js';
import up from './commands/up.js';
import ls from './commands/ls.js';
import cat from './commands/cat.js';
import add from './commands/add.js';
import rm from './commands/rm.js';
import osFunc from './commands/os.js';
import hash_calculator from './commands/hash_calculator.js';
async function commandHandler(command, payload) {
    switch (command) {
        case '.exit':
            process.exit(0);
        case 'up':
            if (payload.length > 0) {
                throw new Error('Invalid input');
            } else {
                await up()
            }
            break;
        case 'cd':
            await cd(payload);
            break;
        case 'ls':
            if (payload.length > 0) {
                throw new Error('Invalid input');
            }
            await ls()
            break;
        case 'cat':
            await cat(payload).catch((error) => {
                console.log(error.message);
            })
            break;
        case 'add':
            if (payload.length == 0) {
                throw new Error('Invalid input');
            }
            await add(payload)
            break
        case 'rm':
            if (payload.length == 0) {
                throw new Error('Invalid input');
            }
            rm(payload).catch((error) => {
                console.log(error.message);
            })
            break;
        case 'os':
            await osFunc(payload);
            break;
        case 'hash':
            if (payload.length == 0) {
                throw new Error('Invalid input');
            }
            await hash_calculator(payload);
            break
        default:
            throw new Error('Invalid input');
    }
}
export default commandHandler;
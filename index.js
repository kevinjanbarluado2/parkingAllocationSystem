/*
 * @Author: Kevin Jan Barluado 
 * @Date: 2022-03-08 10:25:58 
 * @Github: https://github.com/kevinjanbarluado2 
 * */

import { Parking } from './Parking.js'
import readline from 'readline'
import chalk from 'chalk';

const parking = new Parking();

const company = "XYZ Corp || Parking Allocation System \n";
console.log(chalk.blue(company));
const prompt = `SELECT ACTION: \np - Park, \nu - Unpark, \nm - View Map, \nx - Exit \n\n:`

const cli = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt
})
cli.prompt()

cli.on('line', (line) => {
    switch (line.trim()) {
        case 'x':
            cli.close()
            break
        case 'p':

            cli.question('Vehicle size [ s - Small, m - Medium, l -Large ]: ', function (v) {
                cli.question(`Entrance [1-3]: `, function (entrance) {
                    parking.park(v, entrance)
                    cli.prompt()
                })

            })

            break

        case 'u':
            cli.question('Location of vehicle to unpark. Seperate by a space [row column]: ', function (loc) {
                let stclioc = loc.trim().split(' ')

                if (stclioc.length >= 2) {
                    let row = stclioc[0]
                    let col = stclioc[1]
                    parking.unpark(row, col)

                }
            })
            break
        case 'm':
            parking.viewMap()
            break
        default:
            break;
    }
    cli.prompt();

}).on('close', () => {
    console.log(chalk.red('Closing App...Thank you'));
    process.exit(0);

});
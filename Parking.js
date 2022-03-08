/*
 * @Author: Kevin Jan Barluado 
 * @Date: 2022-03-08 10:25:58 
 * @Github: https://github.com/kevinjanbarluado2 
 * */

import chalk from 'chalk';

export class Parking {

    constructor() {
        this.maxRow = 3; // can be defined later
        this.maxColumn = 5; // can be defined later
        this.parkingArea = this.createPark(this.maxRow, this.maxColumn);
    }

    viewMap() {
        console.log(this.parkingArea);
    }

    park(carSize, ent) {
        let entrance = ent - 1;
        let searchNearest = this.parkingArea[entrance];
        let getSize = this.getSize(carSize);

        let findParking = false;

        for (let index = 0; index < searchNearest.length; index++) {
            if (getSize <= searchNearest[index].size && searchNearest[index].occupied === false) {
                searchNearest[index].occupied = true;
                searchNearest[index].details = { date: new Date(), size: carSize }
                findParking = true;
                break;
            }
        }

        if (findParking) {
            console.log(chalk.blue(('Successfully Parked!\n')));
            return this.parkingArea;
        } else {
            console.log(chalk.red('Unable to find parking\n'));
        }
    }

    unpark(row, col) {
        let [r, c] = [row - 1, col - 1]

        let obj = this.parkingArea[r][c];
        if (obj !== undefined && obj.occupied === true) {
            obj.occupied = false;
            console.log(chalk.blue(('Successfully Unparked!\n')));
            console.log(chalk.underline.blue((`Fee: ₱${this.computeFee(obj.details.size, (new Date()) - obj.details.date)} \n`)))
            delete obj.details
            return this.parkingArea;
        } else {
            console.log('Parking is not Occupied Yet.\n\n')
        }

    }

    computeFee = (s, totalTime) => {
        let size = this.getSize(s)
        let _24 = 1000 * 60 * 24
        let _1h = 1000 * 60
        let charges = 0
        let hourlyCharge = 0

        switch (size) {
            case 0: hourlyCharge = 20; break
            case 1: hourlyCharge = 60; break
            case 2: hourlyCharge = 100; break
        }

        //  For parking that exceeds 24 hours, every full 24 hour chunk is charged 5,000 pesos regardless of parking slot.
        if (totalTime > _24) {
            let n24 = parseInt(totalTime / _24)
            charges += n24 * 5000
            totalTime -= (n24 * _24)
        }

        // First 3 hours + 40
        if (totalTime > (_1h * 3)) {
            totalTime -= (_1h * 3)
            charges += 40
        }

        // Accumulate charges accordingly depending on car size

        if (totalTime > 0) {
            let remainingHours = Math.ceil(totalTime / _1h)
            charges += remainingHours * hourlyCharge
        }

        // return total charges
        return charges

    }

    getSize(sizeChar) {
        switch (sizeChar.toLowerCase().trim()) {
            case 's': return 0; break;
            case 'm': return 1; break;
            case 'l': return 2; break;
            default: return null; break
        }
    }

    createPark = () => {
        let park = [];
        for (let x = 0; x < this.maxRow; x++) {
            let parkRow = [];
            for (let y = 0; y < this.maxColumn; y++) {
                parkRow.push(this.randomizePark(x, y));
            }
            park.push(parkRow)
        }
        return park;
    }

    randomizePark = (r, c) => {
        //Small Park = 0;Medium Park = 1; Large Park = 2
        const { floor, random } = Math;
        let [row, col] = [r + 1, c + 1]

        //parking sizes
        const sizeArr = ['SP', 'MP', 'LP']
        const size = floor(random() * 3)
        const desc = sizeArr[size]
        return {
            size, desc, row, col, occupied: false
        }
    }
}


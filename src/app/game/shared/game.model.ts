import { Point } from './point.model';
import { Line } from './line.model';

export class CrissCoss {
    moves: Point[] = [];

    __winLine = null;

    get winLine() {
        return this.__winLine;
    }

    get crisses() {
        return this.moves.filter((v, i) => i % 2);
    }

    get crosses() {
        return this.moves.filter((v, i) => !(i % 2));
    }

    private neighbors(point: Point): Point[] {
        return this.lastPlayer == 0 ?
            this.crosses.filter(p => !Point.equal(point, p) && Point.isNeighbors(point, p)) :
            this.crisses.filter(p => !Point.equal(point, p) && Point.isNeighbors(point, p));
    }

    get lastPlayer(): number {
        return (this.moves.length - 1) % 2;
    }

    private lines: Line[][] = [[], []];

    constructor(public dimX: number, public dimY: number) { }

    private isEmpty(pos: Point): boolean {
        return !this.moves.find(v => v.x == pos.x && v.y == pos.y);
    }
    
    addMove(point: Point) {
        if (this.winLine) return;
        if (this.isEmpty(point)) {
            this.moves.push(point);
        }
        let added = this.lines[this.lastPlayer].filter(line => line.addPoint(point));
        this.neighbors(point).forEach(p => {
            if (added.every(line => !line.contains(p))) {
                let newLine = new Line(point);
                newLine.addPoint(p);
                this.lines[this.lastPlayer].push(newLine);
                added.push(newLine);
            }
        });

        let pairs: {[index: string]: Line[]} = {};
        added.forEach(line => {
            if (pairs[line.directionString]) {
                pairs[line.directionString].push(line)
            } else {
                pairs[line.directionString] = [line];
            }
        });
        for (let pair in pairs) {
            if (pairs[pair].length == 2) {
                let newLine = Line.merge(...pairs[pair]);
                this.lines[this.lastPlayer].splice(this.lines[this.lastPlayer].indexOf(pairs[pair][0]), 1);
                this.lines[this.lastPlayer].splice(this.lines[this.lastPlayer].indexOf(pairs[pair][1]), 1);
                this.lines[this.lastPlayer].push(newLine);
                added.splice(this.lines[this.lastPlayer].indexOf(pairs[pair][0]), 1);
                added.splice(this.lines[this.lastPlayer].indexOf(pairs[pair][1]), 1);
                added.push(newLine);
            }
        }

        this.__winLine = added.find(line => line.length == 5);
        if (this.winLine) return;

    }
}
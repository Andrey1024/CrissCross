import { Line } from './line-instance';
import { Point } from './point-instance';
import { Game, MoveResult } from '../game.model';

export class CrissCoss {
    moves: Point[] = [];

    private lines: Line[][] = [[], []];

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


    private mergeLines(line1: Line, line2: Line) {        
        let newLine = Line.merge(line1, line2);
        this.lines[this.lastPlayer].splice(this.lines[this.lastPlayer].indexOf(line1), 1);
        this.lines[this.lastPlayer].splice(this.lines[this.lastPlayer].indexOf(line2), 1);
        this.lines[this.lastPlayer].push(newLine);
        return newLine;
    }

    
    isEmpty(pos: Point): boolean {
        return !this.moves.find(v => v.x == pos.x && v.y == pos.y);
    }
    
    addMove(point: Point): MoveResult {
        if (this.isEmpty(point)) {
            this.moves.push(point);
        } else {
            return {
                ended: false
            }
        }
        
        let added = this.lines[this.lastPlayer].filter(line => line.addPoint(point));
        this.neighbors(point).forEach(p => {
            if (added.every(line => !line.contains(p))) {
                let newLine = new Line(point);
                newLine.addPoint(p);
                added.push(newLine);
                this.lines[this.lastPlayer].push(newLine);
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
                this.mergeLines(pairs[pair][0], pairs[pair][1]);
            }
        }
        const winLine = this.lines[this.lastPlayer].find(line => line.length >= 5);

        if (winLine) {
            return {
                ended: true,
                winLine: winLine
            }
        } else {
            return {
                ended: false
            }
        }
    }

    isEnded(): boolean {
        return this.lines.some(lines => lines.some(line => line.length >= 5));
    }

    getState(): Game {
        return {
            lines: this.lines,
            moves: this.moves
        }
    }

    constructor(public dimX: number, public dimY: number) { }
}
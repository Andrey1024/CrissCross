import { LineImpl } from './line';
import { PointImpl } from './point';
import { Game, MoveResult } from '../game.model';
import { Point } from '../point.model';
import { Line } from '../line.model';

export class CrissCross implements Game {
    moves: PointImpl[] = [];
    lines: LineImpl[][] = [[], []];

    private get crisses() {
        return this.moves.filter((v, i) => i % 2);
    }

    private get crosses() {
        return this.moves.filter((v, i) => !(i % 2));
    }

    private neighbors(point: PointImpl): PointImpl[] {
        return this.lastPlayer == 0 ?
            this.crosses.filter(p => !PointImpl.equal(point, p) && PointImpl.isNeighbors(point, p)) :
            this.crisses.filter(p => !PointImpl.equal(point, p) && PointImpl.isNeighbors(point, p));
    }

    private get lastPlayer(): number {
        return (this.moves.length - 1) % 2;
    }

    private mergeLines(line1: LineImpl, line2: LineImpl) {
        let newLine = LineImpl.merge(line1, line2);
        this.lines[this.lastPlayer].splice(this.lines[this.lastPlayer].indexOf(line1), 1);
        this.lines[this.lastPlayer].splice(this.lines[this.lastPlayer].indexOf(line2), 1);
        this.lines[this.lastPlayer].push(newLine);
        return newLine;
    }

    isLineOpen(line: LineImpl): boolean {
        return this.isEmpty(PointImpl.sub(line.first, line.direction))
            && this.isEmpty(PointImpl.add(line.last , line.direction));
    }

    isEmpty(pos: Point): boolean {
        return !this.moves.find(v => v.x == pos.x && v.y == pos.y);
    }

    addMove(pos: Point): MoveResult {
        let point = new PointImpl(pos.x, pos.y);

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
                let newLine = new LineImpl(point);
                newLine.addPoint(p);
                added.push(newLine);
                this.lines[this.lastPlayer].push(newLine);
            }
        });

        let pairs: { [index: string]: LineImpl[] } = {};
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

    static fromState(state: Game): CrissCross {
        let res = new CrissCross(15, 15);
        res.moves = state.moves.map(p => new PointImpl(p.x, p.y));
        res.lines = state.lines.map(v => v.map(line => {
            let l = new LineImpl();
            l.points = line.points.map(p => new PointImpl(p.x, p.y));
            return l;
        }))
        return res;
    }

    getCandidates(): Point[] {
        return [].concat(...this.moves.map(p => PointImpl.getNearby(p, 1)))
            .filter((v, i, s) => s.findIndex(p => PointImpl.equal(p, v)) == i)
            .filter(p => this.isEmpty(p));
    }

    constructor(public dimX: number, public dimY: number) { }
}
import { CrissCross } from './criss-cross';
import { Game } from '../game.model';
import { Point } from '../point.model';

interface Tree {
    value: number;
    move?: Point;
}


function evaluate(state: CrissCross): number {
    if (state.lines[0].map(line => line.points.length).findIndex(len => len >= 5) !== -1) {
        return 1000;
    }
    if (state.lines[1].map(line => line.points.length).findIndex(len => len >= 5) !== -1) {
        return -1000;
    }
    const sum = state.lines.map(line => line.reduce((prev, cur) => {
        if (cur.length == 4 && state.isLineOpen(cur)) return 1000;
        return prev += cur.points.length * (state.isLineOpen(cur) ? cur.points.length : cur.points.length + 2);
    }, 0));
    return sum[0] >= 1000 ? 1000 : (sum[1] >= 1000 ? -1000 : sum[0] - sum[1]);
}

export class AI {
    maxLevel = 3;

    getMove(state: CrissCross): Point {
        return this.getTree(state, 0, 1, -1000, 1000).move;
    }

    private getTree(state: CrissCross, player: number, level: number, alpha: number, beta: number): Tree {
        if (level == this.maxLevel) {
            return { value: evaluate(state) };
        }
        let candidates = state.getCandidates();
        let value = 0;
        let move: Point = candidates[0];
        for (let i = 0; i < candidates.length; i++) {
            let game = CrissCross.fromState(state);
            game.addMove(candidates[i]);
            let tree = this.getTree(game, (player + 1) % 2, level + 1, alpha, beta);
            if (player) {
                if (alpha < tree.value) {
                    move = candidates[i];
                }
                alpha = Math.max(alpha, tree.value);
                value = alpha;
            } else {
                if (beta > tree.value) {
                    move = candidates[i];
                }
                beta = Math.min(beta, tree.value);
                value = beta;
            }

            if (alpha > beta) {
                return {
                    value: value,
                    move: move
                }
            }
        }

        return {
            value: value,
            move: move
        }
    }
}
// cube.js

/*
 *      WHITE
 * RED  BLUE ORANGE
 *      YELLOW
 *      GREEN
 *
 *  BLUE is main face
 */


export function getIndex(x, y, z) {
	return 100 * x + 10 * y + z + 9000;
}

function getPosition(index) { // Never used
	const z = index - Math.floor(index / 10) * 10;
	index = Math.floor(index / 10);
	const y = index - Math.floor(index / 10) * 10;
	index = Math.floor(index / 10);
	const x = index - Math.floor(index / 10) * 10;
	index = Math.floor(index / 10);

	return {
		x,
		y,
		z
	}
}

export function defaultCubieColors() {
	return {
		FRONT: 'blue',
		TOP: 'white',
		LEFT: 'red',
		RIGHT: 'orange',
		BOTTOM: 'yellow',
		BACK: 'green'
	}
}

export function dummyCubieColors() {
	return {
		FRONT: 'pink',
		TOP: 'pink',
		LEFT: 'pink',
		RIGHT: 'pink',
		BOTTOM: 'pink',
		BACK: 'pink'
	}

}

class Cubie {
	constructor(x, y, z) {
		this.x = x;
		this.y = y;
		this.z = z;
		this.colors = defaultCubieColors();
		this.initialIndex = getIndex(x, y, z);
	}
}

export class Cube {
	constructor() {
		this.cubies = {};

		for(let z = 0; z < 3; ++z) {
			for(let y = 0; y < 3; ++y) {
				for(let x = 0; x < 3; ++x) {
					this.cubies[getIndex(x, y, z)] = new Cubie(x, y, z);
				}
			}
		}
	}

}

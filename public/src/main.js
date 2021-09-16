// main.js

function resizeCanvas(canvas) {
	const dW = canvas.clientWidth;
	const dH = canvas.clientHeight;

	if(dW != canvas.width || dH != canvas.height) {
		canvas.width = dW;
		canvas.height = dH;
	}
}

/*
 *      WHITE
 * RED  BLUE ORANGE
 *      YELLOW
 *      GREEN
 *
 *  BLUE is main face
 */

function getIndex(x, y, z) {
	return 100 * x + 10 * y + z + 9000;
}

function getPosition(index) {
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

function defaultCubieColors() {
	return {
		FRONT: 'blue',
		TOP: 'white',
		LEFT: 'red',
		RIGHT: 'orange',
		BOTTOM: 'yellow',
		BACK: 'green'
	}
}

function dummyCubieColors() {
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

class Cube {
	constructor() {
		this.cubies = {};

		for(let z = 0; z < 3; ++z) {
			for(let y = 0; y < 3; ++y) {
				for(let x = 0; x < 3; ++x) {
					this.cubies[getIndex(x, y, z)] = new Cubie(x, y, z);
				}
			}
		}

		this.cubies[9000].colors = dummyCubieColors();
	}

}


function rotateCubeFaceZ() { // NOTE: implementation not finished
	const newColorRotation = defaultCubieColors();
	const newCubies = { ...this.cubies };
	
	for(let y = 0; y < 3; ++y) {
		for(let x = 0; x < 3; ++x) {
			const oldIndex = getIndex(x, y, 0);

		}
	}

}

const defaultFaceArray = ['FRONT', 'TOP', 'LEFT', 'RIGHT', 'BOTTOM', 'BACK'];

function shouldDrawCubieFace(x, y, z, face) {
	switch(face) {
		case 'FRONT': {
			return z == 0;
		} break;
		case 'TOP': {
			return y == 0;
		} break;
		case 'LEFT': {
			return x == 0;
		} break;
		case 'RIGHT': {
			return x == 2;
		} break;
		case 'BOTTOM': {
			return y == 2;
		} break;
		case 'BACK': {
			return z == 2;
		} break;
	}
}

function getDrawPosition(x_p, y_p, z_p, face) {
	let x = 0, y = 0;
	const dx = x_p * 32, dy = y_p * 32, dz = z_p * 32;
	const r_dx = (2 - x_p) * 32, r_dy = (2 - y_p) * 32, r_dz = (2 - z_p) * 32;
	const fS = 32 * 3;

	switch(face) {
		case 'FRONT': {
			x += fS + dx;
			y += fS + dy;
		} break;
		case 'TOP': {
			x += fS + dx;
			y += 0 + r_dz;
		} break;
		case 'LEFT': {
			x += 0 + r_dz;
			y += fS + dy;
		} break;
		case 'RIGHT': {
			x += fS * 2 + dz;
			y += fS + dy;
		} break;
		case 'BOTTOM': {
			x += fS + dx;
			y += fS * 2 + dz;
		} break;
		case 'BACK': {
			x += fS + dx;
			y += fS * 3 + r_dy;
		} break;
	}

	return {
		x,
		y
	};
}

function drawCube(context, cube) {
	for(let z_p = 0; z_p < 3; z_p++) {
		for(let y_p = 0; y_p < 3; ++y_p) {
			for(let x_p = 0; x_p < 3; ++x_p) {
				const index = getIndex(x_p, y_p, z_p);

				for(let i = 0; i < 6; ++i) {
					const face = defaultFaceArray[i];
					if(!shouldDrawCubieFace(x_p, y_p, z_p, face)) continue;

					const { x, y } = getDrawPosition(x_p, y_p, z_p, face);
					context.beginPath();

					context.fillStyle = cube.cubies[index].colors[face];
					context.fillRect(x, y, 32, 32);
				
					context.strokeStyle = 'black';
					context.strokeRect(x, y, 32, 32);

					context.fillStyle = 'black';
					context.font = 'normal 10px sans-serif';
					context.fillText(index, x + 5, y + 17);

					context.fill();
					context.stroke();
				}

			}
		}
	}
	
}

function main() {
	const cc = document.getElementById('screen');
	const ctx = cc.getContext('2d');

	const cube = new Cube();

	// Simulation loop
	let lastTime = 0;
	function loop(time) {
		const dt = (time - lastTime) / 1000;
		lastTime = time;

		resizeCanvas(ctx.canvas);

		// Process Input
		// Update
		// Draw
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

		// Draw cube
		drawCube(ctx, cube);

		// Draw HUD
		ctx.fillStyle = 'black';
		ctx.font = "bold 16px sans-serif"
		ctx.fillText("FPS: " + Math.floor(1.0 / dt).toString(), 430, 20);
		ctx.fill();

		requestAnimationFrame(loop);
	}

	requestAnimationFrame(loop);
}

main();

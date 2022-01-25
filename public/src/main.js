// main.js
import { Cube } from './cube.js';
import { drawCube } from './rendering.js';
import { reverseCubeHistory, applyRotations } from './rotations.js';

function resizeCanvas(canvas) {
	const dW = canvas.clientWidth;
	const dH = canvas.clientHeight;

	if(dW != canvas.width || dH != canvas.height) {
		canvas.width = dW;
		canvas.height = dH;
	}
}

function resizeCanvasFromContext(context) {
	resizeCanvas(context.canvas);
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

function draw(ctx, cube) {
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

	drawCube(ctx, cube);
}

function main() {
	const cc = document.getElementById('screen');
	const ctx = cc.getContext('2d');

	const cube = new Cube();

	const motions = [ 
		"U", "D", "L", "R", "F", "B",
		"U'", "D'", "L'", "R'", "F'", "B'"
	];

	for(let i = 0; i < motions.length; ++i) {
		const motion = motions[i];
		const el = document.getElementsByClassName(motion)[0];
		el.addEventListener("click", e => applyRotations(cube, motion));
	}

	document.getElementById("reverse").addEventListener("click", e => reverseCubeHistory(cube));

	resizeCanvasFromContext(ctx);
	
	let lastTime = 0;
	function loop(time) {
		const dt = (time - lastTime) / 1000;
		lastTime = time;

		resizeCanvas(ctx.canvas);

		draw(ctx, cube);

		requestAnimationFrame(loop);
	}

	requestAnimationFrame(loop);
}

main();

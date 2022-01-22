// rendering.js
import { getIndex } from './cube.js'; 

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

export function drawCube(context, cube) {
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


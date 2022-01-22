// rotations.js
import { getIndex } from './cube.js';

// Z rotations
function rotateCubieZ(cubie) {
	const newColors = { ...cubie.colors };

	// FRONT: no change
	// BACK: no change
	newColors.TOP = cubie.colors.LEFT;
	newColors.RIGHT = cubie.colors.TOP;
	newColors.BOTTOM = cubie.colors.RIGHT;
	newColors.LEFT = cubie.colors.BOTTOM;

	return newColors;
}

function rotateCubeFaceZ(cube, layer, reverse) {
	const numRotations = reverse ? 3 : 1;
	for(let i = 0; i < numRotations; ++i) {
		const newCubies = { ...cube.cubies };
		
		for(let y = 0; y < 3; ++y) {
			for(let x = 0; x < 3; ++x) {

				// Rotate clockwise
				// First transpose
				// Then reverse rows

				const oldIndex = getIndex(x, y, layer);
				const newIndex = getIndex(2 - y, x, layer);

				newCubies[newIndex] = cube.cubies[oldIndex];
				
				// We need to actually ROTATE the CUBIE
				newCubies[newIndex].colors = rotateCubieZ(newCubies[newIndex]);
			}
		}

		cube.cubies = { ...newCubies };
	}
}

// Y rotations
function rotateCubieY(cubie) {
	const newColors = { ...cubie.colors };

	// TOP: no change
	// BOTTOM: no change
	newColors.FRONT = cubie.colors.RIGHT;
	newColors.LEFT = cubie.colors.FRONT;
	newColors.BACK = cubie.colors.LEFT;
	newColors.RIGHT = cubie.colors.BACK;

	return newColors;
}

function rotateCubeFaceY(cube, layer, reverse) {
	const numRotations = reverse ? 3 : 1;
	for(let i = 0; i < numRotations; ++i) {
		const newCubies = { ...cube.cubies };
		
		for(let z = 0; z < 3; ++z) {
			for(let x = 0; x < 3; ++x) {

				// Rotate clockwise
				// First transpose
				// Then reverse rows

				const oldIndex = getIndex(x, layer, 2 - z);
				const newIndex = getIndex(2 - z, layer, 2 - x);

				newCubies[newIndex] = cube.cubies[oldIndex];
				
				// We need to actually ROTATE the CUBIE
				newCubies[newIndex].colors = rotateCubieY(newCubies[newIndex]);
			}
		}

		cube.cubies = { ...newCubies };
	}
}

// X rotations
function rotateCubieX(cubie) {
	const newColors = { ...cubie.colors };

	// LEFT: no change
	// RIGHT: no change
	newColors.FRONT = cubie.colors.TOP;
	newColors.BOTTOM = cubie.colors.FRONT;
	newColors.BACK = cubie.colors.BOTTOM;
	newColors.TOP = cubie.colors.BACK;

	return newColors;
}

function rotateCubeFaceX(cube, layer, reverse) {
	const numRotations = reverse ? 3 : 1;
	for(let i = 0; i < numRotations; ++i) {
		const newCubies = { ...cube.cubies };
		
		for(let y = 0; y < 3; ++y) {
			for(let z = 0; z < 3; ++z) {

				// Rotate clockwise
				// First transpose
				// Then reverse rows

				const oldIndex = getIndex(layer, y, 2 - z);
				const newIndex = getIndex(layer, z, y);

				newCubies[newIndex] = cube.cubies[oldIndex];
				
				// We need to actually ROTATE the CUBIE
				newCubies[newIndex].colors = rotateCubieX(newCubies[newIndex]);
			}
		}

		cube.cubies = { ...newCubies };
	}
}

function applyRotation(cube, rotation) {
	const reversed = (rotation.length == 2);

	switch(rotation[0]) {
		case "F": rotateCubeFaceZ(cube, 0, reversed); break; 
		case "B": rotateCubeFaceZ(cube, 2, !reversed); break;  
		case "L": rotateCubeFaceX(cube, 0, reversed); break;  
		case "R": rotateCubeFaceX(cube, 2, !reversed); break;  
		case "U": rotateCubeFaceY(cube, 0, reversed); break;  
		case "D": rotateCubeFaceY(cube, 2, !reversed); break; 
		default: console.log(`Rotation '${rotation}' not recognized.`); break;
	}
}

export function applyRotations(cube, rotationStr) {
	const rotations = rotationStr.split(" ");

	rotations.forEach(rotation => applyRotation(cube, rotation));
}

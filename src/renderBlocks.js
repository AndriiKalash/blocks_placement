import { getRandomColor } from './services/rendomColor';

export function renderBlocks(result, container) {
  const fullness = document.getElementById('fullness');
  fullness.innerText = `Fullness: ${result.fullness.toFixed(4)}`;
  container.innerHTML = '';
  const usedColors = {};

  result.blockCoordinates.forEach((coordinates, index) => {
    const block = document.createElement('div');

    block.className = 'block';
    block.style.top = `${coordinates.top}px`;
    block.style.left = `${coordinates.left}px`;
    block.style.width = `${coordinates.right - coordinates.left}px`;
    block.style.height = `${coordinates.bottom - coordinates.top}px`;

    const innerIndex = document.createElement('p');
    innerIndex.innerText = index;
    innerIndex.className = 'index';
    block.appendChild(innerIndex);

    // unique color for each block size
    const blockSize = `${coordinates.right - coordinates.left}x${
      coordinates.bottom - coordinates.top
    }`;
    const color = usedColors[blockSize] || getRandomColor();
    usedColors[blockSize] = color;
    block.style.backgroundColor = color;

    container.appendChild(block);
  });
}

export function getPlace(blocks, container) {
  const modifiedBlocks = [...blocks];

  // Sort blocks in descending order of area
  modifiedBlocks.sort((a, b) => b.width * b.height - a.width * a.height);

  const blockCoordinates = [];
  let fullness = 0;
  let remainingSpace = container.width * container.height;

  const occupiedPositions = Array.from({ length: container.height }, () =>
    Array(container.width).fill(false)
  );

  for (let i = 0; i < modifiedBlocks.length; i++) {
    const block = modifiedBlocks[i];
    let position = findAvailablePosition(
      container,
      block.width,
      block.height,
      occupiedPositions
    );

    // If the block doesn't fit, rotate it
    if (!position && block.width !== block.height) {
      const temp = block.width;
      block.width = block.height;
      block.height = temp;
      position = findAvailablePosition(
        container,
        block.width,
        block.height,
        occupiedPositions
      );
    }

    if (position) {
      const { top, left } = position;

      // Mark the positions as occupied by the current block
      for (let y = top; y < top + block.height; y++) {
        for (let x = left; x < left + block.width; x++) {
          occupiedPositions[y][x] = true;
        }
      }
      const coordinates = {
        top,
        left,
        right: left + block.width,
        bottom: top + block.height,
      };

      blockCoordinates.push(coordinates);

      let blocksSpace = 0;
      blocksSpace += block.width * block.height;
      fullness = 1 - (remainingSpace - blocksSpace) / remainingSpace;
    } else {
      console.warn(`Block ${i} cannot be placed.`);
    }
  }
  return { fullness, blockCoordinates };
}

function findAvailablePosition(container, width, height, occupiedPositions) {
  for (let y = container.height - height; y >= 0; y--) {
    for (let x = 0; x <= container.width - width; x++) {
      // Check if the position is available
      if (
        isPositionAvailable(container, x, y, width, height, occupiedPositions)
      ) {
        return { top: y, left: x };
      }
    }
  }

  return null;
}

function isPositionAvailable(
  container,
  x,
  y,
  width,
  height,
  occupiedPositions
) {
  // Check if the position is within the container boundaries
  if (x + width > container.width || y + height > container.height) {
    return false;
  }

  // Check if the positions are already occupied
  for (let i = y; i < y + height; i++) {
    for (let j = x; j < x + width; j++) {
      if (occupiedPositions[i][j]) {
        return false;
      }
    }
  }

  return true;
}

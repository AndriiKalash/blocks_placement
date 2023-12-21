import { getPlace } from './algoritm.js';
import { fetchBlocks } from './services/blockService.js';
import { renderBlocks } from './renderBlocks.js';

const container = document.getElementById('container');

async function initializeApp() {
  const blocks = await fetchBlocks();

  function initializeRender(width, height) {
    const result = getPlace(blocks, { width, height });
    renderBlocks(result, container);
  }
  initializeRender(container.clientWidth, container.clientHeight);

  window.addEventListener('resize', () => {
    initializeRender(container.clientWidth, container.clientHeight);
  });
}

document.addEventListener('DOMContentLoaded', initializeApp);

export async function fetchBlocks() {
  try {
    const response = await fetch('../blocks.json');
    const blocks = await response.json();
    return blocks;
  } catch (error) {
    console.error('Error fetching blocks.json:', error);
    return [];
  }
}

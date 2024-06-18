const fs = require('fs-extra');
async function moveBuild() {
  try {
    await fs.remove('./dist'); // Remove existing dist folder if it exists
    await fs.copy('./.next', './dist'); // Copy .next contents to dist
    console.log('Build moved to dist folder successfully!');
  } catch (err) {
    console.error('Error moving build to dist folder:', err);
  }
}
moveBuild();

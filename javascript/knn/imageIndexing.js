export const imageIndexing = (base, fileCount, fileType) => {
  const images = [];
  let img;
  for (let j = 0; j < fileCount; j++) {
    img = new Image();
    if (j > 9) { // assuming, for simplicity's sake, that any dataset I feed it will not exceed 100 images :)
      img.src = base.slice(0, -1) + j + '.' + fileType;
    } else {
      img.src = base + j + '.' + fileType;
    }
    images.push(img)
  }
  return images
}

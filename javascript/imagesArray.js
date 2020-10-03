const imagesArray = (base, fileCount, fileType) => {
  const images = [];
  let img;
  for (let i = 0; i < fileCount; i++) {
    img = new Image();
    if (i > 9) { // assuming, for simplicity's sake, that any dataset I feed it will not exceed 99 images :)
      img.src = base.slice(0, -1) + i + '.' + fileType;
    } else {
      img.src = base + i + '.' + fileType;
    }
    images.push(img)
  }
  return images
}

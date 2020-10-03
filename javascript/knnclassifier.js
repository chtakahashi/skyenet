
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

const classifier = knnClassifier.create();
const trainKNN = async function (skyeImages, catImages) {
  // Create the classifier.

  // Load mobilenet.
  const mobilenetModule = await mobilenet.load();

  // Add MobileNet activations to the model repeatedly for all classes.

  // train the model on Skye
  for (let i = 0; i < skyeImages.length; i++) {
    const image = skyeImages[i]
    const img = tf.browser.fromPixels(image);
    const logits = mobilenetModule.infer(img, 'conv_preds');
    classifier.addExample(logits, 'Skye');
  }

  // train the model on cats that aren't Skye
  for (let i = 0; i < catImages.length; i++) {
    const image = catImages[i]
    const img = tf.browser.fromPixels(image);
    const logits = mobilenetModule.infer(img, 'conv_preds');
    classifier.addExample(logits, 'An impostor')
  }

  // Make a prediction.
  const x = tf.browser.fromPixels(document.getElementById('test1'));
  const xlogits = mobilenetModule.infer(x, 'conv_preds');
  const result1 = await classifier.predictClass(xlogits);
  console.log(result1)
  const resultObj = document.getElementById('result')
  if (result1.label === 'Skye') {
    resultObj.innerText = 'This is a picture of Skye!'
  } else {
    resultObj.innerText = "This is an impostor!"
  }
}

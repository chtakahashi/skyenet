
// Create the classifier.
const classifier = knnClassifier.create();
const myKNN = async function (skyeImages, catImages, target) {

  // Load mobilenet.
  const mobilenetModule = await mobilenet.load();

  // Add MobileNet activations to the model repeatedly for all classes.
  console.log('Training...')
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
  console.log("Training complete!")
  console.log("Predicting...")
  // Make a prediction.
  const x = tf.browser.fromPixels(target);
  const xlogits = mobilenetModule.infer(x, 'conv_preds');
  const result1 = await classifier.predictClass(xlogits);
  console.log(result1)
  const resultObj = document.getElementById('result')
  if (result1.label === 'Skye') {
    resultObj.innerText = `We are ${result1.confidences[result1.label]*100}% confident this is a picture of Skye!`
  } else {
    resultObj.innerText = `We are ${result1.confidences[result1.label]*100}% confident this is an impostor!`
  }
  console.log("Prediction complete!")
}

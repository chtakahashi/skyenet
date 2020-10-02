export const training = async function (skyeImages, catImages) {
  // Create the classifier.
  const classifier = knnClassifier.create();

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
}


const skyeImages = imagesArray('/skye_training/skye_00', 7, 'png')
const catImages = imagesArray('/cats/cat_000', 10, 'jpg')

export const predict = async function () {
  // Make a prediction.
  const x = tf.browser.fromPixels(document.getElementById('test1'));
  const xlogits = mobilenetModule.infer(x, 'conv_preds');
  const result1 = await classifier.predictClass(xlogits);
  const resultObj = document.getElementById('result')
  if (result1.label === 'Skye') {
    resultObj.innerText = 'This is a picture of Skye!'
  } else {
    resultObj.innerText = "This is an impostor!"
  }
}

init();

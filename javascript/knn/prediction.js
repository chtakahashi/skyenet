export const predict = async function () {
  // Make a prediction.
  const x = tf.browser.fromPixels(document.getElementById('test1'));
  const xlogits = mobilenetModule.infer(x, 'conv_preds');
  const result1 = await classifier.predictClass(xlogits);
  return result1.label
}

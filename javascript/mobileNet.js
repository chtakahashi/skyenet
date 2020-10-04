const mobileNetApp = async function (img) {
  const mobilenetModule = await mobilenet.load();
  const predictions = await mobilenetModule.classify(img)
  console.log('MobileNet classification: ', predictions)
  return predictions
}

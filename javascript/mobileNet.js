const mobileNetApp = async function (img) {
  const mobilenetModule = await mobilenet.load();
  const predictions = await mobilenetModule.classify(img)
  return predictions
}

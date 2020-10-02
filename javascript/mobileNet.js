const mobileNetApp = async function (str) {
  const mobilenetModule = await mobilenet.load();
  const img = document.getElementById(str)
    const predictions = await mobilenetModule.classify(img)
  console.log('Predictions: ', predictions)
}

mobileNetApp('class0')
mobileNetApp('test1')

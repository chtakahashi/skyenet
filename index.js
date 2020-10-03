const initMobile = async function () {
  console.log(await mobileNetApp('class0'))
  console.log(await mobileNetApp('test1'))
}

initMobile()

const skyeImages = imagesArray('/skye_training/skye_00', 7, 'png')
const catImages = imagesArray('/cats/cat_000', 13, 'jpg')

initKNN(skyeImages, catImages)

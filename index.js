// DOM Manipulation

// Grab the image input field
const input = document.querySelector('input');

// Grab the uploaded field, where the uploaded image will be displayed
const preview = document.querySelector('.preview');

input.addEventListener('change', updateImageDisplay);

async function updateImageDisplay() {
  while (preview.firstChild) {
    preview.removeChild(preview.firstChild);
  }

  const curFiles = input.files;
  if (curFiles.length === 0) {
    const para = document.createElement('p');
    para.textContent = 'No files currently selected for upload';
    preview.appendChild(para);
  } else {
    const list = document.createElement('ol');
    preview.appendChild(list);
    let image;
    for (const file of curFiles) {
      const listItem = document.createElement('div');
      const para = document.createElement('p');
      if (validFileType(file)) {
        image = document.createElement('img');
        image.src = URL.createObjectURL(file);

        listItem.appendChild(image);
        listItem.appendChild(para);
      } else {
        para.textContent = `File name ${file.name}: Not a valid file type. Update your selection.`;
        listItem.appendChild(para);
      }

      list.appendChild(listItem);
    }
    const resultObj = document.getElementById('result')
    resultObj.innerText = 'Predicting...'
    const body = document.getElementById('body')
    const mobileNetResults = document.getElementById('mobilenetResults')
    body.appendChild(mobileNetResults)
    const result = await mobileNetApp(image)
    console.log(result)
    while (mobileNetResults.firstChild) {
      mobileNetResults.removeChild(mobileNetResults.firstChild)
    }
    result.map(x => {
      const child = document.createElement('div')
      child.innerText = `${x.className} with ${(x.probability * 100).toFixed(2)}% confidence`
      mobileNetResults.appendChild(child)
    })

    const skyeImages = imagesArray('/skye_training/skye_00', 7, 'png')
    const catImages = imagesArray('/cats/cat_000', 13, 'jpg')
    myKNN(skyeImages, catImages, image)
  }
}

const fileTypes = [
  "image/apng",
  "image/bmp",
  "image/gif",
  "image/jpeg",
  "image/pjpeg",
  "image/png",
  "image/svg+xml",
  "image/tiff",
  "image/webp",
  "image/x-icon"
];

function validFileType(file) {
  return fileTypes.includes(file.type);
}

function returnFileSize(number) {
  if (number < 1024) {
    return number + 'bytes';
  } else if (number >= 1024 && number < 1048576) {
    return (number / 1024).toFixed(1) + 'KB';
  } else if (number >= 1048576) {
    return (number / 1048576).toFixed(1) + 'MB';
  }
}

// mobileNetApp('class0')


// trainKNN(skyeImages, catImages)

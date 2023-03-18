const Tesseract = require('tesseract.js')
const fs = require('fs')
const path = require('path')
const ExcelJS = require('exceljs')
const imageToAscii = require('image-to-ascii')
const Jimp = require('jimp')

const inputDir = './images/png'
const outputExcelFile = './SerialNumbers.xlsx'

async function preprocessImage(imagePath) {
  const outputFile = path.join(path.dirname(imagePath), 'preprocessed.png')
  const image = await Jimp.read(imagePath)
  await image
    .resize(600, Jimp.AUTO) // Resize image to make the text larger
    .greyscale() // Convert to grayscale
    .contrast(0.35) // Increase the contrast
    .normalize() // Normalize the image
    .writeAsync(outputFile)
  return outputFile
}

;(async () => {
  const files = fs.readdirSync(inputDir)
  const workbook = new ExcelJS.Workbook()
  const worksheet = workbook.addWorksheet('Serial Numbers')

  worksheet.columns = [
    { header: 'FILENAME', key: 'filename', width: 20 },
    { header: 'SERIAL NUMBER', key: 'serialNumber', width: 20 }
  ]

  let rowIndex = 1

  for (const file of files) {
    const fullPath = path.join(inputDir, file)

    if (fs.lstatSync(fullPath).isFile()) {
      const isPng = path.extname(file).toLowerCase() === '.png'

      if (isPng) {
        try {
          const preprocessedImagePath = await preprocessImage(fullPath)
          const imageBuffer = fs.readFileSync(preprocessedImagePath)

          imageToAscii(imageBuffer, (err, converted) => {
            if (err) {
              console.error(`Error converting image to ASCII: ${err.message}`)
            } else {
              console.log(converted)
            }
          })

          const {
            data: { text }
          } = await Tesseract.recognize(preprocessedImagePath, 'eng', {
            logger: console.log,
            oem: 3, // Use LSTM only
            psm: 6 // Assume a single block of text
          })
          const serialNumber = text.trim()

          const row = worksheet.addRow({ filename: file, serialNumber })

          const imageId = workbook.addImage({
            buffer: imageBuffer,
            extension: path.extname(file).slice(1)
          })

          worksheet.addImage(imageId, {
            tl: { col: 2.5, row: rowIndex - 0.5 },
            br: { col: 3.5, row: rowIndex + 0.5 }
          })

          rowIndex++
        } catch (error) {
          console.error(`Error processing ${file}: ${error.message}`)
        }
      }
    }
  }

  await workbook.xlsx.writeFile(outputExcelFile)
  console.log('The Excel file has been successfully created.')
})()

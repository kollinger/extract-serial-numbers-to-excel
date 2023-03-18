const fs = require('fs')
const path = require('path')
const heicConvert = require('heic-convert')

async function convertHeicToPng(inputHeic, outputPng) {
  try {
    // Check if input HEIC file exists
    if (!fs.existsSync(inputHeic)) {
      console.error(`Input file does not exist: ${inputHeic}`)
      return
    }

    console.log(`Converting HEIC to PNG: ${inputHeic}`)

    const inputBuffer = fs.readFileSync(inputHeic)
    const outputBuffer = await heicConvert({
      buffer: inputBuffer, // the content of the HEIC file
      format: 'PNG', // output format
      quality: 1 // the quality of the output image, ranging from 0 to 1
    })

    fs.writeFileSync(outputPng, outputBuffer)

    // Check if output PNG file is created successfully
    if (!fs.existsSync(outputPng)) {
      console.error(`Failed to create output PNG: ${outputPng}`)
      return
    }

    console.log(`Successfully converted HEIC to PNG: ${outputPng}`)
  } catch (error) {
    console.error(`Error converting HEIC to PNG: ${inputHeic}`, error)
  }
}

function processFolder(inputFolderPath, outputFolderPath) {
  if (!fs.existsSync(inputFolderPath)) {
    console.error(`Input folder does not exist: ${inputFolderPath}`)
    return
  }

  if (!fs.existsSync(outputFolderPath)) {
    fs.mkdirSync(outputFolderPath)
  }

  const files = fs.readdirSync(inputFolderPath)

  files.forEach(file => {
    const inputFilePath = path.join(inputFolderPath, file)
    const ext = path.extname(file).toLowerCase()

    if (ext === '.heic') {
      const outputFileName = path.basename(file, ext) + '.png'
      const outputFilePath = path.join(outputFolderPath, outputFileName)
      convertHeicToPng(inputFilePath, outputFilePath)
    }
  })
}

processFolder('./images', './images/png')

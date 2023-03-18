# Serial Number Extractor

This project uses Optical Character Recognition (OCR) techniques to extract serial numbers from images and exports them to an Excel file. The Tesseract.js OCR engine is utilized for the extraction process. The project supports HEIC image format by converting them to PNG using the heic-convert package before processing.

## Installation

1. Clone this repository to your local machine.
2. Run `npm install` to install the required dependencies.

## Usage

1. Take a close and sharp photo of the serial number and crop the image to display only the serial number.
2. Place your images (HEIC or PNG format) in the `images` folder.
3. If you have HEIC images, run `npm run convertHeic` to convert them to PNG format. The converted images will be stored in the `images/png` folder.
4. Run `npm run createExcel` to extract serial numbers from the images and create an Excel file named `SerialNumbers.xlsx` containing the extracted serial numbers plus the images of them.

## Why?

Imagine you have to create an inventory list of hundreds of objects with lengthy serial numbers, this script can help you speed up this process by utilizing OCR technology to automatically extract and compile the serial numbers into an Excel file.

## Dependencies

- [exceljs](https://www.npmjs.com/package/exceljs)
- [fs](https://www.npmjs.com/package/fs)
- [heic-convert](https://www.npmjs.com/package/heic-convert)
- [image-to-ascii](https://www.npmjs.com/package/image-to-ascii)
- [jimp](https://www.npmjs.com/package/jimp)
- [path](https://www.npmjs.com/package/path)
- [tesseract.js](https://www.npmjs.com/package/tesseract.js)

## License

MIT

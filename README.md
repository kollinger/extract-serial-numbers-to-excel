# Serial Number Extractor

This project extracts serial numbers from images and exports them to an Excel file. It is designed to support HEIC image format by converting them to PNG before processing, making it ideal for creating inventory lists for objects with long serial numbers.

## Installation

1. Clone this repository to your local machine.
2. Run `npm install` to install the required dependencies.

## Usage

1. Take a close and sharp photo of the serial number and crop the image to display only the serial number.
2. Place your images (HEIC or PNG format) in the `images` folder.
3. If you have HEIC images, run `npm run convertHeic` to convert them to PNG format. The converted images will be stored in the `images/png` folder.
4. Run `npm run createExcel` to extract serial numbers from the images and create an Excel file named `SerialNumbers.xlsx` containing the extracted serial numbers plus the images of them.

## Why?

If you need to create an inventory list for hundreds of objects with lengthy serial numbers, this script can help you expedite the process, saving time and reducing the risk of manual errors.

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

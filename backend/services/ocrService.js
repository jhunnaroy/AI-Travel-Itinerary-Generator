import Tesseract from "tesseract.js";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import fs from "fs";

// OCR for Images
export const extractTextFromImage =
  async (imagePath) => {
    try {
      const result =
        await Tesseract.recognize(
          imagePath,
          "eng"
        );

      return result.data.text;
    } catch (error) {
      console.error(error);

      throw new Error(
        "Image OCR failed"
      );
    }
  };

// OCR for PDFs
export const extractTextFromPdf = async (pdfPath) => {
  const data = new Uint8Array(
    fs.readFileSync(pdfPath)
  );

  const pdf = await pdfjsLib.getDocument({
    data,
  }).promise;

  let text = "";

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);

    const content =
      await page.getTextContent();

    text += content.items
      .map((item) => item.str)
      .join(" ");
  }

  return text;
};
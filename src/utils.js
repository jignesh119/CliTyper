import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const getWords = (noOfWords = 30, isHard, filePath = null) => {
  let wordList = [],
    words = "";
  try {
    if (filePath) {
      const data = fs.readFileSync(path.resolve(filePath), "utf8");
      wordList = data.split(" ").map((word) => word.toLowerCase().trim());
      wordList.forEach((word) => {
        words += ` ${word}`;
      });
    } else {
      const data = fs.readFileSync(
        path.resolve(
          path.join(
            __dirname,
            "..",
            "data",
            `${isHard ? "hard.txt" : "top1000.txt"}`,
          ),
        ),
        "utf8",
      );
      wordList = data.split("\n").map((word) => word.toLowerCase().trim());
    }
    for (let i = 0; i < noOfWords; i++) {
      const ind = Math.floor(Math.random() * wordList.length);
      words += ` ${wordList[ind]}`;
    }
  } catch (err) {
    console.error(`error while reading file \n${err.message}`);
  }
  return words.trim();
};
export const getWordIndices = (text) => {
  let arr = [0];
  for (let i = 1; i < text.length; i++) {
    if (text[i] === " ") arr.push(i);
  }
  return arr;
};
export const getWpm = (startTime, nWords) => {
  const timeElapsed = (new Date().getTime() / 1000 - startTime / 1000) / 60;
  return [nWords / timeElapsed, timeElapsed];
};
export const getAccuracy = (totalInp, nMistakes) => {
  return ((totalInp - nMistakes) / totalInp) * 100;
};

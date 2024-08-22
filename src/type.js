//TODO: menu screen, word modes, backspace feat; dokr image optimisation
import blessed from "blessed";
import { getWords, getWordIndices } from "./utils.js";
var screen = blessed.screen({ smartCSR: true });
screen.title = "CliType";
let boxOpts = {
  width: "50%",
  height: "50%",
  top: "center",
  left: "center",
  shrink: false,
  tags: true,
  invisible: false,
  border: {
    type: "bg",
  },
  style: {
    fg: "white",
  },
};
let mainBody = blessed.box({
  align: "left",
  ...boxOpts,
});
//TODO: menu footer and screen
class Session {
  constructor(_nWords, _caretStyle, _body, _filePath) {
    this.nWords = _nWords;
    this.caretStyle = _caretStyle;
    this.body = _body;
    this.highlightMode = 1;
    this.currentIndex = 0;
    this.words = "";
    this.cwi = 0;
    this.wInds = [];
    this.xIndices = [];
    this.startTime;
    this.totalInp = 0;
    this.nMistakes = 0;
    this.xWordIndices = [];
    this.filePath = _filePath;
  }
  getBodyContent(inputChar) {
    let text = this.words
      .split("")
      .map((char, ind) => {
        return ind === this.currentIndex
          ? `{${this.caretStyle}}${char}{/}`
          : inputChar && ind === this.currentIndex - 1
            ? //prevchar of (underlined)
              char === inputChar
              ? //char=inptChar
                char === " "
                ? (() => {
                    this.cwi++;
                    return char;
                  })()
                : `{green-fg}${char}{/green-fg}`
              : //char!=inpChar
                (() => {
                  this.xIndices.push(ind);
                  this.nMistakes++;
                  !this.xWordIndices.includes(this.cwi) &&
                    this.xWordIndices.push(this.cwi);
                  char === " " && this.cwi++;
                  return char === " "
                    ? `{red-fg}{underline}${char}{/}`
                    : `{red-fg}${char}{/red-fg}`;
                })()
            : //nextChars & nextWords
              ind > this.currentIndex
              ? this.highlightMode && this.highlightable(ind)
                ? char
                : `{grey-fg}${char}{/}`
              : //visitedChars
                ind < this.currentIndex && this.xIndices.includes(ind)
                ? char === " "
                  ? `{red-fg}{underline}${char}{/}`
                  : `{red-fg}${char}{/red-fg}`
                : `{green-fg}${char}{/green-fg}`;
      })
      .join("");
    return text;
  }
  static handleUserInput(_session) {
    const session = _session;
    session.backspace &&
      session.body.key("backspace", function (_, k) {
        session.totalInp += 1;
        if (session.currentIndex) {
          session.currentIndex--;
          const remInd = session.xIndices.indexOf(session.currentIndex); //remv currChar from xIndices if present
          if (remInd > -1) session.xIndices.splice(remInd, 1);
          if (session.words[session.currentIndex] === " ") session.cwi--;
        }
        session.body.setContent(session.getBodyContent(null));
        screen.render();
      });
    session.body.on("keypress", function (data) {
      var regex = /^([a-z\.\?\\\/:;'"+\-@,`\*\(\)\! 0-9])/i;
      //valid keyPress
      if (data?.match(regex)) {
        if (session.totalInp === 0) session.startTime = new Date().getTime();
        session.totalInp += 1;
        session.currentIndex++;
        if (session.currentIndex == session.body.getText().length)
          //show menu
          process.exit(0);
        let inputChar = data;
        session.body.setContent(session.getBodyContent(inputChar));
        screen.render();
      }
    });
    session.body.key("escape", function (_, k) {
      session.startSession();
    });
  }
  //TODO: menu screen interractions
  startSession() {
    if (this.filePath) {
      this.words = getWords(null, null, this.filePath);
    } else {
      this.words = getWords(this.nWords, this.hard, null);
    }
    this.currentIndex = 0;
    this.cwi = 0;
    this.xIndices = [];
    this.totalInp = 0;
    this.nMistakes = 0;
    this.xWordIndices = [];
    this.wInds = getWordIndices(this.words); //getBeginIndOfWords
    this.body.setContent(this.getBodyContent(null));
    screen.clearRegion(0, screen.width, 0, screen.heigth);
    screen.append(this.body);
    this.body.focus();
    screen.render();
  }
  //show meny screen with stats
  highlightable(ind) {
    //0-no highlight
    //1-default
    //2-onlyCur
    //3-onlyNext
    if (this.highlightMode == 1)
      return (
        ind > this.wInds[this.cwi] &&
        (ind < this.wInds[this.cwi + 2] ||
          this.wInds.indexOf(this.wInds[this.cwi]) == this.nWords - 2 ||
          this.wInds.indexOf(this.wInds[this.cwi]) == this.nWords - 1)
      );
    else if (this.highlightMode == 2)
      return (
        ind > this.wInds[this.cwi] &&
        (ind < this.wInds[this.cwi + 1] ||
          this.wInds.indexOf(this.wInds[this.cwi]) == this.nWords - 1)
      );
    else if (this.highlightMode == 3)
      return ind > this.wInds[this.cwi + 1] && ind < this.wInds[this.cwi + 2];
  }
  getMistakenWords() {
    let wordList = this.words.split(" ");
    let words = [];
    this.xWordIndices.forEach((ind) => {
      words.push(wordList[ind]);
    });
    return `Mistakes: [${words.join(", ")}]`;
  }
}

screen.key("C-c", function (_, key) {
  process.exit(0);
});

export const main = (flags) => {
  const nWords = flags?.numWords || 30;
  let caretStyle = "underline";
  if (flags?.style === "block") caretStyle = "inverse";
  let session = new Session(nWords, caretStyle, mainBody, flags?.filePath);
  session.startSession();
  Session.handleUserInput(session);
  //TODO: handle meny input
};

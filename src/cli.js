#!/usr/bin/env node
import meow from "meow";
import fs from "fs";
import path from "path";
import { main } from "./type.js";

const helpText = `
CliTyper - CLI based typing speed testing tool

USAGE: ctype [FLAGS] [OPTIONS] [args]
FLAGS:
  --nobackspace \tdisable backspace key
  --nohighlight \tdisable current & next word highlighting
  --highlight1  \tonly highlight current word
  --highlight2  \tonly highlight next word
  --hard        \tdifficulty: hard (chooses complex words)
  -h, --help    \tshow this screen
  -V, --version \tversion info
OPTIONS:
  -n, --numWords <num-of-words>\tspecify no of words [default: 30]
  -s, --style <caret-style>   \tset caret style [default:underline][possible: underline, block]
  -w, --words <file-path>      \tspecify path to file containing the words to choose for test (MUST BE SPACE SEPERATED CONTENT)

EXAMPLES:
  $ ctype
  $ ctype -n 10
  $ ctype -s block
  $ ctype --hightlight2
  $ ctype --hard
  $ ctype -w input.txt
  $ ctype -V
`;
const flags = {
  numWords: {
    type: "number",
    default: 30,
    shortFlag: "n",
    aliases: ["num_words "],
    isMultiple: false,
  },
  style: {
    type: "string",
    default: "underline",
    choices: ["underline", "block"],
    shortFlag: "s",
    aliases: ["Style", "caret-style"],
    isMultiple: false,
  },
  nobackspace: {
    type: "boolean",
    default: false,
    isMultiple: false,
  },
  nohighlight: {
    type: "boolean",
    default: false,
    isMultiple: false,
  },
  highlight1: {
    type: "boolean",
    default: false,
    isMultiple: false,
  },
  highlight2: {
    type: "boolean",
    default: false,
    isMultiple: false,
  },
  hard: {
    type: "boolean",
    default: false,
    isMultiple: false,
  },
  words: {
    type: "string",
    default: "null",
    isMultiple: false,
    shortFlag: "w",
    aliases: ["word"],
  },
  version: {
    type: "boolean",
    default: false,
    shortFlag: "V",
    isMultiple: false,
  },
  help: {
    type: "boolean",
    default: false,
    shortFlag: "h",
    isMultiple: false,
  },
};

const cli = meow({
  importMeta: import.meta,
  help: helpText,
  flags: flags,
});
let additionalOpts = {};
if (!(cli.flags.help || cli.flags.version)) {
  if (cli.flags.numWords > 50) {
    additionalOpts["numWords"] = 30;
  }
  if (cli.flags.words != "null") {
    let filePath = cli.flags.words;
    if (fs.existsSync(filePath)) {
      additionalOpts["filePath"] = path.normalize(path.resolve(filePath));
    } else {
      console.log(`no such file or directory ${filePath}`);
      process.exit(1);
    }
  }
  main({ ...cli.flags, ...additionalOpts });
}

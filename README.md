# clityper

cli typing speed testing tool

### setup

```
git clone
cd CliTyper
npm ci
npm start
```

### usage

```
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
```

### features

- interractive typing interface
- usefull stats screen
- can select number of words in a session
- can select the caret style
- can select any file with words as content of test
- hit Ctrl+c to exit test in middle
- hit Esc to restart test, and many such keybindings
- select highlight mode, caret style, hardness level of test
- refer help docs for usage

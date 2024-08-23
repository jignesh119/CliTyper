# CliTyper

**CliTyper** is a CLI typing speed testing app built with Node.js. It allows users to test their typing speed and accuracy with customizable settings.

## Features

- **Typing Test:** Test your typing speed and accuracy with customizable word lists.
- **Highlighting Options:** Choose how the current and next words are highlighted during the test.
- **Difficulty Levels:** Select a harder difficulty to test your skills with more complex words.
- **Stats Screen:** View your raw speed, typing speed, accuracy, and mistakes after each test.
- **Docker Support:** Run the app in a Docker container.

## Installation

1. Clone the repository:

   ```bash
   git clone
   cd CliTyper
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. (Optional) Build and run using Docker:
   ```bash
   docker build -t ctype .
   docker run -it --name ctype ctype
   ```

## Usage

Run the CLI typing speed test with various options:

```bash
USAGE: ctype [FLAGS] [OPTIONS] [args]

FLAGS:
  --nobackspace        disable backspace key
  --nohighlight        disable current & next word highlighting
  --highlight1         only highlight current word
  --highlight2         only highlight next word
  --hard               difficulty: hard (chooses complex words)
  -h, --help           show this screen
  -V, --version        version info

OPTIONS:
  -n, --numWords <num-of-words>    specify no of words [default: 30]
  -s, --style <caret-style>        set caret style [default: underline][possible: underline, block]
  -w, --words <file-path>          specify path to file containing the words to choose for test (MUST BE SPACE SEPARATED CONTENT)

EXAMPLES:
  $ ctype
  $ ctype -n 10
  $ ctype -s block
  $ ctype --highlight2
  $ ctype --hard
  $ ctype -w input.txt
  $ ctype -V
```

### Exit

To exit the app, hit `Ctrl+C`.

## Docker

To run the app in a Docker container, use the following command:

```bash
docker run -it --name ctype <image_name>
```

## Reference

This project was inspired by [max-niederman/ttyper](https://github.com/max-niederman/ttyper).

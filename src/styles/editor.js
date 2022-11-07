import {LINE_HEIGHT, FONT_SIZE } from './theme-default'


const FONT_FAMILY = `"SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace`

export const editorCss = `
  .codeflask {
    overflow: hidden;
    position: relative;
    min-height: 200px;
    border: 1px solid #cbd3de;
    border-radius: 6px;
  }

  .codeflask, .codeflask * {
    box-sizing: border-box;
  }

  .codeflask__pre {
    pointer-events: none;
    z-index: 3;
    position: relative;
  }

  .codeflask__textarea {
    background: none;
    border: none;
    color: transparent;
    resize: none;
    -webkit-appearance: pre;
    caret-color: #111;
    z-index: 2;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  .codeflask__code {
    display: block;
    overflow: hidden;
  }

  .codeflask__flatten {
    padding: 10px;
    font-size: ${FONT_SIZE};
    line-height: ${LINE_HEIGHT};
    font-family: ${FONT_FAMILY};
    white-space: pre-wrap;
    overflow: auto;
    margin: 0 !important;
    outline: none;
    text-align: left;
    overflow-wrap: break-word;
  }

  .codeflask__line-highlight {
    position: absolute;
    top: 10px;
    left: 0;
    width: 100%;
    height: ${LINE_HEIGHT};
    background: rgba(0,0,0,0.1);
    z-index: 1;
  }

  .codeflask__lines__line {
    display: block;
  }
`
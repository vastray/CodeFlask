import {LINE_HEIGHT, FONT_SIZE } from './theme-default'


const FONT_FAMILY = `"SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace`

export const editorCss = `
  .codeflask {
    position: relative;
    border-radius: 6px;
  }

  .codeflask, .codeflask * {
    box-sizing: border-box;
  }

  .codeflask__pre {
    pointer-events: none;
    z-index: 2;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    border: 1px solid transparent;
  }

  .codeflask__textarea {
    background: none;
    border: none;
    color: transparent;
    resize: none;
    caret-color: #111;
    z-index: 3;
    width: 100%;
    position: relative;
    border: 1px solid #cbd3de;
    display: block;
    border-radius: 6px;
  }

  .codeflask__textarea:focus {
    border: 1px solid #06f;
    box-shadow: 0 0 0 3px rgb(0 102 255 / 15%);
    transition: border .2s,box-shadow .2s;
  }

  .codeflask__code {
    display: block;
    overflow: hidden;
    font-family: inherit;
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
`
export const BACKGROUND_COLOR = '#fff'
export const LINE_HEIGHT = '20px'
export const FONT_SIZE = '14px'

export const defaultCssTheme = `
.codeflask {
  background: ${BACKGROUND_COLOR};
  color: hsl(230, 8%, 24%);
}

.codeflask:has(> textarea:focus) {
  border: 1px solid #06f;
  box-shadow: 0 0 0 3px rgb(0 102 255 / 15%);
  transition: border .2s,box-shadow .2s;
}

.codeflask .token.punctuation {
  color: hsl(230, 8%, 24%);
}

.codeflask .token.keyword {
  color: hsl(301, 63%, 40%);
}

.codeflask .token.operator {
  color: hsl(221, 87%, 60%);
}

.codeflask .token.string,
.codeflask .token.selector,
.codeflask .token.attr-value {
  color: hsl(119, 34%, 47%);
}

.codeflask .token.comment {
  color: hsl(230, 4%, 64%);
}

.codeflask .token.function {
  color: hsl(221, 87%, 60%);
}

.codeflask .token.boolean,
.codeflask .token.number,
.codeflask .token.attr-name {
  color: hsl(35, 99%, 36%);
}

.codeflask .token.property,
.codeflask .token.tag {
  color: hsl(5, 74%, 59%);
}

.codeflask .token.attr-value {
  color: #f6a434;
}
`
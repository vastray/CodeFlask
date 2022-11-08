import { editorCss } from './styles/editor'
import { injectCss } from './styles/injector'
import { defaultCssTheme } from './styles/theme-default'
import { escapeHtml } from './utils/html-escape'
import autosize from 'autosize'
import Prism from 'prismjs'


export default class CodeFlask {
  constructor (selectorOrElement, opts) {
    if (!selectorOrElement) {
      // If no selector or element is passed to CodeFlask,
      // stop execution and throw error.
      throw Error('CodeFlask expects a parameter which is Element or a String selector')
    }

    if (!opts) {
      // If no selector or element is passed to CodeFlask,
      // stop execution and throw error.
      throw Error('CodeFlask expects an object containing options as second parameter')
    }

    if (selectorOrElement.nodeType) {
      // If it is an element, assign it directly
      this.editorRoot = selectorOrElement
    } else {
      // If it is a selector, tries to find element
      const editorRoot = document.querySelector(selectorOrElement)

      // If an element is found using this selector,
      // assign this element as the root element
      if (editorRoot) {
        this.editorRoot = editorRoot
      }
    }

    this.opts = opts
    this.startEditor()
  }

  startEditor () {
    const isCSSInjected = injectCss(editorCss, null, this.opts.styleParent)

    if (!isCSSInjected) {
      throw Error('Failed to inject CodeFlask CSS.')
    }

    // The order matters (pre > code). Don't change it
    // or things are going to break.
    this.createWrapper()
    this.createTextarea()
    this.createPre()
    this.createCode()

    this.runOptions()
    this.listenTextarea()
    this.populateDefault()
    this.updateCode(this.code)
  }

  createWrapper () {
    this.code = this.editorRoot.innerHTML
    this.editorRoot.innerHTML = ''
    this.elWrapper = this.createElement('div', this.editorRoot)
    this.elWrapper.classList.add('codeflask')
  }

  createTextarea () {
    this.elTextarea = this.createElement('textarea', this.elWrapper)
    this.elTextarea.classList.add('codeflask__textarea', 'codeflask__flatten')
    autosize(this.elTextarea);
  }

  createPre () {
    this.elPre = this.createElement('pre', this.elWrapper)
    this.elPre.classList.add('codeflask__pre', 'codeflask__flatten')
  }

  createCode () {
    this.elCode = this.createElement('code', this.elPre)
    this.elCode.classList.add('codeflask__code', `language-${this.opts.language || 'html'}`)
  }

  createElement (elementTag, whereToAppend) {
    const element = document.createElement(elementTag)
    whereToAppend.appendChild(element)

    return element
  }

  runOptions () {
    this.opts.tabSize = this.opts.tabSize || 4
    this.opts.autocorrect = this.opts.autocorrect || false
    this.opts.defaultTheme = this.opts.defaultTheme !== false
    this.opts.readonly = this.opts.readonly || null
    this.opts.handleTabs = this.opts.handleTabs || true

    if (this.opts.autocorrect === false) {
      this.elTextarea.setAttribute('spellcheck', 'false')
      this.elTextarea.setAttribute('autocapitalize', 'off')
      this.elTextarea.setAttribute('autocomplete', 'off')
      this.elTextarea.setAttribute('autocorrect', 'off')
    }

    if (this.opts.defaultTheme) {
      injectCss(defaultCssTheme, 'theme-default', this.opts.styleParent)
    }

    if (this.opts.readonly) {
      this.enableReadonlyMode()
    }
  }

  listenTextarea () {
    this.elTextarea.addEventListener('input', (e) => {
      this.code = e.target.value
      this.elCode.innerHTML = escapeHtml(e.target.value)
      this.highlight()
      setTimeout(() => {
        this.runUpdate()
      }, 1)
    })

    this.elTextarea.addEventListener('keydown', (e) => {
      if (this.opts.readonly) {
        return;
      }
      this.handleTabs(e)
    })
  }

  handleTabs (e) {
    if (this.opts.handleTabs) {
      if (e.keyCode !== 9) {
        return
      }
      e.preventDefault()

      var input = this.elTextarea
      var selectionDir = input.selectionDirection
      var selStartPos = input.selectionStart
      var selEndPos = input.selectionEnd
      var inputVal = input.value

      var beforeSelection = inputVal.substr(0, selStartPos)
      var selectionVal = inputVal.substring(selStartPos, selEndPos)
      var afterSelection = inputVal.substring(selEndPos)
      const indent = ' '.repeat(this.opts.tabSize)

      if (selStartPos !== selEndPos && selectionVal.length >= indent.length) {
        var currentLineStart = selStartPos - beforeSelection.split('\n').pop().length
        var startIndentLen = indent.length
        var endIndentLen = indent.length

        // Unindent
        if (e.shiftKey) {
          var currentLineStartStr = inputVal.substr(currentLineStart, indent.length)
          // Line start whit indent
          if (currentLineStartStr === indent) {
            startIndentLen = -startIndentLen

            if (currentLineStart > selStartPos) {
              // Indent is in selection
              selectionVal = selectionVal.substring(0, currentLineStart) + selectionVal.substring(currentLineStart + indent.length)
              endIndentLen = 0
            } else if (currentLineStart === selStartPos) {
              // Indent is in start of selection
              startIndentLen = 0
              endIndentLen = 0
              selectionVal = selectionVal.substring(indent.length)
            } else {
              // Indent is before selection
              endIndentLen = -endIndentLen
              beforeSelection = beforeSelection.substring(0, currentLineStart) + beforeSelection.substring(currentLineStart + indent.length)
            }
          } else {
            startIndentLen = 0
            endIndentLen = 0
          }

          selectionVal = selectionVal.replace(new RegExp('\n' + indent.split('').join('\\'), 'g'), '\n')
        } else {
          // Indent
          beforeSelection = beforeSelection.substr(0, currentLineStart) + indent + beforeSelection.substring(currentLineStart, selStartPos)
          selectionVal = selectionVal.replace(/\n/g, '\n' + indent)
        }

        // Set new indented value
        input.value = beforeSelection + selectionVal + afterSelection

        input.selectionStart = selStartPos + startIndentLen
        input.selectionEnd = selStartPos + selectionVal.length + endIndentLen
        input.selectionDirection = selectionDir
      } else {
        input.value = beforeSelection + indent + afterSelection
        input.selectionStart = selStartPos + indent.length
        input.selectionEnd = selStartPos + indent.length
      }

      var newCode = input.value
      this.updateCode(newCode)
      this.elTextarea.selectionEnd = selEndPos + this.opts.tabSize
    }
  }

  updateCode (newCode) {
    this.code = newCode
    this.elTextarea.value = newCode
    this.elCode.innerHTML = escapeHtml(newCode)
    this.highlight()
    setTimeout(this.runUpdate.bind(this), 1)
  }

  updateLanguage (newLanguage) {
    const oldLanguage = this.opts.language
    this.elCode.classList.remove(`language-${oldLanguage}`)
    this.elCode.classList.add(`language-${newLanguage}`)
    this.opts.language = newLanguage
    this.highlight()
  }

  addLanguage (name, options) {
    Prism.languages[name] = options
  }

  populateDefault () {
    this.updateCode(this.code)
  }

  highlight () {
    Prism.highlightElement(this.elCode, false)
  }

  onUpdate (callback) {
    if (callback && {}.toString.call(callback) !== '[object Function]') {
      throw Error('CodeFlask expects callback of type Function')
    }

    this.updateCallBack = callback
  }

  getCode () {
    return this.code
  }

  runUpdate () {
    if (this.updateCallBack) {
      this.updateCallBack(this.code)
    }
  }

  enableReadonlyMode () {
    this.elTextarea.setAttribute('readonly', true)
  }

  disableReadonlyMode () {
    this.elTextarea.removeAttribute('readonly')
  }
}

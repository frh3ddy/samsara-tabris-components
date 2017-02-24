import { compose, init, methods, props } from 'stampit'
import BaseTextInput from './BaseTextInput'

import templateFormatter from './template-formatter'
const TEMPLATE = '(xxx) xxx-xxxx'
import S from 'string'

const Validator = methods({
    validate() {
        const text = this.input.get('text')
        const stripped = S(text).strip(' ', '-', '(', ')', '$').s

        if (stripped.length >= this.minChar) {
            this.isValid = true
            this.label.set('textColor', 'green')
        } else {
            this.isValid = false
            this.label.set('textColor', 'red')
        }
    }
})


const NumberFormater = init(function({template, minChar}) {
    this.rawInput
    this.minChar = minChar
    this.template = template
    this.numbers = []
    this.input.on('change:text', (w, text) => {
        const stripped = S(text).strip(' ', '-', '(', ')').s
        const notNumber = !S(stripped).isNumeric()
        if(notNumber) return

        if (this.numbers.length === stripped.length) return

        if (isDelete(this.numbers, stripped)) {
            this.numbers.splice(-1,1)
        } else {
            const newChar = text.slice(-1)
            const isNumber = S(newChar).isNumeric()
            if (isNumber) this.numbers.push(newChar)
        }

        this.format(stripped)
    })
}).methods({
    format(text) {
        const format = templateFormatter(this.template)
        this.input.set('text', format(text).text)
    },
    getInput() {
        const text = this.input.get('text')
        return S(text).strip(' ', '-', '(', ')', '$').s
    }
})

function isDelete(list, text) {
    if (list.length > text.length) return true
    return false
}

export default compose(BaseTextInput, Validator, NumberFormater)

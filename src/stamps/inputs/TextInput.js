import { TextView, TextInput } from 'tabris'
import { compose, init, methods, props } from 'stampit'

import BaseContainer from '../BaseContainer'

import templateFormatter from './template-formatter'
const TEMPLATE = '(xxx) xxx-xxxx'

import S from 'string'

const TextInputStamp = init(function ({
    label,
    message,
    autoCapitalize = false,
    type = 'default',
    keyboard = 'default'
}) {
    this.isValid = false

    const textLabel = new TextView({
        text: label,
        layoutData: {centerY: 0, width: 120}
    }).appendTo(this)

    this.label = textLabel

    this.input = new TextInput({
        message,
        autoCapitalize,
        type,
        keyboard,
        layoutData: {left: [textLabel, 10], right: 0, centerY: 0}
    }).on('blur', () => {
        this.validate()
    }).appendTo(this)

    if(type === 'multiline') {
        this.label.set('layoutData', {top: 5, width: 120})
    }
})

const InputMethods = methods({
    validate() {
        const text = this.input.get('text').trim()
        if(text.length > 0) {
            this.isValid = true
            this.label.set('textColor', 'green')
        } else {
            this.isValid = false
            this.label.set('textColor', 'red')
        }
    }
})


const PhoneValidator = methods({
    validate() {
        const text = this.input.get('text')
        const stripped = S(text).strip(' ', '-', '(', ')').s

        if (stripped.length === 10) {
            this.isValid = true
            this.label.set('textColor', 'green')
        } else {
            this.isValid = false
            this.label.set('textColor', 'red')
        }
    }
})


const NumberFormater = init(function() {
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

        const format = templateFormatter(TEMPLATE)

        w.set('text', format(stripped).text)
    })
})

function isDelete(list, text) {
    if (list.length > text.length) return true
    return false
}

export default compose(BaseContainer, TextInputStamp, PhoneValidator, NumberFormater)

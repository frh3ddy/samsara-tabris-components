import { TextView, TextInput } from 'tabris'
import { compose, init, methods, props } from 'stampit'

import BaseContainer from '../BaseContainer'

const BaseInput = init(function ({
    label,
    message = '',
    autoCapitalize = false,
    type = 'default',
    keyboard = 'default',
    autoCorrect = false
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
        autoCorrect,
        layoutData: {left: [textLabel, 10], right: 0, centerY: 0}
    }).on('blur', () => {
        this.validate()
    }).appendTo(this)

    if(type === 'multiline') {
        this.input.set('height', 100)
        this.label.set('layoutData', {top: 5, width: 120})
    }
}).methods({
    clear() {
        this.isValid = false,
        this.input.set('text', '')
        this.label.set('textColor', 'initial')
    }
})

export default compose(BaseContainer, BaseInput)

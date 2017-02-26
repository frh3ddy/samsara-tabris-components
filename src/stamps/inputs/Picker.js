import { TextView, Picker } from 'tabris'
import { compose, init, methods, props } from 'stampit'

import BaseContainer from '../BaseContainer'

const BaseInput = init(function ({
    label,
    items = []
}) {
    this.isValid = false

    const textLabel = new TextView({
        text: label,
        layoutData: {centerY: 0, width: 120}
    }).appendTo(this)

    this.label = textLabel

    this.input = new Picker({
        items,
        layoutData: {left: [textLabel, 10], right: 0, centerY: 0}
    }).on('change:selectionIndex', () => this.validate()).appendTo(this)

}).methods({
    getInput() {
        return this.input.get('selection')
    },
    validate() {
        const selectionIndex = this.input.get('selectionIndex')

        if(selectionIndex > 0) {
            this.isValid = true
            this.label.set('textColor', 'green')
        } else {
            this.isValid = false
            this.label.set('textColor', 'red')
        }
    },
    clear() {
        this.isValid = false
        this.input.set('selectionIndex', 0)
        this.label.set('textColor', 'initial')
    }
})

export default compose(BaseContainer, BaseInput)

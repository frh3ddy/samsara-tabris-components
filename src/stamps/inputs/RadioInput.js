import { TextView, RadioButton } from 'tabris'
import { compose, init, methods, props } from 'stampit'

import BaseContainer from '../BaseContainer'

const BaseInput = init(function ({
    label,
    options = []
}) {
    this.isValid = false
    this.selected

    this.inputs = []

    const textLabel = new TextView({
        text: label,
        layoutData: {centerY: 0, width: 120}
    }).appendTo(this)

    this.label = textLabel

    options.forEach((option, index) => {
        const input = new RadioButton({
            text: option,
            layoutData: {left: ['prev()', 10], centerY: 0}
        }).on('change:selection', (widget, selection) => {
            if (selection) this.selected = widget
            this.validate()
        }).appendTo(this)

        if(index === 1) input.set('layoutData', {right: 15, centerY: 0})

        this.inputs.push(input)
    })
}).methods({
    getInput() {
        return this.selected.get('text')
    },
    validate() {
        if(this.selected === undefined){
            this.isValid = false
            this.label.set('textColor', 'red')
        } else {
            this.isValid = true
            this.label.set('textColor', 'green')
        }
    }
})

export default compose(BaseContainer, BaseInput)

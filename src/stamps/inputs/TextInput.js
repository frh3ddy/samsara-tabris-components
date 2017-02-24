import { compose, init, methods, props } from 'stampit'
import BaseTextInput from './BaseTextInput'

const Validator = methods({
    validate() {
        const text = this.input.get('text').trim()
        if(text.length > 0) {
            this.isValid = true
            this.label.set('textColor', 'green')
        } else {
            this.isValid = false
            this.label.set('textColor', 'red')
        }
    },
    getInput() {
        return this.input.get('text')
    }
})

export default compose(BaseTextInput, Validator)

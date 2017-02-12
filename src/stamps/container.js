import { TextView, Composite, Button} from 'tabris'
import { compose, init, methods, props } from 'stampit'

import BaseContainer from './BaseContainer'

const Acions = init(function() {
    this.actions = []
}).methods({
    addAction(action) {
        const margin = 25
        let rightMargin = this.actions.length > 0 ? ['prev()', margin] : margin

        let actionView = new Button({
            cornerRadius: 22,
            layoutData: {centerY: 0, right: rightMargin},
            // width: 44,
            // height: 44,
            // alignment: 'center',
            // background: '#d9e1e8',
            textColor: '#282c37',
            text: action
        }).on('select', (widget) => {
            if (!this.textLabel && action === 'Edit') {
                this.trigger('Edit')
                return
            }

            if(action === 'Add') this.trigger('Add')

            if(action === 'Edit') this.editText()
            if(action === 'Text') this.openSMSComposer()
        }).appendTo(this)

        this.actions.push(actionView)

        return this
    },
    editText() {
        if (!this.textLabel) return

        const labelText = this.textLabel.get('text')
        const word = labelText.split(' ')[1]

        navigator.notification.prompt(
            `enter new ${word}`, // message
            results => {
              if (results.buttonIndex === 1 || results.input1 === '') return
              this.updateTextContent(results.input1)
            }, // callback to invoke
            labelText, // title
            ["Cancel", "Update"], // buttonTextViews
            "" // defaultText
        );
    },
    openSMSComposer() {
        const message  = 'test mesage'
        window.plugins.socialsharing.shareViaSMS({message: message},
            "7329256350", succes => {
                setTimeout(() => {
                    if (succes) {
                        window.plugins.toast.showShortCenter('Message sent')
                    }
                }, 1000)
            }
        )
    }

})

const ContentMethods = methods({
    addLabel(text){
        if (!text) return
        this.textLabel = new TextView({
            layoutData: {top: 10},
            text: text,
            font: '11px',
            textColor: '#6E7783',
        }).appendTo(this)

        return this
    },
    addTextContent(text){
        let margin = 25
        let topMargin = margin

        if (this.textLabel) {
            margin = 10
            let topMargin = [this.textLabel, margin]
        }

        this.textContent = new TextView({
            layoutData: {top: topMargin, bottom: margin , left: 0, right: 84},
            text: text,
            font: '16px',
            textColor: '#252c41',
        }).appendTo(this)

        return this
    },
    updateTextContent(text) {
        this.textContent.set('text', text)
        this.updateSize()
    },
    updateSize() {
        this.set('height', null)
    }
})


export default compose(
    BaseContainer,
    Acions,
    ContentMethods,
)

import { TextView, Composite, Button, ImageView } from 'tabris'
import { compose, init, methods, props } from 'stampit'

import BaseContainer from './BaseContainer'

const Acions = init(function() {
    this.actions = []
    this.isEditing = false
}).methods({
    addAction(action) {
        const actionView = this.createActionView(action)

        actionView.on('tap', (widget) => {
            if (!this.textLabel && action.text === 'Edit') {
                this.trigger('Edit')
                this.isEditing = !this.isEditing
                if (this.isEditing) {
                    widget.children().first().set('text', 'Done')
                } else {
                    widget.children().first().set('text', 'Edit')
                }

                return
            }

            if(action.text === 'Add') this.trigger('Add')

            if(action.text === 'Edit') this.editText()
            if(action.text === 'Text') this.openSMSComposer()
        })

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
    },
    createActionView({type, text}) {
        const margin = 25
        let rightMargin = this.actions.length > 0 ? ['prev()', margin] : margin

        if (type === 'text') {
            const editComposite = new Composite({
                layoutData: {top: 0, right: rightMargin},
                height: 50,
                width: 44,
            }).appendTo(this)

            new TextView({
                layoutData: {top: 10, centerX: 0},
                textColor: '#0080ff',
                text: text
            }).appendTo(editComposite)

            return editComposite
        } else {
            return new ImageView({
                image: {src: `images/icon${text}.png`, scale: 3},
                highlightOnTouch: true,

                layoutData: {centerY: 0, right: rightMargin},
                // width: 44,
                // height: 44,
                // alignment: 'center',
                // background: '#d9e1e8',
                // textColor: '#282c37',
                // text: text
            }).appendTo(this)
        }
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

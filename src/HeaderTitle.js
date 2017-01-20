import { Widget, Core, Layouts } from 'samsara-tabris'
const { Surface } = Widget
const { View } = Core

export default View.extend({
    initialize({title, leftMargin, backgroundColor}) {
        const text = new Surface({
            tagName: 'TextView',
            properties: {
                left: leftMargin,
                font: '13px bold',
                textColor: '#6d819c',
                text: title.toUpperCase(),
                background: backgroundColor
            }
        })

        this.add(text)
    }
})

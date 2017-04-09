import { Composite, TextView, TextInput } from 'tabris'
import { Widget, Core, Layouts } from 'samsara-tabris'
const { Surface } = Widget
const { View, Transitionable, Transform } = Core
const { GridLayout } = Layouts

import app from 'ampersand-app'
const SPACING = 5
const HEIGHT = 50

export default View.extend({
    initialize({name}) {
        this.name = name
        this.selected = false
        this.background = new Surface({
            properties: {
                cornerRadius: 3,
                background: '#c9c9cb'
            }
        })

        const surface = new Surface({
            margins: [1, 1],
            origin: [.5, .5],
            content: new TextView({
                text: name,
                layoutData: {centerX: 0, centerY: 0}
            }),
            properties: {
                cornerRadius: 2,
                background: 'white'
            }
        })

        surface.on('tap', () => {
            this.selected = !this.selected
            const color = this.selected ? '#007aff': '#c9c9cb'
            this.background.setProperties({
                background: color
            })

            this.emit('select', this)
        })

        this.add(this.background)
        this.add({align: [.5, .5]}).add(surface)
    },
    deselect() {
        if(this.selected) {
            this.selected = false
            this.background.setProperties({
                background: '#c9c9cb'
            })
        }
    }
})

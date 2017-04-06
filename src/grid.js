import { Composite, TextView, TextInput } from 'tabris'
import { Widget, Core, Layouts } from 'samsara-tabris'
const { Surface } = Widget
const { View, Transitionable, Transform } = Core
const { GridLayout } = Layouts

import Item from './item'
const SPACING = 5

export default View.extend({
    initialize({cols, data, itemHeight}) {
        const list = []
        const background = new Surface({
            properties: {
                background: 'blue'
            }
        })

        const container =  new GridLayout({
            spacing: [SPACING, SPACING]
        })

        this.size.subscribe(container.size)

        data.forEach(type => {
            const surface = new Item({
                size: [undefined, itemHeight],
                name: type
            })

            surface.on('select', selected => {
                list.forEach(node => {
                    if(node !== selected) node.deselect()
                })
            })

            container.push(surface, 1, 0)
            list.push(surface)
        })

        const fullRows = Math.floor(data.length / cols)
        const rows = Math.ceil(data.length / cols)
        const nSpacing = fullRows === rows ? (fullRows - 1) : fullRows
        const colsPerRow = Array.from(Array(fullRows)).map(n => cols)
        const containerHeight = (itemHeight * rows) + (SPACING * nSpacing)

        container.resize(colsPerRow)
        container.setSize([undefined, containerHeight])

        // this.add(background)
        this.add(container)
    }
})

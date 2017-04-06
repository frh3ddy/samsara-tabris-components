import { Composite, TextView, TextInput } from 'tabris'
import { Widget, Core, Layouts } from 'samsara-tabris'
const { Surface } = Widget
const { View, Transitionable, Transform } = Core
const { GridLayout } = Layouts

import Item from './item'
import app from 'ampersand-app'
const SPACING = 5
const HEIGHT = 50

const repairTypeList = [
    'LCD',
    'Motherboard',
    'Battery',
    'DC Port',
    'Optical Drive',
]

export default View.extend({
    initialize() {
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

        repairTypeList.forEach(type => {
            const surface = new Item({
                size: [undefined, HEIGHT],
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
        const cols = 2
        const fullRows = Math.floor(repairTypeList.length / cols)
        const rows = Math.ceil(repairTypeList.length / cols)
        const nSpacing = fullRows === rows ? (fullRows - 1) : fullRows
        const colsPerRow = Array.from(Array(fullRows)).map(n => cols)
        const containerHeight = (HEIGHT * rows) + (SPACING * nSpacing)

        container.resize(colsPerRow)
        container.setSize([undefined, containerHeight])

        // this.add(background)
        this.add(container)
    }
})

import { Composite, TextView, TextInput } from 'tabris'
import { Widget, Core, Layouts } from 'samsara-tabris'
const { Surface } = Widget
const { View, Transitionable, Transform } = Core
const { GridLayout, SequentialLayout } = Layouts

import Grid from './grid'
import Separator from './separator'

export default View.extend({
    initialize({gridProps, headerText}) {
        this.selection = undefined
        let height = 0
        const border = new Surface({
            properties: {
                background: '#c9c9cb'
            }
        })

        const background = new Surface({
            margins: [0, 1],
            origin: [0, .5],
            properties: {
                background: 'white'
            }
        })

        const stack = new SequentialLayout({
            margins: [20, 0],
            origin: [.5, 0],
            direction: 1,
            spacing: 10
        })

        const headerTitle = new Surface({
            size: [undefined, 50],
            content: new TextView({
                text: headerText,
                font: '20px',
                centerY: 0
            })
        })

        const grid = new Grid(gridProps)
        this.list = grid.list

        stack.push(headerTitle)
        stack.push(grid)

        const separator = new Separator({
            size: [undefined, 15]
        })

        stack.push(separator)

        stack.on('end', newHeight => {
            if (newHeight !== height) {
                height = newHeight
                this.setSize([undefined, newHeight])
            }
        })

        this.add(border)
        this.add({align: [0, .5]}).add(background)
        this.add({align: [.5, 0]}).add(stack)
    },
    getSelection() {
        const selection = this.list.find(item => item.selected)
        if(selection) return selection.name
    }
})

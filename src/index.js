import { Page, Button, CollectionView, ImageView, TextView, Composite, TextInput } from 'tabris'
import { Widget, Core, Layouts } from 'samsara-tabris'
const { Context, Surface, ContainerSurface } = Widget
const { Transitionable, Transform, View } = Core
const { FlexibleLayout, SequentialLayout, Scrollview } = Layouts

import app from 'ampersand-app'
import Section from './section'
import Separator from './separator'

const context = new Context()

const repairTypes = [
    'LCD',
    'Battery',
    'Motherboard',
    'Hard Drive',
    'Memory RAM',
    'Graphics Card',
    'Hinges',
    'Housing',
    'Keyboard',
    'Power Supply',
    'Windows Installation',
    'Data Recovery',
    'Virus Removal',
    'Cooling Fan',
]

const repairPrices = ['$45','$75','$99','$120','$145','$199','$225','$399']

const page = new Page({
    title: 'info',
    topLevel: true,
    background: '#efeff4'
}).once('resize', (page) => {
    const scrollview = new ContainerSurface({
        margins: [0, 25],
        tagName: 'ScrollView'
    })

    const stack = new SequentialLayout({
        direction: 1,
        spacing: 15,
        offset: 15
    })

    const repairType = new Section({
        headerText: 'Type',
        gridProps: {
            cols: 2,
            itemHeight: 50,
            data: repairTypes
        }
    })
    const repairPrice = new Section({
        headerText: 'Price',
        gridProps: {
            cols: 5,
            itemHeight: 40,
            data: repairPrices
        }
    })
    const separator = new Surface({
        size: [undefined, 0],
        tagName: 'TextView'
    })

    stack.push(repairType)
    stack.push(repairPrice)
    stack.push(separator)

    const cancelButton = new Surface({
        margins: [2, 0],
        content: new TextView({
            text: 'Cancel',
            font: '16px bold',
            textColor: 'white',
            layoutData: {centerY: 0, centerX: 0}
        }),
        proportions: [1/2, false],
        properties: {
            background: '#fb3a2e'
        },
    })

    const confirmButton = new Surface({
        margins: [2, 0],
        content: new TextView({
            text: 'Confirm',
            font: '16px bold',
            textColor: 'white',
            layoutData: {centerY: 0, centerX: 0}
        }),
        proportions: [1/2, false],
        properties: {
            background: '#21252b'
        },
        origin: [1, 0]
    })

    confirmButton.on('tap', () => {
        const repair = repairType.getSelection()
        const price = repairPrice.getSelection()
        if(repair && price) {
            console.log([repair, price])
        }
    })

    const middle = new Surface({
        size: [30, 30],
        origin: [.5, .5],
        content: new TextView({
            text: 'OR',
            layoutData: {centerX: 0, centerY: 0}
        }),
        properties: {
            cornerRadius: 15,
            background: '#efeff4'
        }
    })

    const actions = context.add({size: [undefined, 50], origin: [0, 1], align: [0, 1]})

    scrollview.add(stack)
    context.add(scrollview)
    actions.add(cancelButton)
    actions.add({align: [1, 0]}).add(confirmButton)
    actions.add({align: [.5, .5]}).add(middle)
    context.mount(page)
})

app.extend({ context })
app.extend({ page })

page.open()

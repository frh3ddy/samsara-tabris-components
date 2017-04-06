import { Page, Button, CollectionView, ImageView, TextView, ScrollView, Composite, TextInput } from 'tabris'
import { Widget, Core, Layouts } from 'samsara-tabris'
const { Context, Surface, ContainerSurface } = Widget
const { Transitionable, Transform, View } = Core
const { FlexibleLayout, SequentialLayout } = Layouts

import app from 'ampersand-app'
import Section from './section'
const context = new Context()

const repairTypes = [
    'LCD',
    'Battery',
    'Motherboard',
    'Hard Drive',
    'Memory RAM'
]

const repairPrices = ['$45','$75','$99','$120','$145','$199','$225','$399']

const page = new Page({
    title: 'info',
    topLevel: true,
    background: '#efeff4'
}).once('resize', (page) => {

    const stack = new SequentialLayout({
        direction: 1,
        spacing: 15,
        offset: 15
    })

    const section = new Section({
        headerText: 'Type',
        gridProps: {
            cols: 2,
            itemHeight: 50,
            data: repairTypes
        }
    })
    const section2 = new Section({
        headerText: 'Price',
        gridProps: {
            cols: 5,
            itemHeight: 40,
            data: repairPrices
        }
    })

    stack.push(section)
    stack.push(section2)

    context.add(stack)
    context.mount(page)
})

app.extend({ context })
app.extend({ page })

page.open()

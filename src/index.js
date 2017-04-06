import { Page, Button, CollectionView, ImageView, TextView, ScrollView, Composite, TextInput } from 'tabris'
import { Widget, Core, Layouts } from 'samsara-tabris'
const { Context, Surface, ContainerSurface } = Widget
const { Transitionable, Transform, View } = Core
const { FlexibleLayout, SequentialLayout } = Layouts

import app from 'ampersand-app'
import Modal from './Modal'

const context = new Context()

const page = new Page({
    title: 'info',
    topLevel: true,
    // background: 'red'
}).once('resize', (page) => {
    const modal = new Modal({
        margins: [10, 0],
        origin: [.5, 0]
    })

    context.add({align: [.5, 0], transform: Transform.translateY(10)}).add(modal)
    context.mount(page)
})

app.extend({ context })
app.extend({ page })

page.open()

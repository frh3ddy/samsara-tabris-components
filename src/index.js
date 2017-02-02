import { Page, Button, CollectionView, ImageView, TextView, ScrollView, Composite, TextInput } from 'tabris'
import { compose, init, methods, props } from 'stampit'

import Section from './stamps/section'

const page = new Page({
    title: 'stampit',
    topLevel: true,
    background: '#f4f5f9'
})

const scroll = new ScrollView({
    layoutData: {top: 0, left: 0, right: 0, bottom: 0}
}).appendTo(page)


const customerSection = Section({
    headerTitle: 'Customer info',
    parent: scroll,
    rows: [
        {labelText: 'Name', textContent: 'Fredy Mendez'},
        {labelText: 'Phone Number', textContent: '732 501 7273', actions: ['Call', 'Text']}
    ]
})

const deviceSection = Section({
    headerTitle: 'Device info',
    parent: scroll,
    rows: [
        {labelText: 'Brand', textContent: 'Apple'},
        {labelText: 'Password', textContent: '877jas778a'},
        {
            labelText: 'Tech Notes',
            textContent: 'Layout takes the form of a tree structure because most of layout is positioning one thing relative to another. ',
            actions: ['Edit']
        },
        {labelText: 'Current Status', textContent: 'This nested structure only exists in JavaScript', actions: ['Edit']}
    ]
})

const orderSection = Section({
    headerTitle: 'Order Details',
    parent: scroll,
    rows: [
        {labelText: 'Order Taken', textContent: '3 months ago'},
        {textContent: 'Repair Costs', actions: ['Edit', 'Add']}
    ]
})


// new Button({
//     text: 'update',
//     bottom: 20,
//     centerX: 0
// }).on('select', () => {
//     container.updateTextContent('Bret Victor invents ')
// }).appendTo(page)

page.open()

import { Page, Button, CollectionView, ImageView, TextView, ScrollView, Composite, TextInput } from 'tabris'
import { Widget, Core, Layouts } from 'samsara-tabris'
const { Context, Surface, ContainerSurface } = Widget
const { Transitionable, Transform, View } = Core
const { FlexibleLayout, SequentialLayout } = Layouts

import app from 'ampersand-app'

import ContentSection from './ContentSection'

const page = new Page({
    title: 'info',
    topLevel: true,
    background: '#f4f5f9'
})

const context = new Context()

app.extend({ context })

context.mount(page)

page.open()

const content = new SequentialLayout({
  direction: 1,
  spacing: 20,
})

const customerInfo = new ContentSection({
  headerTitle: 'Customer Info',
  data: [
      { label: 'Name', text: 'Fredy' },
      { label: 'Phone Number', text: '732-501-7273' }
  ]
})

const deviceInfo = new ContentSection({
  headerTitle: 'Device Info',
  data: [
      { label: 'Brand', text: 'Asus' },
      { label: 'Password', text: '7273' },
      { label: 'Thech Notes', text: 'The bigger, brilliant screen flows over, bringing life to everything you see. ... F1.9 female model photo ' },
      { label: 'Current Status', text: 'Working on it' }
  ]
})

const orderDetails = new ContentSection({
  headerTitle: 'Order Details',
  data: [
      { label: 'Order Taken', text: '2 months ago' },
      { text: 'Costs', action: 'Edit', repairs: [
          {name: 'LCD', price: '150'},
          {name: 'Battery', price: '50'},
          {name: 'Motherboard replacement', price: '225'}
      ]}
  ]
})

content.push(customerInfo)
content.push(deviceInfo)
content.push(orderDetails)

const scrolview = new ContainerSurface({
    // tagName: 'ScrollView',
    size: [undefined, undefined]
})

scrolview.add(content)

context.add(scrolview)

import { Page, Button, CollectionView, ImageView, TextView, ScrollView, Composite, TextInput } from 'tabris'
import { Widget, Core, Layouts } from 'samsara-tabris'
const { Context, Surface, ContainerSurface } = Widget
const { Transitionable, Transform, View } = Core
const { FlexibleLayout, SequentialLayout } = Layouts

import Thaw from "./thaw"

import app from 'ampersand-app'

import ContentSection from './ContentSection'

const page = new Page({
    title: 'info',
    topLevel: true,
    background: '#f4f5f9'
}).once('resize', (page) => {
  const context = new Context()

  app.extend({ context })
  app.extend({ page })

  context.mount(page)

  const contentOpacity = new Transitionable(0)

  const content = new SequentialLayout({
    direction: 1,
    spacing: 20,
    opacity: contentOpacity
  })

  const scrolview = new ContainerSurface({
      tagName: 'ScrollView',
      size: [undefined, undefined]
  })

  scrolview.add(content)

  context.add(scrolview)

  new Thaw([
  	function() {
      let customerInfo = new ContentSection({
        headerTitle: 'Customer Info',
        data: [
            { label: 'Name', text: 'Fredy' },
            { label: 'Phone Number', text: '732-501-7273' }
        ]
      })

      content.push(customerInfo)
    },
  	function() {
      let deviceInfo = new ContentSection({
        headerTitle: 'Device Info',
        data: [
            { label: 'Brand', text: 'Asus' },
            { label: 'Password', text: '7273' },
            { label: 'Thech Notes', text: 'The bigger, brilliant screen flows over, bringing life to everything you see. ... F1.9 female model photo ' },
            { label: 'Current Status', text: 'Working on it' }
        ]
      })

      content.push(deviceInfo)
    },
    function() {
        let orderDetails = new ContentSection({
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

      content.push(orderDetails)
    },
    function () {
      contentOpacity.set(1, {duration: 200})
      new Button({
        text: 'update text',
        bottom: 20,
        left: 20
      }).on('select', () => {
        app.testTextUpdate.onUpdate('He wrote his first amicus brief in October 2003 for two cases appealed before the Supreme Court of the United States, Shafiq Rasul v. George W. Bush and Khaled A.F. Al Odah v. United States of America. Attorneys Arturo J. Gonzalez and Sylvia M. Sokol of Morrison & Foerster LLP and Jon B. Streeter and Eumi K. He wrote his first amicus brief in October')
      }).appendTo(page)

      new Button({
        text: 'update small',
        bottom: 20,
        right: 20
      }).on('select', () => {
        app.testTextUpdate.onUpdate('He wrote his first amicus brief in October 2003 for two cases appealed before the Supreme Court of the United States, Shafiq Rasul v. ')
      }).appendTo(page)
    }
  ])
})

// const context = new Context()
//
// app.extend({ context })
//
// context.mount(page)

page.open()

// const contentOpacity = new Transitionable(0)
//
// const content = new SequentialLayout({
//   direction: 1,
//   spacing: 20,
//   opacity: contentOpacity
// })

// const customerInfo = new ContentSection({
//   headerTitle: 'Customer Info',
//   data: [
//       { label: 'Name', text: 'Fredy' },
//       { label: 'Phone Number', text: '732-501-7273' }
//   ]
// })

// const deviceInfo = new ContentSection({
//   headerTitle: 'Device Info',
//   data: [
//       { label: 'Brand', text: 'Asus' },
//       { label: 'Password', text: '7273' },
//       { label: 'Thech Notes', text: 'The bigger, brilliant screen flows over, bringing life to everything you see. ... F1.9 female model photo ' },
//       { label: 'Current Status', text: 'Working on it' }
//   ]
// })

// const orderDetails = new ContentSection({
//   headerTitle: 'Order Details',
//   data: [
//       { label: 'Order Taken', text: '2 months ago' },
//       { text: 'Costs', action: 'Edit', repairs: [
//           {name: 'LCD', price: '150'},
//           {name: 'Battery', price: '50'},
//           {name: 'Motherboard replacement', price: '225'}
//       ]}
//   ]
// })

// content.push(customerInfo)
// content.push(deviceInfo)
// content.push(orderDetails)

// const scrolview = new ContainerSurface({
//     tagName: 'ScrollView',
//     size: [undefined, undefined]
// })
//
// scrolview.add(content)
//
// context.add(scrolview)
//
// new Thaw([
// 	function() {
//     let customerInfo = new ContentSection({
//       headerTitle: 'Customer Info',
//       data: [
//           { label: 'Name', text: 'Fredy' },
//           { label: 'Phone Number', text: '732-501-7273' }
//       ]
//     })
//
//     content.push(customerInfo)
//   },
// 	function() {
//     let deviceInfo = new ContentSection({
//       headerTitle: 'Device Info',
//       data: [
//           { label: 'Brand', text: 'Asus' },
//           { label: 'Password', text: '7273' },
//           { label: 'Thech Notes', text: 'The bigger, brilliant screen flows over, bringing life to everything you see. ... F1.9 female model photo ' },
//           { label: 'Current Status', text: 'Working on it' }
//       ]
//     })
//
//     content.push(deviceInfo)
//   },
//   function() {
//       let orderDetails = new ContentSection({
//       headerTitle: 'Order Details',
//       data: [
//           { label: 'Order Taken', text: '2 months ago' },
//           { text: 'Costs', action: 'Edit', repairs: [
//               {name: 'LCD', price: '150'},
//               {name: 'Battery', price: '50'},
//               {name: 'Motherboard replacement', price: '225'}
//           ]}
//       ]
//     })
//
//     content.push(orderDetails)
//   },
//   function () {
//     contentOpacity.set(1, {duration: 200})
//   }
// ]);

import { Page, Button, CollectionView, ImageView, TextView, Composite, TextInput } from 'tabris'
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

const showT = new Transitionable(0)

const content = new SequentialLayout({
  direction: 1,
  spacing: 20,
  opacity: showT
  // size: [undefined, 100]
})

// const customerInfo = new ContentSection({
//   headerTitle: 'Customer Info',
//   data: [
//       { label: 'Name', text: 'Fredy' },
//       { label: 'Phone Number', text: '732-501-7273' }
//   ]
// })
//
// const deviceInfo = new ContentSection({
//   headerTitle: 'Device Info',
//   data: [
//       { label: 'Brand', text: 'Asus' },
//       { label: 'Password', text: '7273' },
//       { label: 'Thech Notes', text: 'The bigger, brilliant screen flows over, bringing life to everything you see. ... F1.9 female model photo ' },
//       { label: 'Current Status', text: 'Working on it' }
//   ]
// })

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

// content.push(customerInfo)
// content.push(deviceInfo)
content.push(orderDetails)

setTimeout(() => {
  showT.set(1, {curve: 'easeIn', duration: 220})
})

context.add(content)




// import App from 'ampersand-app'
// import Backendless from 'backendless'
// import 'monguitodb'
//
// import page from './pages/startPage'
//
// const APP_ID = '95BB7CFC-21DE-A9C7-FFE7-E6ED93EEA300'
// const SECRET_KEY = '27C1BD9A-321C-1751-FF79-171FD5910500'
// Backendless.initApp( APP_ID, SECRET_KEY, 'v1' )
// Backendless.enablePromises()
//
// App.extend({
//   init: function () {
//     tabris.ui.set({
//       statusBarTheme: 'dark',
//       background: '#3a3f4c',
//       toolbarVisible: false
//     })
//
//     this.db =  new MonguitoDB(localStorage, 'orders')
//     page.open()
//   }
// })
//
// App.init()

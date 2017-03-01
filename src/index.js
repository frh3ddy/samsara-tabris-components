import { Page, ScrollView, Button } from 'tabris'

import FormattedInput from './stamps/inputs/FormattedInput'
import TextInput from './stamps/inputs/TextInput'
import Picker from './stamps/inputs/Picker'
import RadioInput from './stamps/inputs/RadioInput'
import Modal from './stamps/inputs/Modal'
import { Users, Order, Customer, Device } from './stamps/inputs/data-objects'
import './pollyfills'

let modal

const page = new Page({
    title: 'stampit',
    topLevel: true,
    background: '#f4f5f9'
})

const scroll = new ScrollView({
    layoutData: {top: 0, left: 0, right: 0, bottom: 0}
}).appendTo(page)

const customerName = TextInput({
    layoutData: {left: 20, right: 20, top: ['prev()', 20]},
    label: 'Customer Name',
    message: 'Enter Customer Name',
    autoCapitalize: true
}).appendTo(scroll)

const phoneNumber = FormattedInput({
    layoutData: {left: 20, right: 20, top: ['prev()', 20]},
    label: 'Phone #',
    minChar: 10,
    template: '(xxx) xxx-xxxx',
    message: '(123) 456-7890',
    keyboard: 'number'
}).appendTo(scroll)

const devicePassword = TextInput({
    layoutData: {left: 20, right: 20, top: ['prev()', 20]},
    label: 'Device Password',
    message: 'Enter Password',
}).appendTo(scroll)

const techNotes = TextInput({
    layoutData: {left: 20, right: 20, top: ['prev()', 20]},
    label: 'Tech Notes',
    type: 'multiline',
    autoCapitalize: true,
    autoCorrect: true
}).appendTo(scroll)

const diagnosticFees = FormattedInput({
    layoutData: {left: 20, right: 20, top: ['prev()', 20]},
    label: 'Diagnostic Fees',
    message: '$35',
    minChar: 2,
    template: '$xxx',
    keyboard: 'number'
}).appendTo(scroll)

const deviceBrand = Picker({
    layoutData: {left: 20, right: 20, top: ['prev()', 20]},
    label: 'Device brand',
    items: ['Select Brand', 'Acer', 'Apple', 'Asus', 'Dell', 'Hp', 'Lenovo', 'Samsung', 'Sony']
}).appendTo(scroll)

const hasCharger = RadioInput({
    layoutData: {left: 20, right: 20, top: ['prev()', 20]},
    label: 'With charger?',
    options: ['Yes', 'No']
}).appendTo(scroll)

const scrollInputs = scroll.children()

new Button({
    text: 'Submit Order',
    background: 'white',
    layoutData: {top: [hasCharger, 30], right: 20}
}).on('select', () => {
    if( isFormValid() ) {
        preventBackNavigation()
        initializeModal()

        const order = createOrder()
        submitOrder(order)
        return
    }

    window.plugins.toast.showShortTop('Complete all fields')
}).appendTo(scroll)

new Button({
    text: 'Clear Form',
    textColor: '#ff3a2f',
    background: 'white',
    layoutData: {top: [hasCharger, 30], left: 20}
}).on('select', clearForm).appendTo(scroll)

function clearForm() {
    scrollInputs.forEach(input => input.clear())
}

function initializeModal() {
    modal = Modal({
        parent: page,
        layoutData: {top: 0, bottom: 0, left: 0, right: 0}
    })
}

function submitOrder(order) {
    // Backendless.Persistence.of(Order).save(order)
    // .then(response => {
    //     modal.showSuccess()
    //     clearForm()
    //
    //     let db = app.db.orders
    //     db.insert(response)
    //
    //     let collection = app.orderCollection
    //
    //     if (collection) {
    //       let collectionLenght =  collection.get('items').length
    //       collection.insert([response], collectionLenght)
    //       collection.reveal(collectionLenght)
    //     }
    //
    //     let publish = {
    //     type: 'new order',
    //     publisher: app.currentUser,
    //     orderId: response.objectId
    //     }
    //
    //     Backendless.Messaging.publish("amboy_store", JSON.stringify(publish), null, null)
    // })
    // .catch(error => {
    //     console.log(error)
    //     modal.showError()
    // })

    fetch('http://www.mocky.io/v2/58b4ed3d1000004508ea5575')
    .then(response => {
        if (response.ok) {
            modal.showError()
            clearForm()
        }
    })
    .catch(error => {
        console.log(error)
        modal.showError()
    })
}

function preventBackNavigation() {
    tabris.app.on('backnavigation' , (app, event) => {
        event.preventDefault()
    })
}

function isFormValid() {
    const allValid = scrollInputs.filter(input => {
        input.validate()
        return input.isValid === true
    })

    if (allValid.length === scrollInputs.length) return true

    return false
}

function createOrder() {
    return new Order({
      status: 'Order Placed',
      store: 'iii',
      diagnostic: diagnosticFees.getInput(),
      tech_notes: techNotes.getInput(),
      customer: new Customer({
        name: customerName.getInput(),
        phone_number: phoneNumber.getInput()
      }),
      devices: new Device({
        password: devicePassword.getInput(),
        charger: hasCharger.getInput(),
        brand: deviceBrand.getInput()
      }),
      tech: new Users({
        objectId: 'kkkk'
      })
    })
}

function noop() {}

page.open()

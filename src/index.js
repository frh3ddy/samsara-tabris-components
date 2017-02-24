import { Page, ScrollView} from 'tabris'

import FormattedInput from './stamps/inputs/FormattedInput'
import TextInput from './stamps/inputs/TextInput'
import Picker from './stamps/inputs/Picker'
import RadioInput from './stamps/inputs/RadioInput'

const page = new Page({
    title: 'stampit',
    topLevel: true,
    background: '#f4f5f9'
})

const scroll = new ScrollView({
    layoutData: {top: 0, left: 0, right: 0, bottom: 0}
}).appendTo(page)

TextInput({
    layoutData: {left: 20, right: 20, top: ['prev()', 20]},
    label: 'Customer Name',
    message: 'Enter Customer Name',
    autoCapitalize: true
}).appendTo(scroll)

FormattedInput({
    layoutData: {left: 20, right: 20, top: ['prev()', 20]},
    label: 'Phone #',
    minChar: 10,
    template: '(xxx) xxx-xxxx',
    message: '(123) 456-7890',
    keyboard: 'number'
}).appendTo(scroll)

TextInput({
    layoutData: {left: 20, right: 20, top: ['prev()', 20]},
    label: 'Device Password',
    message: 'Enter Password',
}).appendTo(scroll)

TextInput({
    layoutData: {left: 20, right: 20, top: ['prev()', 20]},
    label: 'Tech Notes',
    type: 'multiline',
    autoCapitalize: true,
    autoCorrect: true
}).appendTo(scroll)

FormattedInput({
    layoutData: {left: 20, right: 20, top: ['prev()', 20]},
    label: 'Quoted price',
    message: '$35',
    minChar: 2,
    template: '$xxx',
    keyboard: 'number'
}).appendTo(scroll)

Picker({
    layoutData: {left: 20, right: 20, top: ['prev()', 20]},
    label: 'Device brand',
    items: ['Select Brand', 'Acer', 'Apple', 'Asus', 'Dell', 'Hp', 'Lenovo', 'Samsung', 'Sony']
}).appendTo(scroll)

const r = RadioInput({
    layoutData: {left: 20, right: 20, top: ['prev()', 20]},
    label: 'With charger?',
    options: ['Yes', 'No']
}).appendTo(scroll)

r.validate()

page.open()

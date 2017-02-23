import { Page, ScrollView} from 'tabris'

import TextInput from './stamps/inputs/TextInput'

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
    label: 'Phone #',
    autoCapitalize: true,
    message: '(xxx) xxx-xxxx',
    keyboard: 'number'
    // type: 'multiline'
}).appendTo(scroll)

TextInput({
    layoutData: {left: 20, right: 20, top: ['prev()', 20]},
    label: 'Customer Name',

    message: 'Enter Customer Name',
}).appendTo(scroll)

TextInput({
    layoutData: {left: 20, right: 20, top: ['prev()', 20]},
    label: 'Customer Name',
    message: 'Enter Customer Name',
}).appendTo(scroll)



page.open()

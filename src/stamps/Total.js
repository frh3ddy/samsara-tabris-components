import { TextView, Composite, Button, ImageView} from 'tabris'
import { compose, init, methods, props } from 'stampit'

import CountUp from '../countup'

const EventForwarder = methods({
    on(type, fn) {
        this.container.on(type, fn)
    }
})

const ContainerView = init(function({parent}) {
    this.parent = parent
    const container = new Composite({
        layoutData: {left: 0, right: 0, top: ['prev()', -.5]},
        background: 'white'
    }).appendTo(parent)

    this.container = container
})

const Borders = init(function({borderColor, borderWidth}) {
    const container = this.container

    this.topBorder = new TextView({
        layoutData: {height: borderWidth, top: 0, left: 50, right: 0},
        background: borderColor
    }).appendTo(container)

    this.bottomBorder = new TextView({
        layoutData: {height: borderWidth, top: container, left: 0, right: 0},
        background: borderColor
    }).appendTo(container.parent())
})

const Content = init(function () {
    this.text = new TextView({
        font: '16px bold',
        text: 'Total Repair Costs',
        layoutData: {left: 15, top: 20, bottom: 20}
    }).appendTo(this.container)

    this.price = new TextView({
        text: '$289',
        font: '22px bold',
        layoutData: {right: 40, top: 20, bottom: 20}
    }).appendTo(this.container)
})

const ContainerContentMethods = methods({
    updateTotal(newTotal) {
        this.text.set('text', 'Total Repair Costs')

        if (newTotal <= 0) {
            newTotal = 35
            this.text.set('text', 'Diagnosis')
        }

        this.countUp.update(newTotal)
    }
})

const CountUpInit = init(function () {
    const intitialValue = 0
    const element = this.price
    const options = {
      useEasing : true,
      useGrouping : false,
      separator : ',',
      decimal : '.',
      prefix : '$',
      suffix : ''
    };

    this.countUp = new CountUp(element, 0, intitialValue, 0, 1.5, options)
    this.countUp.start()
})

export const Total = compose(
    ContainerView,
    Borders,
    EventForwarder,
    ContainerContentMethods,
    Content,
    CountUpInit
)

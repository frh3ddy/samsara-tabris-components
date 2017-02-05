import { TextView, Composite, Button, ImageView} from 'tabris'
import { compose, init, methods, props } from 'stampit'

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
    new TextView({
        font: '16px bold',
        text: 'Total Repair Costs',
        layoutData: {left: 15, top: 20, bottom: 20}
    }).appendTo(this.container)

    new TextView({
        text: '$289',
        font: '22px bold',
        layoutData: {right: 40, top: 20, bottom: 20}
    }).appendTo(this.container)
})

const ContainerContentMethods = methods({
    addName(text){
        this.name = this.createText(text, 'left')
    },
    addPrice(text){
        this.price = this.createText(text, 'right')
    },
    updatePrice(text) {
        this.price.set('text', text)
        this.updateSize()
    },
    createText(text, align) {
        return new TextView({
            layoutData: {top: [this.topBorder, 20], [align]: 50, bottom: 20},
            text: text,
            font: '16px',
            textColor: '#252c41',
        }).once('resize', (w, b) => {
            w.parent().set('height', b.height + 40)
        }).appendTo(this.container)
    }
})

export const Total = compose(
    ContainerView,
    Borders,
    EventForwarder,
    ContainerContentMethods,
    Content
)

import { TextView, Composite } from 'tabris'
import { compose, init, methods, props } from 'stampit'

const EventForwarder = methods({
    on(type, fn) {
        this.container.on(type, fn)
    }
})

const ContainerView = init(function({parent}) {
    const container = new Composite({
        layoutData: {left: 0, right: 0, top: ['prev()', -.5]},
        background: 'white'
    }).appendTo(parent)

    setTimeout(() => {
        container.trigger('custom', 'hello world')
    }, 5000)

    this.container = container
})

const Borders = init(function({borderColor, borderWidth}) {
    const container = this.container

    this.topBorder = new TextView({
        layoutData: {height: borderWidth, top: 0, left: 15, right: 0},
        background: borderColor
    }).appendTo(container)

    this.bottomBorder = new TextView({
        layoutData: {height: borderWidth, top: container, left: 15, right: 0},
        background: borderColor
    }).appendTo(container.parent())
})

const Defaults = props({
    container: undefined
})

const Initializer = init(function ({labelTitle, text, action}) {
    const container = this.container
})

const ContainerContentMethods = methods({
    addLabel(text){
        this.textLabel = new TextView({
            layoutData: {top: [this.topBorder, 10], left: 15},
            text: text,
            font: '11px',
            textColor: '#6E7783',
        }).appendTo(this.container)
    },
    addTextContent(text){
        let prev = this.topBorder
        if (this.textLabel) prev = this.textLabel

        this.textContent = new TextView({
            layoutData: {top: [prev, 10], bottom: 10, left: 15, right: 0},
            text: text,
            font: '16px',
            textColor: '#252c41',
        }).appendTo(this.container)
    },
    updateTextContent(text) {
        this.textContent.set('text', text)
    }
})

export default compose(
    Defaults,
    ContainerView,
    Borders,
    Initializer,
    EventForwarder,
    ContainerContentMethods
)

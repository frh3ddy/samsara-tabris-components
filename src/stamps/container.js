import { TextView, Composite } from 'tabris'
import { compose, init, methods, props } from 'stampit'

const EventForwarder = methods({
    on(type, fn) {
        this.container.on(type, fn)
    }
})

const ContainerView = init(function({parent}) {
    this.actions = []
    const container = new Composite({
        layoutData: {left: 0, right: 0, top: ['prev()', -.5]},
        background: 'white'
    }).appendTo(parent)

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
        let margin = 25
        if (this.textLabel) {
            prev = this.textLabel
            margin = 10
        }

        this.textContent = new TextView({
            layoutData: {top: [prev, margin], bottom: margin, left: 15, right: 84},
            text: text,
            font: '16px',
            textColor: '#252c41',
        }).appendTo(this.container)
    },
    updateTextContent(text) {
        this.textContent.set('text', text)
        this.updateSize()
    },
    updateSize() {
        this.container.set('height', null)
    }
})

const ContainerActionMethods = methods({
    addAction(action) {
        const margin = 25
        let actionView = new TextView({
            cornerRadius: 22,
            width: 44,
            height: 44,
            alignment: 'center',
            background: '#d9e1e8',
            textColor: '#282c37',
            centerY: 0,
            right: margin,
            text: action
        }).on('tap', (widget) => {
            this.container.trigger('actionFire', {type: action, instance: this})
        }).appendTo(this.container)

        if (this.actions.length > 0) {
            let prev = this.actions[this.actions.length - 1]
            actionView.set('right', [prev, margin])
        }

        this.actions.push(actionView)
    }
})

export const Container =  compose(
    ContainerView,
    Borders,
    EventForwarder,
    ContainerContentMethods,
    ContainerActionMethods
)

import { TextView, Composite, Button} from 'tabris'
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
        layoutData: {height: borderWidth, top: 0, left: 50, right: 0},
        background: borderColor
    }).appendTo(container)

    this.bottomBorder = new TextView({
        layoutData: {height: borderWidth, top: container, left: 50, right: 0},
        background: borderColor
    }).appendTo(container.parent())
})

const ContainerContentMethods = methods({
    addRepairName(text){
        this.textLabel = this.createText(text, 'left')
    },
    addRepairPrice(text){
        this.textContent = this.createText(text, 'right')
    },
    updateTextContent(text) {
        this.textContent.set('text', text)
        this.updateSize()
    },
    updateSize() {
        this.container.set('height', null)
    },
    createText(text, align) {
        return new TextView({
            layoutData: {top: [this.topBorder, 10], [align]: 50, bottom: 10},
            text: text,
            font: '16px',
            textColor: '#252c41',
        }).appendTo(this.container)
    }
})

const ContainerActionMethods = methods({
    addAction(action) {
        const margin = 25
        let actionView = new Button({
            cornerRadius: 22,
            // width: 44,
            // height: 44,
            // alignment: 'center',
            // background: '#d9e1e8',
            textColor: '#282c37',
            centerY: 0,
            right: margin,
            text: action
        }).on('select', (widget) => {
            this.container.trigger('actionFire', {type: action, instance: this})
        }).appendTo(this.container)

        if (this.actions.length > 0) {
            let prev = this.actions[this.actions.length - 1]
            actionView.set('right', [prev, margin])
        }

        this.actions.push(actionView)
    }
})

export const ContainerRepair =  compose(
    ContainerView,
    Borders,
    EventForwarder,
    ContainerContentMethods,
    ContainerActionMethods
)

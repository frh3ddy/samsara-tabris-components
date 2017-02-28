import { Composite, TextView } from 'tabris'
import { compose, init, methods, props, composers } from 'stampit'


const ContentContainer = composers(({ stamp }) => {
  stamp.compose.methods = stamp.compose.methods || {}; // make sure it exists
  Object.setPrototypeOf(stamp.compose.methods, Composite.prototype);
})

const ContainerInit = init( function ({layoutData, background, parent}) {
    //tabris widget class constructor
    this.constructor()

    if (layoutData) this.layoutData = layoutData
    if (background) this.background = background

    this.set('layoutData', this.layoutData)
    this.set('background', this.background)

    if(parent) this.appendTo(parent)
}).props({
    layoutData: {left: 0, right: 0, top: 'prev()'},
    background: 'initial'
})

const Borders = init(function({border}) {
    if (border) this.addBorders(border)
}).methods({
    addBorders(border) {
        const borders = border.split(' ')

        const color = borders[0]
        const top = borders[1]
        const right = borders[2]
        const bottom = borders[3]
        const left = borders[4]

        this.once('resize', () => {
            this.topBorder = new TextView({
                layoutData: {height: top, top: 0, left: 0, right: 0},
                background: color
            }).appendTo(this)

            // this.rightBorder = new TextView({
            //     layoutData: {width: right, top: 0, right: 0, bottom: 0},
            //     background: color
            // }).appendTo(this)

            this.bottomBorder = new TextView({
                layoutData: {height: bottom, bottom: 0, left: 0, right: 0},
                background: color
            }).appendTo(this)

            // this.leftBorder = new TextView({
            //     layoutData: {width: left, top: 0, left: 0, bottom: 0},
            //     background: color
            // }).appendTo(this)
        })

        return this
    }
})

const BaseContainer = compose(ContainerInit, ContentContainer, Borders);

export default BaseContainer

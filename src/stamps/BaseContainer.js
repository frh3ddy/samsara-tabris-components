import { Composite } from 'tabris'
import { compose, init, methods, props, composers } from 'stampit'


const ContentContainer = composers(({ stamp }) => {
  stamp.compose.methods = stamp.compose.methods || {}; // make sure it exists
  Object.setPrototypeOf(stamp.compose.methods, Composite.prototype);
})

const ContainerInit = init( function ({layoutData, background}) {
    //tabris widget class constructor
    this.constructor()

    if (layoutData) this.layoutData = layoutData
    if (background) this.background = background

    this.set('layoutData', this.layoutData)
    this.set('background', this.background)

}).props({
    layoutData: {left: 0, right: 0, top: ['prev()', -.5]},
    background: 'white'
})

const Borders = init(function({borderColor, borderWidth}) {
    this.topBorder = new TextView({
        layoutData: {height: borderWidth, top: 0, left: 0, right: 0},
        background: borderColor
    }).appendTo(this)

    this.bottomBorder = new TextView({
        layoutData: {height: borderWidth, bottom: 0, left: 0, right: 0},
        background: borderColor
    }).appendTo(this)
})

const Container = compose(ContainerInit, ContentContainer, Borders);

export default Container

import { TextView, Composite } from 'tabris'
import { compose, init, methods, props } from 'stampit'

import BaseContainer from './BaseContainer'
import ListContainer from './ListContainer'

const Section = init(function ({headerTitle, data}) {
    new TextView({
        layoutData: {left: 8, height: 25, top: ['prev()', 15]},
        font: '13px bold',
        textColor: '#6d819c',
        text: headerTitle.toUpperCase(),
    }).appendTo(this)

    ListContainer({
        data,
        border: '#dddfe6 1 0 1 0',
        background: 'white',
    }).appendTo(this)
})

export default compose(BaseContainer, Section)

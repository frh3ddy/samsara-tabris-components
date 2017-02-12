import { TextView, Composite, Button} from 'tabris'
import { compose, init, methods, props } from 'stampit'

import BaseContainer from './BaseContainer'
import Container from './Container'

const ListContainer = init(function({data}) {
    data.forEach((item, index, array) => {
        const {labelText, textContent, actions = [], repairList = []} = item
        let listItem = Container({layoutData: {left: 20, right: 0, top: 'prev()'}})

        const notLastItem = index !== array.length -1

        if (notLastItem) {
            listItem.addBorders('#dddfe6 0 0 .5 0')
        }

        actions.forEach(action => {
            listItem.addAction(action)
        })

        listItem.addLabel(labelText)
        listItem.addTextContent(textContent)

        listItem.appendTo(this)
    })
})

export default compose( BaseContainer, ListContainer )
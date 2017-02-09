import { TextView, Composite, Button} from 'tabris'
import { compose, init, methods, props } from 'stampit'

import BaseContainer from './BaseContainer'
import Container from './Container'

const ListContainer = init(function({data}) {
    let listItem = Container({layoutData: {left: 20, right: 0, top: 'prev()'}})

    actions.forEach(action => {
        listItem.addAction(action)
    })

    listItem.addLabel(labelText)
    listItem.addTextContent(textContent)

    listItem.appendTo(this)
})

export default compose( BaseContainer, ListContainer )

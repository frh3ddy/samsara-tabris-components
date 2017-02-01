import { TextView } from 'tabris'
import { compose, init, methods, props } from 'stampit'

import Container from './container'

export default ({headerTitle, rows, parent}) => {
    new TextView({
        layoutData: {left: 8, height: 25, top: ['prev()', 15]},
        font: '13px bold',
        textColor: '#6d819c',
        text: headerTitle.toUpperCase(),
    }).appendTo(parent)

    rows.forEach(({labelText, textContent}) => {
        const container = Container({borderColor: '#dddfe6', borderWidth: .5, parent})
        container.addLabel(labelText)
        container.addTextContent(textContent)
    })
}

import { TextView } from 'tabris'
import { compose, init, methods, props } from 'stampit'

import { Container } from './container'

export default init(function({headerTitle, rows, parent}) {
    const containerLists = []
    this.containerLists = containerLists

    new TextView({
        layoutData: {left: 8, height: 25, top: ['prev()', 15]},
        font: '13px bold',
        textColor: '#6d819c',
        text: headerTitle.toUpperCase(),
    }).appendTo(parent)

    rows.forEach(({labelText, textContent, actions}) => {
        let container = Container({borderColor: '#dddfe6', borderWidth: .5, parent})

        if (labelText) container.addLabel(labelText)
        container.addTextContent(textContent)

        if (actions) {
            actions.forEach(action => {
                container.addAction(action)
            })

            container.on('actionFire', ({type, instance}) => {
                const word = labelText.split(' ')[1]
                if(type === 'Edit') {
                    navigator.notification.prompt(
                        `enter new ${word}`, // message
                        function(results) {
                          if (results.buttonIndex === 1) return
                          instance.updateTextContent(results.input1)
                        }, // callback to invoke
                        labelText, // title
                        ["Cancel", "Update"], // buttonTextViews
                        "" // defaultText
                    );
                    // instance.updateTextContent('hshshshhshshshshhhs')
                }
            })
        }

        containerLists.push(container)
    })
})

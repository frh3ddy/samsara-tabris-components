import { TextView } from 'tabris'
import { compose, init, methods, props } from 'stampit'

import { Container } from './container'
import { Repair } from './Repair'

export default init(function({headerTitle, rows, parent}) {
    new TextView({
        layoutData: {left: 8, height: 25, top: ['prev()', 15]},
        font: '13px bold',
        textColor: '#6d819c',
        text: headerTitle.toUpperCase(),
    }).appendTo(parent)

    rows.forEach((data, index, array) => {
        const {labelText, textContent, actions, repairList} = data
        let container = Container({borderColor: '#dddfe6', borderWidth: .5, parent})

        if (index === 0 ) container.topBorder.set({left: 0, height: 1})
        if (index === array.length -1) container.bottomBorder.set({left: 0, height: 1})

        if (labelText) container.addLabel(labelText)
        container.addTextContent(textContent)

        if(repairList) {
            container.bottomBorder.set('background', 'white')
            repairList.forEach(({name, cost}, index) => {
                const repair = Repair({borderColor: '#dddfe6', borderWidth: .5, parent})
                if (index === 0) {
                    repair.topBorder.set('background', 'white')
                }
                repair.addName(name)
                repair.addPrice(cost)
                container.on('actionFire', ({type, instance}) => {
                    if(type === 'Edit' && repair.list.length > 0) {
                        if(repair.container.isDisposed()) return
                        repair.animate()
                    }
                })
            })
        }

        if (actions) {
            actions.forEach(action => {
                container.addAction(action)
            })

            container.on('actionFire', ({type, instance}) => {
                if(type === 'Edit' && labelText) {
                    const word = labelText.split(' ')[1]
                    navigator.notification.prompt(
                        `enter new ${word}`, // message
                        function(results) {
                          if (results.buttonIndex === 1 || results.input1 === '') return
                          instance.updateTextContent(results.input1)
                        }, // callback to invoke
                        labelText, // title
                        ["Cancel", "Update"], // buttonTextViews
                        "" // defaultText
                    );
                }

                if(type === 'Text') {
                    const message  = 'test mesage'
                    window.plugins.socialsharing.shareViaSMS({message: message},
                        "7329256350", succes => {
                            setTimeout(() => {
                                if (succes) {
                                    window.plugins.toast.showShortCenter('Message sent')
                                }
                            }, 1000)
                        }
                    )
                }
            })
        }
    })
})

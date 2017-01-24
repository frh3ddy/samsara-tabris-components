import { ImageView, TextView, Composite } from 'tabris'
import { Widget, Core, Layouts } from 'samsara-tabris'
const { Surface } = Widget
const { Transitionable, Transform, View } = Core
const { SequentialLayout } = Layouts

import CountUp from './countup'

export default View.extend({
    defaults: {
      borderBottom: false
    },
    events: {
        priceChanged: 'onPriceChanged'
    },
    initialize({price}) {
        const borderColor = '#dddfe6'

        const priceList = this.add({
          margins: [25, 0],
          origin: [1, 0],
          align: [1, 0]
        })

        const repairTextSurface = new Surface({
          content: new TextView({
            font: '16px bold',
            text: 'Total repair cost',
            textColor: '#000000',
            left: 8,
            centerY: 0
          })
        })

        const repairPriceSurface = new Surface({
          origin: [1, 0],
          content: new TextView({
            font: '16px bold',
            textColor: '#000000',
            right: 20,
            centerY: 0
          })
        })

        const textWidget = repairPriceSurface.getContent()

        this.price = initCountUp(textWidget, price)
        this.textWidget = textWidget

        priceList.add(repairTextSurface)
        priceList.add({align: [1, 0]}).add(repairPriceSurface)

        const borderBottomSurface = new Surface({
            size: [undefined, .5],
            origin: [0, 1],
            properties: {
                background: borderColor,
            }
        })

        const borderTopSurface = new Surface({
            size: [undefined, .5],
            origin: [0, 1],
            properties: {
                background: borderColor,
            }
        })

        this.add(borderTopSurface)
        this.add({align: [0, 1]}).add(borderBottomSurface)
    },
    onPriceChanged({prevPrice, newPrice}) {
        let textPrice = this.textWidget.get('text')

        if (textPrice.charAt(0) === '$') {
          textPrice = textPrice.substr(1)
        }

        let currentPrice = parseInt(textPrice) - prevPrice

        this.price.update(newPrice + currentPrice)
    }
})

function initCountUp(textView, value) {
  const options = {
    useEasing : true,
    useGrouping : false,
    separator : ',',
    decimal : '.',
    prefix : '$',
    suffix : ''
  };

  var numAnim = new CountUp(textView, 0, value, 0, 1.5, options)
  numAnim.start()

  return numAnim
}

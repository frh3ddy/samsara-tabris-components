import { ImageView, TextView, Composite } from 'tabris'
import { Widget, Core, Layouts } from 'samsara-tabris'
const { Surface } = Widget
const { Transitionable, Transform, View } = Core
const { SequentialLayout } = Layouts

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
            text: price,
            textColor: '#000000',
            right: 20,
            centerY: 0
          })
        })

        this.repairPriceSurface = repairPriceSurface

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
        const repairPrice = this.repairPriceSurface.getContent()
        let currentPrice = parseInt(repairPrice.get('text'))

        currentPrice -= prevPrice
        repairPrice.set('text', currentPrice + newPrice)
    }
})

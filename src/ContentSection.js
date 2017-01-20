import { Widget, Core, Layouts } from 'samsara-tabris'
const { Surface } = Widget
const { View } = Core
const { FlexibleLayout, SequentialLayout } = Layouts

import HeaderTitle from './HeaderTitle'
import InfoRow from './InfoRow'
import PriceRow from './PriceRow'
import TotalCost from './TotalCost'

export default View.extend({
    initialize({headerTitle, data}) {
        let cacheHeight
        const container = new SequentialLayout({
            direction: 1
        })

        this.container = container

        const background = new Surface({
          properties: {
            background: '#ffffff'
          }
        })

        container.size.on('end', size => {
          if(size[1] !== cacheHeight){
            this.setSize([undefined, size[1]])
            cacheHeight = size[1]
          }
        })

        const header = new HeaderTitle({
            title: headerTitle,
            leftMargin: 8,
            size: [undefined, 25],
            backgroundColor: '#f4f5f9'
        })

        container.push(header)

        let first = true

        data.forEach(data => {
            const row = new InfoRow({
              labelTitle: data.label,
              text: data.text,
              borderTop: first ? true : undefined,
              action: data.action
            })

            if(first) first = false

            container.push(row)

            if(data.repairs) {
                let totalCost = 0

                data.repairs.forEach(repairData => {
                    totalCost += parseInt(repairData.price)

                    const price = new PriceRow({
                        size: [undefined, 60],
                        repairData
                    })

                    price.on('delete', () => {
                        container.unlink(price).remove()
                    })

                    price.on('priceChanged', (payload) => {
                        this.emit('priceChanged', payload)
                    })

                    row.on('edit', () => {
                        price.trigger('edit')
                    })

                    row.on('done', () => {
                        price.trigger('done')
                    })

                    container.push(price)
                })

                if(totalCost > 0) {
                    const totalRepairCost = new TotalCost({
                        size: [undefined, 60],
                        price: totalCost
                    })

                    this.on('priceChanged', (payload) => {
                        totalRepairCost.trigger('priceChanged', payload)
                    })

                    container.push(totalRepairCost)
                } else {
                    const totalRepairCost = new TotalCost({
                        size: [undefined, 60],
                        price: '35'
                    })
                    container.push(totalRepairCost)
                }
            }
        })

        this.add(background)
        this.add(container)
    },
    update(data) {
        this.container.unlink(3).remove()
        const row = new InfoRow({
          labelTitle: data.label,
          text: data.text,
        })

        this.container.insertAfter(2, row)
    }
})

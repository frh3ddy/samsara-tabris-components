import { ImageView, TextView, Composite, TextInput } from 'tabris'
import { Widget, Core, Layouts } from 'samsara-tabris'
const { Surface } = Widget
const { Transitionable, Transform, View } = Core
const { SequentialLayout } = Layouts

import app from 'ampersand-app'
import EditModal from './EditModal'

export default View.extend({
    defaults: {
      borderBottom: false
    },
    events: {
        edit: 'onEdit',
        done: 'onDone'
    },
    initialize({repairData}) {
        const { name, price } = repairData

        const borderColor = '#dddfe6'
        const actionsT = new Transitionable(0)
        const actionsOrigin = actionsT.map(value => [value, 0])
        const priceListPos = actionsT.map(value => [1 + (-value), 0])

        this.showEdit = actionsT

        // const background = new Surface({
        //   properties: {
        //     background: '#ffe4de'
        //   }
        // })
        //
        // this.add(background)

        const priceList = this.add({
          margins: [25, 0],
          origin: priceListPos,
          align: priceListPos
        })

        const repairTextSurface = new Surface({
        //   properties: {
        //     background: 'green'
        //   },
          content: new TextView({
            text: name,
            textColor: '#000000',
            left: 8,
            centerY: 0
          })
        })

        const repairPriceSurface = new Surface({
          size: [undefined, undefined],
          origin: [1, 0],
        //   properties: {
        //     background: '#bcbd3f'
        //   },
          content: new TextView({
            text: price,
            textColor: '#000000',
            right: 20,
            centerY: 0
          })
        })

        repairPriceSurface.on('deploy', target => {
            target.on('swipe:left', () => {
                actionsT.set(1, {curse: 'easeIn', duration: 200})
            })

            target.on('swipe:right', () => {
                actionsT.set(0, {curse: 'easeOut', duration: 300})
            })
        })

        priceList.add(repairTextSurface)
        priceList.add({align: [1, 0]}).add(repairPriceSurface)

        const borderSurface = new Surface({
            size: [undefined, .5],
            origin: [0, 1],
            properties: {
                background: borderColor,
            }
        })

        priceList.add({align: [0, 1]}).add(borderSurface)

        const actions = this.add({
          size: [130, undefined],
          origin: actionsOrigin,
          align: [1, 0]
        })

        const editSurface = new Surface({
          size: [65, undefined],
          properties: {
            background: '#ffffff'
          },
          content: new ImageView({
            image: {src: 'images/edit.png', scale: 3},
            width: 20,
            centerX: 0,
            centerY: 0
          })
        })

        editSurface.on('deploy', (target) => {
          target.on('tap', () => {
            const price = repairPriceSurface.getContent().get('text')

            this.emit('openModal', price)

            // modal.on('done', newPrice => {
            //     this.emit('priceChanged', {prevPrice: parseInt(price), newPrice: newPrice})
            //     modal.remove()
            // })

          })
        })

        const deleteSurface = new Surface({
          size: [65, undefined],
          properties: {
            background: '#ffffff'
          },
          content: new ImageView({
            image: {src: 'images/delete.png', scale: 3},
            width: 15,
            centerX: 0,
            centerY: 0
          })
        })

        deleteSurface.on('deploy', (target) => {
            target.on('tap', () => {
                const price = repairPriceSurface.getContent().get('text')
                this.emit('delete')
                this.emit('priceChanged', {prevPrice: parseInt(price), newPrice: 0})
            })
        })

        const actionSeparator = new Surface({
            size: [.5, undefined],
            origin: [.5, .5],
            proportions: [false, 8/10],
            properties: { background: borderColor }
        })

        actions.add(editSurface)
        actions.add({align: [.5, 0]}).add(deleteSurface)
        actions.add({align: [.5, .5]}).add(actionSeparator)

        const borderSurfaceActions = new Surface({
            size: [undefined, .5],
            origin: [0, 1],
            properties: {
                background: borderColor,
            }
        })

        actions.add({align: [0, 1]}).add(borderSurfaceActions)

        this.add(actions)
    },
    onEdit() {
        this.showEdit.set(1, {curse: 'easeIn', duration: 200})
    },
    onDone() {
        this.showEdit.set(0, {curse: 'easeOut', duration: 300})
    }
})

import { Composite, TextView, TextInput } from 'tabris'
import { Widget, Core, Layouts } from 'samsara-tabris'
const { Surface } = Widget
const { View, Transitionable, Transform } = Core

import app from 'ampersand-app'

export default View.extend({
    initialize({currentPrice}) {
        let height = 150

        if (device.platform === 'Android') {
            height = 175
        }

        let cachePrice
        this.cachePrice = cachePrice

        const opacity = new Transitionable(0)
        const posT = new Transitionable(0)
        const originT = new Transitionable(1)
        const pos = posT.map(value => [.5, value])
        const origin = originT.map(value => [.5, value])

        this.opacity = opacity
        this.posT = posT
        this.originT = originT

        const overlay = new Surface({
            opacity: opacity,
            size: [undefined, undefined],
            properties: {
                background: '#000000'
            }
        })

        // overlay.on('deploy', target => {
        //     target.on('tap', () => {
        //         this.hide()
        //     })
        // })

        app.context.add(overlay)

        const inputBox = app.context.add({
            size: [undefined, height],
            proportions: [9/10, false],
            origin: origin,
            align: pos
        })

        app.context.add(inputBox)

        const actionsComposite =  new Composite({
            left: 0,
            right: 0,
            height: 50,
            background: '#282c34'
        }).once('resize', (composite) => {
          const cancelAction = new Composite({
              top: 0,
              bottom: 0,
              right: '50%',
              left: 0
          }).on('tap', () => {
              this.hide()
          }).appendTo(composite)

          const updateAction = new Composite({
              top: 0,
              bottom: 0,
              left: '50%',
              right: 0
          }).on('tap', () => {
              const price = parseInt(this.priceInput.get('text'))
              this.emit('priceChanged', {prevPrice: this.cachePrice, newPrice: price})
              this.hide()
          }).appendTo(composite)

          new TextView({
              text: 'Cancel',
              textColor: 'white',
              centerY: 0,
              left: 20
          }).appendTo(cancelAction)

          new TextView({
              text: 'Update',
              textColor: 'white',
              alignment: 'right',
              right: 20,
              centerY: 0
          }).appendTo(updateAction)
        })

        const backgroundInputBox = new Surface({
            size: [undefined, undefined],
            content: actionsComposite,
            properties: {
                background: 'white',
                cornerRadius: 8
            }
        })

        inputBox.add(backgroundInputBox)

        const inputComposite = new Composite({
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
        })

        this.priceInput = new TextInput({
            width: 100,
            alignment: 'center',
            centerX: 0,
            top: 20,
            keyboard: 'number'
        }).appendTo(inputComposite)

        this.repairText = new TextView({
            top: [this.priceInput, 20],
            centerX: 0
        }).appendTo(inputComposite)

        const inputSurface = new Surface({
            margins: [0, 25],
            size: [undefined, undefined],
            content: inputComposite
        })

        inputSurface.on('deploy', (target) => {
            this.inputSurface = target
        })

        inputBox.add({transform: Transform.translateY(50)}).add(inputSurface)

    },
    show({name, price}) {
        this.cachePrice = price
        this.opacity.set(.5, {duration: 200})
        this.posT.set(.1, {curve: 'spring', damping : .7, period : 100, velocity : 0})
        this.originT.set(0, {curve: 'spring', damping : .7, period : 100, velocity : 0})
        this.priceInput.set('text', price)

        if (device.platform === 'Android') {
            this.posT.on('end', () => {
                this.priceInput.set('focused', true)
                this.posT.off('end')
            })
        } else {
            this.priceInput.set('focused', true)
        }

        tabris.ui.set({
        background: '#1c1f25',
        })


        this.repairText.set('text', name)
    },
    hide() {
        this.opacity.set(0, {duration: 200})
        this.posT.set(0, {curve: 'easeOut', duration: 200})
        this.originT.set(1, {curve: 'easeOut', duration: 200})
        this.priceInput.set('focused', false)

        this.opacity.on('end', () => {
            tabris.ui.set({
                background: '#3a3f4c',
            })
            this.opacity.off('end')
        })
    }
})

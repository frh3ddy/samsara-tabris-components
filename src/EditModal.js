import { Composite, TextView, TextInput } from 'tabris'
import { Widget, Core, Layouts } from 'samsara-tabris'
const { Surface } = Widget
const { View, Transitionable, Transform } = Core

import app from 'ampersand-app'

export default View.extend({
    initialize({currentPrice}) {
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

        overlay.on('deploy', target => {
            target.on('tap', () => {
                opacity.set(0, {duration: 500})
                posT.set(0, {curve: 'easeOut', duration: 200})
                originT.set(1, {curve: 'easeOut', duration: 200})
            })
        })

        app.context.add(overlay)

        const inputBox = app.context.add({
            size: [undefined, 150],
            proportions: [9/10, false],
            origin: origin,
            align: pos
        })

        const actionsComposite =  new Composite({
            left: 0,
            right: 0,
            height: 50,
            background: '#282c34'
        })

        const cancelAction = new Composite({
            top: 0,
            bottom: 0,
            right: '50%',
            left: 0
        }).on('tap', () => {
            this.hide()
        }).appendTo(actionsComposite)

        const updateAction = new Composite({
            top: 0,
            bottom: 0,
            left: '50%',
            right: 0
        }).on('tap', () => {
            const price = parseInt(this.priceInput.get('text'))
            this.emit('priceChanged', {prevPrice: this.cachePrice, newPrice: price})
            this.hide()
        }).appendTo(actionsComposite)

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


        const backgroundInputBox = new Surface({
            content: actionsComposite,
            properties: {
                background: 'white',
                cornerRadius: 8
            }
        })

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
            size: [undefined, undefined],
            content: inputComposite
        })

        inputSurface.on('deploy', (target) => {
            this.inputSurface = target
        })

        inputBox.add(backgroundInputBox)
        inputBox.add({transform: Transform.translateY(50)}).add(inputSurface)

        app.context.add(inputBox)

    },
    show({name, price}) {
        this.cachePrice = price
        this.opacity.set(.5, {duration: 200})
        this.posT.set(.1, {curve: 'spring', damping : .7, period : 100, velocity : 0})
        this.originT.set(0, {curve: 'spring', damping : .7, period : 100, velocity : 0})
        this.priceInput.set('text', price)
        this.priceInput.set('focused', true)
        this.repairText.set('text', name)
    },
    hide() {
        this.opacity.set(0, {duration: 500})
        this.posT.set(0, {curve: 'easeOut', duration: 200})
        this.originT.set(1, {curve: 'easeOut', duration: 200})
        this.priceInput.set('focused', false)
    }
})

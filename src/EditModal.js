import { Composite } from 'tabris'
import { Widget, Core, Layouts } from 'samsara-tabris'
const { Surface } = Widget
const { View, Transitionable } = Core

import app from 'ampersand-app'

export default View.extend({
    initialize({currentPrice}) {
        const opacity = new Transitionable(.5)
        const pos = new Transitionable([.5, .1])
        const origin = new Transitionable([.5, 0])

        this.opacity = opacity
        this.pos = pos
        this.origin = origin

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
                pos.set([.5, 0], {curve: 'easeOut', duration: 200})
                origin.set([.5, 1], {curve: 'easeOut', duration: 200})
            })
        })

        app.context.add(overlay)

        const inputBox = app.context.add({
            size: [undefined, 150],
            proportions: [9/10, false],
            origin: origin,
            align: pos
        })


        const backgroundInputBox = new Surface({
            content: new Composite({
                left: 0,
                right: 0,
                height: 50,
                background: '#282c34'
            }),
            properties: {
                background: 'white',
                cornerRadius: 8
            }
        })

        inputBox.add(backgroundInputBox)

        app.context.add(inputBox)

    },
    show() {
        this.opacity.set(.5, {duration: 200})
        this.pos.set([.5, .1], {curve: 'easeOut', duration: 200})
        this.origin.set([.5, 0], {curve: 'easeOut', duration: 200})
    }
})

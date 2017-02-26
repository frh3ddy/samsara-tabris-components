import { Composite, TextView, ImageView, ui, ActivityIndicator } from 'tabris'
import { compose, init, methods, props } from 'stampit'

import BaseContainer from '../BaseContainer'
import anime from 'animator'

const Modal = init(function({test}) {
    this.overlay = new Composite({
        layoutData: { top: 0, bottom: 0, left: 0, right: 0 },
        background: '#000',
        opacity: 0
    }).appendTo(this)

    this.progresComposite = new Composite({
      opacity: 1,
      layoutData: {bottom: '99.99%', centerX: 0, height: 200, width: 200},
      cornerRadius: 5,
      background: '#fff'
    }).appendTo(this)

}).methods({
    show() {
        ui.set('toolbarVisible', false)
        this.overlay.animate({opacity: .7}, {duration: 300, easing: "ease-out"})
        .then(() => this.showProgressComposite())
    },
    showProgressComposite() {
        const center = this.get('bounds').height / 2 + 100
        const transform = {translationY: 0}

        anime({
            targets: transform,
            translationY: center,
            duration: 300,
            round: false,
            easing: 'easeOutElastic',
            loop: false,
            update: () => {
                this.progresComposite.set({transform})
            },
            complete: () => {
                this.showActivityIndicator()
            }
        })
    },
    showActivityIndicator() {
        new ActivityIndicator({
            id: 'indicator',
            centerX: 0,
            centerY: 0
        }).appendTo(this.progresComposite)

        setTimeout(() => {
            this.trigger('ready')
        }, 2000)
    },
    showSuccess() {
        tabris.app.off('backnavigation')
        
        this.closeButton = new TextView({
            text: 'Close',
            alignment: 'center',
            textColor: '#fff',
            layoutData: {right: 0, left: 0, bottom: 0},
            opacity: 1,
            transform: {
              translationY: 50
            },
            height: 50,
            background: '#3ac569'
        }).on('tap', () => {
            ui.set('toolbarVisible', true)
            this.dispose()
        }).appendTo(this.progresComposite)

        this.image = new ImageView({
            image: {src: 'images/check.png', scale: 3},
            top: 39,
            height: 72,
            width: 72,
            centerX: 0,
            transform: {
                translationY: -120
            },
        }).appendTo(this.progresComposite)

        this.find('#indicator').first().dispose()

        this.closeButton.animate({
          transform: {
            translationY: 0
          }
        }, {
          duration: 100,
        })

        this.image.animate({
          transform: {
            translationY: 0
          }
        }, {
          duration: 100,
        })
    }
})

export default compose(BaseContainer, Modal)

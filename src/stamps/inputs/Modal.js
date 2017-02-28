import { Composite, TextView, ImageView, ui, ActivityIndicator } from 'tabris'
import { compose, init, methods, props } from 'stampit'

import BaseContainer from '../BaseContainer'
import anime from 'animator'

const Modal = init(function({test}) {
    this.responseReceived = false

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

    this.show()

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
                if (this.responseReceived) return
                this.showActivityIndicator()
            }
        })
    },
    showActivityIndicator() {
        this.activityIndicator = new ActivityIndicator({
            id: 'indicator',
            centerX: 0,
            centerY: 0
        }).appendTo(this.progresComposite)
    },
    showSuccess() {
        this.hideActivityIndicator()
        this.createUIElements('success')
    },
    showError() {
        this.hideActivityIndicator()
        this.createUIElements('error')
    },
    createUIElements(type) {
        let text = 'Close'

        if(type === 'error') text = 'Retry'

        const button = new TextView({
            text,
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

        const image = new ImageView({
            image: {src: `images/${type}.png`, scale: 3},
            top: 39,
            height: 72,
            width: 72,
            centerX: 0,
            transform: {
                translationY: -120
            },
        }).appendTo(this.progresComposite)

        button.animate({
          transform: {
            translationY: 0
          }
        }, {
          duration: 100,
        })

        image.animate({
          transform: {
            translationY: 0
          }
        }, {
          duration: 100,
        })
    },
    hideActivityIndicator() {
        this.responseReceived = true
        tabris.app.off('backnavigation')
        if (this.activityIndicator) this.activityIndicator.dispose()
    }
})

export default compose(BaseContainer, Modal)

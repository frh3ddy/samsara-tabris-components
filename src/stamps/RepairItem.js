import { TextView, Composite, Button, ImageView} from 'tabris'
import { compose, init, methods, props } from 'stampit'

import BaseContainer from './BaseContainer'
import anime from 'animejs'

const ContentMethods = methods({
    addName(text){
        this.name = new TextView({
            layoutData: {centerY: 0, left: 30,},
            text: text,
            font: '16px',
            textColor: '#252c41',
        }).appendTo(this)
    },
    addPrice(text){
        this.price = new TextView({
            layoutData: {centerY: 0, right: 50},
            text: text,
            font: '16px',
            textColor: '#252c41',
        }).appendTo(this)
    },
    updatePrice(text) {
        this.price.set('text', text)
        this.updateSize()
    },
    updateSize() {
        this.parent().set('height', null)
    },
    getPrice() {
        return parseInt(this.price.get('text'))
    },
    showActions() {
        const priceDisplacement = this.isEditing ? 0 : -100
        const actionsDisplacement = this.isEditing ? 0 : -130
        const groupDisplacement = this.isEditing ? 0 : -30

        const group = [this.name]

        group.forEach(item => {
            item.animate({
                transform: {
                    translationX: groupDisplacement
                }
            },{
                duration: 200
            })
        })

        this.price.animate({
            transform: {
                translationX: priceDisplacement
            }
        }, {
            duration: 200
        })

        this.actionsContainer.animate({
            transform: {
                translationX: actionsDisplacement
            }
        },{
            duration: 200
        })

        this.isEditing = !this.isEditing
    }
})

const Actions = init(function() {
    this.set('height', 60)
    this.isEditing = false
    this.actions = []

    const actionsContainer =  new Composite({
        layoutData: {top: 0, bottom: 0, left: '100%', width: 130},
    }).appendTo(this)

    const editComposite = new Composite({
        layoutData: {top: 0, bottom:0, left: 0, width: 65}
    }).on('tap', () => {
        const title = this.name.get('text')

        navigator.notification.prompt(
            `enter new price`, // message
            results => {
              if (results.buttonIndex === 1 || results.input1 === '') return
              this.price.set('text', results.input1)
              this.trigger('priceUpdated')
            }, // callback to invoke
            title, // title
            ["Cancel", "Update"], // buttonTextViews
            "" // defaultText
        );
    }).appendTo(actionsContainer)

    new ImageView({
      image: {src: 'images/edit.png', scale: 3},
      centerY: 0,
      width: 20,
      centerX: 0
    }).appendTo(editComposite)

    new Composite({
      background: '#dddfe6',
      layoutData: {top: '20%', bottom: '20%', right:0, width: .5}
    }).appendTo(editComposite)

    const deleteComposite = new Composite({
        layoutData: {top: 0, bottom:0, right: 0, width:65}
    }).on('tap', () => {
        const name = this.name.get('text')
        var options = {
            addCancelButtonWithLabel: "Cancel",
            addDestructiveButtonWithLabel: `Remove ${name}`
        };
        window.plugins.actionsheet.show(options, (buttonIndex) => {
            const cancelButton = buttonIndex === 2 ? true : false
            if (cancelButton) return

            const {width, height} = this.get('bounds')

            this.animate({
                transform: {
                    translationX: width
                }
            }, {
                duration: 150
            }).then(() => {
                var myObject = {
                  top: 0
                }

                var myAnimation = anime({
                    targets: myObject,
                    top: height,
                    duration: 300,
                    round: false,
                    easing: 'easeInOutQuint',
                    loop: false,
                    update: () => {
                    this.set('top', ['prev()', - myObject.top])
                    },
                    complete: () => {
                        this.trigger('removeRepair', this)
                    }
                })
            }).catch(error => console.log(error))
        })
    }).appendTo(actionsContainer)

    new ImageView({
      image: {src: 'images/delete.png', scale: 3},
      centerY: 0,
      width: 15,
      centerX: 0
    }).appendTo(deleteComposite)

    this.actionsContainer = actionsContainer
})

export default compose( BaseContainer, ContentMethods, Actions )
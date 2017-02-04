import { TextView, Composite, Button, ImageView} from 'tabris'
import { compose, init, methods, props } from 'stampit'

const EventForwarder = methods({
    on(type, fn) {
        this.container.on(type, fn)
    }
})

const SharedProps = props({
    list: []
})

const ContainerView = init(function({parent}) {
    this.actions = []
    const container = new Composite({
        layoutData: {left: 0, right: 0, top: ['prev()', -.5]},
        background: 'white'
    }).appendTo(parent)

    this.list.push(this)

    this.container = container
})

const Borders = init(function({borderColor, borderWidth}) {
    const container = this.container

    this.topBorder = new TextView({
        layoutData: {height: borderWidth, top: 0, left: 50, right: 0},
        background: borderColor
    }).appendTo(container)

    this.bottomBorder = new TextView({
        layoutData: {height: borderWidth, top: container, left: 50, right: 0},
        background: borderColor
    }).appendTo(container.parent())
})

const ContainerContentMethods = methods({
    addName(text){
        this.name = this.createText(text, 'left')
    },
    addPrice(text){
        this.price = this.createText(text, 'right')
    },
    updatePrice(text) {
        this.price.set('text', text)
        this.updateSize()
    },
    createText(text, align) {
        return new TextView({
            layoutData: {top: [this.topBorder, 20], [align]: 50, bottom: 20},
            text: text,
            font: '16px',
            textColor: '#252c41',
        }).once('resize', (w, b) => {
            w.parent().set('height', b.height + 40)
        }).appendTo(this.container)
    },
    animate() {
        const priceDisplacement = this.isEditing ? 0 : -100
        const actionsDisplacement = this.isEditing ? 0 : -130
        const groupDisplacement = this.isEditing ? 0 : -35

        const group = [ this.topBorder, this.bottomBorder, this.name ]

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
    this.isEditing = false

    const actionsContainer =  new Composite({
        layoutData: {top: 0, bottom: 0, left: '100%', width: 130},
    }).appendTo(this.container)

    const editComposite = new Composite({
        layoutData: {top: 0, bottom:0, left: 0, width: 65}
    }).on('tap', () => {
        const title = this.name.get('text')

        navigator.notification.prompt(
            `enter new price`, // message
            results => {
              if (results.buttonIndex === 1 || results.input1 === '') return
              this.price.set('text', results.input1)
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

    // new Composite({
    //   background: '#dddfe6',
    //   layoutData: {top: '20%', bottom: '20%', left:0, width: .5}
    // }).appendTo(editComposite)

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

            const {width, height} = this.container.get('bounds')
            const index = this.list.indexOf(this)

            this.container.animate({
                transform: {
                    translationX: width
                }
            }, {
                duration: 200
            }).then(() => {
                const below = this.list[index + 1]
                below.container.animate({
                    transform: {
                        translationY: - height
                    }
                },{
                    duration: 200
                }).then(() => {
                    this.container.dispose()
                    this.bottomBorder.dispose()
                    if (index > -1) {
                        this.list.splice(index, 1);
                    }
                    if (this.list.length > 0) {
                        this.list[0].topBorder.set('background', 'white')
                    }

                    below.set('top', ['prev()', -.5])
                })
            })

            // const index = this.list.indexOf(this)
            // this.container.dispose()
            // this.bottomBorder.dispose()
            // if (index > -1) {
            //     this.list.splice(index, 1);
            // }
            // if (this.list.length > 0) {
            //     this.list[0].topBorder.set('background', 'white')
            // }
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

export const Repair =  compose(
    SharedProps,
    ContainerView,
    Borders,
    EventForwarder,
    ContainerContentMethods,
    Actions,
)

import { TextView } from 'tabris'
import { Widget, Core, Layouts } from 'samsara-tabris'
const { Surface } = Widget
const { Transitionable, Transform, View } = Core
const { FlexibleLayout, SequentialLayout } = Layouts

export default View.extend({
    defaults: {
      borderTop: false
    },
    events:{
        update: 'onUpdate',
        editing: 'onEditing',
        doneEditing: 'onDoneEditing'
    },
    initialize({labelTitle, text, borderTop, action}) {
        let cacheHeight
        let borderTopSurface
        let labelSurface
        let topMargin = 15
        let bottomMargin = 15

        this.isEditing = false

        const container = new SequentialLayout({
            direction: 1
        })

        container.size.on('end', size => {
          if(size[1] !== cacheHeight){
            this.setSize([undefined, size[1]])
            cacheHeight = size[1]
          }
        })

        if (borderTop) {
            borderTopSurface = new Surface({
                size: [undefined, .5],
                properties: {
                    background: '#dddfe6',
                }
            })
        }

        const borderBottomSurface = new Surface({
            size: [undefined, .5],
            properties: {
                background: '#dddfe6',
            }
        })

        if(labelTitle) {
          labelSurface = new Surface({
              tagName: 'TextView',
              size: [true, 20],
              properties: {
                  left: 8,
                  text: labelTitle,
                  font: '11px',
                  textColor: '#6E7783',
              }
          })

          topMargin -= 10
          bottomMargin -= 10
        }

        const textSurface = new Surface({
            size: [true, true],
            content: new TextView({
                left: 8,
                right: 0,
                top: topMargin,
                bottom: bottomMargin,
                text: text,
                font: '16px',
                textColor: '#252c41',
            })
        })

        this.text = textSurface

        if(borderTop) container.push(borderTopSurface)
        if(labelTitle) container.push(labelSurface)
        container.push(textSurface)
        container.push(borderBottomSurface)

        if(action) {
          let actionSurface = new Surface({
            size: [50, undefined],
            content: new TextView({
                text: action,
                centerY: 0,
                centerX: 0
            }),
            properties: {
              right: 20
            }
          })

          this.actionText = actionSurface.getContent()

          actionSurface.on('deploy', target => {
              target.on('tap', () => {
                  if(this.isEditing) {
                      target.children().first().set('text', 'Edit')
                      this.emit('done')
                      this.isEditing = false
                  } else {
                      target.children().first().set('text', 'Done')
                      this.emit('edit')
                      this.isEditing = true
                  }
              })
          })

          this.add(actionSurface)
        }

        this.add(container)
    },
    onUpdate(content) {
        const textView = this.text.getContent()
        textView.set('text', content)
        // textView.parent().set('height', null)
    },
    onEditing() {
      this.actionText.set('text', 'Done')
      this.isEditing = true
    },
    onDoneEditing() {
      this.actionText.set('text', 'Edit')
      this.isEditing = false
    }
})

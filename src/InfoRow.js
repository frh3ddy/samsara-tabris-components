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
        let borderTopSurface
        let labelSurface
        let topMargin = 15
        let bottomMargin = 15

        this.isEditing = false

        const container = new SequentialLayout({
            direction: 1
        })

        this.size = container.size.map(size => {
            if (!size) return
            return size
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
            size: [undefined, true],
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

        this.add(container)

        if(action) {
          let actionSize = container.size.map(size => {
              if (!size) return
              return [50, size[1]]
          })

          let actionSurface = new Surface({
            size: actionSize,
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

          actionSurface.on('tap', () => {
              if(this.isEditing) {
                  actionSurface.getContent().set('text', 'Edit')
                  this.emit('done')
                  this.isEditing = false
              } else {
                  actionSurface.getContent().set('text', 'Done')
                  this.emit('edit')
                  this.isEditing = true
              }
          })

          this.add(actionSurface)
        }
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

import { TextView } from 'tabris'
import { compose, init } from 'stampit'

import BaseContainer from './BaseContainer'
import CountUp from '../countup'

const TotalCost = init(function () {
    this.text = new TextView({
        layoutData: {top: 20, bottom:20, left: 0},
        text: 'Total repair cost',
        font: '16px',
        textColor: '#252c41',
    }).appendTo(this)

    this.price = new TextView({
        layoutData: {top: 20, bottom:20, right: 0},
        text: '$0',
        font: '22px bold',
        textColor: '#252c41',
    }).appendTo(this)

}).methods({
    updateCost(total) {
        this.text.set('text', 'Total Repair Costs')

        if (total <= 0) {
            total = 35
            this.text.set('text', 'Diagnosis')
        }

        this.countUp.update(total)

    },
    getPrice() {
        return parseInt(this.price.get('text'))
    }
})

const CountUpInit = init(function () {
    const intitialValue = 0
    const element = this.price
    const options = {
      useEasing : true,
      useGrouping : false,
      separator : ',',
      decimal : '.',
      prefix : '$',
      suffix : ''
    };

    this.countUp = new CountUp(element, 0, intitialValue, 0, 1, options)
    this.countUp.start()
})

export default compose( BaseContainer, TotalCost, CountUpInit)

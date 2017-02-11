import { TextView, Composite, Button} from 'tabris'
import { compose, init, methods, props } from 'stampit'

import BaseContainer from './BaseContainer'
import Container from './Container'
import RepairItem from './RepairItem'
import anime from 'animejs'

const ListContainer = init(function({data}) {
    this.list = []
    const [orderDate, repairCost] = data

    Container({layoutData: {left: 20, right: 0, top: 'prev()'}})
    .addLabel(orderDate.labelText)
    .addTextContent(orderDate.textContent)
    .appendTo(this)

    const reparCost = Container({layoutData: {left: 20, right: 0, top: 'prev()'}})
    .addBorders('#dddfe6 .5 0 0 0')
    .addTextContent(repairCost.textContent)
    .appendTo(this)

    repairCost.actions.forEach(action => {
        reparCost.addAction(action)
    })

    reparCost.on('Edit', () => {
        this.showRepairActions()
    })

    repairCost.repairList.forEach((item) => {
        let repair = RepairItem({
            layoutData: {left: 20, right: 0, top: 'prev()'},
            border: '#dddfe6 0 0 .5 0'
        })

        this.list.push(repair)

        repair.on('removeRepair', repair => this.removeRepair(repair))

        repair.addName(item.name)
        repair.addPrice(item.cost)
        repair.appendTo(this)
    })
}).methods({
    showRepairActions() {
        this.list.forEach(item => {
            item.showActions()
        })
    },
    removeRepair(repair) {
        const index = this.list.indexOf(repair)
        if (index > -1) {
            this.list.splice(index, 1);
        }

        repair.dispose()
    }
})

export default compose( BaseContainer, ListContainer )

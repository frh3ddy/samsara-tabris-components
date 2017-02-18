import { TextView, Composite } from 'tabris'
import { compose, init, methods, props } from 'stampit'

import BaseContainer from './BaseContainer'
import ListContainer from './ListContainer'
import RepairList from './RepairList'

//TODO, move this to a polyfill module
var lastTime = 0;

if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function(callback, element) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function() { callback(currTime + timeToCall); },
          timeToCall);
        lastTime = currTime + timeToCall;
        return id;
    };
}
if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
    };
}

// @example
// const detailsSection = Section({
//     headerTitle: 'Order Details',
//     data: [
//         {labelText: 'Order Taken', textContent: '3 months ago'},
//         {textContent: 'Repair Costs', actions: ['Edit', 'Add'], repairList: [
//             {name: 'LCD', cost: 199},
//             {name: 'Battery', cost: 65},
//             {name: 'Motherboard', cost: 249},
//             {name: 'Graphic Card', cost: 199}
//         ]}
//     ]
// }).appendTo(scroll)

const Section = init(function ({headerTitle, data}) {
    const hasRepairList = data[1].repairList

    new TextView({
        layoutData: {left: 8, height: 25, top: ['prev()', 15]},
        font: '13px bold',
        textColor: '#6d819c',
        text: headerTitle.toUpperCase(),
    }).appendTo(this)

    if(hasRepairList) {
        RepairList({
            data,
            border: '#dddfe6 1 0 1 0',
            background: 'white',
        }).appendTo(this)

        return
    }

    ListContainer({
        data,
        border: '#dddfe6 1 0 1 0',
        background: 'white',
    }).appendTo(this)
})

export default compose(BaseContainer, Section)

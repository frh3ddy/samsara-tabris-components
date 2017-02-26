export function Users ( args ) {
    args = args || {}
    this.___class = 'Users',
    this.objectId = args.objectId || ''
}

export function Order ( args ) {
    args = args || {}
    this.___class = 'Order'
    this.diagnostic = args.diagnostic
    this.customer = args.customer || null
    this.devices = args.devices
    this.tech = args.tech
    this.store = args.store || ''
    this.tech_notes = args.tech_notes || ''
    this.status = args.status || ''
}

export function Customer (args) {
    args = args || {}
    this.___class = 'Customer'
    this.name = args.name || ""
    this.phone_number = args.phone_number || ''
}

export function Device (args) {
    args = args || {}
    this.___class = 'Device'
    this.password = args.password || ""
    this.repairs = args.repairs || []
    this.charger = args.charger || ""
    this.brand = args.brand || ""
}

export function create_inventory(req) {
    const {/* userId, */ name, price, quantity, threshold, expiration} = req.body
    if(/* !userId || */ name === 'undefined' || price === 'undefined' || quantity === 'undefined' || threshold === 'undefined' || !expiration) return false
    return true
}

export function get_inventory(id) {
    if(!id) return false
    return true
}

export function update_inventory(id) {
    if(!id) return false
    return true
}

export function delete_inventory(id) {
    if(!id) return false
    return true
}
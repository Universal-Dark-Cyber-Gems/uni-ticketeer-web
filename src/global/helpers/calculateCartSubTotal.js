export function calculateCartSubTotal(cart){
    let total = 0;

    cart?.forEach((item, i)=>{
        let individualTotal = item.final_price * item.quantity
        total += individualTotal
    })

    return total
}
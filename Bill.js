export class Bill {

    constructor() {
        this.products = [];
        this.sum = 0;
    }

    addProduct(product) {
        this.products.push(product);
        this.updateSum();
    }

    editProduct(index, name, amount, price) {

        let product = this.products[index]
        product.setName(name)
        product.setAmount(amount)
        product.setPrice(price)

        this.updateSum()
    }

    updateSum() {
        if (this.products.length !== 0) {
            this.sum = this.products.map(x => x.sum).reduce((last, current) => last + current);
            this.sum = Math.round(this.sum * 100) / 100
        }
        else
            this.sum = 0
    }

    deleteProduct(index) {

        this.products.splice(index, 1)
        this.updateSum()
    }

    changeItemsUnderIndex(i1, i2) {

        let temp = this.products[i1]
        this.products[i1] = this.products[i2]
        this.products[i2] = temp
    }

}

export class Product {

    constructor(name, price, amount) {
        this.name = name;
        this.price = price;
        this.amount = amount;
        this.updateSum();
    }

    updateSum() {
        this.sum = Math.round(this.price * this.amount * 100) / 100
    }

    setName(name) {
        this.name = name;
    }

    setPrice(price) {
        this.price = price;
        this.updateSum();
    }

    setAmount(amount) {
        this.amount = amount;
        this.updateSum()
    }

}

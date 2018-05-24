const cart = require('./cart')
const cars = require('./data/cars')

describe("Cart Properties:", () => {
    test("Cart should default to an empty array", () => {

        expect( Array.isArray(cart.cart)).toBeTruthy();
        expect(cart.cart.length).toEqual(0);
    })

    test("Total should default to 0", () => {
        expect(cart.total).toBe(0)
    })
})

describe("Cart Methods:", () => {
    afterEach(() => {
        cart.cart = [];
        cart.total = 0;
    })
    test("addToCart() should add car to cart array and increase length by 1", () => {
        cart.addToCart(cars[12]);
        cart.addToCart(cars[8]);

        expect(cart.cart[0]).toEqual(cars[12]);
        expect(cart.cart[1]).toEqual(cars[8]);
        expect(cart.cart.length).toBe(2);
    })
    test("addToCart() should increase cart total", () => {
        cart.addToCart(cars[1]);
        cart.addToCart(cars[5]);
        cart.addToCart(cars[19]);

        expect(cart.total).toBe(cars[1].price + cars[5].price + cars[19].price)
    })
    test("removeFromCart() should decrease cart length by 1 and maintain order of ocject", () => {
        cart.addToCart(cars[1]);
        cart.addToCart(cars[5]);
        cart.addToCart(cars[19]);

        cart.removeFromCart(1, cars[5].price)

        expect(cart.cart.length).toBe(2)
        expect(cart.cart[0]).toEqual(cars[1])
        expect(cart.cart[1]).toEqual(cars[19])
    })
    test("removeFromCart() should decrease total by the car object's price", () => {
        cart.addToCart(cars[1]);
        cart.addToCart(cars[5]);
        cart.addToCart(cars[19]);

        cart.removeFromCart(1, cars[5].price)
        
        expect(cart.total).toBe(cars[1].price + cars[19].price)
    })
    test("checkout() should set cart length to 0 and total to 0", () => {
        cart.addToCart(cars[1]);
        cart.addToCart(cars[5]);
        cart.addToCart(cars[19]);

        cart.checkout();

        expect(cart.total).toBe(0);
        expect(cart.cart.length).toBe(0);
    })
})
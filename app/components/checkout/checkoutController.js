app.controller('CheckoutController', ['cart', 'states', function(cart, states) {
    var th = this;

    this.states = states;

    this.subtotal = cart.getSubtotal();
    this.shipping = {};
    this.billing = {};
    this.shipCost = {
        priority: this.subtotal * 0.025,
        nextDay:  this.subtotal * 0.1
    };

    this.sameBilling = function(key) {
        if (key){
            angular.copy(th.shipping, th.billing);
        }
        else {
            th.billing = {};
        }
    };
}]);

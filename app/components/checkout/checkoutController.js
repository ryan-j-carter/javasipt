app.controller('CheckoutController',
              ['cart', 'states', 'userData', '$location', '$window',
              function(cart, states, userData, $location, $window) {

    var subtotal = cart.getSubtotal();

    var checkout = this;

    this.states = states;

    this.user = {
        shipping: {},
        billing:  {},
        subtotal: subtotal,
        ship: {
            cost: {
                priority: subtotal * 0.1,
                nextDay: subtotal * 0.25
            }
        }
    };

    this.sameBilling = function(key) {
        if (key){
            angular.copy(checkout.user.shipping, checkout.user.billing);
        }
        else {
            checkout.user.billing = {};
        }
    };

    this.submitForm = function() {
        angular.forEach(checkout.orderForm.$error.required, function(field) {
            field.$setDirty();
        });

        if (checkout.orderForm.$valid) {
            checkout.user.cart = [];
            var contents = cart.getContents();
            for (var i = 0; i < contents.length; i++) {
                checkout.user.cart.push(JSON.parse(JSON.stringify(contents[i])));
            }

            userData.set(checkout.user);
            cart.empty();

            checkout.orderForm.$setPristine();
            $location.path('/order');
        }
    };

    this.cart = function() {
        return cart.getContents();
    };
}]);

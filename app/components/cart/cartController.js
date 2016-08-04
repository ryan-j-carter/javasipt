app
.controller('CartController', ['cart', '$timeout', function(cart, $timeout) {

    var th = this;

    this.contents = cart.getContents();
    this.size     = cart.getSize;
    this.subtotal = cart.getSubtotal;

    this.success = false;
    this.fail = false;

    this.update = function(product, oldValue) {
        cart.update(product, oldValue);
    };

    this.addToCart = function(product) {
        var success = cart.addToCart(product);

        if (success) {
            th.success = true;
            $timeout(function() {
                th.success = false;
            }, 1500);
        }
        else {
            th.fail = true;
            $timeout(function() {
                th.fail = false;
            }, 1500);
        }
    };

    this.remove = function(product) {
        cart.remove(product);
    };
}]);

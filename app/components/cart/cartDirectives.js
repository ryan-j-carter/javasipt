app
.directive('cartBtn', function() {
    return {
        restrict: 'E',
        templateUrl: 'app/components/cart/cartBtn.html',
        controller: 'CartController',
        controllerAs: 'cart'
    };
})
.directive('cartList', ['cart', function(cart) {
    return {
        restrict: 'E',
        templateUrl: 'app/components/cart/cartList.html',
        scope: {
            cart: '=cart'
        }
    };
}]);

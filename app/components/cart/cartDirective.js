app
.directive('cartBtn', function() {
    return {
        restrict: 'E',
        templateUrl: 'app/components/cart/cartBtn.html',
        controller: 'CartController',
        controllerAs: 'cart'
    };
});

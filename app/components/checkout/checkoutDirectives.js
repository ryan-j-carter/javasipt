app
.directive('addressFields', function() {
    return {
        restrict: 'E',
        templateUrl: 'app/components/checkout/subcomponents/addressFields.html',
        scope: {
            label: '=label',
            address: '=address',
            sameBilling: '=billing',
            states: '=states'
        }
    };
})
.directive('cardFields', function() {
    return {
        restrict: 'E',
        templateUrl: 'app/components/checkout/subcomponents/cardFields.html',
        scope: {
            label: '=label',
            card: '=card'
        }
    };
})
.directive('shippingFields', function() {
    return {
        restrict: 'E',
        templateUrl: 'app/components/checkout/subcomponents/shippingFields.html',
        scope: {
            label: '=label',
            ship: '=ship',
            email: '=email'
        }
    };
});

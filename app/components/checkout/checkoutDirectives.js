app
.directive('addressFields', function() {
    return {
        restrict: 'E',
        templateUrl: 'app/components/checkout/subcomponents/addressFields.html',
        scope: {addressObject: '=bind', groupLabel: '=label', sameBilling: '=billing'}
    };
})
.directive('cardFields', function() {
    return {
        restrict: 'E',
        templateUrl: 'app/components/checkout/subcomponents/cardFields.html',
        scope: {cardObject: '=bind', groupLabel: '=label'}
    };
})
.directive('shippingFields', function() {
    return {
        restrict: 'E',
        templateUrl: 'app/components/checkout/subcomponents/shippingFields.html',
        scope: {shippingObject: '=bind', groupLabel: '=label'}
    };
})
.directive('statesDatalist', function() {
    return {
        restrict: 'E',
        templateUrl: 'app/components/checkout/subcomponents/states.html',
        replace:true
    };
});

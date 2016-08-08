app
.directive('backImg', function() {
    return function(scope, element, attrs) {
        attrs.$observe('backImg', function(value) {
            element.css({
                'background-image': 'url('+ value +')',
                'background-position' : 'center center',
                'background-size' : '100% auto'
            });
        });
    };
})
.directive('validNumber', function() {
    return {
        require: '?ngModel',
        link: function(scope, element, attrs, ngModelCtrl) {

            if (!ngModelCtrl) {
                return;
            }

            //Push the clean, numeric value to ngModel
            ngModelCtrl.$parsers.push(function(val) {

                if (angular.isUndefined(val)) {
                    var val = "";
                }

                //Store only numeric characters in clean
                var clean = val.replace(/[^0-9]+/g, '');

                //If clean is different, replace original with the filtered value
                if (val != clean) {
                    ngModelCtrl.$setViewValue(clean);
                    ngModelCtrl.$render();
                }
                return clean;
            });

            element.bind('keypress', function(event) {
                if (event.keycode == 32) {
                    event.preventDefault();
                }
            });
        }
    };
});

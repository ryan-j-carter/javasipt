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
});

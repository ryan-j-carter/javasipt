app
.directive('menuBtn', function() {
    return {
        restrict: 'E',
        templateUrl: 'app/components/menu/menuBtn.html',
        controller: 'MenuController',
        controllerAs: 'menu'
    };
})
.directive('menuContainer', function() {
    return {
        restrict: 'E',
        templateUrl: 'app/components/menu/menuContainer.html',
        controller: 'MenuController',
        controllerAs: 'menu'
    }
});

app.controller('MenuController', ['products', function(products) {
    var ctrl = this;
    this.show = false;

    products.getData().then(function(data) {
        ctrl.products = data.data;
    });
}]);

app
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
    $stateProvider
        .state('home', {
            url:'/home',
            templateUrl: '/javasipt/app/components/home/home.html',
            controller: 'HomeController',
            controllerAs: 'home'
        })
        .state('category', {
            url:'/products/:category',
            templateUrl: '/javasipt/app/components/products/category.html',
            controller: 'CategoryController',
            controllerAs: 'category'
        })
        .state('product', {
            url: '/products/:category/:key',
            templateUrl: '/javasipt/app/components/products/product.html',
            controller: 'ProductController',
            controllerAs: 'product'
        })
        .state('cart', {
            url: '/cart',
            templateUrl: '/javasipt/app/components/cart/cart.html',
            controller: 'CartController',
            controllerAs: 'cart'
        })
        .state('checkout', {
            url: '/checkout',
            templateUrl: '/javasipt/app/components/checkout/checkout.html',
            controller: 'CheckoutController',
            controllerAs: 'checkout'
        });
}])
.controller('HomeController', ['products', function(products) {
    var ctrl = this;
    this.intro = ["Welcome to JavaSipt!",
                  "Something something introduction text.",
                  "Hope you find something you like!"];
    products.getData().then(function(data) {
        ctrl.products = data.data;
    });
}])
.controller('CategoryController', ['products', '$stateParams', function(products, $stateParams) {
    var cat = this;
    this.category = $stateParams.category;
    this.baseUrl = "/javasipt/assets/img/" + this.category + "/thumb";
    products.getData().then(function(data) {
        cat.info = data.data[cat.category];
    });
}])
.controller('ProductController', ['products', '$stateParams', function(products, $stateParams) {
    var prod = this;
    this.quantity = 1;
    this.category = $stateParams.category;
    this.key = $stateParams.key;

    products.getData().then(function(data) {
        prod.info = data.data[prod.category].items[prod.key];
        prod.src = "/javasipt/assets/img/" + prod.category + "/actual" + prod.info.srcActual;
    });
}]);

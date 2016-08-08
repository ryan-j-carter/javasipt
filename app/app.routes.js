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
        })
        .state('order', {
            url: '/order',
            templateUrl: '/javasipt/app/components/order/order.html',
            controller: 'OrderController',
            controllerAs: 'order'
        });
}])
.controller('HomeController', ['products', function(products) {
    var home = this;
    this.products = [];
    this.intro = ["Welcome to JavaSipt!",
                  "Something something introduction text.",
                  "Hope you find something you like!"];
    products.getData().then(function(data) {
        for (var item in data.data) {
            home.products.push(data.data[item]);
        }
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
}])
.controller('OrderController', ['cart', 'userData', function(cart, userData) {
    this.user = userData.get();
    this.estimatedArrival = "";

    var date = new Date();
    if (this.user.ship.method == "priority") {
        date.setDate(date.getDate() + 3);
        this.estimatedArrival += date.toLocaleDateString() + " - ";
        date.setDate(date.getDate() + 2);
        this.estimatedArrival += date.toLocaleDateString();
    }
    else {
        date.setDate(date.getDate() + 1);
        this.estimatedArrival += date.toLocaleDateString();
    }
}]);

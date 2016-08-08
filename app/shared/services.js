app
.service('products', function($q, $http) {
    var data;

    var service = {
        getData: getData
    };

    return service;

    function getData(refresh) {
        if (refresh || !data) {
            return $http.get('/javasipt/assets/data/products.json').then(function(data) {
                this.data = data;
                return data;
            });
        }
        else {
            var deferrer = $q.defer();
            deferrer.resolve(data);
            return deferrer.promise;
        }
    }
})
.service('cart', ["$window", function($window) {
    var localCart = $window.localStorage.javasiptCart;
    var contents = angular.fromJson(localCart);
    var size = 0;
    var subtotal = 0;

    if (!contents) contents = [];

    //Calculate size and subtotal if a cart was available in storage.
    if (contents.length) {
        for (var i = 0; i < contents.length; i++) {
            size += contents[i].quantity;
            subtotal += contents[i].quantity * contents[i].price;
        }
    }

    this.getContents = function() {return contents;};
    this.getSize = function() {return size;};
    this.getSubtotal = function() {return subtotal;};

    this.addToCart = function(product) {
        for (var i = 0; i < contents.length; i++) {
            if (contents[i].name === product.name) {
                if (contents[i].quantity + product.quantity > 10)
                    return false;
                contents[i].quantity += product.quantity;
                size += product.quantity;
                subtotal += product.quantity * product.price;
                return true;
            }
        }
        size += product.quantity;
        subtotal += product.quantity * product.price;
        contents.push(product);
        return true;
    };

    this.remove = function(product) {
        for (var i = 0; i < contents.length; i++) {
            if (contents[i].name === product.name) {
                size -= product.quantity;
                subtotal -= product.quantity * product.price;
                contents.splice(i, 1);
                break;
            }
        }
    };

    this.update = function(product, oldValue) {
        if (product.quantity > oldValue) {
            size += product.quantity - oldValue;
            subtotal += (product.quantity - oldValue) * product.price;
        }
        else {
            size -= oldValue - product.quantity;
            subtotal -= (oldValue - product.quantity) * product.price;
        }
    };

    this.empty = function() {
        contents = [];
        size = 0;
        subtotal = 0;
    }
    window.onbeforeunload = function() {
        $window.localStorage.setItem("javasiptCart", JSON.stringify(contents));
    };
}])
.service('userData', ['$window', function($window) {
    var sessionOrder = $window.sessionStorage.javasiptOrder;
    var user = angular.fromJson(sessionOrder);

    if (!user) user = {};

    this.get = function() {
        return user;
    };

    this.set = function(data) {
        user = data;
        $window.sessionStorage.setItem("javasiptOrder", JSON.stringify(user));
    };
}]);

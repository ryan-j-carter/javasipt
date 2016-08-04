var app = angular.module('javasipt', ['ui.router'])
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
.filter('range', function() {
  return function(input, start, end) {
    start = parseInt(start);
    end = parseInt(end) + 1;
    var direction = (start <= end) ? 1 : -1;
    while (start != end) {
        input.push(start);
        start += direction;
    }
    return input;
  };
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

    window.onbeforeunload = function() {
        $window.localStorage.setItem("javasiptCart", JSON.stringify(contents));
    };
}])
.constant('states',
[
{ name: 'Alabama', abbreviation: 'AL'},
{ name: 'Alaska', abbreviation: 'AK'},
{ name: 'American Samoa', abbreviation: 'AS'},
{ name: 'Arizona', abbreviation: 'AZ'},
{ name: 'Arkansas', abbreviation: 'AR'},
{ name: 'California', abbreviation: 'CA'},
{ name: 'Colorado', abbreviation: 'CO'},
{ name: 'Connecticut', abbreviation: 'CT'},
{ name: 'Delaware', abbreviation: 'DE'},
{ name: 'District of Columbia', abbreviation: 'DC'},
{ name: 'Federated States of Micronesia', abbreviation: 'FM'},
{ name: 'Florida', abbreviation: 'FL'},
{ name: 'Georgia', abbreviation: 'GA'},
{ name: 'Guam', abbreviation: 'GU'},
{ name: 'Hawaii', abbreviation: 'HI'},
{ name: 'Idaho', abbreviation: 'ID'},
{ name: 'Illinois', abbreviation: 'IL'},
{ name: 'Indiana', abbreviation: 'IN'},
{ name: 'Iowa', abbreviation: 'IA'},
{ name: 'Kansas', abbreviation: 'KS'},
{ name: 'Kentucky', abbreviation: 'KY'},
{ name: 'Louisiana', abbreviation: 'LA'},
{ name: 'Maine', abbreviation: 'ME'},
{ name: 'Marshall Islands', abbreviation: 'MH'},
{ name: 'Maryland', abbreviation: 'MD'},
{ name: 'Massachusetts', abbreviation: 'MA'},
{ name: 'Michigan', abbreviation: 'MI'},
{ name: 'Minnesota', abbreviation: 'MN'},
{ name: 'Mississippi', abbreviation: 'MS'},
{ name: 'Missouri', abbreviation: 'MO'},
{ name: 'Montana', abbreviation: 'MT'},
{ name: 'Nebraska', abbreviation: 'NE'},
{ name: 'Nevada', abbreviation: 'NV'},
{ name: 'New Hampshire', abbreviation: 'NH'},
{ name: 'New Jersey', abbreviation: 'NJ'},
{ name: 'New Mexico', abbreviation: 'NM'},
{ name: 'New York', abbreviation: 'NY'},
{ name: 'North Carolina', abbreviation: 'NC'},
{ name: 'North Dakota', abbreviation: 'ND'},
{ name: 'Northern Mariana Islands', abbreviation: 'MP'},
{ name: 'Ohio', abbreviation: 'OH'},
{ name: 'Oklahoma', abbreviation: 'OK'},
{ name: 'Oregon', abbreviation: 'OR'},
{ name: 'Palau', abbreviation: 'PW'},
{ name: 'Pennsylvania', abbreviation: 'PA'},
{ name: 'Puerto Rico', abbreviation: 'PR'},
{ name: 'Rhode Island', abbreviation: 'RI'},
{ name: 'South Carolina', abbreviation: 'SC'},
{ name: 'South Dakota', abbreviation: 'SD'},
{ name: 'Tennessee', abbreviation: 'TN'},
{ name: 'Texas', abbreviation: 'TX'},
{ name: 'Utah', abbreviation: 'UT'},
{ name: 'Vermont', abbreviation: 'VT'},
{ name: 'Virgin Islands', abbreviation: 'VI'},
{ name: 'Virginia', abbreviation: 'VA'},
{ name: 'Washington', abbreviation: 'WA'},
{ name: 'West Virginia', abbreviation: 'WV'},
{ name: 'Wisconsin', abbreviation: 'WI'},
{ name: 'Wyoming', abbreviation: 'WY' }
]);

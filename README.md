# javasipt

Viewable at http://ryancarterj.com/javasipt

Conceptual storefront site for a coffee roasting company. 

Site structure is intended to make it easy to add more products or product types over time. Currently uses JSON to store information, but the $http.get() can easily be adapted to larger database requests.

The goal of this project is to create a large-scale app as an SPA using AngularJS. The site is broken down into views that will display any information given to them. This allows the abstracted "product" view to dynamically display any product it's given. The URL also dynamically updates to the specific category and product being displayed.

Similarly, the styling is broken down into components using SASS to mirror the app directory. This allows a developer to easily work on the HTML, CSS and Angular for each individual component or view.

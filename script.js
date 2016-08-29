
// Helper functions //

var getProducts = function() {
  return $.getJSON('data.json');
};

var getTemplate = function() {
  return $.get('product-template.html');
};

var createView = function(products, template) {
  var view = '';
  products.forEach(function(item) {
    product = new Productobj(item);
    var productView = template
      .replace('{image}', product.photo)
      .replace('{description}', product.description)
      .replace('{title}', product.title)
      .replace('{tagline}', product.tagline)
      .replace('{url}', product.url);
    view += productView;     
  });
  $("#content").append(view);
};

// Event handlers //

var addEventhandlers = function() {
  $('.remove').click(removeItem).bind(this);
};

var removeItem = function(e) {
  e.preventDefault();
  var target = $(this).closest('.product-container');
  target.hide('slow', function() { target.remove(); });
};

// Product class //

function Productobj(product, i) {
  var self          = this;
  self.description  = product.description;
  self.photo        = product.photos.medium_half;
  self.title        = product.name;
  self.tagline      = product.tagline;
  self.url          = product.url;
  self.index        = i;
};

// Initialize //

var render = function() {
  $.when(getProducts(), getTemplate()).done(function(products, template){
    products = products[0].sales;
    template = template[0];
    createView(products, template);   
    addEventhandlers();
  });
};

render();

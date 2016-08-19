
function domobj(){
  var self        =this;

  self.getProducts = function() {
    return $.getJSON('data.json');
  };

  self.getTemplate = function() {
    return $.get('product-template.html');
  };

  self.createView = function(products, template) {
    var productsHtml='';
    for(i=0; i<products.length ; i++){
      var product = new productobj(products[i], i);
      var productHtml = template.replace('{image}', product.photo).replace('{descriptionText}', product.description).replace('{title}', product.title).replace('{tagline}', product.tagline).replace('{url}', product.url);
      if (i % 3 == 0 ){  productsHtml += "<div class='row'>"; console.log("START") }
      productsHtml += productHtml;
      if ((i % 3 == 2) || i == (products.length-1) ){productsHtml += "</div>";console.log("FINISH")}
    }
    $("#content").append(productsHtml);
  };

  self.render = function(){
    $.when(self.getProducts(), self.getTemplate()).done(function(products, template){
      products = products[0].sales;
      template = template[0];
      self.createView(products, template);   
      self.addEventhandlers();
    });
  };
  
  self.addEventhandlers = function(){
    var showDescription = function() {
      $(this).find(".descriptionText").css({
        display: "block",
        zIndex: 1000000,
        color: "white",
        backgroundColor: "rgba(0, 0, 0, 0.6)"
      });
    };

    var hideDescription = function() {
      $(this).find(".descriptionText").css({
        display: "none"
      });
    };

    var changeCursor = function() {
      $(this).css({
        cursor: "pointer"
      });
    };

    var removeItem = function(e) {
      e.preventDefault();
      $(this).closest('.item').remove();
    };

    $('.product-container').hover(showDescription, hideDescription).bind(this);
    $('.remove').hover(changeCursor).bind(this);
    $('.remove').click(removeItem).bind(this);
  }
}

function productobj(product, i){
  var self          = this;
  self.description  = product.description
  self.photo        = product.photos.medium_half
  self.title        = product.name
  self.tagline      = product.tagline
  self.url          = product.url
  self.htmlview     = ""
  self.index        = i
}


var page=new domobj();
page.render();


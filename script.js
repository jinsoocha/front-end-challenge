
function domobj(){
  var self        =this;
  self.products   = [];

  self.getproducts = function(url){
    $.getJSON(url, function(response){
        for(i=0; i<response.sales.length ; i++){
          self.products.push( new productobj(response.sales[i], i)  );
        }
    });
  }
    
  self.updateproducthtml = function(){
    for( i=0; i< self.products.length ; i++){
      self.products[i].updatehtml();
    }
  }
  
  self.updatedom = function(){
    var i=0
    thishtml='';
    for( i=0; i< self.products.length ; i++){
      if (i % 3 == 0 ){  thishtml += "<div class='row'>"; console.log("START") }
      thishtml += self.products[i].htmlview;
      if ((i % 3 == 2) || i == (self.products.length-1) ){thishtml += "</div>";console.log("FINISH")}
    }
    $("#content").append(thishtml)
    
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

    $('.product-container').hover(showDescription, hideDescription).bind(this);
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
  
  self.updatehtml= function(){
    $.get('product-template.html', function(template){
      self.htmlview = template.replace('{image}', self.photo).replace('{descriptionText}', self.description).replace('{title}', self.title).replace('{tagline}', self.tagline).replace('{url}', self.url);
    });
  }
}


var page=new domobj();
page.getproducts('data.json');
setTimeout("console.log('building html');page.updateproducthtml();",20);
setTimeout("page.updatedom()",1000)


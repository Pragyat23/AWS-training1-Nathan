const apiAgent = 'https://69cqvcdw0l.execute-api.ap-south-1.amazonaws.com/default/productLamdaHyder';

$('#regProduct').on("click",function(){
    let pName = $('#productName').val();
    let pCost = $('#costRange').val();
    let pSku = $('#productSku').val();
    let pExp = $('#expiryDate').val();
    
});



  //load current products
  $.when( $.ready ).then(function() {
    // Document is ready.
    $.getJSON( apiAgent, function( data ) {
        $.each( data.Items, function( i,p ) {
            $('#currentProducts').append(
              "<div class='col-auto'><ul class='list-group'><li class='list-group-item'>"+p.ProductName.S+"</li>" +
              "<li class='list-group-item'>"+p.ProductId.S+"</li>"+
              "<li class='list-group-item'>"+p.Cost.S+"</li>"+
              "<li class='list-group-item'>"+p.ExpirationDate.S+"</li>"+
              "<li class='list-group-item'>"+p.Sku.S+"</li>"
              +"</ul></div>");
        });
      });
  });

  $.when($.ready).then(function(){
    //TODO
  });

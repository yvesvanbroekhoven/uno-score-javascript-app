define(["require", "./../db"], function(require, db){
  
  var _init
  ,   _index
  ,   _create
  ;
  
  _init = function(){
    $("#add-new-game").click(function(){
      _create();
    });
  };
  
  _index = function(){
    
    // Remove all list items
    $("#games ul li").not(".tmpl").remove();
    
    // Get all games
    db.transaction(function(transaction){
      transaction.executeSql(
        'SELECT * FROM games ORDER BY created_at;',
        [],
        function(transaction, result){
          // Loop results and append to list
          for (var i = 0; i < result.rows.length; i++) {
            var row   = result.rows.item(i);
            var game  = $("#games ul .tmpl").clone();
            game.removeClass("tmpl")
                .data("id", row.id)
                .find(".name").text(row.name).end()
                .find(".created-at").text(row.created_at).end()
                .appendTo("#games ul")
                .show();
          }
          
        },
        console.log("error")
      );
    });
    
    // Render view stuff
    $("h1").text("Games");
    $(".panel").hide();
    $("#games").show();
  }
  
  _create = function(){
    var name       = "First game"
    ,   created_at = new Date();
    
    db.transaction(function(transaction){
      transaction.executeSql(
        'INSERT INTO games (name, created_at)' +
        'VALUES (?, ?);',
        [name, created_at],
        function(){
          _index();
        }
      );
    });
    
  };
  
  
  
  return {
    init:   _init
  , index:  _index
  , create: _create
  };
  
});
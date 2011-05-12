require(["jquery", "db", "controllers/games"], function($, db, games_controller) {

  // DOM ready
  $(function() {
    
    games_controller.init();
    
  });
  
});

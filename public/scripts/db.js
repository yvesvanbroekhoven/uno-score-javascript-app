define(function(){
  
  var db
  ,   short_name    = 'unoscore'
  ,   version       = '1.0'
  ,   display_name  = 'unoscore'
  ,   max_size      = 65536
  ,   migrations    = []
  ;
  
  // Migrations
  migrations[0] = 'CREATE TABLE IF NOT EXISTS games (' +
                  'id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, ' +
                  'name STRING, ' +
                  'created_at DATE NOT NULL ' +
                  ');';
  
  // Open db
  db = openDatabase(short_name, version, display_name, max_size);
  
  // Run migrations
  db.transaction(function(transaction){
    $.each(migrations, function(idx, value){
      transaction.executeSql(value);
    })
  });
  
  // Return db object
  return db;
  
});
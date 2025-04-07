const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'designer_social_network',
    dateStrings: true
});

//prueba de conexión
connection.connect((err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("conexión ok");
    }
})

module.exports = connection;
const connection = require('../config/db')
const bcrypt = require('bcrypt');

class DesignerController {
  //controladores para las rutas /designer
//Función callback que renderiza la lista de diseñadores
  showDesignerList = (req, res)=> {
    let sql = 'SELECT * FROM designer WHERE designer_is_deleted = 0';
    connection.query(sql, (err, result) => {
      if(err){
          throw err;
      }else{
          console.log(result);
          res.render("designerList", {result})
      }
  })
}

showRegisterForm = (req, res) => {
  res.render('register');
}

register = (req, res) => {
  console.log("22222",req.body);
  const {name, lastname,email, password, repPassword} = req.body;

  if(!name || !lastname || !email || !password || !repPassword){
      res.render('register', {message:"Algún campo está incompleto"});
  }else{
      if(password != repPassword){
          res.render('register', {message: "Las contraseñas no coinciden"});
      }else{
          //hashear contraseña
          bcrypt.hash(password, 10, (err, hash)=>{
              if(err){
                  throw err;
              }else{
                  console.log("hashhhhh",hash);
                  //guardado de datos en bd
                  let sql = 'INSERT INTO designer (designer_name, lastname, email, password) VALUES (?,?,?,?)'
                  let values = [name, lastname, email, hash];
                  connection.query(sql, values, (errSql, result)=>{
                      if(errSql){
                          if(errSql.errno == 1062){
                              res.render("register", { message: "email en uso, prueba con otro"});
                          }else{
                              throw errSql;
                          }
                      }else{
                        //cambiar a login
                          res.redirect("/designer/loginForm");
                      }
                  })
              }
          })
      }
  }
}

  showLogin = (req, res) => {
      res.render('login');
}

  login = (req, res) => {
  const {email, password} = req.body;
  //Verificar los datos
  if(!email || !password){
      res.render("login", {message: "Debes cumplimentar todos los campos"});
  }else{
      //Preguntar a la base de datos si ese email existe 
      let sql = ' SELECT * FROM designer WHERE email = ? AND designer_is_deleted = 0';
      connection.query(sql, [email], (err, result) => {
          if(err){
              throw err;
          }else{
              console.log("****",result);
              if(result.length == 0){
                  res.render("login", {message: "El email no existe"});
              }else{
                  //compruebo que la contraseña coincide
                  let hash = result[0].password;
                  bcrypt.compare(password, hash, (errHash, resultCompare) => {
                      console.log(resultCompare);
                      if(errHash){
                          throw errHash;
                      }else{
                          if(!resultCompare){
                              res.render("login", {message: "La no es válida, vuelve a intentarlo"});
                          }else{
                            //cambiar al perfil del diseñador
                              res.redirect(`/designer/designerProfile/${result[0].designer_id}`);
                          }
                      }
                  })
              }
          }
      })
  }
}

profile = (req, res) => {
  const { id } = req.params;
  console.log("ID recibido:", id);
  
  let sql = `SELECT d.*, des.design_id, des.design_name, des.orientation, des.main_fabric, des.main_color, des.garment_type, des.design_img 
           FROM designer d 
           LEFT JOIN design des 
           ON d.designer_id = des.designer_id 
           AND des.design_is_deleted = 0
           WHERE d.designer_is_deleted = 0
           AND d.designer_id = ?`;
  connection.query(sql, [id], (err, result)=>{
      if(err){
          throw err;
      }else{
          // Sacamos de cada uno de los objetos del array largo que se crea la informacion
          //Creamos objeto design y llenamos con su informacion
          // Reduce 
          let finalResult = {};
          let designs = [];
          let design = {};
          //Cargo el array con sólo los datos de los diseños
          result.forEach((elem)=>{
              if(elem.design_id){
              design = {
                design_id: elem.design_id,
                 design_name: elem.design_name,
                  orientation: elem.orientation,
                  design_img: elem.design_img,
                  designer_id: elem.designer_id
              }
              designs.push(design);
          }
          })
         
          finalResult = {
             designer_id: result[0].designer_id,
              designer_name: result[0].designer_name,
              lastname: result[0].lastname,
              designer_description: result[0].designer_description,
              email: result[0].email,
              designer_img: result[0].designer_img,
              phone_number: result[0].phone_number,
              city: result[0].city,                
              designs
          }
          console.log("errrorrrrrr", finalResult);
           res.render("designerProfile", {finalResult});
      }
  })
}

showUserProfile = (req, res) => {
  const { id } = req.params;
  console.log(id);
  
  let sql = `SELECT d.*, des.design_id, des.design_name, des.orientation, des.main_fabric, des.main_color, des.garment_type, des.design_img 
           FROM designer d 
           LEFT JOIN design des 
           ON d.designer_id = des.designer_id 
           AND des.design_is_deleted = 0
           WHERE d.designer_is_deleted = 0
           AND d.designer_id = ?`;
  connection.query(sql, [id], (err, result)=>{
      if(err){
          throw err;
      }else{
          // Sacamos de cada uno de los objetos del array largo que se crea la informacion
          //Creamos objeto design y llenamos con su informacion
          // Reduce 
          let finalResult = {};
          let designs = [];
          let design = {};
          //Cargo el array con sólo los datos de los diseños
          result.forEach((elem)=>{
              if(elem.design_id){
              design = {
                design_id: elem.design_id,
                 design_name: elem.design_name,
                  orientation: elem.orientation,
                  design_img: elem.design_img,
                  designer_id: elem.designer_id
              }
              designs.push(design);
          }
          })
         
          finalResult = {
             designer_id: result[0].designer_id,
              designer_name: result[0].designer_name,
              lastname: result[0].lastname,
              designer_description: result[0].designer_description,
              email: result[0].email,
              designer_img: result[0].designer_img,
              phone_number: result[0].phone_number,
              city: result[0].city,       
              designs
          }
          console.log("errrorrrrrr", finalResult);
           res.render("userViewDesigners", {finalResult});
      }
  })
}

}
module.exports = new DesignerController();

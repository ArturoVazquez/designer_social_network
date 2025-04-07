const connection = require('../config/db');
const bcrypt = require('bcrypt');

class DesignerController {

  showDesignerList = (req, res) => {
    let sql = 'SELECT * FROM designer WHERE designer_is_deleted = 0';
    connection.query(sql, (err, result) => {
      if (err) {
        throw err;
      } else {
        console.log(result);
        res.render('designerList', { result });
      }
    });
  };

  showRegisterForm = (req, res) => {
    res.render('register');
  };

  register = (req, res) => {
    console.log('22222', req.body);
    const { name, lastname, email, password, repPassword } = req.body;

    if (!name || !lastname || !email || !password || !repPassword) {
      res.render('register', { message: 'Some field is incomplete.' });
    } else {
      if (password != repPassword) {
        res.render('register', { message: 'Passwords do not match.' });
      } else {

        bcrypt.hash(password, 10, (err, hash) => {
          if (err) {
            throw err;
          } else {
            console.log('hashhhhh', hash);

            let sql =
              'INSERT INTO designer (designer_name, lastname, email, password) VALUES (?,?,?,?)';
            let values = [name, lastname, email, hash];
            connection.query(sql, values, (errSql, result) => {
              if (errSql) {
                if (errSql.errno == 1062) {
                  res.render('register', {
                    message: 'email in use, try another',
                  });
                } else {
                  throw errSql;
                }
              } else {

                res.redirect('/designer/loginForm');
              }
            });
          }
        });
      }
    }
  };

  showLogin = (req, res) => {
    res.render('login');
  };

  login = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      res.render('login', { message: 'You must complete all fields.' });
    } else {

      let sql =
        ' SELECT * FROM designer WHERE email = ? AND designer_is_deleted = 0';
      connection.query(sql, [email], (err, result) => {
        if (err) {
          throw err;
        } else {
          console.log('****', result);
          if (result.length == 0) {
            res.render('login', { message: 'The email does not exist.' });
          } else {

            let hash = result[0].password;
            bcrypt.compare(password, hash, (errHash, resultCompare) => {
              console.log(resultCompare);
              if (errHash) {
                throw errHash;
              } else {
                if (!resultCompare) {
                  res.render('login', {
                    message: 'The password is not valid, please try again.',
                  });
                } else {

                  res.redirect(
                    `/designer/designerProfile/${result[0].designer_id}`
                  );
                }
              }
            });
          }
        }
      });
    }
  };

  profile = (req, res) => {
    const { id } = req.params;

    let sql = `SELECT d.*, des.design_id, des.design_name, des.orientation, des.main_fabric, des.main_color, des.garment_type, des.design_img 
           FROM designer d 
           LEFT JOIN design des 
           ON d.designer_id = des.designer_id 
           AND des.design_is_deleted = 0
           WHERE d.designer_is_deleted = 0
           AND d.designer_id = ?`;
    connection.query(sql, [id], (err, result) => {
      if (err) {
        throw err;
      } else {

        let finalResult = {};
        let designs = [];
        let design = {};

        result.forEach((elem) => {
          if (elem.design_id) {
            design = {
              design_id: elem.design_id,
              design_name: elem.design_name,
              orientation: elem.orientation,
              design_img: elem.design_img,
              designer_id: elem.designer_id,
            };
            designs.push(design);
          }
        });

        finalResult = {
          designer_id: result[0].designer_id,
          designer_name: result[0].designer_name,
          lastname: result[0].lastname,
          designer_description: result[0].designer_description,
          email: result[0].email,
          designer_img: result[0].designer_img,
          phone_number: result[0].phone_number,
          city: result[0].city,
          designs,
        };
        console.log('errrorrrrrr', finalResult);
        res.render('designerProfile', { finalResult });
      }
    });
  };

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
    connection.query(sql, [id], (err, result) => {
      if (err) {
        throw err;
      } else {
        let finalResult = {};
        let designs = [];
        let design = {};

        result.forEach((elem) => {
          if (elem.design_id) {
            design = {
              design_id: elem.design_id,
              design_name: elem.design_name,
              orientation: elem.orientation,
              design_img: elem.design_img,
              designer_id: elem.designer_id,
            };
            designs.push(design);
          }
        });

        finalResult = {
          designer_id: result[0].designer_id,
          designer_name: result[0].designer_name,
          lastname: result[0].lastname,
          designer_description: result[0].designer_description,
          email: result[0].email,
          designer_img: result[0].designer_img,
          phone_number: result[0].phone_number,
          city: result[0].city,
          designs,
        };
        console.log('errrorrrrrr', finalResult);
        res.render('userViewDesigners', { finalResult });
      }
    });
  };
}
module.exports = new DesignerController();

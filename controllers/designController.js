const connection = require('../config/db');

class DesignController {
  showFormCreateDesign = (req, res) => {
    const { designer_id } = req.params;
    res.render('designForm', { designer_id });
  };

  createDesign = (req, res) => {
    const { designer_id } = req.params;

    const {
      design_name,
      orientation,
      main_fabric,
      main_color,
      garment_type,
      design_description,
    } = req.body;

    if (!design_name || !orientation) {
      return res.render("designForm", {
        designer_id,
        message: "The 'Design Name' and 'Orientation' fields are required."
      });
    }

    let sql =
      'INSERT INTO design (designer_id, design_name, orientation, main_fabric, main_color, garment_type, design_description) VALUES (?, ?, ?, ?, ?, ?, ?)';
    let values = [
      designer_id,
      design_name,
      orientation,
      main_fabric,
      main_color,
      garment_type,
      design_description,
    ];
    if (req.file) {
      sql =
        'INSERT INTO design (designer_id, design_name, orientation, main_fabric, main_color, garment_type, design_description, design_img) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
      values = [
        designer_id,
        design_name,
        orientation,
        main_fabric,
        main_color,
        garment_type,
        design_description,
        req.file.filename,
      ];
    }

    connection.query(sql, values, (err, result) => {
      if (err) {
        throw err;
      } else {

        res.redirect(`/designer/designerProfile/${designer_id}`);
      }
    });
  };

  profile = (req, res) => {
    const { id } = req.params;
    let sql =
      'SELECT * from design WHERE design_id = ? AND design_is_deleted = 0';
    connection.query(sql, [id], (err, result) => {
      if (err) {
        throw err;
      } else {
        res.render('designProfile', { result: result[0] });
      }
    });
  };

  showEditDesign = (req, res) => {
    const { id } = req.params;
    let sql =
      ' SELECT * FROM design where design_id = ? and design_is_deleted = 0';
    connection.query(sql, [id], (err, result) => {
      if (err) {
        throw err;
      } else {
        res.render('formEditDesign', { result: result[0] });
      }
    });
  };

  editDesign = (req, res) => {
    const { id, designer_id } = req.params;
    const {
      design_name,
      orientation,
      main_fabric,
      main_color,
      garment_type,
      design_description,
    } = req.body;

    if (!design_name || !orientation) {
      return res.render("formEditDesign", {
        result: { 
          design_id: id,
          design_name,
          orientation,
          main_fabric,
          main_color,
          garment_type,
          design_description,
          designer_id,
        },
        message: "The 'Design Name' and 'Orientation' fields are required."
      });
    }

    let sql =
      'UPDATE design SET design_name = ?, orientation = ?, main_fabric = ?, main_color = ?, garment_type = ?, design_description = ? WHERE design_id = ?';
    let values = [
      design_name,
      orientation,
      main_fabric,
      main_color,
      garment_type,
      design_description,
      id,
    ];

    if (req.file) {
      sql =
        'UPDATE design SET design_name = ?, orientation = ?, main_fabric = ?, main_color = ?, garment_type = ?, design_description = ?, design_img = ? WHERE design_id = ?';
      values = [
        design_name,
        orientation,
        main_fabric,
        main_color,
        garment_type,
        design_description,
        req.file.filename,
        id,
      ];
    }

    connection.query(sql, values, (err, result) => {
      if (err) {
        throw err;
      } else {
        res.redirect(`/designer/designerProfile/${designer_id}`);
      }
    });
  };

  delTotalDesign = (req, res) => {
    const { id, designer_id } = req.params;
    let sql = 'DELETE FROM design WHERE design_id = ?';
    connection.query(sql, [id], (err, result) => {
      if (err) {
        throw err;
      } else {
        res.redirect(`/designer/designerProfile/${designer_id}`);
      }
    });
  };

  allDesigns = (req, res) => {
    let sql = 'select * from design where design_is_deleted = 0';
    connection.query(sql, (err, result) => {
      if (err) {
        throw err;
      } else {
        res.render('allDesigns', { result });
      }
    });
  };

  showProfileUser = (req, res) => {
    const { id } = req.params;
    let sql =
      'SELECT * from design WHERE design_id = ? AND design_is_deleted = 0';
    connection.query(sql, [id], (err, result) => {
      if (err) {
        throw err;
      } else {
        res.render('designProfileUser', { result: result[0] });
      }
    });
  };

  doSearch = (req, res) => {
    const { query } = req.query;

    const sql = `
      SELECT *
      FROM design
      WHERE
          design_name LIKE ?
          OR orientation LIKE ?
          OR main_fabric LIKE ?
          OR main_color LIKE ?
          OR garment_type LIKE ?
    `;

    connection.query(
      sql,
      [`%${query}%`, `%${query}%`, `%${query}%`, `%${query}%`, `%${query}%`],
      (err, results) => {
        if (err) {
          throw err;
        }
        res.render('search', { result: results, query });
      }
    );
  };
}

module.exports = new DesignController();

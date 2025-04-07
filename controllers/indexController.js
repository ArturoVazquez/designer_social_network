class IndexController {

  showHome = (req, res)=> {
      res.render('index');
  }

  showAbout = (req, res) => {
      res.render('about');
  }
}

module.exports = new IndexController();

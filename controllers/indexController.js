class IndexController {
  //controladores para las rutas index
//Función callback que renderiza el home
  showHome = (req, res)=> {
      res.render('index');
  }
//renderiza el about
  showAbout = (req, res) => {
      res.render('about');
  }
}

module.exports = new IndexController();

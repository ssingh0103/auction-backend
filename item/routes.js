const routes = require('express').Router();
const controller = require('./controller');
var multer  = require('multer')



const path = require("path");

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
   
  var upload = multer({ storage: storage })

routes.get('/',controller.getAll);
routes.post('/',controller.createOne);
routes.get('/:id',controller.getOne);
routes.delete('/:id',controller.deleteOne);
routes.put('/:id',controller.updateOne);
routes.put('/highbid/:id',controller.updateHighBid);


routes.post('/image', upload.array('myFile',12), (req, res, next) => {
  const file = req.file
  console.log('File is',file);

  // if (!file) {
  //   const error = new Error('Please upload a file')
  //   error.httpStatusCode = 400
  //   return next(error)
  // }
    res.send('Done');
  
})

module.exports = routes;
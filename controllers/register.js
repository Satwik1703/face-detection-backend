const UserInfo = require('../models/userinfo');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleRegister = (req, res) => {
  bcrypt.hash(req.body.password, 10, function(err, hash){
    if(err){
      console.log(err);
      return res.status(500).json('Error in Hashing the Password')
    }
    UserInfo.create({ email: req.body.email, name: req.body.name, password: hash })
    .then(data => {
      var token = jwt.sign({id: data._id}, 'Satwik', {expiresIn: '2h'});
      //Writing Token to Database
      UserInfo.findByIdAndUpdate(data._id, {token: token}, function(err, doc){
        if(err)
          return res.status(500).json('Error in writing Token to Database');
        res
        .status(200)
        .json({token, data})
      })
    })
    .catch(err => {res.status(500).json('Name/Email already exists')})
  })
}

module.exports = {
  handleRegister
}

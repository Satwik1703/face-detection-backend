const UserInfo = require('../models/userinfo');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleSignIn = (req, res) => {
  UserInfo.findOne({email: req.body.email}, function(err, data){
    if(err)
      return res.status(404).json('Some Error has occured in Signing you in');
    if(!data)
      return res.status(404).json('User Not Found');

    bcrypt.compare(req.body.password, data.password, function(err, result){
      if(!result)
        return res.status(401).json('Wrong Password');
      else{
        var token = jwt.sign({id: data._id}, 'Satwik', {expiresIn: '2h'});
        //Updating the token in Database
        UserInfo.findByIdAndUpdate(data._id, {token: token}, function(err, doc){
          if(err)
            return res.status(500).json('Could not Update the Token in Database');

          res
          .status(200)
          .json({token, doc});
        })
      }
    })
  });
}

const handleSignInToken = (req, res) => {
  if(!req.body.token)
    return res.status(404).json('Token Not Found');
  var token = req.body.token;

  jwt.verify(token, 'Satwik', function(err, decoded){
    if(err)
      return res.status(401).json('Invalid Token');
    //Checking the token with DB
    UserInfo.findById(decoded.id, function(err, data){
      if(err)
        return res.status(500).json('Some Error has occured in Signing with Token');
      if(!data)
        return res.status(404).json('User Not Found');
      if(token !== data.token)
        return res.status(401).json('Unauthorized');
      if(token === data.token)
        return res.status(200).json(data);
    })
  })
}

module.exports = {
  handleSignIn,
  handleSignInToken
}

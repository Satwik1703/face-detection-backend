const UserInfo = require('../models/userinfo');

const handleSignOut = (req, res) => {
  UserInfo.findByIdAndUpdate(req.body.id, {token: null}, function(err, doc){
    if(err)
      return res.status(500).json('Some Error has occured in Signing you out');
    res
    .status(200)
    .clearCookie('token')
    .json('Succefully Signed Out')
  })
}

module.exports = {
  handleSignOut
}

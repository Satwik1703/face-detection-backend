const UserInfo = require('../models/userinfo');

const handleImage = (req, res) => {
  UserInfo.findByIdAndUpdate(req.body.id, {$inc: {entries: 1}}, {new: true}, function(err, data){
    if(err)
      return res.status(500).json('Unable to get Entries');
    if(!data)
      return res.status(500).json('Unable to get the User with Entries');

    res.status(200).json(data.entries);
  })
}

module.exports = {
  handleImage
}

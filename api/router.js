const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();


router.use(express.json());




const bcrypt = require('bcryptjs');

const {
    get,
    getByUsername,
    insert,
} = require('./model');

router.get('/users', (req, res) => {
    if(req.session.user){
    get().then(a => res.send(a));
    }
    else{
        res.send({message: 'You shall not pass!'});
        console.log('user in get',req.session.user);
    }
});



router.post('/register', (req, res) => {
    const hash = bcrypt.hashSync(req.body.password, 2);
    req.body.password = hash;
    insert(req.body).then(a => res.send(a))
});

router.post('/login', (req, res) => {
    getByUsername(req.body.username).then(user =>{
        if(user && bcrypt.compareSync(req.body.password,user.password)){
            req.session.user = user;
            const token = generateToken(user);
            res.status(200).json({
                message: `Welcome ${user.username}!, have a token...`,
                token, // attach the token as part of the response
              });
        }
        else{
            res.send({user})
        }
    })
    .catch(err => {  
        res.send({message: 'there was an error'})
        console.log("error in post",err);
        
    })
    
});

function generateToken(user) {
    const payload = {
      subject: user.id, // sub in payload is what the token is about
      username: user.username,
      // ...otherData
    };
  
    const options = {
      expiresIn: '1d', // show other available options in the library's documentation
    };
  
    // extract the secret away so it can be required and used where needed
    const secret = 'jacob';
    console.log('sending token');
    return jwt.sign(payload, secret, options); // this method is synchronous
  }

module.exports = router;
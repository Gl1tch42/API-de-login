const jwt = require('jsonwebtoken');

const User = require('../models/user');

const nodeMailer = require('nodemailer');

/**
 * register methodo
 */

exports.register = async (req, res) => {
    try{
        const user = await new User(req.body);

        user.save((err, user) => {
            if(err) return res.status(400).json({err:'the register was not possible'})
        });


        res.json({user});
    }
    catch (err) { return res.status(400).send({ error:'Registration Failed' }); }
}


/**
 * login methodo
 */
exports.login = (req, res) => {
    const {email, password} = req.body;
    User.findOne({email},(error, user) => {
        if (error || !user) return res.status(400).json({ error:'email not found, that user not exist' });
    

    if(!user.authenticate(password))return res.status(400).json({ error:'email and password dont match!' });

    const token = jwt.sign({ _id: user._id },process.env.JWT_SECRET);
    res.cookie('t',token,{expire: new Date()+9999});

    const {_id, name, email, role} = user;
    return res.json({token, user: {_id, name, email, role}});

    });

}


exports.emailSend = (req, res) =>{
    const {email} = req.body;

    let transporter = nodeMailer.createTransport({
        host:"",
        port:587,
        secure:false,
        auth: {
            user:"",
            pass: ""
        },
        tls: {
            rejectUnauthorized: false,
        }
    });

    const emailData = {
        from:"",
        to:`${email}`,
        subject:"teste de envio de email",
        html:`<h2>Test test test</h2>`
    }

    transporter.sendMail(emailData).then(sent => {
        return res.json({mensage:`email hasn been send ${email}`});
    })
}

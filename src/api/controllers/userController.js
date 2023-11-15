const User = require('../models/userModel');

exports.userRegister = async (req, res) => {
    try {
        let newUser = new User(req.body);
        let user = await newUser.save();
        res.status(201).json({message : `Utilisateur créé ${user}`});
    } catch (error) {
        console.log(error);
        res.status(401).json({message : "Requête invalide"});
    }
}

exports.userLogin = async (req, res) => {
    try{
        const user = await User.findOne({ email: req.body.email });

        if(!user){
            res.status(404).json({message : "Utilisateur non trouvé"});
            return;
        }
        if(user.email === req.body.email && user.password === req.body.password){
            const userData = {
                id: user._id,
                email: user.email,
                role: "admin"
            }
            const token = await jwt.sign(userData, process.env.JWT_KEY, {expiresIn: "24h"});
            res.status(200).json({token});
        
        } else {
            res.status(401).json({message : "Email ou mot de passe incorrect"});
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({message : "Une erreur s'est produite lors du traitement"});
    }
}
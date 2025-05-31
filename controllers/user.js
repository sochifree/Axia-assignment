const express = require('express');
const User = require('../model/user.js');
const bcrypt = require('bcrypt');

const router = express.Router();

module.exports = {
    //  get all users
      getAllUser: async(req, res)=>{
    try {
        const users = await User.find();
            res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
},

    signUp: async (req, res)=>{
    const {name, email, password, hobbies} = req.body;

    //checking if user exists
    try{
        const userExist = await User.findOne({email});

        if(userExist){
            return res.send('User with this Email already exist')
        }

        const hashedPassword =await bcrypt.hash(req.body.password, 10)
        req.body.password = hashedPassword

        //create a new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        })

        const savedUser = newUser.save()
        console.log('User created successfully!')
        res.json(savedUser)
            
    }
    catch{
        console.log(err);
        res.status(500).json({
            error:err
        })
    }
},

//login a user
login: async (req, res)=>{
    const {email, password} = req.body;

    try{
        const user = await user.findOne({email});
        if(!user) {
            return res.json({message: 'User not found'})
        }

        const validPassword = await bcrypt.compare(password, user.password)
        console.log('Password match:', validPassword)

        if(!validPassword){
            return res.json({message: 'Invalid Password'})
        }

        return res.json({message:`Welcome ${user.name}`})
    }
    catch(err){
        return res.json({message: 'Internal error', error: err})
    }
},


//update user
 update: (req, res)=>{
    const user = req.body

    try{
        const updatedUser = user.findIndex((_user)=> _user.id == user.id)
        user.splice(updatedUser, 1, user)
        
        return res.send('your account has been updated successfully')
        
    }
    catch(err){
        return res.json({message: 'Internal error'})
    }
},

//delete user
deleteUser: async (req, res) => {
    const userId = req.params.id;

    try {;
        await User.findByIdAndDelete(req.body.id);
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        return res.status(500).json(
            {message: 'Internal error', error: err});
    }

}
}
    
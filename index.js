const express = require('express');
const bodyParser = require('body-parser')
const connect = require("./src/connection/Connection")
require('dotenv').config();
const User = require('./src/Model/Model')


const app = express();
app.use(express.json());

app.use(bodyParser.json());

connect();


app.get('/api', (req, res) => {
    res.send("Hello Speqto Technology");
});


//Fetch all data from database

app.get('/api/alldata', async (req, res) => {
    const allData = await User.find();
    res.send(allData);
})


//Add data too the database

app.post('/api/user', async (req, res) => {
    const { id, name, email, address, college, phone } = req.body;
    if (!id) {
        return res.json({
            msg: "Id is required"
        })
    }
    const exitId = await User.findOne({ id, id });
    if (exitId) {
        return res.json({
            msg: "Id is assigned user different Id"
        })
    }
    if (!name) {
        return res.json({
            msg: "Name is required "
        })
    }
    if (name < 3) {
        return res.json({
            msg: "Name must be atlast 3 charchter "
        })
    }
    if (!email) {
        return res.json({
            msg: "Email is required"
        })
    }

    if (!address) {
        return res.json({
            msg: "Address is required"
        })
    }
    if (!college) {
        return res.json({
            msg: "Collage name is required"
        })
    }
    if (!phone) {
        return res.json({
            msg: "Mobile number is required"
        })
    }
    const existUser = await User.findOne({ email: email })
    if (existUser) {
        return res.json({
            msg: "User is already registered use different email"
        })
    }
    const newUser = new User({
        id,
        name,
        email,
        address,
        college,
        phone
    })

    const saveUser = await newUser.save();
    res.json(saveUser);
})


//Update the user list

app.put('/api/update/:id', async (req, res) => {
    const id = req.params.id;
    const data = req.body.name;
    // console.log(data)
    const result = await User.findOneAndUpdate({ id: id }, { $set: { name: data } })
        .catch((e) => {
            console.log(e);
        })
    res.send(result);
})


//Delete the user

app.delete('/api/delete/:id', async (req, res) => {
    const id = req.params.id;
    const result = await User.deleteOne({ id: id }).catch((e) => {
        console.log(e)
    });
    res.send(result)

})



app.listen(4500, () => {
    console.log(`This server is running on port 4500`);
});
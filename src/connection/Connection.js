
const mongoose = require('mongoose')

const connect = async () => {
    try {
        const result = await mongoose.connect(process.env.MONGODB_URL_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then((res) => {
            console.log('Connection Establist successfully');
        });
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = connect;




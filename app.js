//require enviorment variables
require('dotenv').config()


//require everything here
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3002;
const cors = require("cors");
const Expensemongodb = require('./models/mongomodel');

//Port Listening and mongoose connection
app.listen(PORT);

try {
    mongoose.connect(process.env.MONGODB_URL,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    );

} catch (error) {
    console.log("error connecting to mongodb");
}


//middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});


// Dummy main page
app.get("/", (req, res) => {
    res.send("EXPENSE TRACKER SERVER RUNNING");
})

//POST the data when user creates Expense/Income value addition

app.post("/transaction", async (req, res) => {

    try {
        const transaction = new Expensemongodb({
            oauthid: req.body.sub,
            month: req.body.month,
            typeoftransaction: req.body.type,
            reasonofTransaction: req.body.reason,
            transactionamount: req.body.amount,
            createdAt: Date.now(),
            name: req.body.name
        })
        const response = await transaction.save();
        res.send(response)

    } catch (error) {
        res.status(400).send(error.message);
    }

})


//Delete a transcation

app.delete('/transactiondelete/:id', async (req, res) => {
    try {

        const transaction = await Expensemongodb.findById(req.params.id)
        await Expensemongodb.findByIdAndDelete(req.params.id);
        res.status(200).send(transaction);
    } catch (error) {
        res.status(400).send(error.message);
    }
})


//get all transactions
app.get('/alltransactions/:oauthid/:month', async (req, res) => {
    try {
        let query = {
            oauthid: req.params.oauthid,
            month: req.params.month
        }
        const transactions = await Expensemongodb.find(query).sort({ createdAt: -1 });
        res.status(200).send(transactions);

    } catch (error) {
        res.status(400).send(error.message);
    }
})


//get all transactions
app.get('/alltransactionsonrender/:oauthid', async (req, res) => {
    try {
        let query = {
            oauthid: req.params.oauthid
        }
        const transactions = await Expensemongodb.find(query).sort({ createdAt: -1 });
        res.status(200).send(transactions);

    } catch (error) {
        res.status(400).send(error.message);
    }
})
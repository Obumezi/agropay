const app = require("express")(); //creating server endpoint

//decodes what gets sent to the server and what i can use
const bodyParser = require("body-parser");
const res = require("express/lib/response");
const bvnDetails = require("./bvn");

//for logging on the server as to what endpoint got a request and the data sent to it
const logger = require("morgan");
//const bvnDetails = require('./bvn');

const port = process.env.PORT || 3030;

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("*", (req, res) => {
    res.send("Agropay");
});

app.post("*", async (req, res) => {
    try {
        let { sessionId, serviceCode, phoneNumber, text } = req.body;

        let response = "";

        if (text === "") {
            // FIRST REQUEST
            let response = `CON Welcome to Agropaysolutions
    1. Register on Agropay   
    2. Learn 
    3. Payments
    4. Borrow
    5. MarketPlace
    6. Register as Agroagent
    `;

            res.send(response);
        } else if (text === "1") {
            response = `CON Please enter your bvn`;

            res.send(response);
        } else if (text.substring(0, 2) === "1*") {
            value = text.split("*")[1];
            const bvnResponse = await bvnDetails(value);
            const customerName = `${bvnResponse.first_name} ${bvnResponse.last_name}`;
            response = `END Hi ${customerName} 
        Your Registration was Successful!
        Agropay account created. You can send and receive money, buy farm inputs. Start today`;
            res.send(response);
        } else if (text === "2") {
            response = `CON Agropay has partnered with bulksms to provide you easy access to educational and informational content
        1. Press 1 confirm subscription
        
        `;
            res.send(response);
        } else if (text === "2*1") {
            response = `END Subscription confirmed you will start to receive informational content `;
            res.send(response);
        } else if (text === "3") {
            // Business logic for first level response
            response = `CON Please enter recepient phone number to make payment `;
            res.send(response);
        } else if (text === "4") {
            // Business logic for first level response
            response = `CON These are the loan amounts available to you
            1. 10,000
            2. 30,000
            3. 50,000
            4. 90,000 `;
            res.send(response);
        } else if (text === "3*08033016007") {
            let response = `CON Enter amount to pay`;
            res.send(response);
        } else if (text === "3*08033016007*10000") {
            // This is a second level response
            response = `CON Authorize payment of 10000 from your wallet to [08033016007]
            Enter your 4 digit pin to continue`;
            res.send(response);
        } else if (text === "3*08033016007*10000*0000") {
            response = `END Payment Successful recepient will receive funds shortly`;
            res.send(response);
        } else if (text === "4*4") {
            //let text = "2000"
            response = `CON Authorize payment of N90,000 to your wallet
            Enter secret pin to continue`;
            res.send(response);
        } else if (text === "4*4*0000") {
            response = `END your request is being processed and your account will be credited within 24 hours`;
            res.send(response);
        } else if (text === "5") {
            response = `CON 
            1. Buy crop input
            2. Buy livestock food
            3. Request Call back to order`;
            res.send(response);
        } else if (text === "5*1") {
            response = `CON Select Supplier
            1. Farmsquare
            2. Agro Nigerian Venture
            3. Vetgate Agro Services Limited`
            res.send(response);
        } else if (text === "5*1*1") {
            response = `CON Select Category
            1.Seeds
            2.Request callback to order`
            res.send(response)
        } else if (text === "5*1*1*1") {
            response = `CON select input
            1. Rice
            2. Maize
            3. Barley`
            res.send(response)
        } else if (text === "5*1*1*1*1") {
            response = `CON NGN 10,000 will be deducted from your wallet
            Enter select pin to continue`
            res.send(response)

        } else if (text === "5*1*1*1*1*0000") {
            response = `END Order confirmed
            Input will be delivered to local agent within 1 day`
            res.send(response)

        }


        else {
            res.status(400).send("Something Isn't right!");
        }
    } catch (error) {
        res.status(400).send("Something Isn't right here!");
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

const express = require('express');
const bodyPraser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql');
const multer = require('multer');

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "dv_donations",
});

app.use(cors());
app.use(express.json());
app.use(bodyPraser.urlencoded({extended: true}));

const upload = multer({storage: multer.memoryStorage()});

app.get("/donation/getActive", (req, res) => {
    const sqlSelect = "SELECT * FROM donacija WHERE potvrda_admin = 1";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
});

app.get("/donation/getAll", (req, res) => {
    const sqlSelect = "SELECT * FROM donacija ORDER BY potvrda_admin ASC";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
});

app.get("/donation/getDonation/:id", (req, res) => {
    const id = req.params.id;
    const sqlSelect = "SELECT * FROM donacija WHERE id = ?";
    db.query(sqlSelect, id, (err, result) => {
        res.send(result);
    });
});

app.get("/donation/getMyDonations/:currentAccount", (req, res) => {
    const acc = req.params.currentAccount;
    const sqlSelect = "SELECT * FROM donacija WHERE adresa = ? ORDER BY potvrda_admin ASC";
    db.query(sqlSelect, acc, (err, result) => {
        res.send(result);
    });
});



app.delete("/donation/delete/:donationId", (req, res) => {
    const id = req.params.donationId;
    const sqlDelete = "DELETE FROM donacija WHERE id=?";
    db.query(sqlDelete, id, (err, result) => {
        if(err) console.log(err);
    });
});

app.put("/donation/update", (req, res) => {
    const id = req.body.donationId;
    const sqlUpdate = "UPDATE donacija SET potvrda_admin = 1 WHERE id = ?";

    db.query(sqlUpdate, id, (err, result) => {
        if(err) console.log(err);
    });
});

app.post('/donation/insert', upload.single("image"), (req, res) => {
    const donationName = req.body.donationName;
    const donationDesc = req.body.donationDesc;
    const email = req.body.email;   
    const donationGoal = req.body.donationGoal;
    const address = req.body.address;
    const donationImage = req.file.buffer.toString('base64');
    
    const sqlInsert = "INSERT INTO donacija (ime_donacija, opis_donacija, email, goal, slika, adresa) VALUES (?,?,?,?,?,?)";
    db.query(sqlInsert, [donationName, donationDesc, email, donationGoal, donationImage, address], (err, result) => {
        console.log(result);
        if(err) console.log(err);
    });

    res.send("Success")

});

app.listen(3001, () => {
    
});
import express, { response } from 'express';
import mysql from 'mysql';
import cors from 'cors';
import jwt, { decode } from 'jsonwebtoken';
import bcrypt, { hash } from 'bcrypt';
import cookieParser from 'cookie-parser';
import nodemailer from 'nodemailer';

const salt = 10;

const app = express();
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ['POST', 'GET'],
    credentials: true
}));
app.use(cookieParser());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "listelligent"
});

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({ Error: "You are not authenticated" });
    }
    else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if (err) {
                return res.json({ Error: "Token is not correct" });
            }
            else {
                req.name = decoded.name;
                req.role = decoded.role;
                next();
            }
        })
    }
}

app.get('/', verifyUser, (req, res) => {
    return res.json({ Status: "Success", name: req.name, role: req.role });
})

app.post('/signup', (req, res) => {
    const sql = "INSERT INTO admin_register (`name`, `email`, `password`) VALUES (?)";
    bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
        if (err) return res.json({ Error: "Error for hassing password" });
        const values = [
            req.body.name,
            req.body.email,
            hash
        ]

        db.query(sql, [values], (err, result) => {
            if (err) return res.json({ Error: "Inserting data Error in server" });
            return res.json({ Status: "Success" });
        })
    })
})


app.post('/login', (req, res) => {
    const sql = "SELECT * FROM users WHERE email = ?";

    db.query(sql, [req.body.email], (err, data) => {
        if (err) return res.json({ Error: "Login error in server" });

        if (data.length > 0) {
            bcrypt.compare(req.body.password.toString(), data[0].password, (err, response) => {
                if (err) return res.json({ Error: "Password Compare Error" });

                if (response) {
                    const name = data[0].name;
                    const role = data[0].role;

                    const token = jwt.sign({ name, role }, "jwt-secret-key", { expiresIn: '1d' });
                    res.cookie('token', token);

                    return res.json({ Status: "Success", Role: role });
                } else {
                    return res.json({ Error: "Password Not Matched!" });
                }
            });
        } else {
            return res.json({ Error: "Email not exist!" });
        }
    });
});


app.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({ Status: "Success" });
})


// Agent-SignUp
app.post('/agentsignupform', (req, res) => {
    const sql = "INSERT INTO users (`name`, `license`, `license_date`, `mls_id`, `brokerage`, `office_address`, `building`, `zip_code`, `hp_address`, `hp_zip_code`, `hp_sales_price`, `realtor_profile`, `email`, `role`, `status`, `password`) VALUES (?)";

    const values = [
        req.body.name,
        req.body.license,
        req.body.license_date,
        req.body.mls_id,
        req.body.brokerage,
        req.body.office_address,
        req.body.building,
        req.body.zip_code,
        req.body.hp_address,
        req.body.hp_zip_code,
        req.body.hp_sales_price,
        req.body.realtor_profile,
        req.body.email,
        req.body.role,
        req.body.status,
        req.body.password,
    ]

    db.query(sql, [values], (err, result) => {
        if (err) return res.json({ Error: "Inserting data Error in server" });
        return res.json({ Status: "Success" });
    })
})


app.get('/agentsview', (req, res) => {
    const role = 1;

    const sql = "SELECT * FROM users WHERE role = ?";
    
    db.query(sql, [role], (err, result) => {
        if (err) return res.json({ Message: "Error inside agents register server" });
        return res.json(result);
    });
});



// Node mailler
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "vishal.besticoder@gmail.com",
        pass: "cbtd scrk ihea bgaq",
    },
});


app.post('/approveAgent', (req, res) => {

    const id = req.body.id;
    const email = req.body.email;
    const status = 1;

    // return res.json({ id: id, email: email });

    let genrate_pass = Math.random().toString(36).substring(2, 10);

    var mailOptions = {
        from: "vishal.besticoder@gmail.com",
        to: email,
        subject: "Your Account",
        text: `User Name:- ${email} \n
        Password:- ${genrate_pass}`
    }

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            return res.status(500).json({ Message: "Error sending email" });
        } else {

            bcrypt.hash(genrate_pass.toString(), salt, (err, agent_pass) => {
                if (err) return res.json({ Error: "Error for hashing password" });

                const sql = "UPDATE users SET status = ?, password = ? WHERE id = ?";

                const values = [
                    status,
                    agent_pass,
                    id
                ];

                db.query(sql, values, (err, result) => {
                    if (err) {
                        console.error(err);
                        return res.json({ Error: "Updating data error in server" });
                    }
                    return res.json({ Status: "Success" });
                });
            });

            return res.json({ Message: "Email Sent Successfully" });
        }
    });
});


// ZipCode Submit
app.post('/submitzip', (req, res) => {
    const sql = "INSERT INTO zip_codes (`zip_code`, `prize`, `status`) VALUES (?)";

    const values = [
        req.body.zip,
        req.body.prize,
        req.body.status,
    ]

    db.query(sql, [values], (err, result) => {
        if (err) return res.json({ Error: "Inserting data Error in server" });
        return res.json({ Status: "Success" });
    })
})

// Zip-Code View
app.get('/viewzip', (req, res) => {
    const sql = "SELECT * FROM zip_codes";
    
    db.query(sql, (err, result) => {
        if (err) return res.json({ Message: "Error inside agents register server" });
        return res.json(result);
    });
});


app.listen(3001, () => {
    console.log("server was run");
})
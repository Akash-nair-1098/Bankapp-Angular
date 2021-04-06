const express = require('express');
const dataService = require('./services/data.service');
const app = express();
const session = require('express-session');

app.use(express.json());//for json conversion

app.use(session({//for sesssion creation
    secret: 'randomsecurestring',
    resave: false,
    saveUninitialized:false
}))

const logMiddleWare = (req, res, next) => {//for middleware
    console.log(req.body);//giving common operations inthis page to middleware
    next()
}
app.use(logMiddleWare);//using the above middleware


//authentication of logged in or not middleware
const authMiddleWare = (req, res, next) => {
    if (!req.session.currentUser) {
        return res.json({//converting to json
            status: false,
            statusCode: 401,
            message: "Please Login!",
        })
    }
    else {
        next();
    }
}

app.post('/register', (req, res) => {
 
    const result = dataService.register(req.body.accno,req.body.username,req.body.password);
    console.log(res.status(result.statusCode).json(result));
})


app.post('/login',(req, res) => {
   
    const result = dataService.login(req,req.body.accno,req.body.password);
    console.log(res.json(result));
})

app.post('/deposit',authMiddleWare, (req, res) => {
    
    const result = dataService.deposit(req.body.accno,req.body.password,req.body.amount);
    console.log(res.status(result.statusCode).json(result));
})

app.post('/withdraw',authMiddleWare,(req, res) => {
    
    const result = dataService.withdraw(req.body.accno, req.body.password, req.body.amount);
    console.log(res.status(result.statusCode).json(result));
})

app.listen(3000, () => {
    console.log("server started at port 3000");
})
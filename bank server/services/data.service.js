let accountDetails = {
    109800013522: { balance: 1000, username: "Raju", password: "raju123" },
    109800023522: { balance: 8876, username: "Ramu", password: "ramu123" },
    109800033522: { balance: 1100, username: "Jaggu", password: "jaggu123" },
}
let currentUser;
const register = (accno, username, password)=>{
    if (accno in (accountDetails)) {
     
        return {
            status: false,
            statusCode: 243,
            message: "account already exist.Please Login!"
        }
 
    }
    accountDetails[accno] = {
        balance: 0,
        username,
        password
    }
    console.log(accountDetails);
    
    return {
        status: true,
        statusCode:243,
        message: "Registration Successful"
    }
}


const login=(req,accno, password)=>{
    if (accno in accountDetails) {
        if (password === accountDetails[accno].password) {
           req.session.currentUser = accountDetails[accno]
            //this.saveDetails();
            return {
                status: true,
                message:"login sucess"
            }
        }
        else {
            return {
                status: false,
                message: "Wrong Password"
            }
        }
    }
    else {
        return {
            status: false,
            message: "login failed"
        }
    }
}


const deposit = (accno, password, amount) => {
   
    let amt = parseInt(amount);
    if (accno in accountDetails) {
        if (password === accountDetails[accno].password) {
            //this.saveDetails();
            accountDetails[accno].balance += amt;
            return {
                status: true,
                statusCode:200,
                message: "Amount Credited!",
                balance: accountDetails[accno].balance
            }
        }
        else {
            return {
                status: false,
                statusCode: 500,
                message: "Wrong Password",
                
            }
        }
    }
    else {
        return {
            status: false,
            statusCode: 500,
            message: "invalid Account Number",

        }
    }
}

const withdraw = (accno, password, amount) => {
    if (!req.session.currentUser) {
        return {
            status: false,
            statusCode: 401,
            message: "Please Login!",
        }
    }
    let amt = parseInt(amount);
    if (accno in accountDetails) {
        if (password ===accountDetails[accno].password) {
            if (accountDetails[accno].balance > amt) {
               // this.saveDetails();
                accountDetails[accno].balance -= amt;
                return {
                    status: true,
                    statusCode: 200,
                    message: "Amount Debited!",
                    balance: accountDetails[accno].balance
                }
            }
            else {
                return {
                    status: false,
                    statusCode: 400,
                    message: "Insufficient Balance!",
                    balance: accountDetails[accno].balance
                }
            }
        }
        else {
            return {
                status: false,
                statusCode: 400,
                message: "Wrong Password!",
                balance: accountDetails[accno].balance
            }
        }
    }
    else {
        return {
            status: false,
            statusCode: 400,
            message: "Invalid Account Number!",
            balance: accountDetails[accno].balance
        }
    }
}

module.exports = {
    register,
    login,deposit,withdraw
}
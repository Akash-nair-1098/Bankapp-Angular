import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatasService {
  accountDetails: any = {
    109800013522: { balance: 1000, username: "Raju", password: "raju123" },
    109800023522: { balance: 8876, username: "Ramu", password: "ramu123" },
    109800033522: { balance: 1100, username: "Jaggu", password: "jaggu123" },
  };
  currentUser: any;


  constructor() {
    this.getDetails();
   }
  saveDetails() {
    localStorage.setItem("accountDetails", JSON.stringify(this.accountDetails));
    if(this.currentUser){
    localStorage.setItem("currentuser", JSON.stringify(this.currentUser));
    }
  }
  getDetails() {
    if (localStorage.getItem("accountDetails")) {
      this.accountDetails = JSON.parse(localStorage.getItem("accountDetails") || '');//give the key here ie,first arg in set item
    }
      if (localStorage.getItem("accountDetails")) {
        this.currentUser = JSON.parse(localStorage.getItem("currentUser") || '');
      }
    
  }
  register(name: any, pwd: any, acno: any) {
    let accdetails = this.accountDetails;
    if (acno in (this.accountDetails)) {
      alert("account already exist.Please Login!");
      return false;
    }
    this.accountDetails[acno] = {
      balance: 0,
      name,
      pwd
    }
    console.log(this.accountDetails);
    this.saveDetails();
    alert("Registration Successful")
    return true;
  }

  
  login(accno: any, pswd: any) {
    let accdetails = this.accountDetails;
    if (accno in (this.accountDetails)) {
      if (pswd === accdetails[accno].password) {
        this.currentUser = accdetails[accno].username;
        this.saveDetails();
        return 0;
      }
      else {
        return 1;
      }
    }
    else {
      return -1;
    }
  }

  deposit(accno: any, pswd: any, amount: any) {//to get value from the userhome function
    let amt = parseInt(amount);
    if (accno in this.accountDetails) {
      if (pswd === this.accountDetails[accno].password) {
        this.saveDetails();
        this.accountDetails[accno].balance += amt;
        alert(`amount of rs.${amt} credited to Account.New Balance is ${this.accountDetails[accno].balance}`)
      }
      else {
        alert("Wrong Password")
      }
    }
    else {
      alert("invalid Account number!")
    }
  }

  withdraw(accno: any, pswd: any, amount: any) {//to get value from the userhome function
    let amt = parseInt(amount);
    if (accno in this.accountDetails) {
      if (pswd === this.accountDetails[accno].password) {
        if (this.accountDetails[accno].balance > amt) {
          this.saveDetails();
          this.accountDetails[accno].balance -= amt;
          alert(`amount of rs.${amt} debited from Account.New Balance is ${this.accountDetails[accno].balance}`)
        }
        else {
          alert("insufficient Balance!")
        }
      }
      else {
          alert("Wrong Password")
        }
      }
      else {
        alert("invalid Account number!")
      }
    }
  }




import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatasService } from '../services/datas.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login = this.fb.group({
    accno: ['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd: ['',[Validators.required]]
  });
  constructor(private fb:FormBuilder,private router:Router,private dataservice:DatasService) { }

  ngOnInit(): void {
  }


  login1() {
    if (this.login.valid) {
    
      let result = this.dataservice.login(this.login.value.accno, this.login.value.pswd)
      if (result == 0) {
        this.router.navigateByUrl("/userhome");
      }
      else if (result == 1) {
        alert("Wrong Password!")
      }
      else {
        alert("Wrong Account Number!")
      }
    }
  }

}

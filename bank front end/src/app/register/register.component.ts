import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatasService } from '../services/datas.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  acno = "";
  register = this.fb.group({
    name: ['', [Validators.required]],
    pwd: ['', [Validators.required]],
    cpwd: ['', [Validators.required]],
    mail: ['', [Validators.required]],
    accno: ['', [Validators.required, Validators.pattern('[0-9]*')]]
  })

  constructor(private fb: FormBuilder,private ds:DatasService,private router:Router) { }

  ngOnInit(): void {
  }

  register1() {
    if (this.register.valid) {
      if ((this.register.value.pwd) === (this.register.value.cpwd)) {
        this.acno = "1098" + this.register.value.accno + "3522";
        let res = this.ds.register(this.register.value.name, this.register.value.pwd, this.acno);
        if (res == false) {
          this.router.navigateByUrl("");
        }
        else {
          this.router.navigateByUrl("");
        }
      }
      else {
        alert("passwords doesnt match!")
      }
    }
      alert("invalid Entry")
  }
}

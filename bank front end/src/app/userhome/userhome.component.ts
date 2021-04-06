import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Data, Router } from '@angular/router';
import { DatasService } from '../services/datas.service';

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css']
})
export class UserhomeComponent implements OnInit {
  deposit = this.fb.group({//reactive form
    accno: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    pswd: ['',[Validators.required]],
    amount: ['', [Validators.required, Validators.pattern('[0-9]*')]]
  })

  withdrawal = this.fb.group({
    accno: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    pswd: ['', [Validators.required]],
    amount: ['', [Validators.required, Validators.pattern('[0-9]*')]]
  })

  constructor(private router:Router,private fb:FormBuilder,public dataservice:DatasService) { }//inject rective form,router,dataservice etc.

  ngOnInit(): void {
  }
  signout() {
    this.router.navigateByUrl("");
  }
  deposit1() {
    if (this.deposit.valid) {
      this.dataservice.deposit(this.deposit.value.accno,this.deposit.value.pswd,this.deposit.value.amount)//pass value to services
    }
    else {
      alert("invalid form")
    }
    
  }
  withdraw() {
    if (this.withdrawal.valid) {
      this.dataservice.withdraw(this.withdrawal.value.accno, this.withdrawal.value.pswd, this.withdrawal.value.amount);//pass value to services
    }
    else {
      alert("invalid form")
    }

  }
}

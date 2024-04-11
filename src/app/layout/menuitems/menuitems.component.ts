import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menuitems',
  templateUrl: './menuitems.component.html',
  styleUrls: ['./menuitems.component.scss']
})
export class MenuitemsComponent implements OnInit {

  ngOnInit(): void {
    
  }

  constructor(private router:Router){
   
  }
  navigateTopage(route:any){
    this.router.navigate([`/${route}`])

  }

  onEmpcardAccess(){
    this.router.navigate(['/dashboard/empcardaccess']);
  }

  onViewReports(){
    this.router.navigate(['/dashboard/reportslist']);
  }
  
  onBpass(name:any){
    this.router.navigate(['/dashboard/bpass/accounts-list']);
  }
}

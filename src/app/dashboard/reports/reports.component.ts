import { Component, OnInit, ViewChild } from '@angular/core';
import { MatOption } from '@angular/material/core';
import { ReportsService } from 'src/app/services/reports.service';


export interface LanesCheckBox {
  name: string;
  completed: boolean;
  subtasks?: LanesCheckBox[];
}

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  constructor(
    private _reportsService: ReportsService,
  ) {}

  ngOnInit(): void {
    
  }
  startDate :any = new Date();
  endDate :any = new Date();

  lanesChk: LanesCheckBox = {
    name: 'Lanes',
    completed: false,
    subtasks: [
      {name: 'Lane 01', completed: false},
      {name: 'Lane 02', completed: false},
      {name: 'Lane 03', completed: false},
    ],
  };

  allComplete: boolean = false;

  updateAllComplete() {
    this.allComplete = this.lanesChk.subtasks != null && this.lanesChk.subtasks.every(t => t.completed);
  }

  someComplete(): boolean {
    if (this.lanesChk.subtasks == null) {
      return false;
    }
    return this.lanesChk.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.lanesChk.subtasks == null) {
      return;
    }
    this.lanesChk.subtasks.forEach(t => (t.completed = completed));
  }

  plazaslist: string[] = [
    'GIBA Plaza',
    'LELA Plaza',
  ];

  lanesList: string[] = [
    'Lanes 01',
    'Lanes 02',
    'Lanes 03',
  ];
  // 
  transactionType: string[] = [
    'Violation Transaction',
    'Cash Transaction',
    'Lane Open',
    'Lane Close',
    'Turnaround Transaction',
    'Emergency Transaction',
    'LC Cold Start',
    'Non-Rev Auto',
    'Warm Start',
    'Heart Beat',
    'Violation Transaction2',
    'Cash Transaction2',
    'Lane Open3',
    'Lane Close3',
    'Turnaround Transaction3',
    'Emergency Transaction3',
    'LC Cold Start3',
    'Non-Rev Auto3',
    'Warm Start3',
    'Heart Beat3',
  ];

  employeeList:string[] =[
    '111-Employee',
    '222-Employee',
    '333-Employee',
    '444-Employee',
    '555-Employee',
    '666-Employee',
    '777-Employee',
    '888-Employee',
    '999-Employee',
    '123-Employee',
    '234-Employee',
    '567-Employee',
    '789-Employee',
    '666-Employee',
  ];

  selectedTransaction:any =['Lane Open', 'Lane Close','Turnaround Transaction','Emergency Transaction','LC Cold Start','Non-Rev Auto','Warm Start',]
  @ViewChild('allTransactionSelected') private allTransactionSelected: any;


  toggleTransaction() {
    if (this.allTransactionSelected.selected) {
      this.selectedTransaction =[...this.transactionType.map(item => item), 0];
    } else {
      this.selectedTransaction= [];
    }
  }

  selectedEmployees:any =['111-Employee','222-Employee','333-Employee','444-Employee','555-Employee','666-Employee',]
  @ViewChild('allEmployeesSelected') private allEmployeesSelected: any;
  toggleEmployees() {
    if (this.allEmployeesSelected.selected) {
      this.selectedEmployees =[...this.employeeList.map(item => item), 0];
    } else {
      this.selectedEmployees =[];
    }
  }
  selectedLanes:any =[];
  @ViewChild('allLanesSelected') private allLanesSelected: any;
  toggleLanes() {
    if (this.allLanesSelected.selected) {
      this.selectedLanes =[...this.lanesList.map(item => item), 0];
    } else {
      this.selectedLanes =[];
    }
  }
}

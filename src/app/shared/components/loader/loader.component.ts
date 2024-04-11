import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  color: any = 'primary';
  mode: any = "indeterminate";
  value: any = 50;

  isLoading: Subject<boolean> = this.loaderService.isLoading;

  constructor(private loaderService: LoaderService) {

  }

  imagePath!: string;

  ngOnInit(): void {
    this.imagePath = './assets/images/etrasit.PNG';
  }

}

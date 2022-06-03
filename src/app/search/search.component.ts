import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Data, ComService } from '../com/com.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [ComService],
})
export class SearchComponent implements OnInit {
  control = new FormControl('');

  error: any;
  headers: string[] = [];
  result: Data[] = [];
  array: String[] = [];

  constructor(private comService: ComService) {}
  ngOnInit(): void {
    this.showData();
  }

  clear() {
    this.error = undefined;
    this.headers = [];
    this.array = [];
  }

  openHref(){
    window.location.href = "https://www.google.com/search?q=" + this.controlValue;
  }

  onEnter($event: Event){
    $event.preventDefault();
    this.openHref();
  }

  onClick(event: MouseEvent) {
    this.openHref();

  }
  setArray(result: Data[]) {
    let object = Object.values(result)
    let temp =result.map(a=>a.dataUrl)

    console.log(temp)
    return temp
  }

  get controlValue(){
    return this.control.value;
  }

  showData() {
    this.comService
      .getData()
      .subscribe(
        (temp: Data[]) => (
          console.log(temp),
           //this.array=this.setArray(temp),
            (this.result = temp)
        )
      );
  }
}

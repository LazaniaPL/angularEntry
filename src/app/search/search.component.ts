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
  result: Data[] = [];
  filteredResult: Data[] = [];

  constructor(private comService: ComService) {}
  ngOnInit(): void {
    this.showData();
    this.control.valueChanges.subscribe((value) => {

      this.filteredResult = this.result.filter((row) => {

        return row.dataUrl.includes(value.toLowerCase());
      });
    });
  }

  // clear() {
  //   this.error = undefined;
  //   this.headers = [];
  //   this.array = [];
  // }

  openHref() {
    window.location.href =
      'https://www.google.com/search?q=' + this.controlValue;
  }

  onEnter($event: Event) {
    console.log($event);
    $event.preventDefault();
    this.openHref();
  }

  onClick() {
    this.openHref();
  }


  get controlValue() {
    return this.control.value;
  }

  showData() {
    this.comService.getData().subscribe(
      (temp: Data[]) => (
        console.log(temp),
        //this.array=this.setArray(temp),
        (this.result = temp)
      )
    );
  }
}

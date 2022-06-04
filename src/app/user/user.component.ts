import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @Input () lenguajeName: string | undefined;
  @Output() lenguajeEvent = new EventEmitter<string>();




  constructor() { }

  ngOnInit(): void {
  }

  addNewArtist(val: string) {
    this.lenguajeEvent.emit(val);
  }

}

import { Component, OnInit , ViewChild} from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  @ViewChild('textos', {static: true}) textos: any;
  constructor() { }

  ngOnInit(): void {
    // alert(this.textos.nativeElement.textContent);
    
  }

}

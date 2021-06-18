import {} from 'googlemaps';
import { ViewChild,Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  //@ViewChild('map') mapElement: any;
  @ViewChild('map', {static: true}) mapElement: ElementRef;
  map: google.maps.Map;
  constructor() { }

  ngOnInit(): void {
    const mapProperties = {
         center: new google.maps.LatLng(10.792814, 106.640926),
         zoom:20 ,
         mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement,mapProperties);
 }

}

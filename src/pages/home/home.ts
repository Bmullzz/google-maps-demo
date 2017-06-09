import { Component, ViewChild, ElementRef } from '@angular/core';

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage{

    @ViewChild('map') mapElement: ElementRef;
    @ViewChild('directionsPanel') directionPanel: ElementRef;
    map: any;

    constructor() {
    }

    ionViewDidLoad() {
        this.loadMap();
        this.startNavigation();
     }

    loadMap() {
        navigator.geolocation.getCurrentPosition(position => {

            let latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

            const mapOptions = {
                center: latlng,
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                streetViewControl: false
            };

            this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

            let marker = new google.maps.Marker({})

        });
    }

    startNavigation() {

        navigator.geolocation.getCurrentPosition(position => {

        const directionsService = new google.maps.DirectionsService;
        const directionsDisplay = new google.maps.DirectionsRenderer;

        directionsDisplay.setMap(this.map);
        directionsDisplay.setPanel(this.directionPanel.nativeElement);

        directionsService.route({
            origin: {lat: position.coords.latitude, lng: position.coords.longitude},
            destination: {lat: 39.788278, lng: -75.545414},
            travelMode: google.maps.TravelMode['DRIVING']
        }, (res, status) => {
            if (status === google.maps.DirectionsStatus.OK){
                directionsDisplay.setDirections(res);
            }else {
                console.log("Error Loading Directions");
            }
        });

        });
    }

}

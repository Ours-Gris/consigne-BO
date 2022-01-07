import {AfterViewInit, Component} from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
// import 'lrm-mapbox';
import {MarkerService} from '../services/marker.service';
import {StatistiqueService} from '../services/statistique.service';

// const iconRetinaUrl = 'assets/marker-icon-2x.png';
// const iconUrl = 'assets/marker-icon.png';
// const shadowUrl = 'assets/marker-shadow.png';
// const iconDefault = L.icon({
//     iconRetinaUrl,
//     iconUrl,
//     shadowUrl,
//     iconSize: [25, 41],
//     iconAnchor: [12, 41],
//     popupAnchor: [1, -34],
//     tooltipAnchor: [16, -28],
//     shadowSize: [41, 41]
// });
// L.Marker.prototype.options.icon = iconDefault;

@Component({
    selector: 'app-view',
    templateUrl: './view.component.html',
    styleUrls: ['./view.component.css']
})
export class ViewComponent implements AfterViewInit {
    private map!: L.Map;
    private isochrones: any;
    //private: fonds;
    //private: data;

    constructor(
        private markerService: MarkerService,
        private statistiqueService: StatistiqueService
    ) {
    }

    ngAfterViewInit(): void {
        this.initMap();
        //this.markerService.makeCapitalMarkers(this.map);
        this.markerService.makeCapitalCircleMarkers(this.map);
        this.statistiqueService.getIsochroneStats().subscribe(AA_MINS => {
            this.isochrones = AA_MINS;
            this.initIsochronesLayer();
        });
    }

    private initMap(): void {
        this.map = L.map('map', {
            center: [43.765, 3.641],
            zoom: 9
            //layers:[fondsGris, fonds]
        });

        const fonds = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 18,
            minZoom: 3,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            className: "OSM"
        });
        fonds.addTo(this.map);
        /*
            var fondsGris = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              maxZoom: 18,
              minZoom: 3,
              attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
              className:"OSM"
            });
            fondsGris.addTo(this.map);
            */
        //var control = new L.Control.Layers().addTo(this.map);

        const options = {profile: "mapbox/driving", language: 'fr'/*, polylinePrecision: 6*/};
        //const routing =
        const control = L.Routing.control({
            router: L.Routing.mapbox('pk.eyJ1Ijoic2FuZ2lzIiwiYSI6ImNrdWpudnk3ajJ6eGEzMW1vZHptcXBuemgifQ.v31-Gho8zmQvMad4y09ORg', options),
            //autoRoute : false,
            waypoints: [
                L.latLng(43.64765611322369, 4.0765450118810529),
                // laverie : 43.64765611322369, 4.0765450118810529
                L.latLng(43.64807, 3.93976),
                // biocoop le papillon au Crès  43.64807, 3.93976
                L.latLng(43.651991002091897, 3.5254934025436389),
                // Drive Green Sisters 43.651991002091897, 3.5254934025436389
                L.latLng(43.459063, 3.425139)
                // maison Aubert limonadier  43.459063, 3.425139
            ],
            //geocoder: L.Control.Geocoder.nominatim(), à faire -----------------------------------
            fitSelectedRoutes: false,
            routeWhileDragging: false,
            collapsible: true
        }).addTo(this.map);

        // trouver comment afficher un bouton ??? ------------------------------------------
        let that = this
        this.map.on('click', function (event: any) {
            const container = L.DomUtil.create('div'),
                startBtn = that.createButton('Start from this location', container),
                destBtn = that.createButton('Go to this location', container);

            L.popup()
                .setContent(container)
                .setLatLng(event.latlng)
                .openOn(that.map);

            L.DomEvent.on(startBtn, 'click', function () {
                control.spliceWaypoints(0, 1, event.latlng);
                that.map.closePopup();
            });
            L.DomEvent.on(destBtn, 'click', function () {
                control.spliceWaypoints(control.getWaypoints().length - 1, 1, event.latlng);
                that.map.closePopup();
            });
        });
    }

    createButton(label: string, container: any) {
        const btn = L.DomUtil.create('button', '', container);
        btn.setAttribute('type', 'button');
        btn.innerHTML = label;
        return btn;
    }

    private initIsochronesLayer() {
        const isochroneLayer = L.geoJSON(this.isochrones, {
            /*
              style: function(feature) {
                switch (feature.properties.AA_MINS) {
                    case 15: return {color: "#ff0000"};
                    case 30:   return {color: "#00ff00"};
                    case 45:   return {color: "#0000ff"};
                    case 60:   return {color: "#00f0f0"};
                }
            }*/
            style: () => ({
                weight: 3,
                opacity: 0.5,
                color: '#008f68',
                fillOpacity: 0.8,
                fillColor: '#6DB65B'
            })
        });
        this.map.addLayer(isochroneLayer);
        isochroneLayer.bringToBack();
    }
}

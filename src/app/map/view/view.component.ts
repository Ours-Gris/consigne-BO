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
    }

    private initIsochronesLayer() {
        const isochroneLayer = L.geoJSON(this.isochrones, {

            style: (feature) => {
                if (feature) {
                    switch (feature.properties.AA_MINS) {
                        case 15:
                            return {color: "#ff0000"};
                        case 30:
                            return {color: "#00ff00"};
                        case 45:
                            return {color: "#0000ff"};
                        case 60:
                        default:
                            return {color: "#00f0f0"};
                    }
                } else {
                    return {
                        weight: 3,
                        opacity: 0.5,
                        color: '#008f68',
                        fillOpacity: 0.8,
                        fillColor: '#6DB65B'
                    }
                }

            },
            // style: () => ({
            //     weight: 3,
            //     opacity: 0.5,
            //     color: '#008f68',
            //     fillOpacity: 0.8,
            //     fillColor: '#6DB65B'
            // })
        });
        this.map.addLayer(isochroneLayer);
        isochroneLayer.bringToBack();
    }
}

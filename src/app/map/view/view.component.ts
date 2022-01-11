import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
// import 'lrm-mapbox';
import {MarkerService} from '../services/marker.service';
import {StatistiqueService} from '../services/statistique.service';
import {UsersDataSource} from "../../user/data/users-data-source";
import {UserService} from "../../user/services/user.service";
import {User} from "../../user/data/User";
import {NominatimService} from "../../user/services/nominatim.service";

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
// L.Marker.prototype.options.icon = iconDefault; ok

@Component({
    selector: 'app-view',
    templateUrl: './view.component.html',
    styleUrls: ['./view.component.css']
})
export class ViewComponent implements AfterViewInit {
    users: User[] = [];
    private map!: L.Map;
    private isochrones: any;
    //private: fonds;
    //private: data;

    constructor(
        private markerService: MarkerService,
        private userService: UserService,
        private statistiqueService: StatistiqueService
    ) {
    }

    getUsers() {
        this.userService.getAllPublicUser().subscribe(
            (users) => {
                this.users = users;
                this.markerService.makeCapitalMarkers(this.map, this.users);
            },
            error => {
                console.error(error)
            }
        )
    }

    ngAfterViewInit(): void {
        this.initMap();
        this.getUsers()
        // this.markerService.makeCapitalCircleMarkers(this.map);
        this.statistiqueService.getIsochroneStats().subscribe(AA_MINS => {
            this.isochrones = AA_MINS;
            this.initIsochronesLayer();
        })
    }

    private initMap(): void {

        var mapboxAttribution = 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
        var mapboxUrl = 'https://api.mapbox.com/styles/v1/sangis/cjz8itspx0b771cqfmhddl6sx/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoic2FuZ2lzIiwiYSI6Ii1YT3B3encifQ.DuJG8BEzs7jc79vHmB4ytg';
        var mapboxStyle = 'mapbox://styles/sangis/cjz8itspx0b771cqfmhddl6sx';

        var fonds_noir = L.tileLayer(mapboxUrl, {id: 'mapbox/Moonlight', tileSize: 512, zoomOffset: -1, attribution: mapboxAttribution});
        //fonds_noir.addTo(this.map);
        //

       

        var streets = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 18,
            minZoom: 3,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            className: "OSM"
        });

        var acteurs = L.layerGroup();

        var producers =  L.marker([43.765, 3.641]).bindPopup('Ceci est un brasseur !!!').addTo(acteurs);
        //var producers =  L.marker([this.user.lon, 3.641]).bindPopup('Ceci est un brasseur !!!').addTo(acteurs);

        this.map = L.map('map', {
            center: [43.765, 3.641],
            zoom: 9,
            layers: [fonds_noir, acteurs]
        });

        var baseLayers = {
            'Moonlight': fonds_noir,
            'Streets': streets
        };

        
        var overlays = {
            'Acteurs': acteurs
        };

        var layerControl = L.control.layers(baseLayers, overlays).addTo(this.map);
        //fonds.addTo(this.map);
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

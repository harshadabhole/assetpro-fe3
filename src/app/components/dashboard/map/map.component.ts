import { environment } from '../../../../environments/environment';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { SiteService } from 'src/app/shared/services/site.service';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  loading:boolean=false;
  
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat = 37.75;
  lng = -122.41;

  

  constructor() { }

  ngOnInit() {
    this.loading=true;
    const geojson = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [-77.032, 38.913]
          },
          properties: {
            title: 'Mapbox',
            description: 'Washington, D.C.',
            image : '../../../../assets/images/car.jpg'
          }
        },
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [-122.414, 37.776]
          },
          properties: {
            title: 'Mapbox',
            description: 'San Francisco, California',
            image : '../../../../assets/images/car.jpg'
          }
        }
      ]
    };
    
    Object.getOwnPropertyDescriptor(mapboxgl, "accessToken").set(environment.mapbox.accessToken);
    //   this.map = new mapboxgl.Map({
    //     container: 'map',
    //     style: this.style,
    //     zoom: 3,
    //     center: [this.lng, this.lat]
    // });
    // // Add map controls
    // for (const feature of geojson.features) {
    //   // create a HTML element for each feature
    //   const el = document.createElement('div');
    //   el.className = 'marker';
    //   console.log('ellll', el)

    //   // make a marker for each feature and add it to the map
    //   new mapboxgl.Marker(el)
    //     .setLngLat(feature.geometry.coordinates)
    //     .setPopup(
    //       new mapboxgl.Popup({ offset: 25 }) // add popups
    //         .setHTML(
    //           `<h3>${feature.properties.title}</h3><p>${feature.properties.description}</p>`
    //         )
    //     )
    //     .addTo(this.map);
    // }

    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-122.436, 37.773],
      zoom: 12
    });

    map.on('load', () => {
      for (const feature of geojson.features) {
      // Add a marker at the center of the map
      new mapboxgl.Marker()
        .setLngLat(feature.geometry.coordinates)
        .addTo(map);

      // Define a custom marker using an HTML element
      const el = document.createElement('div');
      el.className = 'marker';
      // el.style.backgroundImage = 'url(https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png)';
      el.style.width = '50px';
      el.style.height = '50px';

      // Add a custom marker at the Ferry Building in San Francisco
      new mapboxgl.Marker(el)
        .setLngLat(feature.geometry.coordinates)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }) // add popups
            .setHTML(
              `<div style="display:flex; align-items:center;">
              <img src="${feature.properties.image}" style=" width:50px; margin-right:10px;">
              <div>
                <h3>${feature.properties.title}</h3>
                <p>${feature.properties.description}</p>
              </div>
            </div>`
            )
        )
        .addTo(map);
      }
    });
    
    // this.map.addControl(new mapboxgl.NavigationControl());
    this.loading=false;
  }
}
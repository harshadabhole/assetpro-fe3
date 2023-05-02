import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet.markercluster/dist/leaflet.markercluster.js';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';

import 'leaflet.markercluster';
import { MarkerClusterGroup } from 'leaflet.markercluster/dist/leaflet.markercluster.js';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  private map: L.Map;
  private markerClusterGroup: MarkerClusterGroup;

  ngOnInit() {
    this.map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    this.markerClusterGroup = L.markerClusterGroup();
    this.addMarkers();
    

  }
  

  private addMarkers() {
    const customIcon = L.icon({
      iconUrl: '../../../../assets/images/mapbox-icon.png',
      iconSize: [38, 38],
      iconAnchor: [22, 94],
      popupAnchor: [-3, -76],
      shadowUrl: '../../../../assets/images/mapbox-icon.png',
      shadowSize: [38, 38],
      shadowAnchor: [22, 94]
    });

    const icon1 = L.divIcon({
      className: 'custom-icon',
      html: '<div style="display:inline-flex"><div class="bg-marker icon-1"  ><img src="../../../../assets/images/green.png" class="img-style"></img></div><div class="bg-marker icon-2" ><img src="../../../../assets/images/fmd_good_black_24dp.png" class="img-style"></img></div></div>'
    });
    
    const icon2 = L.divIcon({
      className: 'custom-icon-2',
      html: '<div style="display:inline-flex"><div class="bg-marker icon-1" ><img src="../../../../assets/images/red.png" class="img-style"></img></div><div class="bg-marker icon-2" ><img src="../../../../assets/images/green.png" class="img-style"></img></div></div>'
    });
    // const popup = [L.popup()
    //   .setLatLng([51.505, -0.09])
    //   .setContent('Hello, world!')
    //   .openOn(this.map),
    //   L.popup()
    //   .setLatLng([51.505, -0.09])
    //   .setContent('Hello, Harshada!')
    //   .openOn(this.map)];
  
    const markers = [
      L.marker([51.5, -0.09], {icon: icon1}).on('click', function(event) {
        const clickedElement = event.originalEvent.target as HTMLElement;
        console.log('event 333',clickedElement.classList)
        console.log('event',clickedElement.classList.contains("icon-1"))
        if (clickedElement.classList.contains("icon-1")) {
          // Handle click on icon1
          L.popup().setContent(`<div style="display:flex; align-items:center;">
          <img src="${"../../../../assets/images/car.jpg"}" style=" width:50px; margin-right:10px;">
          <div>
            <h3>Marker title 1</h3>
            <p>Marker Description</p>
          </div>
        </div>`);
        } else if (clickedElement.classList.contains("icon-2")) {
          L.popup().setContent(`<div style="display:flex; align-items:center;">
          <img src="${"../../../../assets/images/car.jpg"}" style=" width:50px; margin-right:10px;">
          <div>
            <h3>Marker title 2</h3>
            <p>Marker Description</p>
          </div>
        </div>`);
          // Handle click on icon2
        }
      }),
      L.marker([51.49, -0.1], {icon: icon2}).on('click', function(event) {
        console.log('event',event.originalEvent.target)
        const clickedElement = event.originalEvent.target as HTMLElement;
        if (clickedElement.classList.contains("icon-1")) {
          // Handle click on icon1
        } else if (clickedElement.classList.contains("icon-2")) {
          // Handle click on icon2
        }
      }),
      L.marker([51.51, -0.07], {icon: icon1}),
      L.marker([51.5, -0.05], {icon: icon2}),
      L.marker([51.49, -0.06], {icon: icon1})
    ];
    markers.forEach(marker => {
      
     
//       const icon1 = marker.getElement().querySelector('.bg-marker.icon-1');
// icon1.addEventListener('click', () => {
//   console.log('click event 1')
//   // const popup = L.popup().setContent('Popup for icon 1');
//   marker.bindPopup(`<div style="display:flex; align-items:center;">
//       <img src="${"../../../../assets/images/car.jpg"}" style=" width:50px; margin-right:10px;">
//       <div>
//         <h3>Marker popup title 1</h3>
//         <p>Marker Description</p>
//       </div>
//     </div>`)
// });

// const icon2 = marker.getElement().querySelector('.bg-marker.icon-2');
// icon2.addEventListener('click', () => {
//   console.log('click event 2')
//   // const popup = L.popup().setContent('Popup for icon 2');
//   marker.bindPopup(`<div style="display:flex; align-items:center;">
//       <img src="${"../../../../assets/images/car.jpg"}" style=" width:50px; margin-right:10px;">
//       <div>
//         <h3>Marker popup title 2</h3>
//         <p>Marker Description</p>
//       </div>
//     </div>`)
// });
      marker.bindPopup(`<div style="display:flex; align-items:center;">
      <img src="${"../../../../assets/images/car.jpg"}" style=" width:50px; margin-right:10px;">
      <div>
        <h3>Marker title</h3>
        <p>Marker Description</p>
      </div>
    </div>`);
    });
    this.markerClusterGroup.addLayers(markers);
    this.map.addLayer(this.markerClusterGroup);
    
    const icon11 = document.querySelector('.bg-marker.icon-1');
    console.log('icon11',icon11)
    icon11.addEventListener('click', () => {
      console.log('click event 1')
      // const popup = L.popup().setContent('Popup for icon 1');
      // marker.bindPopup(`<div style="display:flex; align-items:center;">
      //     <img src="${"../../../../assets/images/car.jpg"}" style=" width:50px; margin-right:10px;">
      //     <div>
      //       <h3>Marker popup title 1</h3>
      //       <p>Marker Description</p>
      //     </div>
      //   </div>`)
    });
    
    const icon22 = document.querySelector('.bg-marker.icon-2');
    console.log('icon22',icon22)
    icon22.addEventListener('click', () => {
      console.log('click event 2')
      // const popup = L.popup().setContent('Popup for icon 2');
      // marker.bindPopup(`<div style="display:flex; align-items:center;">
      //     <img src="${"../../../../assets/images/car.jpg"}" style=" width:50px; margin-right:10px;">
      //     <div>
      //       <h3>Marker popup title 2</h3>
      //       <p>Marker Description</p>
      //     </div>
      //   </div>`)
    });
    
  }
   popup1() {
    console.log('click event 1 func')
  }
   popup2() {
    console.log('click event 2 func')
  }
}

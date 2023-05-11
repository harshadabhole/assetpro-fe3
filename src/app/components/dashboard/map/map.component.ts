import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet.markercluster/dist/leaflet.markercluster.js';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';

import 'leaflet.markercluster';
import { MarkerClusterGroup } from 'leaflet.markercluster/dist/leaflet.markercluster.js';
import { SiteService } from 'src/app/shared/services/site.service';

interface CustomMarkerOptions extends L.MarkerOptions {
  iconCreateFunction: (icon: HTMLElement, marker: L.Marker) => HTMLElement;
}

const APIres = {
  "chargers": [
    {
      "name":"vijay",
      "id":"1234567",
      "lat":51.5,
      "long":-0.09,
      "status1":"charging",
      "output1":"22",
      "temp1":"23",
      "Soc1":"",
      "lastseen1":"",
      "status2":"faulted",
      "output2":"22",
      "temp2":"23",
      "Soc2":"",
      "lastseen2":""
    },
        {
      "name":"harshada",
      "id":"1234567",
      "lat":51.49,
      "long":-0.1,
      "status1":"charging",
      "output1":"22",
      "temp1":"23",
      "Soc1":"",
      "lastseen1":"",
      "status2":null,
      "output2":"22",
      "temp2":"23",
      "Soc2":"",
      "lastseen2":""
    },

        {
      "name":"abhishek",
      "id":"1234567",
      "lat":51.51,
      "long":-0.07,
      "status1":"available",
      "output1":"22",
      "temp1":"23",
      "Soc1":"",
      "lastseen1":"",
      "status2":"faulted",
      "output2":"22",
      "temp2":"23",
      "Soc2":"",
      "lastseen2":""
    },
        {
      "name":"janhavi",
      "id":"1234567",
      "lat":51.5,
      "long":-0.05,
      "status1":"available",
      "output1":"22",
      "temp1":"23",
      "Soc1":"",
      "lastseen1":"",
      "status2":"faulted",
      "output2":"22",
      "temp2":"23",
      "Soc2":"",
      "lastseen2":""
    }
,
        {
      "name":"anupam",
      "id":"1234567",
      "lat":51.49,
      "long":-0.06,
      "status1":"available",
      "output1":"22",
      "temp1":"23",
      "Soc1":"",
      "lastseen1":"",
      "status2":"faulted",
      "output2":"22",
      "temp2":"23",
      "Soc2":"",
      "lastseen2":""
    }
,
        {
      "name":"akshay",
      "id":"1234567",
      "lat":51.46,
      "long":-0.05,
      "status1":"available",
      "output1":"22",
      "temp1":"23",
      "Soc1":"",
      "lastseen1":"",
      "status2":"faulted",
      "output2":"22",
      "temp2":"23",
      "Soc2":"",
      "lastseen2":""
    }
,
        {
      "name":"omkar",
      "id":"1234567",
      "lat":51.99,
      "long":-0.09,
      "status1":"available",
      "output1":"22",
      "temp1":"23",
      "Soc1":"",
      "lastseen1":"",
      "status2":"faulted",
      "output2":"22",
      "temp2":"23",
      "Soc2":"",
      "lastseen2":""
    }
,
        {
      "name":"dipali",
      "id":"1234567",
      "lat":18.5565,
      "long":73.7730,
      "status1":"available",
      "output1":"22",
      "temp1":"23",
      "Soc1":"",
      "lastseen1":"",
      "status2":"faulted",
      "output2":"22",
      "temp2":"23",
      "Soc2":"",
      "lastseen2":""
    },
        {
      "name":"khushbu",
      "id":"1234567",
      "lat":23.99,
      "long":33.00,
      "status1":"available",
      "output1":"22",
      "temp1":"23",
      "Soc1":"",
      "lastseen1":"",
      "status2":"faulted",
      "output2":"22",
      "temp2":"23",
      "Soc2":"",
      "lastseen2":""
    },
        {
      "name":"srk",
      "id":"1234567",
      "lat":23.99,
      "long":33.00,
      "status1":"available",
      "output1":"22",
      "temp1":"23",
      "Soc1":"",
      "lastseen1":"",
      "status2":"faulted",
      "output2":"22",
      "temp2":"23",
      "Soc2":"",
      "lastseen2":""
    },
        {
      "name":"rohan",
      "id":"1234567",
      "lat":23.99,
      "long":33.00,
      "status1":"available",
      "output1":"22",
      "temp1":"23",
      "Soc1":"",
      "lastseen1":"",
      "status2":"faulted",
      "output2":"22",
      "temp2":"23",
      "Soc2":"",
      "lastseen2":""
    }
  ]
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  private map: L.Map;
  private markerClusterGroup: MarkerClusterGroup;
  selectedSite:any;
  markers =[];
  

  constructor(private _siteService:SiteService) {
    this._siteService.updatedSiteId.subscribe((res: any) => {
      this.selectedSite = this._siteService.getselectedSite();
     
      

  //     if(this.selectedSite !== '') {
  //       this.markers.forEach((marker) => {
  //         console.log('qwertyuiop', marker)
  //         this.map.removeLayer(marker)
  //       this.markers = [];
  //       this.getAllMarkers();
  //     })
     
  //   }
  // else{
    this.markers = [];
    this.getAllMarkers();
  // }
}
  )   
  }

  ngOnInit() {
    this.map = L.map('map').setView([0, 0], 1);

    if(this.map){
      this.map.eachLayer((layer)=>{
        console.log('vvvvvvvvvvvv',layer)
        if(layer.options.pane=='markerPane'){
          console.log('vvvvvvvvvvvvddd')
        this.map.removeLayer(layer)
        }
        // console.log('qwertyuiop', layer.options.pane)
    })
    }

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);
    L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    }).addTo(this.map);


    this.markerClusterGroup = L.markerClusterGroup();
    // this.getAllMarkers()
    // this.addMarkers();
    // if(this.map){
    //   this.map.eachLayer((layer)=>{
    //     console.log('qwertyuiop', layer.options.pane)
    // })
    // }

  }
  
  getAllMarkers() {
    console.log('getAllMarkers',this.selectedSite);
    this.markers = [];
    this._siteService.getAllMarkers(this.selectedSite).subscribe((res:any)=>{
      console.log('getMarker res',res);
    this.markers = [];
      this.addMarkers(res.Data);

    })
  }
  addMarkers(markersAPIRes:any) {
 console.log('markersmarkersmarkersmarkers',markersAPIRes)
    
this.markers = [];
    markersAPIRes.forEach(charger => { 
      const src = "../../../../assets/images/green.png";
      const divHtml = ``;
      let portIcon1 = null;
      let portIcon2 = null;
      // let chargerIcon1 = null;
      let iconHtml =`<div style="display:inline-flex;"><div class="bg-marker icon-1" style="margin-right:3px"  ><img src="${portIcon1}" class="img-style icon-1"></img></div><div  class="bg-marker icon-2" ><img src="${portIcon2}" class="img-style icon-2"></img></div></div>`
      switch(charger.Status1) {
        case 'Charging' : portIcon1 = "../../../../assets/images/yellow.png" ;break;
        case 'Available' : portIcon1 = "../../../../assets/images/green.png" ;break;
        case 'Faulted' : portIcon1 = "../../../../assets/images/red.png" ;break;
        default : portIcon1 = "../../../../assets/images/red.png" ;break;
      }
      switch(charger.Status2) {
        case 'Charging' : portIcon2 = "../../../../assets/images/yellow.png" ;break;
        case 'Available' : portIcon2 = "../../../../assets/images/green.png" ;break;
        case 'Faulted' : portIcon2 = "../../../../assets/images/red.png" ;break;
        case null :  {
          portIcon2 = "../../../../assets/images/red.png";
          iconHtml = `<div style="display:inline-flex;"><div class="bg-marker icon-1" style="margin-right:3px"  ><img src="${portIcon1}" class="img-style icon-1 mt-1"></img></div></div>`

        };break;
        default : portIcon2 = "../../../../assets/images/red.png" ;break;
      }
      if(charger.Status1 === null && charger.Status2 === null){
        iconHtml =`<div class="icon-3" style="display:inline-flex;"><div class="bg-marker icon-3" style="margin-right:3px"  ><b class="icon-3">${charger.Name}</b><img src="${"../../../../assets/images/Charger.png"}" class="icon-3" style="width:25px"></img></div></div>`
      }else if(charger.Status2 === null) {
        console.log('if charger.Status2',charger.Status2)
        iconHtml = `<div class="icon-1" style="display:inline-flex;"><div class="bg-marker icon-1" style="margin-right:3px"  ><b class="icon-1">Port A</b><img src="${portIcon1}" class="img-style icon-1 mt-1"></img></div></div>`
      }else if(charger.Status2 !== null){
        console.log('else charger.Status2',charger.Status2)
      iconHtml =`<div style="display:inline-flex;"><div class="bg-marker icon-1" style="margin-right:3px"  ><b class="icon-1">Port A</b><img src="${portIcon1}" class="img-style icon-1 mt-1"></img></div><div  class="bg-marker icon-2" ><b class="icon-2">Port B</b><img src="${portIcon2}" class="img-style icon-2 mt-1"></img></div></div>`
      }
    
      let icon = L.divIcon({
        className: 'custom-icon',
        html: iconHtml
      })
      let previousPopup = null;
      let previousLat = null;
let previousLon = null;


console.log('markersmarkersmarkersmarkers --', this.markers)
// L.marker
      this.markers.push(
        L.marker([charger.Lat, charger.Lon], { icon: icon })
          .bindPopup("", { autoClose: false })
          .on("click", function (event) {
            const pop = event.target;
            const popup = pop.getPopup();

            if (popup && !popup.isOpen()) {
              console.log('iffff')
              pop.openPopup();
            }else {
            console.log("elseeee")
            // pop.closePopup()
            }
            console.log('event', event)
            const currentLat = charger.Lat;
    const currentLon = charger.Lon;
    const prevLat = previousLat;
    const prevLon = previousLon;
    console.log("Coordinates prev",prevLat,prevLon)
    console.log("Coordinates current",currentLat,currentLon)
    // Compare the current coordinates with the previous values
    if ((previousLat !== currentLat || previousLon !== currentLon) && (previousLat !== null && previousLon !== null)) {
      // Coordinates have changed
      console.log("Coordinates have changed");
      pop.closePopup()
    } else if(previousLat === currentLat && previousLon === currentLon){
      // Coordinates are the same
      console.log("Coordinates are the same");
    }

    // Update the previous values
    previousLat = currentLat;
    previousLon = currentLon;
    console.log("Coordinates prev -- ",prevLat,prevLon)
    console.log("Coordinates current -- ",currentLat,currentLon)

            
            
            const clickedElement = event.originalEvent.target as HTMLElement;
            const markerPopup = document.querySelector('.leaflet-popup-content') as HTMLDivElement;
            // markerPopup.innerHTML = ``;
            console.log('markerPopup---',markerPopup)
            let iconType: string;
            if (clickedElement.classList.contains("icon-1") && markerPopup) {
              console.log('inside click icon 1')
              iconType = "icon-1";
            } else if (clickedElement.classList.contains("icon-2") && markerPopup) {
              console.log('inside click icon 2')
              iconType = "icon-2";
            }else if (clickedElement.classList.contains("icon-3")) {
              console.log('inside click icon 3')
              iconType = "icon-3";
            }
            let previousPopupContent = markerPopup;
            // setTimeout(() => {
              const delayedPopupContent = document.createElement('div');
              delayedPopupContent.classList.add('leaflet-popup-content');
              delayedPopupContent.style.width ="max-content"
              console.log('setTime poppp', delayedPopupContent.innerHTML);
              
              delayedPopupContent.innerHTML = createPopupContent(charger, iconType);
              if (delayedPopupContent.innerHTML !== previousPopupContent.innerHTML) {
                console.log('inside if 1')
              if (markerPopup.parentNode && delayedPopupContent.innerHTML) {
                markerPopup.parentNode.replaceChild(delayedPopupContent, markerPopup);
                markerPopup.style.width = "max-content";
              }
            }
              // markerPopup.innerHTML = delayedPopupContent;
             
            // }, 300);



            // const popupContent = createPopupContent(charger, iconType);
            // // const popupContent = setTimeout(createPopupContent(charger, iconType), 500);
            //   // console.log('poppppp', popupContent)
            //   console.log('setTime poppp', iconType)
            //   if(markerPopup.parentNode) {
            //     markerPopup.innerHTML = popupContent;
            //     markerPopup.style.width = "max-content";
            //   }
            const element = document.querySelector('.bg-marker.icon-1');
            if(element) {
              element.addEventListener('mouseout', function(event) {
                console.log('evenet')
                const closeButton = document.querySelector('a.leaflet-popup-close-button') as HTMLElement;
                closeButton.click();
              });
            }
            const element1 = document.querySelector('.bg-marker.icon-2');
            if(element1) {
              element1.addEventListener('mouseout', function(event) {
                const closeButton = document.querySelector('a.leaflet-popup-close-button') as HTMLElement;
                 closeButton.click();
               });
            }
            
            const element2 = document.querySelector('.icon-3');
            if(element2) {
              element2.addEventListener('mouseout', function(event) {
                const closeButton = document.querySelector('a.leaflet-popup-close-button') as HTMLElement;
                 closeButton.click();
               });
            }
          })
      );
      this.markers[this.markers.length - 1].openPopup();
      
    function createPopupContent(charger: any, iconType: string): string {
      console.log('charger',charger)
        const imageSrc = "../../../../assets/images/car.jpg";
        let status, voltage, power, soc;
      
        if (iconType === "icon-1") {
          console.log('inside if icon 1')
          status = charger.Status1;
          voltage = charger.Voltage1;
          power = charger.Power1;
          soc = charger.SoC1;
        } else if (iconType === "icon-2") {
          console.log('inside else if icon 2')
          status = charger.Status2;
          voltage = charger.Voltage2;
          power = charger.Power2;
          soc = charger.SoC2;
        }
      
        if(iconType === "icon-3") {
          return `
          <div style="display: flex; align-items: center;">
            <img src="${imageSrc}" style="width: 50px; margin-right: 10px;">
            <div>
              <h5>${charger.Name}</h5>
            </div>
          </div>`;
        }else if(iconType === "icon-1" || iconType === "icon-2"){
          return `
          <div style="display: flex; align-items: center;">
            <img src="${imageSrc}" style="width: 50px; margin-right: 10px;">
            <div>
              <h5>${charger.Name}</h5>
              <p class="mb-1 mt-1">Status: <span>${status}</span></p>
              <p class="mb-1 mt-1">Voltage: <span>${voltage}</span></p>
              <p class="mb-1 mt-1">Power: <span>${power}</span></p>
              <p class="mb-1 mt-1">Soc: <span>${soc}</span></p>
            </div>
          </div>`;
        }
        
      }

    } );

  

 
    this.markerClusterGroup.addLayers(this.markers);
    this.map.addLayer(this.markerClusterGroup);
    this.map.flyTo([51.49, -0.1],15)
    
    if(this.map){
      this.map.eachLayer((layer)=>{
        console.log('qwertyuiop', layer.options.pane)
    })
    }
    
  }
   flyTo() {
    console.log('click flyTo');
    this.map.flyTo([51.49, -0.1],13)

  }
  

}

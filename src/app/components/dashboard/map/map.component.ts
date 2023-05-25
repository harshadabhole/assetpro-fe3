import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet.markercluster/dist/leaflet.markercluster.js';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';

import 'leaflet.markercluster';
import { MarkerClusterGroup } from 'leaflet.markercluster/dist/leaflet.markercluster.js';
import { SiteService } from 'src/app/shared/services/site.service';

interface ExtendedMarkerOptions extends L.MarkerOptions {
  objectData?: any; // Replace 'any' with the specific type of your object if known
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
      if(this.selectedSite !== '') {
        this.clearMarkers();
        this.markers = [];
        this.getAllMarkers();
     
    }
    else
    {
      if(this.markerClusterGroup != undefined)
      {
        this.map.setView([0, 0], 1);
      }
    }
   
    
}
  )   
  }

  ngOnInit() {
    this.map = L.map('map').setView([0, 0], 1);

    if(this.map){
      this.map.eachLayer((layer)=>{
        if(layer.options.pane=='markerPane'){
        this.map.removeLayer(layer)
        }
    })
    }

    L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
      maxZoom: 30,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    }).addTo(this.map);

    this.markerClusterGroup = L.markerClusterGroup({
      iconCreateFunction: this.customClusterIcon
    });
  }
  

  clearMarkers() {
    this.markerClusterGroup.clearLayers();
    this.markers = [];
  }

  getAllMarkers() {
    this.markers = [];
    this._siteService.getAllMarkers(this.selectedSite).subscribe((res:any)=>{
    this.markers = [];
      this.addMarkers(res.Data);

    })
  }
  addMarkers(markersAPIRes:any) {
    
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
        case 'Idling' : portIcon1 = "../../../../assets/images/green.png" ;break;
        case 'Faulted' : portIcon1 = "../../../../assets/images/red.png" ;break;
        case 'Equalizing' : portIcon1 = "../../../../assets/images/yellow.png" ;break;
        default : portIcon1 = "../../../../assets/images/red.png" ;break;
      }
      switch(charger.Status2) {
        case 'Charging' : portIcon2 = "../../../../assets/images/yellow.png" ;break;
        case 'Idling' : portIcon2 = "../../../../assets/images/green.png" ;break;
        case 'Faulted' : portIcon2 = "../../../../assets/images/red.png" ;break;
        case 'Equalizing' : portIcon2 = "../../../../assets/images/yellow.png" ;break;
        case null :  {
          portIcon2 = "../../../../assets/images/red.png";
          iconHtml = `<div style="display:inline-flex;"><div class="bg-marker icon-1" style="margin-right:3px"  ><img src="${portIcon1}" class="img-style icon-1 mt-1"></img></div></div>`

        };break;
        default : portIcon2 = "../../../../assets/images/red.png" ;break;
      }
      if(charger.Status1 === null && charger.Status2 === null){
        iconHtml =`<div class="icon-3" style="display:inline-flex;"><div class="bg-marker icon-3" style="margin-right:3px"  ><b class="icon-3">${charger.Name}</b><img src="${"../../../../assets/images/Charger.png"}" class="icon-3" style="width:25px"></img></div></div>`
      }else if(charger.Status2 === null) {
        iconHtml = `<div class="icon-1" style="display:inline-flex;"><div class="bg-marker icon-1" style="margin-right:3px"  ><b class="icon-1">Port A</b><img src="${portIcon1}" class="img-style icon-1 mt-1"></img></div></div>`
      }else if(charger.Status2 !== null){
      iconHtml =`<div style="display:inline-flex;"><div class="bg-marker icon-1" style="margin-right:3px"  ><b class="icon-1">Port A</b><img src="${portIcon1}" class="img-style icon-1 mt-1"></img></div><div  class="bg-marker icon-2" ><b class="icon-2">Port B</b><img src="${portIcon2}" class="img-style icon-2 mt-1"></img></div></div>`
      }
    
      let icon = L.divIcon({
        className: 'custom-icon',
        html: iconHtml
      })

// L.marker
      this.markers.push(
        L.marker([charger.Lat, charger.Lon], { icon: icon , objectData: charger ,status1:charger.Status1,status2:charger.Status2} as ExtendedMarkerOptions)
          .bindPopup("", { autoClose: false })
          .on("click", function (event) {
    

            const clickedElement = event.originalEvent.target as HTMLElement;
            const markerPopup = document.querySelector('.leaflet-popup-content') as HTMLDivElement;
            let iconType: string;
            if (clickedElement.classList.contains("icon-1") && markerPopup) {
              iconType = "icon-1";
            } else if (clickedElement.classList.contains("icon-2") && markerPopup) {
              iconType = "icon-2";
            }else if (clickedElement.classList.contains("icon-3")) {
              iconType = "icon-3";
            }
            let previousPopupContent = markerPopup;
            // setTimeout(() => {
              const delayedPopupContent = document.createElement('div');
              delayedPopupContent.classList.add('leaflet-popup-content');
              delayedPopupContent.style.width ="max-content"
              
              delayedPopupContent.innerHTML = createPopupContent(charger, iconType);
              if (delayedPopupContent.innerHTML !== previousPopupContent.innerHTML) {
              if (markerPopup.parentNode && delayedPopupContent.innerHTML) {
                markerPopup.parentNode.replaceChild(delayedPopupContent, markerPopup);
                markerPopup.style.width = "max-content";
              }
            }
            const element = document.querySelectorAll('.bg-marker.icon-1');
            if(element) {
              element.forEach(element => {
                element.classList.add('port-a')
                element.addEventListener('mouseout', function(event) {
                  const closeButton = document.querySelector('a.leaflet-popup-close-button') as HTMLElement;
                  if(closeButton) {
                    element.classList.remove('port-a')
                    closeButton.click();
                  }
                });
              });
             
            }
            const element1 = document.querySelectorAll('.bg-marker.icon-2');
            if(element1) {
              element1.forEach(element => {
                element.classList.add('port-b')
              element.addEventListener('mouseout', function(event) {
                const closeButton = document.querySelector('a.leaflet-popup-close-button') as HTMLElement;
                 if(closeButton) {
                  element.classList.remove('port-b')
                  closeButton.click();
                }
               });
              });
            }
            
            const element2 = document.querySelectorAll('.icon-3');
            if(element2) {
              element2.forEach(element => {
                element.classList.add('port-c')
                element.addEventListener('mouseout', function(event) {
                  const closeButton = document.querySelector('a.leaflet-popup-close-button') as HTMLElement;
                   if(closeButton) {
                    element.classList.remove('port-c')
                    closeButton.click();
                  }
                 });
              });
           
            }
          }).on("mouseover", function(event) {
            console.log('inside hover mouseover', event);
            const closeButton = document.querySelector('a.leaflet-popup-close-button') as HTMLElement;
            if(closeButton) {
              closeButton.click();
            }
           
          }).on("mouseout", function(event) {
            console.log('inside hover mouseout', event);
            const closeButton = document.querySelector('a.leaflet-popup-close-button') as HTMLElement;
            if(closeButton){
              
              closeButton.click();
            }
          })
      );
      this.markers[this.markers.length - 1].openPopup();
      
    function createPopupContent(charger: any, iconType: string): string {
      console.log('chargercharger',charger)
        const imageSrc = "../../../../assets/images/car.jpg";
        let status, voltage, power, soc ,paired, last;
        let ll;
        const timezoneOffset = new Date().getTimezoneOffset();
        if (charger.LastSeen != undefined) {
          const utcTime = new Date(charger.LastSeen).getTime();
          const localTime = utcTime - timezoneOffset * 60 * 1000;
          const localDate = new Date(localTime);
          const year = localDate.getFullYear();
          const month = String(localDate.getMonth() + 1).padStart(2, '0');
          const day = String(localDate.getDate()).padStart(2, '0');
          const hour = String(localDate.getHours()).padStart(2, '0');
          const minute = String(localDate.getMinutes()).padStart(2, '0');
          const second = String(localDate.getSeconds()).padStart(2, '0');
          ll = `${year}/${month}/${day}, ${hour}:${minute}:${second}`;
        } 
        else {
          ll = null;
        }

        if (iconType === "icon-1") {
          status = charger.Status1 == 'Idling'? 'Available':charger.Status1;
          voltage = charger.Voltage1;
          power = charger.Power1;
          soc = charger.SoC1;
          paired  = charger.Paired1;
          last = ll;
        } else if (iconType === "icon-2") {
          status = charger.Status2 == 'Idling'? 'Available':charger.Status2;
          voltage = charger.Voltage2;
          power = charger.Power2;
          soc = charger.SoC2;
          paired  = charger.Paired2;
          last = ll;
        }
      
        if(iconType === "icon-3") {
          return `
          <div style="display: flex; align-items: center;">
            <img src="${"../../../../assets/images/Charger.png"}" style="width: 50px; margin-right: 10px;">
            <div>
              <h5 style="font: normal normal bold 0.95rem Montserrat;letter-spacing: 0px;opacity: 1;">Name:&nbsp;${charger.Name}</h5>
              <p class="mb-1 mt-1" style="font: normal normal 0.75rem Montserrat;letter-spacing: 0px;opacity: 1;"><b>Status</b>:&nbsp;<span>Out of Range</span></p>
              <p class="mb-1 mt-1" style="font: normal normal 0.75rem Montserrat;letter-spacing: 0px;opacity: 1;"><b>Last Seen</b>:&nbsp;<span>N/A</span></p>
              <p class="mb-1 mt-1" style="font: normal normal 0.75rem Montserrat;letter-spacing: 0px;opacity: 1;"><b>Voltage</b>:&nbsp;<span>N/A</span></p>
              <p class="mb-1 mt-1" style="font: normal normal 0.75rem Montserrat;letter-spacing: 0px;opacity: 1;"><b>Current</b>:&nbsp;<span>N/A</span></p>
              <p class="mb-1 mt-1" style="font: normal normal 0.75rem Montserrat;letter-spacing: 0px;opacity: 1;"><b>SoC</b>:&nbsp;<span>N/A</span></p>
              <p class="mb-1 mt-1" style="font: normal normal 0.75rem Montserrat;letter-spacing: 0px;opacity: 1;"><b>Paired</b>:&nbsp;<span>N/A</span></p>
            </div>
          </div>`;
        }else if(iconType === "icon-1" || iconType === "icon-2"){
          return `
          <div style="display: flex; align-items: center;">
          <div>
          <h6 style="top:0%;font: normal normal 16px Montserrat;letter-spacing: 0px;opacity: 1;">${iconType === "icon-1" ? 'Port A' : 'Port B'}</h6>
          <img src="${iconType === "icon-1" ? portIcon1 : portIcon2}" style="width: 50px; margin-right: 10px;">
          </div>
            <div>
              <h5 style="font: normal normal bold 0.95rem Montserrat;letter-spacing: 0px;opacity: 1;">Name:&nbsp;${charger.Name}</h5>
              <p class="mb-1 mt-1" style="font: normal normal 0.75rem Montserrat;letter-spacing: 0px;opacity: 1;"><b>Status</b>:&nbsp;<span [ngClass]="{'text-success': ${status} == 'Available', 'text-danger': ${status} == 'Faulted', 'text-warning': ${status} == 'Charging' || ${status} == 'Equalizing' }">${status}</span></p>
              <p class="mb-1 mt-1" style="font: normal normal 0.75rem Montserrat;letter-spacing: 0px;opacity: 1;"><b>Last Seen</b>:&nbsp;<span>${last}</span></p>
              <p class="mb-1 mt-1" style="font: normal normal 0.75rem Montserrat;letter-spacing: 0px;opacity: 1;"><b>Voltage</b>:&nbsp;<span>${voltage} V</span></p>
              <p class="mb-1 mt-1" style="font: normal normal 0.75rem Montserrat;letter-spacing: 0px;opacity: 1;"><b>Current</b>:&nbsp;<span>${power} A</span></p>
              <p class="mb-1 mt-1" style="font: normal normal 0.75rem Montserrat;letter-spacing: 0px;opacity: 1;"><b>SoC</b>:&nbsp;<span>${soc}</span></p>
              <p class="mb-1 mt-1" style="font: normal normal 0.75rem Montserrat;letter-spacing: 0px;opacity: 1;"><b>Paired</b>:&nbsp;<span>${paired}</span></p>
            </div>
          </div>`;
        }
        
      }

    } );

  

    this.markerClusterGroup.addLayers(this.markers);
    this.map.addLayer(this.markerClusterGroup);
    this.markerClusterGroup.on('clustermouseover', (event) => {
      const cluster = event.layer;
      const childMarkers = cluster.getAllChildMarkers();
      // Access individual marker details
      let popupContent = ``;
      
      childMarkers.forEach((marker) => {
        let portIconColor1 = null;
        let portIconColor2 = null;
        const markerObj = (marker.options as ExtendedMarkerOptions).objectData;

      switch(markerObj.Status1) {
        case 'Charging' : portIconColor1 = "#FCC200" ;break;
        case 'Idling' : portIconColor1 = "#01AE4F" ;break;
        case 'Faulted' : portIconColor1 = "#FC4842" ;break;
        case 'Equalizing' : portIconColor1 = "#FCC200" ;break;
        default : portIconColor1 = "#FC4842" ;break;
      }
      switch(markerObj.Status2) {
        case 'Charging' : portIconColor2 = "#FCC200" ;break;
        case 'Idling' : portIconColor2 = "#01AE4F" ;break;
        case 'Faulted' : portIconColor2 = "#FC4842" ;break;
        case 'Equalizing' : portIconColor2 = "#FCC200" ;break;
        case null :  {
          portIconColor2 = "#FC4842";

        };break;
        default : portIconColor2 = "#FC4842" ;break;
      }

        
        if(markerObj.Status1 !== null && markerObj.Status2 !== null){
          popupContent = popupContent + `<span>${markerObj.Name} - </span><span class="badge" style="color:'white ';background-color:${portIconColor1}">Port A</span><br><span>${markerObj.Name} - </span><span class="badge" style="color:'white ';background-color:${portIconColor2}">Port B</span><br>`;
        }else if(markerObj.Status1 === null && markerObj.Status2 === null){
          popupContent = popupContent + `<span>${markerObj.Name}</span><br>`;
        }else if(markerObj.Status2 === null && markerObj.Status1 !== null) {
          popupContent = popupContent + `<span>${markerObj.Name} - </span><span class="badge" style="color:'white ';background-color:${portIconColor1}">Port A</span><br>`;
        }else if(markerObj.Status1 === null&& markerObj.Status2 !== null) {
          popupContent = popupContent + `<span>${markerObj.Name} - </span><span class="badge" style="color:'white ';background-color:${portIconColor2}">Port B</span><br>`;
        }
      });

       // Bind the popup to the cluster
       cluster.bindPopup(popupContent).openPopup();
    });
    this.markerClusterGroup.on('clustermouseout', (event) => {
      // Perform any desired actions when mouse moves out of the cluster
      console.log('clustermouseout')
      const closeButton = document.querySelector('a.leaflet-popup-close-button') as HTMLElement;
      closeButton.click();
    });
    
    if(this.markers[0] != undefined){
      this.map.flyTo([this.markers[0]._latlng.lat, this.markers[0]._latlng.lng],15)
    }else{
      this.map.flyTo([0, 0], 1)
    }
  }

  customClusterIcon = function(cluster) {
    const childMarkers = cluster.getAllChildMarkers();
    let chargingStatus = true;
    let faultedStatus = false;
    let chargingCount = 0;
    let eqStatus = true;
    let eqCount = 0;
    let idlingstatus = false;
    let sameStatus = false;
    
    const len = childMarkers.length;
  
    for (let i = 0; i < len; i++) {
      const marker = childMarkers[i];
      const { status1, status2 } = marker.options;
  
      if (typeof status1 !== 'object' && typeof status2 !== 'object') {
        if (!(status1 === 'Charging' && status2 === 'Charging')) {
          chargingStatus = false;
        } else {
          chargingCount++;
        }
        if (!(status1 === 'Equalizing' && status2 === 'Equalizing')) {
          eqStatus = false;
        } else {
          eqCount++;
        }
  
        if (
          (status1 === 'Charging' && status2 === 'Equalizing') ||
          (status1 === 'Equalizing' && status2 === 'Charging') ||
          (status1 === 'Charging' && status2 === 'Charging')  ||
          (status1 === 'Equalizing' && status2 === 'Equalizing')
        ) {
          sameStatus = true;
        }
  
        if (status1 === 'Faulted' || status2 === 'Faulted') {
          faultedStatus = true;
          break;
        }
        if (status1 === 'Idling' || status2 === 'Idling') {
          idlingstatus = true;
        }
      }
    }
  
    let color = 'purple';
    if (faultedStatus) {
      color = 'red';
    } else if (chargingCount === len) {
      color = '#FFA500';
    } else if (eqCount === len) {
      color = '#FFA500';
    } else if (sameStatus && idlingstatus) {
      color = '#01AE4F';
    } else if (sameStatus) {
      color = '#FFA500';
    } else if (!faultedStatus && idlingstatus) {
      color = '#01AE4F';
    }
  
    return L.divIcon({
      className: '',
      iconSize: L.point(40, 40),
      iconAnchor: L.point(20, 20),
      html: `<div style="background-color: ${color};border-radius: 50%;display: flex;justify-content: center;align-items: center;width: 40px;height: 40px; font-weight:bold;"><span style="background-color: white; border-radius: 50%;padding: 4px; width: 22px;height: 22px;display: flex;justify-content: center;align-items: center;">${cluster.getChildCount()}</span></div>`,
    });
  }
  
}
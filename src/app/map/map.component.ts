import { Component, OnInit } from '@angular/core';
import maplibregl from 'maplibre-gl';
import { DeviceService } from '../services/device.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  map: maplibregl.Map | undefined;
  devices: any[] = [];
  selectedDeviceId: string | null = null;

  constructor(private deviceService: DeviceService) {}

  ngOnInit() {
    this.deviceService.getDevices().subscribe(data => {
      this.devices = data;
      this.initializeMap();
    });
  }

  initializeMap() {
  this.map = new maplibregl.Map({
    container: 'map',
    style: 'https://demotiles.maplibre.org/style.json',
    center: [0, 0],
    zoom: 2
  });

    this.map.on('load', () => {
    this.devices.forEach(device => {
      this.deviceService.getLastTrackingData(device.id).subscribe(trackingData => {
        const route = trackingData.map((point: any) => [point.longitude, point.latitude]);
        if (route.length > 1) {
          this.map!.addSource('route', {
            type: 'geojson',
            data: {
              type: 'Feature',
              geometry: {
                type: 'LineString',
                coordinates: route
              }
            }
          });

          this.map!.addLayer({
            id: 'route',
            type: 'line',
            source: 'route',
            layout: {
              'line-join': 'round',
              'line-cap': 'round'
            },
            paint: {
              'line-color': '#888',
              'line-width': 8
            }
          });
        }
      });
    });

    if (this.selectedDeviceId) {
      this.focusOnDevice(this.selectedDeviceId);
    }
  });
}


  focusOnDevice(deviceId: string) {
    this.deviceService.getLastTrackingData(deviceId).subscribe(trackingData => {
      const lastPoint = trackingData[0];
      if (lastPoint) {
        this.map!.flyTo({
          center: [lastPoint.longitude, lastPoint.latitude],
          zoom: 14
        });
      }
    });
  }
}


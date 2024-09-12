import { Component, OnInit } from '@angular/core';
import { DeviceService } from '../services/device.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.scss']
})
export class DeviceListComponent implements OnInit {
  devices: any[] = [];

  constructor(private deviceService: DeviceService, private router: Router) {}

  ngOnInit() {
    this.deviceService.getDevices().subscribe(data => {
      this.devices = data;
    });
  }

  viewDevice(deviceId: string) {
    this.router.navigate(['/map'], { queryParams: { deviceId } });
  }
}


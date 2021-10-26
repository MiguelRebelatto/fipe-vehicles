import { Component, OnInit } from '@angular/core';
import { types } from 'src/app/shared/constants/global-type';
import { Brand } from 'src/app/shared/models/brand';
import { ModelVehicle, YearVehicle } from 'src/app/shared/models/model-vehicle';
import { Vehicle } from 'src/app/shared/models/vehicle';
import { Year } from 'src/app/shared/models/year';
import { FipeService } from 'src/app/shared/services/fipe.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  types = types;

  brands: Array<Brand> = [];
  modelsVehicle: Array<ModelVehicle> = [];
  yearsVehicle: Array<YearVehicle> = [];
  years: Array<Year> = [];

  type: string = types[0];
  brandCode: string;
  modelCode: string;
  yearCode: string;

  vehicle: Vehicle;

  constructor(
    private fipeService: FipeService
  ) { }

  get percentage() {
    let value = 0;
    if (this.vehicle && this.yearCode)
      value = 100;
    else if (this.yearCode)
      value = 75;
    else if (this.modelCode)
      value = 50;
    else if (this.brandCode)
      value = 30;
    else if (this.brandCode)
      value = 10;
    else
      value = 0

    return `${value}%`
  }

  ngOnInit(): void {
    this.fipeService.getBrands(this.type)
      .subscribe(data => this.brands = data)
  }

  getBrands() {
    this.yearCode = '';
    this.modelCode = '';
    this.brandCode = '';

    this.fipeService.getBrands(this.type)
      .subscribe(data => this.brands = data)
  }

  getModels() {
    this.yearCode = '';
    this.modelCode = '';

    this.fipeService.getModels(this.type, this.brandCode)
      .subscribe(data => {
        this.modelsVehicle = data.modelos
        this.yearsVehicle = data.anos
      })
  }

  getYears() {
    this.yearCode = '';

    this.fipeService.getYears(this.type, this.brandCode, this.modelCode)
      .subscribe(data => {
        this.years = data
      })
  }

  getVehicle() {
    this.fipeService.getVehicle(this.type, this.brandCode, this.modelCode, this.yearCode)
      .subscribe(data => {
        this.vehicle = data
      })
  }

}

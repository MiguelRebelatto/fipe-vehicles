import { Component, OnInit } from '@angular/core';
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

  type: string = "carros";

  brands: Array<Brand> = [];
  brandCode: string;

  modelsVehicle: Array<ModelVehicle> = [];
  yearsVehicle: Array<YearVehicle> = [];
  modelCode: string;

  years: Array<Year> = [];
  yearCode: string;

  vehicle: Vehicle;

  constructor(
    private fipeService: FipeService
  ) { }

  ngOnInit(): void {
    this.fipeService.getAll(this.type)
      .subscribe(data => this.brands = data)
  }

  getModels() {
    this.fipeService.getModels(this.type, this.brandCode)
      .subscribe(data => {
        this.modelsVehicle = data.modelos
        this.yearsVehicle = data.anos
      })
  }

  getYears() {
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

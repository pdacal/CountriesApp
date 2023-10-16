import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'by-country-page',
  templateUrl: 'by-country-page.component.html'
})

export class ByCountryPageComponent   {

  public countries: Country[] = [];

  constructor( private countriesService:CountriesService) { }

  searchByCountry(term:string) : void{
    //devolve un array de paises
    this.countriesService.searchByCountry( term )
    .subscribe( countries => {this.countries = countries;} );
  }

}

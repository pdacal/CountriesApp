import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'by-country-page',
  templateUrl: 'by-country-page.component.html'
})

export class ByCountryPageComponent  implements OnInit {

  public countries: Country[] = [];
  public isLoading: boolean = false;
  public initialValue:string = '';

  constructor( private countriesService:CountriesService) { }

  searchByCountry(term:string) : void{
    this.isLoading=true;
    //devolve un array de paises
    this.countriesService.searchByCountry( term )
    .subscribe( countries => {this.countries = countries; this.isLoading = false} );
  }
  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byCountries.countries;
    this.initialValue = this.countriesService.cacheStore.byCountries.term;
  }
}

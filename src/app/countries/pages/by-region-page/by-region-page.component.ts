import { Component } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'by-region-page-name',
  templateUrl: 'by-region-page.component.html'
})

export class ByRegionPageComponent  {

  public countries: Country[] = [];

  constructor( private countriesService: CountriesService ) { }

  searchByRegion(term:string) : void{
    //subscribirse ao observable para que este se emita, senon no subscribimos non vai pasar nada
    this.countriesService.searchByRegion( term )
    .subscribe( countries => {this.countries = countries;} );
    // devolve un array de paises
  // operador de RXjs

  }
}

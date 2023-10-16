import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';


@Component({
  selector: 'by-capital-page',
  templateUrl: 'by-capital-page.component.html'
})

export class ByCapitalPageComponent  {

  public countries: Country[] = [];

  constructor( private countriesService: CountriesService ) { }

  searchByCapital(term:string) : void{
    //subscribirse ao observable para que este se emita, senon no subscribimos non vai pasar nada
    this.countriesService.searchByCapital( term )
    .subscribe( countries => {this.countries = countries;} );
    // devolve un array de paises
  // operador de RXjs

  }

}

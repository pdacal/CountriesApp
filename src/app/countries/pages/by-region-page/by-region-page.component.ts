import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';
import { Region } from '../../interfaces/region.type';

@Component({
  selector: 'by-region-page-name',
  templateUrl: 'by-region-page.component.html'
})

export class ByRegionPageComponent implements OnInit {

  public countries: Country[] = [];
  public regions:Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  public selectedRegion?: Region;
  public isLoading: boolean = false;

  constructor( private countriesService: CountriesService ) { }

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byRegion.countries;
    this.selectedRegion = this.countriesService.cacheStore.byRegion.region;
  }

  searchByRegion(region:Region) : void{
    this.isLoading=true;
    this.selectedRegion = region;
    //subscribirse ao observable para que este se emita, senon no subscribimos non vai pasar nada
    this.countriesService.searchByRegion( region )
    .subscribe( countries => {this.countries = countries;this.isLoading = false} );
    // devolve un array de paises
  // operador de RXjs

  }
}

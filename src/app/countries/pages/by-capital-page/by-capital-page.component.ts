import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';


@Component({
  selector: 'by-capital-page',
  templateUrl: 'by-capital-page.component.html'
})

export class ByCapitalPageComponent implements OnInit{

  public countries: Country[] = [];
// para manexar cando aparce o Loading
  public isLoading: boolean = false;
// para que apareza o termo de busqueda no searchbox tras cambiar de paxina, para non perdelo
  public initialValue:string = '';
  constructor(private countriesService: CountriesService) { }

  ngOnInit(): void {
  // para recuperar a data do servicio, xa se garda no servicio ao cambiar de pantalla, agora temos que recuperala!!
    this.countries = this.countriesService.cacheStore.byCapital.countries;
    this.initialValue = this.countriesService.cacheStore.byCapital.term;
  }

  searchByCapital(term: string): void {
    //subscribirse ao observable para que este se emita, senon no subscribimos non vai pasar nada
    this.isLoading=true;
    this.countriesService.searchByCapital(term)
      .subscribe(countries => {
        this.countries = countries;
        this.isLoading = false
      });
    // devolve un array de paises
    // operador de RXjs

  }


}



import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'country-page',
  templateUrl: 'country-page.component.html'
})

export class CountryPageComponent implements OnInit {

  // ? porque cando entramoz na app vai ser nulo
  public country?:Country;

  constructor(
    private activatedRoute: ActivatedRoute,
    private countriesService: CountriesService,
    private router: Router
  ) { }


  ngOnInit(): void {

    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.countriesService.searchCountryByAlphaCode(id)),)
      .subscribe(country => {
        // se non hai coincidencias co id do country, que nos reenvia a outra paxina
        // home ou o que sexa
        if (!country) { return this.router.navigateByUrl(''); }
        return this.country=country;

      });
  }

  searchCountry(code: string) {
    this.countriesService.searchCountryByAlphaCode(code).subscribe(country => { console.log({ country }) });
  }

}

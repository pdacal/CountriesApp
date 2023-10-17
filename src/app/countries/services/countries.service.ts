import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/country';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({ providedIn: 'root' })
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1/';
  // para gardar os datos entre cambio de paxinas
  public cacheStore: CacheStore = {
    byCapital:{ term: '', countries:[] },
    byCountries:{ term: '', countries:[] },
    byRegion:{ region: '', countries:[] },
  }

  constructor(private http: HttpClient) {
    this.loadFromLocalStorage();
  }
// gardar no localStorage
  private saveToLocalStorage(){
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore))
  }
  // recuperar do LocalStorage
  private loadFromLocalStorage(){
    if(!localStorage.getItem('cacheStore'))return;
    this.cacheStore= JSON.parse(localStorage.getItem('cacheStore')!);
  }

  private getCountriesRequest(url: string): Observable<Country[]> {
    return this.http.get<Country[]>(url)
      .pipe(
        catchError(() => of([])),
      //  delay(500) //para probar e meterlle un loading!!!!!
      );
  }

  searchCountryByAlphaCode(code: string): Observable<Country | null> {

    const url = `${this.apiUrl}/alpha/${code}`;
    return this.http.get<Country[]>(url)
      .pipe(
        // que devolva o primeir elemento encontrado countries[0], senon existe que devolva null
        map(countries => countries.length > 0 ? countries[0] : null),
        catchError(() => of(null))
      );
  }

  searchByCapital(term: string): Observable<Country[]> {
    // para que a solicitude funcione, debemos subscribirnos para escoitar
    //forma a url co termo que recibe (o escrito na barra de busqueda)
    const url = `${this.apiUrl}/capital/${term}`;
    return this.getCountriesRequest(url)
    .pipe(
      tap( countries => this.cacheStore.byCapital = {term,  countries} ),
      tap( () => this.saveToLocalStorage() ),
      );
    // atrapamos o erro asi e limpamos a paxina enviando un array vacio
  }

  searchByCountry(term: string): Observable<Country[]> {
    // buscar por nome do pais
    const url = `${this.apiUrl}/name/${term}`;
    return this.getCountriesRequest(url)
    .pipe(
      tap( countries => this.cacheStore.byCountries = {term, countries}),
      tap( () => this.saveToLocalStorage() ),
    )
    ;
  }
  searchByRegion(region: Region): Observable<Country[]> {
    //buscar por rexion
    const url = `${this.apiUrl}/region/${region}`;
    return this.getCountriesRequest(url)
    .pipe(
      tap( countries => this.cacheStore.byRegion= {region, countries} ),
      tap( () => this.saveToLocalStorage() ),
    )
    ;
  }
}

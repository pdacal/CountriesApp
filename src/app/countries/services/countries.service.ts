import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1/';

  constructor(private http: HttpClient) { }

  searchCountryByAlphaCode( code:string ):Observable<Country | null>{

    const url = `${ this.apiUrl }/alpha/${ code }`;

    return this.http.get<Country[]>( url )
    .pipe(
    // que devolva o primeir leemento encontrado countries[0], senon existe que devolva null
      map( countries => countries.length > 0 ? countries[0]:null ),
     catchError( () => of(null) )
    );


  }


  searchByCapital ( term:string ) : Observable<Country[]> {
    // para que a solicitude funcione, debemos subscribirnos para escoitar
    //forma a url co termo que recibe (o escrito na barra de busqueda)
    const url = `${ this.apiUrl }/capital/${ term }`;
    return this.http.get<Country[]>( url )
    .pipe(
     catchError( () => of([]) )
    );
  // atrapamos o erro asi e limpamos a paxina enviando un array vacio
  }

  searchByCountry( term:string ): Observable<Country[]>{
  // buscar por nome do pais
    const url = `${ this.apiUrl }/name/${ term }`;
    return this.http.get<Country[]>( url )
    .pipe(
     catchError( () => of([]) )
    );
  }
  searchByRegion( term:string ): Observable<Country[]>{
    //buscar por rexion
    const url = `${ this.apiUrl }/region/${ term }`;
    return this.http.get<Country[]>( url )
    .pipe(
     catchError( () => of([]) )
    );
  }
}

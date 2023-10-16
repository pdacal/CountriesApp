import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutPageComponent } from './shared/pages/aboutPage/about-page.component';
import { ContactPageComponent } from './shared/pages/contactPage/contact-page.component';
import { HomePageComponent } from './shared/pages/homePage/home-page.component';


// MODULO con configuracion de RUTAS
const routes: Routes = [
  // {
  //   path: '', //ruta da paxina
  //   component: HomePageComponent, //component a mostrar nesa ruta
  //   //Poderiamoslle ponher un array de subrutas da HomePage
  //   // children:[{path:'', component:SubPage1}]
  //   //LazyLoad, carga perezosa de modulos:
  // },
  {
    path: 'about',
    component: AboutPageComponent,
  },
  {
    path: 'contact',
    component: ContactPageComponent,
  },
  // carga perezosa, cargamos os fillos
  {
    path: 'countries',
    // funcion de carga onde cargamos o import, indicar o path coma string,
    //para que se cargue de forma estatica, path para cargar o modulo
    //logo dop modulo (m) queremos que cargue o CountriesModfdule

    loadChildren: () => import('./countries/countries.module').then( m =>m.CountriesModule)
  },
  //calquer outra ruta non definida no noso route, que redirixa a 'home'
  {
    path: '**',
    redirectTo: 'countries'
  }
]

@NgModule({
  imports:[
    //se e o router principal e o primeiro da nosa app, engadir .forRoot(nome da constante arriba declarada routes)
    //de ter outros seriuan forChild
    RouterModule.forRoot( routes ),
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }

import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
// OnInit inicializase tras o constructor
export class SearchBoxComponent implements OnInit, OnDestroy{

  //parecido a un observable pero manualmente, podemos facer pipe, subscribirnos
private debouncer: Subject<string>= new Subject<string>()
private debouncerSubscription?:Subscription;

// recibe o termo antes xerado, para que se mantenha o termo ao cambiar entre pantallas
@Input()
public initialValue:string = '';

@Output()
public onValue: EventEmitter<string>= new EventEmitter<string>();

@Input()
public placeholder: string = '';

@Output()
public onDebounce:EventEmitter<string> = new EventEmitter<string>();

ngOnInit(): void {
  //observable emite un valor
  this.debouncerSubscription = this.debouncer
  // co pipe e co debounceTime indicamoslle canto tempo debe esperar para ver si recibe valores
  //se os recibe debe volver esperar e asi continuamente
  //se o observable deixa de emitir durante 1s, entonces manda o que se escribiu
  .pipe(debounceTime(300))
  .subscribe(value => this.onDebounce.emit(value));
}
//metodo que se chama cando a instancia deste componenete se destrue
ngOnDestroy(): void {
  //se hai algunha subscription, que se desubscriba
this.debouncerSubscription?.unsubscribe();
}


emitValue( value:string ) :void{
  this.onValue.emit( value );
}

// para que se emita o evento cando deixemos de escribir na barra de busqueda
onKeyPress( searchTerm:string ){
  this.debouncer.next( searchTerm );
}


}


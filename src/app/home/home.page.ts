import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor() {}
  usuario1 = {
    nombre: "Juan",
    apellidos: "Fernández García",
    edad: 18
  }
  usuario2 = {
    nombre: "Lamine",
    apellidos: "Yamal",
    edad: 16
  }
  usuario3 = {
    nombre: "Amador",
    apellidos: "Rivas Latorre",
    edad: 46
  }
  usuario4 = {
    nombre: "Aitana",
    apellidos: "Ocaña Morales",
    edad: 24
  }
  usuario5 = {
    nombre: "Olga",
    apellidos: "Carmona García",
    edad: 23
  }
}

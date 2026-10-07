import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonCard, IonCardHeader, IonCardTitle, IonCardContent,
  IonItem, IonInput, IonButton, IonList, IonLabel
} from '@ionic/angular';
import { GeometriaService, ResultadoTriangulo } from '../services/geometria.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonCard, IonCardHeader, IonCardTitle, IonCardContent,
    IonItem, IonInput, IonButton, IonList, IonLabel
  ]
})
export class HomePage {
  ladoA: number = 5;
  ladoB: number = 5;
  ladoC: number = 8;
  resultado: ResultadoTriangulo | null = null;

  ladosMaximos: number = 8;
  poligonos: any[] = [];

  limiteFib: number = 50;
  ladosFib: number[] = [];

  constructor(private geometria: GeometriaService) {
    this.generarTabla();
    this.dibujarFibonacci();
  }

  clasificar() {
    this.resultado = this.geometria.clasificarTriangulo(Number(this.ladoA), Number(this.ladoB), Number(this.ladoC));
  }

  generarTabla() {
    this.poligonos = this.geometria.tablaPoligonos(Number(this.ladosMaximos));
  }

  dibujarFibonacci() {
    this.ladosFib = this.geometria.cuadradosFibonacci(Number(this.limiteFib));
  }
}
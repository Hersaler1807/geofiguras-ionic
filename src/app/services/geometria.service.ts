import { Injectable } from '@angular/core';

export interface ResultadoTriangulo {
  valido: boolean; 
  tipo: string; 
  perimetro?: number; 
  area?: number; 
  mensaje?: string;
}

@Injectable({ providedIn: 'root' })
export class GeometriaService {

  clasificarTriangulo(a: number, b: number, c: number): ResultadoTriangulo {
    if (a <= 0 || b <= 0 || c <= 0) {
      return { valido: false, tipo: 'Valores inválidos', mensaje: 'Todos los lados deben ser mayores que 0' };
    }
    if (a + b <= c || a + c <= b || b + c <= a) {
      return { valido: false, tipo: 'No forma triángulo', mensaje: 'No cumple la desigualdad triangular' };
    }
    let tipo: string;
    if (a === b && b === c) {
      tipo = 'Equilátero';
    } else if (a === b || b === c || a === c) {
      tipo = 'Isósceles';
    } else {
      tipo = 'Escaleno';
    }
    const p = a + b + c, s = p / 2;
    const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
    return { valido: true, tipo, perimetro: +p.toFixed(2), area: +area.toFixed(2) };
  }

  calcularArea(figura: string, m1: number, m2 = 0): number {
    let area: number;
    switch (figura) {
      case 'circulo':    area = Math.PI * m1 ** 2; break;
      case 'cuadrado':   area = m1 * m1;           break;
      case 'rectangulo': area = m1 * m2;           break;
      case 'triangulo':  area = (m1 * m2) / 2;     break;
      default: return -1;
    }
    return +area.toFixed(2);
  }

  private readonly NOMBRES: Record<number, string> = {
    3: 'Triángulo', 4: 'Cuadrilátero', 5: 'Pentágono', 6: 'Hexágono', 7: 'Heptágono',
    8: 'Octágono', 9: 'Eneágono', 10: 'Decágono', 11: 'Endecágono', 12: 'Dodecágono'
  };

  tablaPoligonos(max: number) {
    const tabla = [];
    for (let n = 3; n <= max; n++) {
      const suma = (n - 2) * 180;
      tabla.push({ 
        lados: n, 
        nombre: this.NOMBRES[n] ?? `Polígono de ${n} lados`,
        sumaAngulos: suma, 
        anguloInterior: +(suma / n).toFixed(2) 
      });
    }
    return tabla;
  }

  cuadradosFibonacci(limite: number): number[] {
    const lados: number[] = [];
    let a = 1, b = 1;
    while (a <= limite) {
      lados.push(a);
      [a, b] = [b, a + b];
    }
    return lados;
  }
}
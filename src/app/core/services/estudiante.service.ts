import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Estudiante } from '../models/estudiante.model';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {

  private estudianteSub = new BehaviorSubject<Estudiante[]>([

    {
      id: 1,
      nombre: 'Kevin',
      apellido: 'Olivella',
      edad: 32,
      email: 'kevinolivella@gmail.com',
      fechaNacimiento: new Date('1993-02-26'),
      activo: true,
    },
    {
      id: 2,
      nombre: 'Debora',
      apellido: 'Olivella',
      edad: 28,
      email: 'deboramamacita@gmail.com',
      fechaNacimiento: new Date('1995-05-15'),
      activo: true,
    }
  ]);

  private currentId = 3;
  constructor() { }

  getEstudiantes(): Observable<Estudiante[]> {
    return this.estudianteSub.asObservable();
  }

  agregar(estudiante: Omit<Estudiante, 'id'>): void {
    const nuevoEstudiante = [... this.estudianteSub.value];
    nuevoEstudiante.push({
      ...estudiante,
      id: this.currentId++
    });
    this.estudianteSub.next(nuevoEstudiante);
  }

  editar(estudianteEditado: Estudiante): void {
    const actualizados = this.estudianteSub.value.map(est =>
      est.id === estudianteEditado.id ? estudianteEditado : est
    );
    this.estudianteSub.next(actualizados);
  }

  eliminar(id: number): void {
    const filtrado = this.estudianteSub.value.filter(est => est.id !== id);
    this.estudianteSub.next(filtrado);
  }

  gerPorId(id: number): Estudiante | undefined {
    return this.estudianteSub.value.find(est => est.id === id);
}
}

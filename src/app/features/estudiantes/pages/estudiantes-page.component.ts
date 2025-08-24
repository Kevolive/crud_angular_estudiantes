import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Estudiante } from '../../../core/models/estudiante.model';
import { EstudianteService } from '../../../core/services/estudiante.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EstudianteFormComponent } from '../components/estudiante-form.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';


@Component({
  selector: 'app-estudiantes-page',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatDialogModule,MatProgressSpinnerModule, MatIconModule, MatTooltipModule   ],
  templateUrl: './estudiantes-page.component.html',
  styleUrls: ['./estudiantes-page.component.css']
})
export class EstudiantesPageComponent {
  columnas: string[] = ['id', 'nombre', 'apellido', 'edad', 'email', 'fechaNacimiento', 'activo', 'acciones'];

  private estudianteService = inject(EstudianteService);
  private dialog = inject(MatDialog);
  dataSource = new MatTableDataSource<Estudiante>([]);

  isLoading = true;

  constructor() {
    this.estudianteService.getEstudiantes().subscribe(estudiantes => {
      setTimeout(() => {
        this.dataSource.data = estudiantes;
        this.isLoading = false;
      }, 2000); // Simula un retraso de 2 segundos
    });
  }

crearEstudiante(){
const dialogRef = this.dialog.open(EstudianteFormComponent, {
  width: '500px',
  data: {}

});

 dialogRef.afterClosed().subscribe((resultado) => {
    if (resultado) {
      this.estudianteService.agregar(resultado);
    }
  });

}
editarEstudiante(estudiante: Estudiante) {
  const dialogRef = this.dialog.open(EstudianteFormComponent, {
    width: '500px',
    data: estudiante
  });

  dialogRef.afterClosed().subscribe((resultado) => {
    if (resultado) {
      this.estudianteService.editar(resultado);
    }
  });
}

eliminarEstudiante(estudiante: Estudiante) {
    const confirmacion = confirm(`¿Eliminar a ${estudiante.nombre} ${estudiante.apellido}?`);
    if (confirmacion) {
      this.estudianteService.eliminar(estudiante.id);
    }
  }
}

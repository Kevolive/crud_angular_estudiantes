import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Estudiante } from '../../../core/models/estudiante.model';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-estudiante-form',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule],
  templateUrl: './estudiante-form.component.html',
  styleUrl: './estudiante-form.component.css'
})
export class EstudianteFormComponent {

  private fb = inject(FormBuilder);
  private dialogfRef = inject(MatDialogRef<EstudianteFormComponent>);
  private data = inject(MAT_DIALOG_DATA) as Partial<Estudiante>;

  form: FormGroup = this.fb.group({
    nombre: [this.data.nombre || '', Validators.required],
    apellido: [this.data.apellido || '', Validators.required],
    edad: [this.data.edad || '', [Validators.required, Validators.min(1)]],
    fechaNacimiento: [this.data.fechaNacimiento || '', Validators.required],
    email: [this.data.email || '', [Validators.required, Validators.email]],
    activo: [this.data.activo ?? true],
    id: [this.data.id ?? null]
  });


  guardar() {
    if (this.form.valid) {
      this.dialogfRef.close(this.form.value);
    }
  }

  cancelar() {
    this.dialogfRef.close();
  }

}

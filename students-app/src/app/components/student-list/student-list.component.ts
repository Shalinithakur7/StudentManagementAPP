import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { StudentService } from '../../services/student.service';
import { AuthService } from '../../services/auth.service';
import { Student } from '../../interfaces/student';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];
  studentForm: FormGroup;
  isEditing: boolean = false;
  editingStudentId: number | null = null;

  constructor(
    private studentService: StudentService,
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.studentForm = this.fb.group({
      name: ['', Validators.required],
      class: ['', Validators.required],
      section: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents() {
    this.studentService.getStudents().subscribe({
      next: (data) => this.students = data,
      error: (err) => console.error('Failed to load students', err)
    });
  }

  // --- CRUD Operations ---

  saveStudent() {
    if (this.studentForm.invalid) {
      return;
    }

    if (this.isEditing && this.editingStudentId !== null) {
      // Update existing student
      const updatedStudent: Student = { ...this.studentForm.value, id: this.editingStudentId };
      this.studentService.updateStudent(updatedStudent).subscribe({
        next: () => {
          this.loadStudents(); // Refresh list
          this.resetForm();
        },
        error: (err) => console.error('Update failed', err)
      });
    } else {
      // Add new student
      this.studentService.addStudent(this.studentForm.value).subscribe({
        next: () => {
          this.loadStudents(); // Refresh list
          this.resetForm();
        },
        error: (err) => console.error('Add failed', err)
      });
    }
  }

  editStudent(student: Student) {
    this.isEditing = true;
    this.editingStudentId = student.id!;
    this.studentForm.setValue({
      name: student.name,
      class: student.class,
      section: student.section
    });
  }

  deleteStudent(id: number) {
    if (confirm('Are you sure you want to delete this student?')) {
      this.studentService.deleteStudent(id).subscribe({
        next: () => this.loadStudents(), // Refresh list
        error: (err) => console.error('Delete failed', err)
      });
    }
  }

  resetForm() {
    this.isEditing = false;
    this.editingStudentId = null;
    this.studentForm.reset();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
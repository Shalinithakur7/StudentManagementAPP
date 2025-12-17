import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StudentService } from '../../services/student';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student.html',
  styleUrls: ['./student.css']
})
export class StudentComponent implements OnInit {
  students: any[] = [];
  
  // Model
  newStudent = { id: 0, name: '', class: '', section: '' };
  
  // State flags
  isEditMode = false;
  isLoading = false;

  constructor(private service: StudentService) {}

  ngOnInit() {
    this.loadStudents();
  }

  loadStudents() {
    console.log('Loading students...');
    this.service.getStudents().subscribe({
      next: (data) => {
        console.log('Students loaded:', data);
        this.students = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load students', err);
        this.isLoading = false;
      }
    });
  }

save() {
    if (this.isEditMode) {
      // UPDATE logic
      this.service.updateStudent(this.newStudent).subscribe(() => {
        alert('Student Updated!');
        this.resetForm();
      });
    } else {
      // ADD logic
      this.service.addStudent(this.newStudent).subscribe(() => {
        alert('Student Added!');
        this.resetForm();
      });
    }
  }
  onEdit(student: any) {
    this.isEditMode = true;
    this.newStudent = { ...student }; 
  }

  onDelete(id: number) {
    if (confirm('Are you sure?')) {
      this.service.deleteStudent(id).subscribe(() => this.loadStudents());
    }
  }

  resetForm() {
    this.newStudent = { id: 0, name: '', class: '', section: '' };
    this.isEditMode = false;
    this.loadStudents();
  }
}
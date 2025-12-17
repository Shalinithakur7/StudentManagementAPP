import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  // IMPORTANT: Matches your Swagger port (7194) and Controller route (api/Students)
  private apiUrl = 'https://localhost:7194/api/Students';
  private authUrl = 'https://localhost:7194/api/Auth';

  constructor(private http: HttpClient) {}

  // --- Auth Methods (Matches Reference) ---
  
  login(data: any) {
    // Matches: http://localhost:7194/api/Auth/Login
    return this.http.post<any>(`${this.authUrl}/Login`, data);
  }

  register(data: any) {
    // Matches: http://localhost:7194/api/Auth/Register
    return this.http.post<any>(`${this.authUrl}/Register`, data);
  }

  // --- Helper to Attach Token ---
  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return { headers: { Authorization: `Bearer ${token}` } };
  }

  // --- CRUD Methods (Matches Reference) ---

  // GET: Fetch all students
  getStudents(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, this.getAuthHeaders());
  }

  // POST: Add a new student
  addStudent(student: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, student, this.getAuthHeaders());
  }

  // PUT: Update an existing student (Matches reference logic: URL/id)
  updateStudent(student: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${student.id}`, student, this.getAuthHeaders());
  }

  // DELETE: Remove a student
  deleteStudent(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, this.getAuthHeaders());
  }
}
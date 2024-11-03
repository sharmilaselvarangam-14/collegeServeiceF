import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './environments/environment-ts';

export interface College {
  id?: number;
  collegeName: string | null;
  location: string | null;
  establishedYear: number | null;
}

@Injectable({
  providedIn: 'root'
})
export class CollegeService {
  private apiUrl = `${environment.apiUrl}/colleges`;

  constructor(private http: HttpClient) {}

  getColleges(): Observable<College[]> {
    return this.http.get<College[]>(this.apiUrl);
  }

  getCollege(id: number): Observable<College> {
    return this.http.get<College>(`${this.apiUrl}/${id}`);
  }

  createCollege(college: College): Observable<College> {
    return this.http.post<College>(this.apiUrl, college);
  }

  updateCollege(college: College): Observable<College> {
    return this.http.put<College>(`${this.apiUrl}/${college.id}`, college);
  }

  deleteCollege(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getCollegesByName(name: string): Observable<College[]> {
    return this.http.get<College[]>(`${this.apiUrl}/name/${name}`);
  }
}

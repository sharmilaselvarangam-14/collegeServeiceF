import { Component, OnInit } from '@angular/core';
import { CollegeService, College } from './college.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  colleges: College[] = [];
  currentCollege: College = { collegeName: null, location: null, establishedYear: null };
  editMode = false;

  constructor(private collegeService: CollegeService) {}

  ngOnInit() {
    this.loadColleges();
  }

  loadColleges() {
    this.collegeService.getColleges().subscribe(
      (data: College[]) => this.colleges = data,
      (error: any) => console.error('Error fetching colleges:', error)
    );
  }

  onSubmit() {
    if (this.editMode) {
      this.collegeService.updateCollege(this.currentCollege).subscribe(
        () => {
          this.loadColleges();
          this.resetForm();
        },
        (error: any) => console.error('Error updating college:', error)
      );
    } else {
      this.collegeService.createCollege(this.currentCollege).subscribe(
        () => {
          this.loadColleges();
          this.resetForm();
        },
        (error: any) => console.error('Error creating college:', error)
      );
    }
  }

  editCollege(college: College) {
    this.currentCollege = { ...college };
    this.editMode = true;
  }

  deleteCollege(id: number | undefined) {
    if (id !== undefined) {
      this.collegeService.deleteCollege(id).subscribe(
        () => this.loadColleges(),
        (error: any) => console.error('Error deleting college:', error)
      );
    }
  }

  resetForm() {
    this.currentCollege = { collegeName: null, location: null, establishedYear: null };
    this.editMode = false;
  }
}

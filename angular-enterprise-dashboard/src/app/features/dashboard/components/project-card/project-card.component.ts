import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Project, ProjectStatus } from '../../../../core/models/project.model';

/**
 * Project Card Presentation Component
 *
 * Displays a single project card with Material UI components.
 * Emits events for user interactions (select, edit, delete).
 * Receives all data via @Input - no state management.
 */
@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatChipsModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule
  ],
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css']
})
export class ProjectCardComponent {
  @Input({ required: true }) project!: Project;
  @Input() selected = false;

  @Output() view = new EventEmitter<Project>();
  @Output() edit = new EventEmitter<Project>();
  @Output() delete = new EventEmitter<Project>();

  onView(event: Event): void {
    event.stopPropagation();
    this.view.emit(this.project);
  }

  onEdit(event: Event): void {
    event.stopPropagation();
    this.edit.emit(this.project);
  }

  onDelete(event: Event): void {
    event.stopPropagation();
    this.delete.emit(this.project);
  }

  getStatusLabel(status: ProjectStatus): string {
    const labels: Record<ProjectStatus, string> = {
      planning: 'Planning',
      active: 'Active',
      'on-hold': 'On Hold',
      completed: 'Completed',
      cancelled: 'Cancelled'
    };
    return labels[status];
  }

  getProgressColor(progress: number): 'primary' | 'accent' | 'warn' {
    if (progress >= 75) return 'primary';
    if (progress >= 40) return 'accent';
    return 'warn';
  }
}

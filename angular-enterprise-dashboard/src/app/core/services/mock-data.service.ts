import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Project, Activity, DashboardStats } from '../models';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  // Mock Projects
  private mockProjects: Project[] = [
    {
      id: '1',
      name: 'Website Redesign',
      description: 'Complete redesign of company website with modern UI/UX',
      status: 'active',
      priority: 'high',
      progress: 65,
      startDate: '2026-01-15T00:00:00.000Z',
      endDate: '2026-03-15T00:00:00.000Z',
      teamMembers: ['Alice Johnson', 'Bob Smith', 'Carol White'],
      budget: 50000,
      spent: 32500,
      tags: ['web', 'design', 'frontend'],
      createdAt: '2026-01-10T00:00:00.000Z',
      updatedAt: '2026-01-29T00:00:00.000Z'
    },
    {
      id: '2',
      name: 'Mobile App Development',
      description: 'iOS and Android mobile application',
      status: 'active',
      priority: 'critical',
      progress: 45,
      startDate: '2026-01-01T00:00:00.000Z',
      endDate: '2026-04-30T00:00:00.000Z',
      teamMembers: ['David Lee', 'Emma Davis', 'Frank Miller'],
      budget: 120000,
      spent: 54000,
      tags: ['mobile', 'ios', 'android'],
      createdAt: '2025-12-20T00:00:00.000Z',
      updatedAt: '2026-01-28T00:00:00.000Z'
    },
    {
      id: '3',
      name: 'Database Migration',
      description: 'Migrate legacy database to cloud infrastructure',
      status: 'on-hold',
      priority: 'medium',
      progress: 30,
      startDate: '2025-12-01T00:00:00.000Z',
      endDate: '2026-02-28T00:00:00.000Z',
      teamMembers: ['Grace Taylor', 'Henry Wilson'],
      budget: 75000,
      spent: 22500,
      tags: ['database', 'cloud', 'infrastructure'],
      createdAt: '2025-11-25T00:00:00.000Z',
      updatedAt: '2026-01-20T00:00:00.000Z'
    },
    {
      id: '4',
      name: 'Marketing Campaign',
      description: 'Q1 digital marketing campaign across social media',
      status: 'completed',
      priority: 'low',
      progress: 100,
      startDate: '2026-01-01T00:00:00.000Z',
      endDate: '2026-01-31T00:00:00.000Z',
      teamMembers: ['Ivy Brown', 'Jack Anderson'],
      budget: 30000,
      spent: 28500,
      tags: ['marketing', 'social-media', 'digital'],
      createdAt: '2025-12-15T00:00:00.000Z',
      updatedAt: '2026-01-30T00:00:00.000Z'
    }
  ];

  // Mock Activities
  private mockActivities: Activity[] = [
    {
      id: 'a1',
      projectId: '1',
      projectName: 'Website Redesign',
      type: 'updated',
      description: 'Progress updated to 65%',
      user: 'Alice Johnson',
      timestamp: '2026-01-29T14:30:00.000Z'
    },
    {
      id: 'a2',
      projectId: '2',
      projectName: 'Mobile App Development',
      type: 'status_changed',
      description: 'Status changed to Active',
      user: 'David Lee',
      timestamp: '2026-01-28T10:15:00.000Z'
    },
    {
      id: 'a3',
      projectId: '4',
      projectName: 'Marketing Campaign',
      type: 'completed',
      description: 'Project marked as completed',
      user: 'Ivy Brown',
      timestamp: '2026-01-30T09:00:00.000Z'
    },
    {
      id: 'a4',
      projectId: '3',
      projectName: 'Database Migration',
      type: 'status_changed',
      description: 'Status changed to On Hold',
      user: 'Grace Taylor',
      timestamp: '2026-01-20T16:45:00.000Z'
    },
    {
      id: 'a5',
      projectId: '1',
      projectName: 'Website Redesign',
      type: 'updated',
      description: 'Added new team member',
      user: 'Bob Smith',
      timestamp: '2026-01-27T11:20:00.000Z'
    }
  ];

  // Get all projects (simulates GET /api/projects)
  getProjects(): Observable<Project[]> {
    return of([...this.mockProjects]).pipe(delay(800)); // Simulate network delay
  }

  // Get single project (simulates GET /api/projects/:id)
  getProject(id: string): Observable<Project | null> {
    const project = this.mockProjects.find(p => p.id === id);
    return of(project || null).pipe(delay(500));
  }

  // Get dashboard statistics (simulates GET /api/dashboard/stats)
  getDashboardStats(): Observable<DashboardStats> {
    const stats: DashboardStats = {
      totalProjects: this.mockProjects.length,
      activeProjects: this.mockProjects.filter(p => p.status === 'active').length,
      completedProjects: this.mockProjects.filter(p => p.status === 'completed').length,
      onHoldProjects: this.mockProjects.filter(p => p.status === 'on-hold').length,
      totalBudget: this.mockProjects.reduce((sum, p) => sum + p.budget, 0),
      totalSpent: this.mockProjects.reduce((sum, p) => sum + p.spent, 0),
      averageProgress:
        this.mockProjects.reduce((sum, p) => sum + p.progress, 0) / this.mockProjects.length
    };
    return of(stats).pipe(delay(600));
  }

  // Get recent activities (simulates GET /api/activities)
  getRecentActivities(): Observable<Activity[]> {
    return of([...this.mockActivities]).pipe(delay(700));
  }

  // Create project (simulates POST /api/projects)
  createProject(project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Observable<Project> {
    const newProject: Project = {
      ...project,
      id: `${Date.now()}`, // Generate ID
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.mockProjects.push(newProject);
    return of(newProject).pipe(delay(1000));
  }

  // Update project (simulates PUT /api/projects/:id)
  updateProject(update: Partial<Project> & Pick<Project, 'id'>): Observable<Project> {
    const index = this.mockProjects.findIndex(p => p.id === update.id);
    if (index === -1) {
      return throwError(() => new Error('Project not found'));
    }
    const updatedProject: Project = {
      ...this.mockProjects[index]!,
      ...update,
      updatedAt: new Date().toISOString()
    };
    this.mockProjects[index] = updatedProject;
    return of(updatedProject).pipe(delay(800));
  }

  // Delete project (simulates DELETE /api/projects/:id)
  deleteProject(id: string): Observable<void> {
    const index = this.mockProjects.findIndex(p => p.id === id);
    if (index === -1) {
      return throwError(() => new Error('Project not found'));
    }
    this.mockProjects.splice(index, 1);
    return of(undefined).pipe(delay(600));
  }
}

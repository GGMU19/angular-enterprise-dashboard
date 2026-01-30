import {
  Project,
  Activity,
  DashboardStats,
  ProjectStatus,
  ProjectPriority,
  ActivityType
} from '../../../core/models';

export function createMockProject(overrides: Partial<Project> = {}): Project {
  return {
    id: '1',
    name: 'Test Project',
    description: 'Test Description',
    status: 'active' as ProjectStatus,
    priority: 'medium' as ProjectPriority,
    progress: 50,
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    teamMembers: ['user1'],
    budget: 100000,
    spent: 50000,
    tags: ['frontend', 'angular'],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    ...overrides
  };
}

export function createMockActivity(overrides: Partial<Activity> = {}): Activity {
  return {
    id: '1',
    projectId: 'project-1',
    projectName: 'Test Project',
    type: 'created' as ActivityType,
    description: 'Project created',
    user: 'John Doe',
    timestamp: '2024-01-01T00:00:00Z',
    ...overrides
  };
}

export function createMockStats(overrides: Partial<DashboardStats> = {}): DashboardStats {
  return {
    totalProjects: 10,
    activeProjects: 5,
    completedProjects: 3,
    onHoldProjects: 2,
    totalBudget: 1000000,
    totalSpent: 500000,
    averageProgress: 50,
    ...overrides
  };
}

export function createMockCreateProject(
  overrides: Partial<Omit<Project, 'id' | 'createdAt' | 'updatedAt'>> = {}
): Omit<Project, 'id' | 'createdAt' | 'updatedAt'> {
  return {
    name: 'New Project',
    description: 'New Description',
    status: 'planning' as ProjectStatus,
    priority: 'medium' as ProjectPriority,
    progress: 0,
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    teamMembers: [],
    budget: 100000,
    spent: 0,
    tags: [],
    ...overrides
  };
}

// Project Status Types
export type ProjectStatus = 'planning' | 'active' | 'on-hold' | 'completed' | 'cancelled';

// Project Priority Types
export type ProjectPriority = 'low' | 'medium' | 'high' | 'critical';

// Project Interface
export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  priority: ProjectPriority;
  progress: number; // 0-100
  startDate: string; // ISO date string
  endDate: string; // ISO date string
  teamMembers: string[]; // Array of member names
  budget: number;
  spent: number;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

// Partial project for updates (all fields optional except id)
export type ProjectUpdate = Partial<Project> & Pick<Project, 'id'>;

// New project creation (no id, timestamps)
export type CreateProject = Omit<Project, 'id' | 'createdAt' | 'updatedAt'>;

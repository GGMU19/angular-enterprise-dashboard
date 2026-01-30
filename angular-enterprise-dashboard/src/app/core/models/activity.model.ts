// Activity Type
export type ActivityType = 'created' | 'updated' | 'completed' | 'deleted' | 'status_changed';

// Activity Interface
export interface Activity {
  id: string;
  projectId: string;
  projectName: string;
  type: ActivityType;
  description: string;
  user: string;
  timestamp: string; // ISO date string
}

export type LessonStatus = 'pending' | 'in-progress' | 'completed';

export interface LessonPlan {
  id: string;
  course: string;
  topic: string;
  date: string;       // YYYY-MM-DD
  duration: number;   // in minutes
  status: LessonStatus;
  notes: string;
}

export interface TeacherProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  expertise: string;
  bio: string;
  avatarUrl?: string;
}

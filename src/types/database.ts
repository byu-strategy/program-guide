// TypeScript interfaces for all Supabase tables

export interface Person {
  id: number;
  cohort_year: number | null;
  first_name: string;
  last_name: string;
  netid: string | null;
  linkedin_url: string | null;
  linkedin_slug: string | null;
  type: 'Major' | 'Minor' | 'Major (Survey)' | null;
  pdl_id: string | null;
  sex: string | null;
  birth_year: number | null;
  industry: string | null;
  current_job_title: string | null;
  current_company: string | null;
  location_city: string | null;
  location_state: string | null;
  location_country: string | null;
  location_geo: string | null;
  grad_date: string | null;
  last_enriched_at: string | null;
  self_updated_at: string | null;
  bio: string | null;
  mentor_available: boolean;
  contact_preference: 'email' | 'linkedin' | 'none' | null;
  profile_photo_url: string | null;
  track: string | null;
  target_roles: string | null;
  gpa: number | null;
  resume_url: string | null;
  internship_experience: string | null;
  created_at: string;
  updated_at: string;
}

export interface Email {
  id: number;
  person_id: number;
  address: string;
  type: 'personal' | 'professional' | 'work' | 'other' | null;
  source: 'alumni_db' | 'survey' | 'pdl' | 'applicant' | 'manual' | 'registrar' | null;
  is_valid: boolean;
  first_seen_at: string;
  last_seen_at: string;
}

export interface Experience {
  id: number;
  person_id: number;
  sort_order: number | null;
  company_name: string | null;
  job_title: string | null;
  start_date: string | null;
  end_date: string | null;
  is_current: boolean;
  company_industry: string | null;
  company_size: string | null;
  company_website: string | null;
  company_linkedin_url: string | null;
  pdl_job_last_changed: string | null;
  role_bucket: string | null;
  source: 'pdl' | 'self';
  first_seen_at: string;
  last_seen_at: string;
  removed_at: string | null;
}

export interface Education {
  id: number;
  person_id: number;
  sort_order: number | null;
  school_name: string | null;
  degree: string | null;
  major: string | null;
  start_date: string | null;
  end_date: string | null;
  first_seen_at: string;
  last_seen_at: string;
}

export type UserRole = 'student' | 'alumni' | 'employer' | 'faculty' | 'friend';

export interface UserProfile {
  id: string; // uuid
  person_id: number | null;
  role: UserRole;
  display_name: string | null;
  created_at: string;
}

export interface Job {
  id: number;
  posted_by: string; // uuid
  company_name: string;
  title: string;
  description: string | null;
  location: string | null;
  job_type: 'full-time' | 'internship' | 'part-time' | 'contract' | null;
  role_bucket: string | null;
  url: string | null;
  contact_email: string | null;
  is_active: boolean;
  is_consortium_priority: boolean;
  created_at: string;
  expires_at: string | null;
}

export interface MentorRequest {
  id: number;
  student_id: string; // uuid
  mentor_person_id: number;
  message: string | null;
  status: 'pending' | 'accepted' | 'declined';
  created_at: string;
}

export interface ConsortiumMember {
  id: number;
  user_id: string; // uuid
  company_name: string;
  tier: 'member';
  contact_name: string | null;
  contact_email: string | null;
  starts_at: string;
  expires_at: string;
  is_active: boolean;
  created_at: string;
}

export interface NewsletterSubscriber {
  id: number;
  email: string;
  person_id: number | null;
  type: 'alumni' | 'student' | 'employer' | 'faculty' | 'friend';
  subscribed_at: string;
  unsubscribed_at: string | null;
}

export interface DirectoryClick {
  id: number;
  clicked_by: string; // uuid
  person_id: number;
  click_type: 'profile_view' | 'linkedin_click';
  created_at: string;
}

// View types
export interface FirstPostGradJob {
  person_id: number;
  first_name: string;
  last_name: string;
  cohort_year: number | null;
  type: string | null;
  grad_date: string | null;
  job_rank: number;
  company_name: string | null;
  job_title: string | null;
  raw_start_date: string | null;
  raw_end_date: string | null;
  norm_start: string | null;
  norm_end: string | null;
  company_industry: string | null;
  company_size: string | null;
  role_bucket: string | null;
}

export const ROLE_BUCKETS = [
  'Consulting',
  'Corporate Strategy',
  'Finance - Banking/PE/VC',
  'Finance - Corporate',
  'Product Management',
  'Product Adjacent',
  'Customer Success',
  'Entrepreneurship',
  'Marketing/Advertising',
  'Legal',
  'Healthcare',
  'Religious Institutions',
  'Government/Military',
  'Other',
] as const;

export type RoleBucket = (typeof ROLE_BUCKETS)[number];

// Color mapping for role buckets (used in charts)
export const ROLE_BUCKET_COLORS: Record<string, string> = {
  'Consulting': '#002E5D',
  'Corporate Strategy': '#003DA5',
  'Finance - Banking/PE/VC': '#006FA8',
  'Finance - Corporate': '#5B7F95',
  'Product Management': '#F2CD00',
  'Product Adjacent': '#DC8633',
  'Customer Success': '#6FA287',
  'Entrepreneurship': '#9E652E',
  'Marketing/Advertising': '#9B7793',
  'Legal': '#72246C',
  'Healthcare': '#44693D',
  'Religious Institutions': '#7C878E',
  'Government/Military': '#493C38',
  'Other': '#adb5bd',
};

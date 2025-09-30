export interface City {
  id: string;
  name: string;
  name_ar: string;
  population: number;
  innovation_rank: number;
  description: string;
  created_at: string;
}

export interface ProjectType {
  id: string;
  name: string;
  name_ar: string;
  description: string;
  icon: string;
  created_at: string;
}

export interface Project {
  id: string;
  title: string;
  title_ar: string;
  description: string;
  short_description: string;
  project_type_id: string;
  city_id: string;
  impact_level: 'high' | 'medium' | 'low';
  status: 'planning' | 'active' | 'completed';
  start_date: string;
  completion_date: string | null;
  budget: number;
  partners: string[];
  outcomes: Record<string, any>;
  image_url: string;
  created_at: string;
  updated_at: string;
  project_type?: ProjectType;
  city?: City;
}

export interface Statistics {
  id: string;
  category: 'adoption_rates' | 'energy_savings' | 'traffic_flow' | 'city_rankings';
  data: any;
  year: number;
  updated_at: string;
}

export interface FilterOptions {
  projectType: string;
  location: string;
  impactLevel: string;
  searchQuery: string;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  [key: string]: any;
}

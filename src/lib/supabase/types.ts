export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string | null
          avatar_url: string | null
          plan: 'free' | 'premium' | 'family_plus'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          avatar_url?: string | null
          plan?: 'free' | 'premium' | 'family_plus'
          created_at?: string
          updated_at?: string
        }
        Update: {
          full_name?: string | null
          avatar_url?: string | null
          plan?: 'free' | 'premium' | 'family_plus'
          updated_at?: string
        }
      }
      children: {
        Row: {
          id: string
          user_id: string
          name: string
          date_of_birth: string
          gender: 'male' | 'female' | 'other' | null
          photo_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          date_of_birth: string
          gender?: 'male' | 'female' | 'other' | null
          photo_url?: string | null
          created_at?: string
        }
        Update: {
          name?: string
          date_of_birth?: string
          gender?: 'male' | 'female' | 'other' | null
          photo_url?: string | null
        }
      }
      growth_records: {
        Row: {
          id: string
          child_id: string
          recorded_at: string
          weight_kg: number | null
          height_cm: number | null
          head_cm: number | null
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          child_id: string
          recorded_at: string
          weight_kg?: number | null
          height_cm?: number | null
          head_cm?: number | null
          notes?: string | null
        }
        Update: {
          weight_kg?: number | null
          height_cm?: number | null
          head_cm?: number | null
          notes?: string | null
        }
      }
      nutrition_logs: {
        Row: {
          id: string
          child_id: string
          logged_at: string
          meal_type: 'breakfast' | 'snack' | 'lunch' | 'dinner'
          foods: Json
          total_calories: number | null
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          child_id: string
          logged_at: string
          meal_type: 'breakfast' | 'snack' | 'lunch' | 'dinner'
          foods: Json
          total_calories?: number | null
          notes?: string | null
        }
        Update: {
          foods?: Json
          total_calories?: number | null
          notes?: string | null
        }
      }
      vaccinations: {
        Row: {
          id: string
          child_id: string
          vaccine_name: string
          due_date: string | null
          administered_date: string | null
          administered_by: string | null
          batch_number: string | null
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          child_id: string
          vaccine_name: string
          due_date?: string | null
          administered_date?: string | null
          administered_by?: string | null
          batch_number?: string | null
          notes?: string | null
        }
        Update: {
          due_date?: string | null
          administered_date?: string | null
          administered_by?: string | null
          batch_number?: string | null
          notes?: string | null
        }
      }
      health_logs: {
        Row: {
          id: string
          child_id: string
          type: 'illness' | 'medication' | 'doctor_visit' | 'symptom'
          title: string
          description: string | null
          severity: 'mild' | 'moderate' | 'severe' | null
          logged_at: string
          resolved_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          child_id: string
          type: 'illness' | 'medication' | 'doctor_visit' | 'symptom'
          title: string
          description?: string | null
          severity?: 'mild' | 'moderate' | 'severe' | null
          logged_at?: string
          resolved_at?: string | null
        }
        Update: {
          title?: string
          description?: string | null
          severity?: 'mild' | 'moderate' | 'severe' | null
          resolved_at?: string | null
        }
      }
      documents: {
        Row: {
          id: string
          child_id: string
          uploaded_by: string
          name: string
          type: 'birth_cert' | 'vaccination_cert' | 'prescription' | 'insurance' | 'other'
          file_url: string
          file_size: number | null
          created_at: string
        }
        Insert: {
          id?: string
          child_id: string
          uploaded_by: string
          name: string
          type: 'birth_cert' | 'vaccination_cert' | 'prescription' | 'insurance' | 'other'
          file_url: string
          file_size?: number | null
        }
        Update: {
          name?: string
          type?: 'birth_cert' | 'vaccination_cert' | 'prescription' | 'insurance' | 'other'
        }
      }
      family_members: {
        Row: {
          id: string
          child_id: string
          invited_by: string
          user_id: string | null
          email: string
          role: 'co_parent' | 'grandparent' | 'nanny' | 'doctor'
          status: 'pending' | 'accepted' | 'declined'
          created_at: string
        }
        Insert: {
          id?: string
          child_id: string
          invited_by: string
          user_id?: string | null
          email: string
          role: 'co_parent' | 'grandparent' | 'nanny' | 'doctor'
          status?: 'pending' | 'accepted' | 'declined'
        }
        Update: {
          user_id?: string | null
          role?: 'co_parent' | 'grandparent' | 'nanny' | 'doctor'
          status?: 'pending' | 'accepted' | 'declined'
        }
      }
    }
  }
}

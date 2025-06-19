export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string | null
          avatar_url: string | null
          subscription_type: 'free' | 'pro' | 'premium'
          daily_quota: number
          used_quota: number
          quota_reset_date: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          name?: string | null
          avatar_url?: string | null
          subscription_type?: 'free' | 'pro' | 'premium'
          daily_quota?: number
          used_quota?: number
          quota_reset_date?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          avatar_url?: string | null
          subscription_type?: 'free' | 'pro' | 'premium'
          daily_quota?: number
          used_quota?: number
          quota_reset_date?: string
          created_at?: string
          updated_at?: string
        }
      }
      templates: {
        Row: {
          id: string
          name: string
          description: string | null
          style_type: string
          preview_image_url: string
          style_prompt: string
          required_images: number
          is_premium: boolean
          sort_order: number
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          style_type: string
          preview_image_url: string
          style_prompt: string
          required_images?: number
          is_premium?: boolean
          sort_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          style_type?: string
          preview_image_url?: string
          style_prompt?: string
          required_images?: number
          is_premium?: boolean
          sort_order?: number
          created_at?: string
        }
      }
      processing_tasks: {
        Row: {
          id: string
          user_id: string
          template_id: string
          status: 'queued' | 'processing' | 'completed' | 'failed'
          input_images: any
          output_images: any | null
          error_message: string | null
          processing_started_at: string | null
          processing_completed_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          template_id: string
          status?: 'queued' | 'processing' | 'completed' | 'failed'
          input_images: any
          output_images?: any | null
          error_message?: string | null
          processing_started_at?: string | null
          processing_completed_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          template_id?: string
          status?: 'queued' | 'processing' | 'completed' | 'failed'
          input_images?: any
          output_images?: any | null
          error_message?: string | null
          processing_started_at?: string | null
          processing_completed_at?: string | null
          created_at?: string
        }
      }
      user_artworks: {
        Row: {
          id: string
          user_id: string
          task_id: string
          title: string | null
          thumbnail_url: string
          full_image_url: string
          template_id: string
          is_public: boolean
          view_count: number
          like_count: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          task_id: string
          title?: string | null
          thumbnail_url: string
          full_image_url: string
          template_id: string
          is_public?: boolean
          view_count?: number
          like_count?: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          task_id?: string
          title?: string | null
          thumbnail_url?: string
          full_image_url?: string
          template_id?: string
          is_public?: boolean
          view_count?: number
          like_count?: number
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
} 
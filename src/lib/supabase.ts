import { createClientComponentClient, createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import type { Database } from '@/types/database'

export const createClient = () => createClientComponentClient<Database>()

export const createServerClient = () => {
  const cookieStore = cookies()
  return createServerComponentClient<Database>({ cookies: () => cookieStore })
}

// 获取当前用户
export async function getCurrentUser() {
  const supabase = createServerClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error || !user) {
    return null
  }
  
  return user
}

// 获取用户详细信息
export async function getUserProfile(userId: string) {
  const supabase = createServerClient()
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single()
    
  if (error) {
    throw new Error(`Failed to fetch user profile: ${error.message}`)
  }
  
  return data
}

// 更新用户配额
export async function updateUserQuota(userId: string, used: number) {
  const supabase = createServerClient()
  const { data, error } = await supabase
    .from('users')
    .update({ used_quota: used })
    .eq('id', userId)
    .select()
    .single()
    
  if (error) {
    throw new Error(`Failed to update user quota: ${error.message}`)
  }
  
  return data
}

// 检查用户配额
export async function checkUserQuota(userId: string): Promise<boolean> {
  const profile = await getUserProfile(userId)
  
  // 检查是否需要重置每日配额
  const today = new Date().toDateString()
  if (profile.quota_reset_date !== today) {
    await supabase
      .from('users')
      .update({
        used_quota: 0,
        quota_reset_date: today
      })
      .eq('id', userId)
      
    return true
  }
  
  return profile.used_quota < profile.daily_quota
}

const supabase = createServerClient() 
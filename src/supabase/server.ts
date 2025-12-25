// import { createServerClient } from '@supabase/ssr'
// import { cookies } from 'next/headers'

// export async function createClient() {
//   const cookieStore = await cookies()

//   return createServerClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
//     {
//       cookies: {
//         getAll() {
//           return cookieStore.getAll()
//         },
//         setAll(cookiesToSet) {
//           try {
//             cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
//           } catch {
//             // The `setAll` method was called from a Server Component.
//             // This can be ignored if you have middleware refreshing
//             // user sessions.
//           }
//         },
//       },
//     }
//   )
// }

// lib/supabase-client.ts
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

type SupabaseClient = ReturnType<typeof createServerClient>

interface MockAuthClient {
  getUser: () => Promise<{ data: { user: null }, error: null }>
  getSession: () => Promise<{ data: { session: null }, error: null }>
  signIn: () => Promise<{ data: { user: null }, error: null }>
  signOut: () => Promise<{ error: null }>
}

interface MockQueryBuilder {
  select: (columns?: string) => Promise<{ data: any[], error: null }>
  insert: (data: any) => Promise<{ data: any[], error: null }>
  update: (data: any) => Promise<{ data: any[], error: null }>
  delete: () => Promise<{ data: any[], error: null }>
}

interface MockClient {
  auth: MockAuthClient
  from: (table: string) => MockQueryBuilder
}

export async function createClient(): Promise<SupabaseClient | MockClient> {
  // Check if env vars exist
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  
  if (!supabaseUrl || !supabaseKey) {
    console.warn('Supabase env variables not found. Using mock client.')
    return createMockClient()
  }

  const cookieStore = await cookies()

  return createServerClient(
    supabaseUrl,
    supabaseKey,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet: { name: string, value: string, options: CookieOptions }[]) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => 
              cookieStore.set(name, value, options)
            )
          } catch {
            // Ignore error
          }
        },
      },
    }
  )
}

// Mock client for development
function createMockClient(): MockClient {
  return {
    auth: {
      getUser: () => Promise.resolve({ data: { user: null }, error: null }),
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      signIn: () => Promise.resolve({ data: { user: null }, error: null }),
      signOut: () => Promise.resolve({ error: null }),
    },
    from: (table: string) => ({
      select: (columns: string = '*') => Promise.resolve({ 
        data: [], 
        error: null 
      }),
      insert: (data: any) => Promise.resolve({ 
        data: [], 
        error: null 
      }),
      update: (data: any) => Promise.resolve({ 
        data: [], 
        error: null 
      }),
      delete: () => Promise.resolve({ 
        data: [], 
        error: null 
      }),
    }),
  }
}
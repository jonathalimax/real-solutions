import { createClient } from '@supabase/supabase-js'
import crypto from 'crypto'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase environment variables')
}

function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex')
}

async function setupAdmin() {
  const supabase = createClient(supabaseUrl, supabaseServiceKey)

  const email = 'admin@example.com'
  const password = 'password123'
  const passwordHash = hashPassword(password)

  const { data, error } = await supabase
    .from('admin_users')
    .insert([
      {
        email,
        password_hash: passwordHash,
      },
    ])
    .select()

  if (error) {
    console.error('Error creating admin user:', error)
    return
  }

  console.log('Admin user created successfully:', data)
}

setupAdmin()

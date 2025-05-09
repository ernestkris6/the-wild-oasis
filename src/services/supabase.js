import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://cewpohjcjinpewggeqxh.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNld3BvaGpjamlucGV3Z2dlcXhoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYwOTUwODgsImV4cCI6MjA2MTY3MTA4OH0.2dNUND4qUSmuZLSinlnoymVFRh9kLa4nreDp0XfSVJg'

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;

//MEET-JOURNEY v4
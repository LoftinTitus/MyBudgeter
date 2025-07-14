require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

console.log('URL:', supabaseUrl);
console.log('Key length:', supabaseKey ? supabaseKey.length : 'undefined');

const supabase = createClient(supabaseUrl, supabaseKey);

async function testDatabase() {
  try {
    // First, let's see if we can read from the table
    console.log('Testing select...');
    const { data: selectData, error: selectError } = await supabase
      .from('budgets')
      .select('*')
      .limit(1);
    
    if (selectError) {
      console.error('Select error:', selectError);
    } else {
      console.log('Select success, data:', selectData);
    }

    // Try with minimal fields first
    console.log('Testing simple insert...');
    const { data: insertData, error: insertError } = await supabase
      .from('budgets')
      .insert([{ amount: 10, description: 'test' }])
      .select();
    
    if (insertError) {
      console.error('Insert error:', insertError);
    } else {
      console.log('Insert success, data:', insertData);
      
      // Clean up the test record
      if (insertData && insertData[0] && insertData[0].id) {
        await supabase.from('budgets').delete().eq('id', insertData[0].id);
        console.log('Test record cleaned up');
      }
    }

  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

testDatabase();

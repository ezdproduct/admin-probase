const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Manual env parser
const envPath = path.join(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
    const [key, ...values] = line.split('=');
    if (key && values.length > 0) {
        env[key.trim()] = values.join('=').trim().replace(/^"(.*)"$/, '$1');
    }
});

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing Supabase environment variables');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function importRawModels() {
    try {
        const filePath = path.join(process.cwd(), 'models.json');
        if (!fs.existsSync(filePath)) {
            console.error('models.json not found');
            return;
        }

        const fileContent = fs.readFileSync(filePath, 'utf8');
        const jsonData = JSON.parse(fileContent);
        const models = jsonData.data;

        console.log(`Found ${models.length} models to import.`);

        // Clear existing raw data
        console.log('Clearing raw_models table...');
        const { error: deleteError } = await supabase
            .from('raw_models')
            .delete()
            .neq('id', 'placeholder'); // Delete all

        if (deleteError) throw deleteError;

        // Batch insertion (standard batch size 100-500)
        const batchSize = 100;
        for (let i = 0; i < models.length; i += batchSize) {
            const batch = models.slice(i, i + batchSize).map(m => ({
                id: m.id,
                object: m.object,
                created: m.created,
                owned_by: m.owned_by,
                supported_endpoint_types: m.supported_endpoint_types
            }));

            console.log(`Inserting batch ${Math.floor(i / batchSize) + 1}...`);
            const { error: insertError } = await supabase
                .from('raw_models')
                .insert(batch);

            if (insertError) {
                console.error(`Error inserting batch:`, insertError);
                // Continue or break based on preference, here we break
                throw insertError;
            }
        }

        console.log('Import successful!');

    } catch (error) {
        console.error('Import failed:', error);
    }
}

importRawModels();

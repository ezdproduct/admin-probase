const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

function getEnv() {
    try {
        const envPath = path.resolve(process.cwd(), '.env.local');
        const envFile = fs.readFileSync(envPath, 'utf8');
        const env = {};
        envFile.split('\n').forEach(line => {
            const parts = line.split('=');
            if (parts.length >= 2) {
                const key = parts[0].trim();
                const value = parts.slice(1).join('=').trim().replace(/^"(.*)"$/, '$1');
                env[key] = value;
            }
        });
        return env;
    } catch (e) {
        return process.env;
    }
}

const env = getEnv();
const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

/**
 * Common import function for batches
 * @param {Array} data - Array of arrays containing the model data
 * @param {Function} mapper - Custom mapper function if needed
 */
async function importModelBatch(data, mapper) {
    const aiModels = data.map(m => ({
        id: m[0],
        model_id: m[1],
        name: m[2],
        type: m[3],
        is_active: m[4] === 'true',
        created_at: m[5],
        display: m[6] === 'true',
        level: parseInt(m[7])
    }));

    const modelProviders = data.map(m => ({
        model_id: m[1],
        name: m[2],
        pricing_unit: '1k-tokens',
        base_cost: 0,
        rate_rmb_vnd: 3500,
        factor_economy: 1,
        factor_standard: 1.5,
        factor_advanced: 2,
        factor_pro: 2.5,
        sell_economy: 0,
        sell_standard: 0,
        sell_advanced: 0,
        sell_pro: 0
    }));

    try {
        const { error: error1 } = await supabase.from('ai_models').upsert(aiModels, { onConflict: 'id' });
        if (error1) throw error1;

        const { error: error2 } = await supabase.from('model_providers').upsert(modelProviders, { onConflict: 'model_id' });
        if (error2) throw error2;

        console.log(`Successfully imported ${data.length} models.`);
    } catch (err) {
        console.error('Import failed:', err.message);
    }
}

module.exports = { supabase, importModelBatch };

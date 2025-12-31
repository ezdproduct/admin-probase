const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

function getEnv() {
    try {
        const envFile = fs.readFileSync('.env.local', 'utf8');
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
    } catch (e) { return process.env; }
}

const env = getEnv();
const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const data = [
    ['b633d6d5-e322-4e35-aceb-942eb8587fc1', 'whisper-v3', 'whisper-v3', 'thinking', 'false', '2025-12-21 13:11:24.532293+00', 'false', '1'],
    ['4e31b4d5-8378-49a3-acc7-5fb75446a733', 'wy-ppt-generate', 'wy-ppt-generate', 'thinking', 'false', '2025-12-21 13:11:24.532293+00', 'false', '1'],
    ['5e28ad73-cd05-4b15-9ee8-1a5b17b8aff9', 'wy-ppt-proxy', 'wy-ppt-proxy', 'thinking', 'false', '2025-12-21 13:11:24.532293+00', 'false', '1'],
    ['a07610fb-e842-4feb-b2f1-c9884b6d0cd2', 'yi-lightning', 'yi-lightning', 'thinking', 'false', '2025-12-21 13:11:24.23411+00', 'false', '1'],
    ['87574e62-c99a-405c-b12f-488f968b620d', 'yiyan-4', 'yiyan-4', 'thinking', 'false', '2025-12-21 13:11:24.23411+00', 'false', '1'],
    ['af9e4933-7376-49f7-8499-0417270d41c4', 'yiyan-4-all', 'yiyan-4-all', 'thinking', 'false', '2025-12-21 13:11:24.23411+00', 'false', '1']
];

async function run() {
    const aiModels = data.map(m => ({
        id: m[0], model_id: m[1], name: m[2], type: m[3], is_active: m[4] === 'true',
        created_at: m[5], display: m[6] === 'true', level: parseInt(m[7])
    }));
    const modelProviders = data.map(m => ({
        model_id: m[1], name: m[2], pricing_unit: '1k-tokens', base_cost: 0, rate_rmb_vnd: 3500,
        factor_economy: 1, factor_standard: 1.5, factor_advanced: 2, factor_pro: 2.5,
        sell_economy: 0, sell_standard: 0, sell_advanced: 0, sell_pro: 0
    }));
    await supabase.from('ai_models').upsert(aiModels, { onConflict: 'id' });
    await supabase.from('model_providers').upsert(modelProviders, { onConflict: 'model_id' });
    console.log('Batch imported.');
}
run();

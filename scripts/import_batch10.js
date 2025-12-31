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
    ['6444f242-367f-4dd5-a18a-222663a70484', 'llama-2-70b', 'llama-2-70b', 'thinking', 'false', '2025-12-21 13:11:23.575115+00', 'false', '1'],
    ['a59315ba-458d-4f69-b4ac-3e2f4126265f', 'llama-2-7b', 'llama-2-7b', 'thinking', 'false', '2025-12-21 13:11:23.575115+00', 'false', '1'],
    ['4d21e78b-18bb-4614-909a-873e4f272fb0', 'llama-3-70b', 'llama-3-70b', 'thinking', 'false', '2025-12-21 13:11:23.575115+00', 'false', '1'],
    ['45b82209-0d3e-48f0-bf59-13b07530080b', 'llama-3-70b-instruct', 'llama-3-70b-instruct', 'thinking', 'false', '2025-12-21 13:11:23.575115+00', 'false', '1'],
    ['3cd27005-9eab-4802-a3ac-7d2564dbdde1', 'llama-3-8b', 'llama-3-8b', 'thinking', 'false', '2025-12-21 13:11:23.575115+00', 'false', '1'],
    ['90954e00-567c-4c53-bea3-290dbe383e37', 'llama-3-8b-instruct', 'llama-3-8b-instruct', 'thinking', 'false', '2025-12-21 13:11:23.575115+00', 'false', '1'],
    ['46607000-00e6-47f0-8880-8ea2e9a9bd02', 'llama-3-sonar-large-32k-chat', 'llama-3-sonar-large-32k-chat', 'thinking', 'false', '2025-12-21 13:11:23.575115+00', 'false', '1'],
    ['0c1bbd46-dca4-46e2-896b-7c74fb24feb6', 'llama-3-sonar-large-32k-online', 'llama-3-sonar-large-32k-online', 'thinking', 'false', '2025-12-21 13:11:23.575115+00', 'false', '1'],
    ['a11b7220-094b-49ee-9ef6-2e15a848a9d7', 'llama-3-sonar-small-32k-chat', 'llama-3-sonar-small-32k-chat', 'thinking', 'false', '2025-12-21 13:11:23.575115+00', 'false', '1'],
    ['170f0fc3-4574-4eb0-b847-2d1a810039ed', 'llama-3-sonar-small-32k-online', 'llama-3-sonar-small-32k-online', 'thinking', 'false', '2025-12-21 13:11:23.575115+00', 'false', '1'],
    ['83649dd5-c07a-4f0e-9eab-daf07f104eb5', 'llama-3.1-405b', 'llama-3.1-405b', 'thinking', 'false', '2025-12-21 13:11:23.575115+00', 'false', '1'],
    ['57e7f312-9f53-42e8-a3ab-cc05b9a05363', 'lucataco/animate-diff', 'lucataco/animate-diff', 'thinking', 'false', '2025-12-21 13:11:24.688779+00', 'false', '1'],
    ['f0ad3b09-89c4-489e-ba03-30c3921ba376', 'lucataco/remove-bg', 'lucataco/remove-bg', 'thinking', 'false', '2025-12-21 13:11:24.688779+00', 'false', '1'],
    ['abba0ef2-e255-407c-955d-42cf5411ebb7', 'MiniMax-Hailuo-02', 'MiniMax-Hailuo-02', 'thinking', 'false', '2025-12-21 13:11:23.751132+00', 'false', '1'],
    ['a1068270-ae1c-4e7c-962f-0781992b65f6', 'MiniMax-Hailuo-2.3', 'MiniMax-Hailuo-2.3', 'thinking', 'false', '2025-12-21 13:11:23.751132+00', 'false', '1'],
    ['be48bce6-6499-4a44-9bbc-83b826d49881', 'MiniMax-Hailuo-2.3-Fast', 'MiniMax-Hailuo-2.3-Fast', 'thinking', 'false', '2025-12-21 13:11:23.751132+00', 'false', '1'],
    ['572751f0-d796-4343-8916-dcec6b320206', 'minimax-m1-80k', 'minimax-m1-80k', 'thinking', 'false', '2025-12-21 13:11:23.751132+00', 'false', '1'],
    ['7763bcc2-f555-4933-a407-f9f04474691d', 'mixtral-8x22b', 'mixtral-8x22b', 'thinking', 'false', '2025-12-21 13:11:23.751132+00', 'false', '1'],
    ['3eaa1723-02cb-468d-bc18-4bc586c78414', 'mixtral-8x7b', 'mixtral-8x7b', 'thinking', 'false', '2025-12-21 13:11:23.751132+00', 'false', '1'],
    ['fcec0b22-0bb0-439b-9c44-74c8b3b18bc3', 'mj_fast_blend', 'mj_fast_blend', 'thinking', 'false', '2025-12-21 13:11:23.751132+00', 'false', '1'],
    ['fd9248e6-cc7d-49e9-b327-dd8e48f11c2d', 'mj_fast_custom_zoom', 'mj_fast_custom_zoom', 'thinking', 'false', '2025-12-21 13:11:23.751132+00', 'false', '1'],
    ['aaa4a149-5da0-4fe7-b164-5033353ae400', 'mj_fast_describe', 'mj_fast_describe', 'thinking', 'false', '2025-12-21 13:11:23.751132+00', 'false', '1'],
    ['421c7099-f8e4-4ee5-a4d8-6b0f2ccd5c88', 'mj_fast_edits', 'mj_fast_edits', 'thinking', 'false', '2025-12-21 13:11:23.751132+00', 'false', '1'],
    ['73b55574-5ed5-4708-9793-966ad7238421', 'mj_fast_high_variation', 'mj_fast_high_variation', 'thinking', 'false', '2025-12-21 13:11:23.751132+00', 'false', '1']
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

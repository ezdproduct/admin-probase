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
    ['f7934111-94e8-4f0a-af22-d801e13ea266', 'nano-banana', 'nano-banana', 'thinking', 'false', '2025-12-21 08:45:48.45586+00', 'false', '1'],
    ['298a2cd5-44f3-4f02-a235-43bb0e80f4cb', 'nano-banana-2', 'nano-banana-2', 'thinking', 'false', '2025-12-21 13:11:23.917918+00', 'false', '1'],
    ['970ed6e4-4c6f-4cf0-90da-9c4945a1ea14', 'nano-banana-2-2k', 'nano-banana-2-2k', 'thinking', 'false', '2025-12-21 13:11:23.917918+00', 'false', '1'],
    ['4e24f5b4-0aa3-4d49-b824-95f47c99460b', 'nano-banana-2-4k', 'nano-banana-2-4k', 'thinking', 'false', '2025-12-21 13:11:23.917918+00', 'false', '1'],
    ['d41ac9ef-8653-4fb3-b735-e6f08c3eb852', 'nano-banana-hd', 'nano-banana-hd', 'thinking', 'false', '2025-12-21 08:45:48.45586+00', 'false', '1'],
    ['7d6f5a80-38f8-40f0-a5e6-75258c2e6439', 'nano-banana-pro', 'nano-banana-pro', 'thinking', 'false', '2025-12-21 13:11:23.917918+00', 'false', '1'],
    ['35326296-0736-4ad2-8065-47db058ba89e', 'netease-youdao/bce-reranker-base_v1', 'netease-youdao/bce-reranker-base_v1', 'thinking', 'false', '2025-12-21 13:11:23.917918+00', 'false', '1'],
    ['7e87bfa0-d68a-46d6-9140-5ccaf1b70819', 'o1', 'o1', 'thinking', 'false', '2025-12-21 13:11:22.599315+00', 'false', '1'],
    ['15c6e006-43ec-4891-9192-aea70c94dd0d', 'o1-2024-12-17', 'o1-2024-12-17', 'thinking', 'false', '2025-12-21 13:11:22.599315+00', 'false', '1'],
    ['1e537219-c84b-411d-86b4-579c27137f3e', 'o1-all', 'o1-all', 'thinking', 'false', '2025-12-21 13:11:23.917918+00', 'false', '1'],
    ['522d2f05-3b8b-4248-8289-ab3e52b7dab0', 'o1-mini', 'o1-mini', 'thinking', 'false', '2025-12-21 13:11:22.599315+00', 'false', '1'],
    ['2d36d283-960c-4c86-8b4f-999a94b5a0b0', 'o1-mini-2024-09-12', 'o1-mini-2024-09-12', 'thinking', 'false', '2025-12-21 13:11:22.8222+00', 'false', '1'],
    ['aacae486-4697-4b75-8aef-03b257c373de', 'o1-mini-all', 'o1-mini-all', 'thinking', 'false', '2025-12-21 13:11:23.917918+00', 'false', '1'],
    ['c9884b6d-0cd2-4eda-b942-7eb587c6bc7d', 'o1-preview', 'o1-preview', 'thinking', 'false', '2025-12-21 13:11:22.8222+00', 'false', '1'],
    ['a413c4f9-b27e-432a-9ecc-b534cb1959c4', 'o1-preview-2024-09-12', 'o1-preview-2024-09-12', 'thinking', 'false', '2025-12-21 13:11:22.8222+00', 'false', '1'],
    ['488f968b-f20d-4fb4-ba46-fa518352a9f1', 'o1-preview-all', 'o1-preview-all', 'thinking', 'false', '2025-12-21 13:11:23.917918+00', 'false', '1'],
    ['0417270d-41c4-48b1-bd35-e4f158edcb59', 'o1-pro', 'o1-pro', 'thinking', 'false', '2025-12-21 13:11:23.917918+00', 'false', '1'],
    ['0d5bb675-f8e6-4b0b-9b42-6e43cac01db1', 'o1-pro-all', 'o1-pro-all', 'thinking', 'false', '2025-12-21 13:11:23.917918+00', 'false', '1']
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

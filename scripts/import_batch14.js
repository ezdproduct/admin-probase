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
    ['e34c38e1-f121-400c-aff2-48b0887444cc', 'qwen-turbo', 'qwen-turbo', 'thinking', 'false', '2025-12-21 13:11:24.081081+00', 'false', '1'],
    ['eda07b30-920e-4881-887f-644296c13d01', 'qwen-turbo-2024-11-01', 'qwen-turbo-2024-11-01', 'thinking', 'false', '2025-12-21 13:11:24.081081+00', 'false', '1'],
    ['6fa3e1ed-5ede-4317-a4d7-540f6071eebd', 'qwen-vl-max-latest', 'qwen-vl-max-latest', 'thinking', 'false', '2025-12-21 13:11:24.081081+00', 'false', '1'],
    ['c0c526af-6051-46d5-9397-48db2fe71f16', 'qwen-vl-plus-latest', 'qwen-vl-plus-latest', 'thinking', 'false', '2025-12-21 13:11:24.081081+00', 'false', '1'],
    ['8a86f001-6be3-43d8-b7fa-d7ede1dbc45d', 'qwen1.5-110b-chat', 'qwen1.5-110b-chat', 'thinking', 'false', '2025-12-21 13:11:24.081081+00', 'false', '1'],
    ['146a4efa-651a-45e4-a244-dc34f6ebf5fb', 'qwen1.5-14b-chat', 'qwen1.5-14b-chat', 'thinking', 'false', '2025-12-21 13:11:24.081081+00', 'false', '1'],
    ['2218d908-e4c8-4867-845e-32c0e606468b', 'qwen1.5-32b-chat', 'qwen1.5-32b-chat', 'thinking', 'false', '2025-12-21 13:11:24.081081+00', 'false', '1'],
    ['cccbee73-edfe-4b9c-b5fc-b8a0c2ee033b', 'qwen1.5-7b-chat', 'qwen1.5-7b-chat', 'thinking', 'false', '2025-12-21 13:11:24.081081+00', 'false', '1'],
    ['cdf2c15e-6fcd-4be5-8e29-e9d0b048f1f1', 'qwen2-1.5b-instruct', 'qwen2-1.5b-instruct', 'thinking', 'false', '2025-12-21 13:11:24.081081+00', 'false', '1'],
    ['2c6e085e-0c11-42d4-b440-5bbbb99387d8', 'qwen2-57b-a14b-instruct', 'qwen2-57b-a14b-instruct', 'thinking', 'false', '2025-12-21 13:11:24.081081+00', 'false', '1'],
    ['583ada8a-c4d2-47c9-86b0-54c4370f4991', 'qwen2-7b-instruct', 'qwen2-7b-instruct', 'thinking', 'false', '2025-12-21 13:11:24.081081+00', 'false', '1'],
    ['fa9d8e49-cc15-4c66-8e37-779b67ff4538', 'qwen2-vl-7b-instruct', 'qwen2-vl-7b-instruct', 'thinking', 'false', '2025-12-21 13:11:24.081081+00', 'false', '1'],
    ['4ab61bac-bb85-422d-9963-eef51a82cd05', 'qwen2.5-14b-instruct', 'qwen2.5-14b-instruct', 'thinking', 'false', '2025-12-21 13:11:24.081081+00', 'false', '1'],
    ['0e466c7d-e74f-49ec-84b9-5bcd817c392c', 'qwen2.5-32b-instruct', 'qwen2.5-32b-instruct', 'thinking', 'false', '2025-12-21 13:11:24.081081+00', 'false', '1'],
    ['bce74eb5-a906-4f90-8afc-eaa02ae110e1', 'qwen2.5-72b-instruct', 'qwen2.5-72b-instruct', 'thinking', 'false', '2025-12-21 13:11:24.081081+00', 'false', '1'],
    ['8c4fbf19-6581-4b16-ae64-6274c34749e4', 'qwen2.5-7b-instruct', 'qwen2.5-7b-instruct', 'thinking', 'false', '2025-12-21 13:11:24.081081+00', 'false', '1'],
    ['5452473e-49eb-468b-a518-f82052544360', 'qwen2.5-coder-32b-instruct', 'qwen2.5-coder-32b-instruct', 'thinking', 'false', '2025-12-21 13:11:24.081081+00', 'false', '1'],
    ['0869bae4-17d4-4291-a616-b0309a7dd55d', 'qwen2.5-coder-7b-instruct', 'qwen2.5-coder-7b-instruct', 'thinking', 'false', '2025-12-21 13:11:24.081081+00', 'false', '1'],
    ['7e0aee1f-74a6-4e58-9782-9c62c2ac2878', 'qwen2.5-math-72b-instruct', 'qwen2.5-math-72b-instruct', 'thinking', 'false', '2025-12-21 13:11:24.081081+00', 'false', '1'],
    ['24c4e037-ac0b-42d1-8044-d3403317591b', 'qwen2.5-vl-32b-instruct', 'qwen2.5-vl-32b-instruct', 'thinking', 'false', '2025-12-21 13:11:24.081081+00', 'false', '1'],
    ['eac4893a-af88-4df9-a1aa-5e11483d0b35', 'qwen2.5-vl-3b-instruct', 'qwen2.5-vl-3b-instruct', 'thinking', 'false', '2025-12-21 13:11:24.081081+00', 'false', '1'],
    ['416e4fb5-0edb-48e1-b108-6cb8fa257c3e', 'qwen2.5-vl-72b-instruct', 'qwen2.5-vl-72b-instruct', 'thinking', 'false', '2025-12-21 13:11:24.081081+00', 'false', '1'],
    ['84262a34-2a7e-4cf0-a0a8-c91f280ef7c3', 'qwen2.5-vl-7b-instruct', 'qwen2.5-vl-7b-instruct', 'thinking', 'false', '2025-12-21 13:11:24.081081+00', 'false', '1'],
    ['85fb8fea-f4c9-4e22-baf5-bd9a96614f92', 'qwen3-0.6b', 'qwen3-0.6b', 'thinking', 'false', '2025-12-21 13:11:24.081081+00', 'false', '1'],
    ['7f99b6ca-6f2c-4206-be13-814d859c4b96', 'qwen3-1.7b', 'qwen3-1.7b', 'thinking', 'false', '2025-12-21 13:11:24.081081+00', 'false', '1'],
    ['8940aa79-387e-4796-9387-30196e473bbd', 'qwen3-14b', 'qwen3-14b', 'thinking', 'false', '2025-12-21 13:11:24.081081+00', 'false', '1'],
    ['0155c27e-5c20-4a10-9352-4fa40662d3de', 'qwen3-235b-a22b', 'qwen3-235b-a22b', 'thinking', 'false', '2025-12-21 13:11:24.081081+00', 'false', '1'],
    ['d88e82f1-b29d-4088-a7f0-77c2d99de313', 'qwen3-235b-a22b-instruct-2507', 'qwen3-235b-a22b-instruct-2507', 'thinking', 'false', '2025-12-21 13:11:24.081081+00', 'false', '1'],
    ['203f0026-0c8f-4d91-9db5-4a5e4eca918d', 'qwen3-30b-a3b', 'qwen3-30b-a3b', 'thinking', 'false', '2025-12-21 13:11:24.081081+00', 'false', '1'],
    ['940f9103-dec2-4c2c-9795-f35907b8c46a', 'qwen3-30b-a3b-instruct-2507', 'qwen3-30b-a3b-instruct-2507', 'thinking', 'false', '2025-12-21 13:11:24.081081+00', 'false', '1'],
    ['06e9ba96-be13-4ba0-bb65-0fcb160955bc', 'qwen3-32b', 'qwen3-32b', 'thinking', 'false', '2025-12-21 13:11:24.081081+00', 'false', '1'],
    ['578865d5-ec8e-4360-bc53-80947dd89ae4', 'qwen3-4b', 'qwen3-4b', 'thinking', 'false', '2025-12-21 13:11:24.081081+00', 'false', '1'],
    ['f9109159-19a1-4f2b-a82f-4dbc8d5c345d', 'qwen3-8b', 'qwen3-8b', 'thinking', 'false', '2025-12-21 13:11:24.081081+00', 'false', '1'],
    ['03c7659d-c353-4311-b53c-6c0e05ebeb11', 'qwen3-coder-480b-a35b-instruct', 'qwen3-coder-480b-a35b-instruct', 'thinking', 'false', '2025-12-21 13:11:24.081081+00', 'false', '1'],
    ['19993880-8528-45c4-8fab-e1c94d02a572', 'qwen3-coder-flash', 'qwen3-coder-flash', 'thinking', 'false', '2025-12-21 13:11:24.081081+00', 'false', '1']
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

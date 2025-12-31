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
    ['4c90cd20-5727-487d-aac8-c0888ec05776', 'claude-3-sonnet-20240229', 'claude-3-sonnet-20240229', 'thinking', 'false', '2025-12-21 13:11:22.8222+00', 'false', '1'],
    ['66231ddc-db1c-4303-946d-1771d78c46d9', 'claude-haiku-4-5-20251001', 'claude-haiku-4-5-20251001', 'thinking', 'false', '2025-12-21 13:11:22.8222+00', 'false', '1'],
    ['ab935cec-325f-45ac-ac26-2f0fbac68e63', 'claude-haiku-4-5-20251001-thinking', 'claude-haiku-4-5-20251001-thinking', 'thinking', 'false', '2025-12-21 13:11:22.8222+00', 'false', '1'],
    ['71be5f53-0ccc-4789-a55e-3111dcd76348', 'claude-opus-4-1-20250805', 'claude-opus-4-1-20250805', 'thinking', 'false', '2025-12-21 13:11:22.8222+00', 'false', '1'],
    ['b90f0676-bcd6-4166-80a1-4f4824482d1a', 'claude-opus-4-1-20250805-thinking', 'claude-opus-4-1-20250805-thinking', 'thinking', 'false', '2025-12-21 13:11:22.8222+00', 'false', '1'],
    ['344d9122-266d-4c49-b0bc-359fff9866ad', 'claude-opus-4-20250514', 'claude-opus-4-20250514', 'thinking', 'false', '2025-12-21 13:11:22.8222+00', 'false', '1'],
    ['c201367e-e869-489c-b59d-ee5d4e378866', 'claude-opus-4-20250514-thinking', 'claude-opus-4-20250514-thinking', 'thinking', 'false', '2025-12-21 13:11:22.8222+00', 'false', '1'],
    ['2df3104b-a704-4a61-8471-4ace6597e989', 'claude-opus-4-5-20251101', 'claude-opus-4-5-20251101', 'thinking', 'false', '2025-12-21 13:11:22.8222+00', 'false', '1'],
    ['8362fc64-da81-4db9-bfee-64f6a426cbff', 'claude-opus-4-5-20251101-thinking', 'claude-opus-4-5-20251101-thinking', 'thinking', 'false', '2025-12-21 13:11:22.8222+00', 'false', '1'],
    ['d9817851-46dc-4aea-acc0-c60a0427dbba', 'claude-sonnet-4-20250514', 'claude-sonnet-4-20250514', 'thinking', 'false', '2025-12-21 13:11:22.8222+00', 'false', '1'],
    ['4a49c8f2-80a1-4b0f-9008-f42856591f13', 'claude-sonnet-4-20250514-thinking', 'claude-sonnet-4-20250514-thinking', 'thinking', 'false', '2025-12-21 13:11:22.8222+00', 'false', '1'],
    ['2148a7eb-0292-4e4c-952f-ff3445e61aa3', 'claude-sonnet-4-5-20250929', 'claude-sonnet-4-5-20250929', 'thinking', 'false', '2025-12-21 13:11:22.8222+00', 'false', '1'],
    ['7c8e0c3f-a28c-43e6-902e-68548af2a047', 'claude-sonnet-4-5-20250929-thinking', 'claude-sonnet-4-5-20250929-thinking', 'thinking', 'false', '2025-12-21 13:11:22.8222+00', 'false', '1'],
    ['e3e918f7-5bf9-4c4b-824f-da7c45e34056', 'code-davinci-edit-001', 'code-davinci-edit-001', 'thinking', 'false', '2025-12-21 13:11:24.98619+00', 'false', '1'],
    ['ff5a9d27-07e8-4326-acab-6daf2121f767', 'code-llama-13b', 'code-llama-13b', 'thinking', 'false', '2025-12-21 13:11:22.980216+00', 'false', '1'],
    ['ded70c60-5a64-4995-bd7f-35742fd75621', 'code-llama-34b', 'code-llama-34b', 'thinking', 'false', '2025-12-21 13:11:22.980216+00', 'false', '1'],
    ['2d8ec80e-d93b-42b0-ba4e-ff5ad562880a', 'code-llama-7b', 'code-llama-7b', 'thinking', 'false', '2025-12-21 13:11:22.980216+00', 'false', '1'],
    ['852182e7-97e0-409f-a447-a200150f796d', 'Creative', 'Creative', 'thinking', 'false', '2025-12-21 13:11:22.980216+00', 'false', '1'],
    ['99135f43-cbc3-4008-bc40-981216bc83a7', 'davinci-002', 'davinci-002', 'thinking', 'false', '2025-12-21 13:11:24.688779+00', 'false', '1'],
    ['09fb0d0a-d585-4f8a-a807-b0849c5b584c', 'deepl-en', 'deepl-en', 'thinking', 'false', '2025-12-21 13:11:24.98619+00', 'false', '1'],
    ['4df86fcc-7928-4ca2-a7ba-ae154241d81c', 'deepl-zh', 'deepl-zh', 'thinking', 'false', '2025-12-21 13:11:24.98619+00', 'false', '1'],
    ['950054d8-c04c-4361-a115-19088658cd5a', 'deepseek-ai/DeepSeek-R1', 'deepseek-ai/DeepSeek-R1', 'thinking', 'false', '2025-12-21 13:11:22.980216+00', 'false', '1'],
    ['bb307978-2b85-4b0a-9c77-de91c856868a', 'deepseek-ai/deepseek-vl2', 'deepseek-ai/deepseek-vl2', 'thinking', 'false', '2025-12-21 13:11:22.980216+00', 'false', '1'],
    ['11671f2e-4a61-4838-bf5f-c6b48de3f70c', 'deepseek-ai/Janus-Pro-7B', 'deepseek-ai/Janus-Pro-7B', 'thinking', 'false', '2025-12-21 13:11:22.980216+00', 'false', '1'],
    ['9de04bfc-5473-4eba-bb7f-ee68a46acdce', 'deepseek-chat', 'deepseek-chat', 'thinking', 'false', '2025-12-21 13:11:22.980216+00', 'false', '1'],
    ['81db4d98-3bf5-4133-99df-1d04465cdaf3', 'deepseek-coder-v2-instruct', 'deepseek-coder-v2-instruct', 'thinking', 'false', '2025-12-21 13:11:22.980216+00', 'false', '1'],
    ['3048c10d-decf-49d9-b811-dcbd8297ece5', 'deepseek-llm-67b-chat', 'deepseek-llm-67b-chat', 'thinking', 'false', '2025-12-21 13:11:22.980216+00', 'false', '1'],
    ['20eb6b97-2861-49fc-a34b-a6b6dbe13ea7', 'deepseek-r1', 'deepseek-r1', 'thinking', 'false', '2025-12-21 13:11:22.980216+00', 'false', '1'],
    ['8bdb66d9-cd49-42f0-b759-193ef1288d39', 'deepseek-r1-0528', 'deepseek-r1-0528', 'thinking', 'false', '2025-12-21 13:11:22.980216+00', 'false', '1'],
    ['0611367b-d136-445e-818e-50b703e523a1', 'deepseek-r1-250528', 'deepseek-r1-250528', 'thinking', 'false', '2025-12-21 13:11:22.980216+00', 'false', '1']
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

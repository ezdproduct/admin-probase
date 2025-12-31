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
    ['942eb858-7fc1-48ad-bbbc-bd1fe393d1b6', 'o3', 'o3', 'thinking', 'false', '2025-12-21 13:11:22.8222+00', 'false', '1'],
    ['9995b367-2534-4f5c-9c10-c7ecc93e6866', 'o3-2025-04-16', 'o3-2025-04-16', 'thinking', 'false', '2025-12-21 13:11:22.8222+00', 'false', '1'],
    ['6dddaf3e-7adc-4452-bfc8-f5659c853129', 'o3-all', 'o3-all', 'thinking', 'false', '2025-12-21 13:11:23.917918+00', 'false', '1'],
    ['c77c8810-5947-4739-a638-49e507003042', 'o3-deep-research', 'o3-deep-research', 'thinking', 'false', '2025-12-21 13:11:24.838584+00', 'false', '1'],
    ['81825567-7841-461a-b094-147a3504f942', 'o3-deep-research-2025-06-26', 'o3-deep-research-2025-06-26', 'thinking', 'false', '2025-12-21 13:11:24.838584+00', 'false', '1'],
    ['4d344744-4541-4b15-850c-63bd04103aa2', 'o3-mini', 'o3-mini', 'thinking', 'false', '2025-12-21 13:11:22.8222+00', 'false', '1'],
    ['d43f0e18-6ad2-4096-9ab9-c5bc8b8c14bc', 'o3-mini-2025-01-31', 'o3-mini-2025-01-31', 'thinking', 'false', '2025-12-21 13:11:22.8222+00', 'false', '1'],
    ['dd5f1a98-cc0b-4639-bb86-9c0665b1c5be', 'o3-mini-2025-01-31-high', 'o3-mini-2025-01-31-high', 'thinking', 'false', '2025-12-21 13:11:22.8222+00', 'false', '1'],
    ['3eef62e0-69e7-487a-8018-0ae9212ef365', 'o3-mini-2025-01-31-low', 'o3-mini-2025-01-31-low', 'thinking', 'false', '2025-12-21 13:11:22.8222+00', 'false', '1'],
    ['fdd471de-905a-42ac-af7c-1ca6b2d83127', 'o3-mini-2025-01-31-medium', 'o3-mini-2025-01-31-medium', 'thinking', 'false', '2025-12-21 13:11:22.8222+00', 'false', '1'],
    ['95cad2bb-c533-420f-aafb-1149b22713a4', 'o3-mini-all', 'o3-mini-all', 'thinking', 'false', '2025-12-21 13:11:23.917918+00', 'false', '1'],
    ['f4418c9f-f653-4043-8ef1-6f5f50cbef69', 'o3-mini-high', 'o3-mini-high', 'thinking', 'false', '2025-12-21 13:11:22.8222+00', 'false', '1'],
    ['5ce85f68-967e-44dd-b4b5-e24810b8e539', 'o3-mini-high-all', 'o3-mini-high-all', 'thinking', 'false', '2025-12-21 13:11:23.917918+00', 'false', '1'],
    ['f05dda37-266c-444e-ad84-fb5e6587838b', 'o3-mini-low', 'o3-mini-low', 'thinking', 'false', '2025-12-21 13:11:22.8222+00', 'false', '1'],
    ['b808144e-4244-45db-8e3c-e5ee509723bb', 'o3-mini-medium', 'o3-mini-medium', 'thinking', 'false', '2025-12-21 13:11:22.8222+00', 'false', '1'],
    ['6da9d01b-d6e1-4725-bdde-7eed61514122', 'o3-pro', 'o3-pro', 'thinking', 'false', '2025-12-21 13:11:23.917918+00', 'false', '1'],
    ['7a9eae9e-b381-4f60-a2d9-bc41956fd7c0', 'o3-pro-2025-06-10', 'o3-pro-2025-06-10', 'thinking', 'false', '2025-12-21 13:11:23.917918+00', 'false', '1'],
    ['5fb75446-a733-447d-9602-7855dad398a6', 'o4-mini', 'o4-mini', 'thinking', 'false', '2025-12-21 13:11:22.8222+00', 'false', '1'],
    ['1a5b17b8-aff9-4cf8-ba86-59202fa1f8cf', 'o4-mini-2025-04-16', 'o4-mini-2025-04-16', 'thinking', 'false', '2025-12-21 13:11:22.8222+00', 'false', '1'],
    ['86054b17-0cd8-4c30-8aea-58bb0794d14e', 'o4-mini-all', 'o4-mini-all', 'thinking', 'false', '2025-12-21 13:11:23.917918+00', 'false', '1'],
    ['47495bf3-1c49-4237-9271-6346ed1900cc', 'o4-mini-deep-research', 'o4-mini-deep-research', 'thinking', 'false', '2025-12-21 13:11:24.838584+00', 'false', '1'],
    ['176ae032-de04-41ea-a506-e17e6451444d', 'o4-mini-deep-research-2025-06-26', 'o4-mini-deep-research-2025-06-26', 'thinking', 'false', '2025-12-21 13:11:24.838584+00', 'false', '1'],
    ['2b4b24fa-01fc-474c-9d93-089ba9801d3e', 'o4-mini-dr', 'o4-mini-dr', 'thinking', 'false', '2025-12-21 13:11:23.917918+00', 'false', '1'],
    ['899dccd7-e7df-4913-81e1-0fa18d60b57f', 'o4-mini-high-all', 'o4-mini-high-all', 'thinking', 'false', '2025-12-21 13:11:23.917918+00', 'false', '1'],
    ['a0c62e8a-d2df-4bd9-bf34-d4baaf0aced2', 'Phi-4', 'Phi-4', 'thinking', 'false', '2025-12-21 13:11:23.917918+00', 'false', '1'],
    ['16173271-3b04-48f1-be00-913e1377fd84', 'phi-4-multimodal-instruct', 'phi-4-multimodal-instruct', 'thinking', 'false', '2025-12-21 13:11:23.917918+00', 'false', '1'],
    ['1d946c8b-f9f1-4643-90d0-7ae86efe8dff', 'phi-4-reasoning', 'phi-4-reasoning', 'thinking', 'false', '2025-12-21 13:11:23.917918+00', 'false', '1'],
    ['1b0c9820-d4c3-4553-a7cf-866514e8506a', 'pika-generate', 'pika-generate', 'thinking', 'false', '2025-12-21 13:11:23.917918+00', 'false', '1'],
    ['7f4db79b-578b-4a31-9baf-a933e78e581d', 'pixverse-character', 'pixverse-character', 'thinking', 'false', '2025-12-21 13:11:23.917918+00', 'false', '1'],
    ['7100fc27-25f3-4bb6-bd8a-77b3a4605d0a', 'playground-v2.5', 'playground-v2.5', 'thinking', 'false', '2025-12-21 13:11:23.917918+00', 'false', '1'],
    ['5910b3c5-69d1-408c-844e-2a433457567c', 'Precise', 'Precise', 'thinking', 'false', '2025-12-21 13:11:23.917918+00', 'false', '1'],
    ['981d2a4e-f78b-4337-a30a-bd0243cbd333', 'prunaai/vace-14b', 'prunaai/vace-14b', 'thinking', 'false', '2025-12-21 13:11:24.688779+00', 'false', '1'],
    ['5ea9c6b7-cc40-4216-8a57-d44ec23eaed0', 'qwen-long', 'qwen-long', 'thinking', 'false', '2025-12-21 13:11:24.081081+00', 'false', '1'],
    ['392b12cb-0a82-48bf-aae5-1875346b8a92', 'qwen-max', 'qwen-max', 'thinking', 'false', '2025-12-21 13:11:24.081081+00', 'false', '1'],
    ['f0ad3f4b-efb6-4b61-940e-8422e974605d', 'qwen-max-2025-01-25', 'qwen-max-2025-01-25', 'thinking', 'false', '2025-12-21 13:11:24.081081+00', 'false', '1'],
    ['1646b689-97a2-41f5-bf0b-ac8ef2c6df88', 'qwen-max-latest', 'qwen-max-latest', 'thinking', 'false', '2025-12-21 13:11:24.081081+00', 'false', '1'],
    ['2e0f11c9-c16c-4e47-b4ff-e0cc5123e777', 'qwen-plus', 'qwen-plus', 'thinking', 'false', '2025-12-21 13:11:24.081081+00', 'false', '1']
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

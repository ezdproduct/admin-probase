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
    ['40643ca5-297e-4c8f-a354-2846142eb268', 'gemini-2.5-flash-preview-04-17-nothinking', 'gemini-2.5-flash-preview-04-17-nothinking', 'thinking', 'false', '2025-12-21 13:11:23.269049+00', 'true', '1'],
    ['f5d2fc0d-398a-410e-99c9-9304d5e3864f', 'gemini-2.5-flash-preview-04-17-thinking', 'gemini-2.5-flash-preview-04-17-thinking', 'thinking', 'false', '2025-12-21 13:11:23.269049+00', 'true', '1'],
    ['7cca834f-e9c1-4620-af88-547a7507d6d1', 'gemini-2.5-flash-preview-05-20-nothinking', 'gemini-2.5-flash-preview-05-20-nothinking', 'thinking', 'false', '2025-12-21 13:11:23.269049+00', 'true', '1'],
    ['97855a5e-998c-4cf6-bf75-1f7e6b5de754', 'gemini-2.5-flash-preview-09-2025', 'gemini-2.5-flash-preview-09-2025', 'thinking', 'false', '2025-12-21 13:11:23.269049+00', 'true', '1'],
    ['2658bc28-2408-4bef-8bc8-b3e47b323147', 'gemini-2.5-pro-preview-06-05-nothinking', 'gemini-2.5-pro-preview-06-05-nothinking', 'thinking', 'false', '2025-12-21 13:11:23.269049+00', 'true', '1'],
    ['8d97b70e-4af6-4618-a8d5-b8618e37afb8', 'gemini-2.5-pro-thinking-128', 'gemini-2.5-pro-thinking-128', 'thinking', 'false', '2025-12-21 13:11:23.269049+00', 'true', '1'],
    ['48fd20d8-9b01-4e8c-b506-8173e913c47d', 'gemini-2.5-pro-thinking-32768', 'gemini-2.5-pro-thinking-32768', 'thinking', 'false', '2025-12-21 13:11:23.269049+00', 'true', '1'],
    ['5481e4c4-292f-43bf-b6ad-c0d9e499747c', 'gpt-3.5-turbo', 'gpt-3.5-turbo', 'thinking', 'false', '2025-12-21 13:11:22.599315+00', 'true', '1'],
    ['8be39bce-61be-45c6-8521-71e5da16d30c', 'gpt-3.5-turbo-0125', 'gpt-3.5-turbo-0125', 'thinking', 'false', '2025-12-21 13:11:22.599315+00', 'true', '1'],
    ['4a4b14b9-b03d-4ce2-8b0e-25a1f225f520', 'gpt-3.5-turbo-0301', 'gpt-3.5-turbo-0301', 'thinking', 'false', '2025-12-21 13:11:22.599315+00', 'true', '1'],
    ['9a02e366-9f92-4e56-83c0-01e3bd5e9238', 'gpt-3.5-turbo-0613', 'gpt-3.5-turbo-0613', 'thinking', 'false', '2025-12-21 13:11:22.599315+00', 'true', '1'],
    ['58932017-7a16-4280-9c17-9ef7b09f1530', 'gpt-3.5-turbo-1106', 'gpt-3.5-turbo-1106', 'thinking', 'false', '2025-12-21 13:11:22.599315+00', 'true', '1'],
    ['459bdb9b-8c05-41b9-ade9-2f5c526edc36', 'gpt-3.5-turbo-16k', 'gpt-3.5-turbo-16k', 'thinking', 'false', '2025-12-21 13:11:22.599315+00', 'true', '1'],
    ['50188e97-e73f-4047-94b2-fc8b4a8f7492', 'gpt-3.5-turbo-16k-0613', 'gpt-3.5-turbo-16k-0613', 'thinking', 'false', '2025-12-21 13:11:22.599315+00', 'true', '1'],
    ['0f0a6319-d7da-4dd2-9ed9-19be8dc8e62c', 'gpt-3.5-turbo-instruct', 'gpt-3.5-turbo-instruct', 'thinking', 'false', '2025-12-21 13:11:22.599315+00', 'true', '1'],
    ['4f9e9323-92a3-4ef2-8fc1-03b25311f4ec', 'gpt-4', 'gpt-4', 'thinking', 'false', '2025-12-21 13:11:22.599315+00', 'true', '1'],
    ['d9cf484f-d309-4447-ac39-9cd379c2e35c', 'gpt-4-0125-preview', 'gpt-4-0125-preview', 'thinking', 'false', '2025-12-21 13:11:22.599315+00', 'true', '1'],
    ['69d6fe5f-a458-473a-9e75-31bca70dc9bf', 'gpt-4-0314', 'gpt-4-0314', 'thinking', 'false', '2025-12-21 13:11:22.599315+00', 'true', '1'],
    ['06ec27d8-eec5-45ec-97e5-34441de4176c', 'gpt-4-0613', 'gpt-4-0613', 'thinking', 'false', '2025-12-21 13:11:22.599315+00', 'true', '1'],
    ['30fccb98-2e07-4bba-8d96-76faeb81fdd8', 'gpt-4-1106-preview', 'gpt-4-1106-preview', 'thinking', 'false', '2025-12-21 13:11:22.599315+00', 'true', '1'],
    ['9a5c7c43-2d08-4700-afb5-bcb16619a94b', 'gpt-4-1106-vision-preview', 'gpt-4-1106-vision-preview', 'thinking', 'false', '2025-12-21 13:11:22.599315+00', 'true', '1'],
    ['359b52df-0bd9-41e6-a351-b299cb0f2f2a', 'gpt-4-32k', 'gpt-4-32k', 'thinking', 'false', '2025-12-21 13:11:22.599315+00', 'true', '1'],
    ['71c929a7-5588-46df-b806-975a5eaf585d', 'gpt-4-32k-0314', 'gpt-4-32k-0314', 'thinking', 'false', '2025-12-21 13:11:22.599315+00', 'true', '1'],
    ['c9273342-9539-46ad-9f09-d8e8b8ca4e3f', 'gpt-4-32k-0613', 'gpt-4-32k-0613', 'thinking', 'false', '2025-12-21 13:11:22.599315+00', 'true', '1'],
    ['39bed1a2-b853-418e-9f2e-8c52b24760b3', 'gpt-4-all', 'gpt-4-all', 'thinking', 'false', '2025-12-21 13:11:23.269049+00', 'true', '1'],
    ['d051af03-7095-42e7-b0cd-80dc0daf949c', 'gpt-4-dalle', 'gpt-4-dalle', 'thinking', 'false', '2025-12-21 13:11:23.269049+00', 'true', '1']
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

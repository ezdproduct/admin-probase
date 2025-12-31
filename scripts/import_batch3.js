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
    ['9207b455-2c9d-4a11-9a5b-443a61e0239b', 'gpt-4-gizmo', 'gpt-4-gizmo', 'thinking', 'false', '2025-12-21 13:11:23.414812+00', 'true', '1'],
    ['173fec5a-24de-403c-a002-2b9d3b4bcb74', 'gpt-4-gizmo-*', 'gpt-4-gizmo-*', 'thinking', 'false', '2025-12-21 13:11:23.414812+00', 'true', '1'],
    ['078ee11f-7dcf-449d-96d5-5aff95b3290b', 'gpt-4-turbo', 'gpt-4-turbo', 'thinking', 'false', '2025-12-21 13:11:22.599315+00', 'true', '1'],
    ['4955dd69-6b33-4548-a64a-2e93b82b7d50', 'gpt-4-turbo-2024-04-09', 'gpt-4-turbo-2024-04-09', 'thinking', 'false', '2025-12-21 13:11:22.599315+00', 'true', '1'],
    ['d12a37fa-cd42-4a0d-a926-12e4744bf166', 'gpt-4-turbo-preview', 'gpt-4-turbo-preview', 'thinking', 'false', '2025-12-21 13:11:22.599315+00', 'true', '1'],
    ['14935a79-d16f-4263-ae4d-a0206a5375f4', 'gpt-4-v', 'gpt-4-v', 'thinking', 'false', '2025-12-21 13:11:23.414812+00', 'true', '1'],
    ['882450e4-672d-4d26-bd40-43a0413edaf3', 'gpt-4-vision-preview', 'gpt-4-vision-preview', 'thinking', 'false', '2025-12-21 13:11:22.599315+00', 'true', '1'],
    ['7f26ede2-1c98-4b44-aa2c-9ffc92ff0e1c', 'gpt-4.1', 'gpt-4.1', 'thinking', 'false', '2025-12-21 13:11:22.599315+00', 'true', '1'],
    ['22c8215a-06b1-41cf-916f-561d9e6dff94', 'gpt-4.1-2025-04-14', 'gpt-4.1-2025-04-14', 'thinking', 'false', '2025-12-21 13:11:22.599315+00', 'true', '1'],
    ['b124f568-5541-404e-b367-73606f7c45a9', 'gpt-4.1-mini', 'gpt-4.1-mini', 'thinking', 'false', '2025-12-21 13:11:22.599315+00', 'true', '1'],
    ['b51bc802-2ccd-4c9c-acea-97281e4b5eb6', 'gpt-4.1-mini-2025-04-14', 'gpt-4.1-mini-2025-04-14', 'thinking', 'false', '2025-12-21 13:11:22.599315+00', 'true', '1'],
    ['16f529f7-1f82-4f7a-82b9-92bc7c23d2e8', 'gpt-4.1-nano', 'gpt-4.1-nano', 'thinking', 'false', '2025-12-21 13:11:22.599315+00', 'true', '1'],
    ['403389b2-d3d8-46e6-b43e-20beee1ded42', 'gpt-4.1-nano-2025-04-14', 'gpt-4.1-nano-2025-04-14', 'thinking', 'false', '2025-12-21 13:11:22.599315+00', 'true', '1'],
    ['fb734610-6c1d-4172-9496-07411194d63b', 'gpt-4o', 'gpt-4o', 'thinking', 'false', '2025-12-21 08:45:48.45586+00', 'true', '1'],
    ['00573b5b-81e5-4681-a6b8-dd637a044483', 'gpt-4o-2024-05-13', 'gpt-4o-2024-05-13', 'thinking', 'false', '2025-12-21 13:11:22.599315+00', 'true', '1'],
    ['9eeae120-de74-441d-91ec-76bc9d1744a5', 'gpt-4o-2024-08-06', 'gpt-4o-2024-08-06', 'thinking', 'false', '2025-12-21 13:11:22.599315+00', 'true', '1'],
    ['26e9ec41-a623-4626-b6e4-751406d3599c', 'gpt-4o-2024-11-20', 'gpt-4o-2024-11-20', 'thinking', 'false', '2025-12-21 13:11:22.599315+00', 'true', '1'],
    ['1fcee1da-6f06-449b-98f8-f40917517205', 'gpt-4o-all', 'gpt-4o-all', 'thinking', 'false', '2025-12-21 13:11:23.414812+00', 'true', '1'],
    ['9ac11aa6-6324-408a-b73f-52e0f36df099', 'gpt-4o-audio-preview', 'gpt-4o-audio-preview', 'thinking', 'false', '2025-12-21 13:11:24.688779+00', 'true', '1'],
    ['0742b650-f4a2-4730-94f0-0e7bb53fe62f', 'gpt-4o-audio-preview-2024-10-01', 'gpt-4o-audio-preview-2024-10-01', 'thinking', 'false', '2025-12-21 13:11:24.688779+00', 'true', '1'],
    ['0871235f-b166-404b-9584-8c5b0f17ad1c', 'gpt-4o-audio-preview-2024-12-17', 'gpt-4o-audio-preview-2024-12-17', 'thinking', 'false', '2025-12-21 13:11:24.688779+00', 'true', '1'],
    ['9c700008-8378-49a3-acc7-c51f7076c57d', 'gpt-4o-audio-preview-2025-06-03', 'gpt-4o-audio-preview-2025-06-03', 'thinking', 'false', '2025-12-21 13:11:24.688779+00', 'true', '1'],
    ['f9cc51c3-189b-4cd0-9660-a6156380f9bb', 'gpt-4o-mini', 'gpt-4o-mini', 'thinking', 'false', '2025-12-21 13:11:22.599315+00', 'true', '1'],
    ['a2d10ddf-eb64-48b3-98b9-d82c9dd10256', 'gpt-4o-mini-2024-07-18', 'gpt-4o-mini-2024-07-18', 'thinking', 'false', '2025-12-21 13:11:22.599315+00', 'true', '1'],
    ['815d8594-bb63-46cc-801c-33c3c8f31877', 'gpt-4o-mini-audio-preview', 'gpt-4o-mini-audio-preview', 'thinking', 'false', '2025-12-21 13:11:24.688779+00', 'true', '1'],
    ['6acd4fd5-cd05-4b15-9ee8-817b92b15322', 'gpt-4o-mini-audio-preview-2024-12-17', 'gpt-4o-mini-audio-preview-2024-12-17', 'thinking', 'false', '2025-12-21 13:11:24.688779+00', 'true', '1'],
    ['664afda6-e842-4feb-b2f1-0db3fcacfa07', 'gpt-4o-mini-realtime-preview', 'gpt-4o-mini-realtime-preview', 'thinking', 'false', '2025-12-21 13:11:24.688779+00', 'true', '1'],
    ['7e8bef02-c99a-405c-b12f-c94d72f1e2ef', 'gpt-4o-mini-realtime-preview-2024-12-17', 'gpt-4o-mini-realtime-preview-2024-12-17', 'thinking', 'false', '2025-12-21 13:11:24.688779+00', 'true', '1'],
    ['69d82089-7376-49f7-8499-5ec19ea8207f', 'gpt-4o-mini-search-preview', 'gpt-4o-mini-search-preview', 'thinking', 'false', '2025-12-21 13:11:24.838584+00', 'true', '1'],
    ['a0ab5279-63ad-481f-a635-c6899d72cf32', 'gpt-4o-mini-search-preview-2025-03-11', 'gpt-4o-mini-search-preview-2025-03-11', 'thinking', 'false', '2025-12-21 13:11:24.838584+00', 'true', '1'],
    ['0c406981-59cb-416d-b18b-48e6cefcb95e', 'gpt-4o-mini-transcribe', 'gpt-4o-mini-transcribe', 'thinking', 'false', '2025-12-21 13:11:24.838584+00', 'true', '1'],
    ['375c789c-4c72-47cf-a5b7-aae82af4b025', 'gpt-4o-realtime-preview', 'gpt-4o-realtime-preview', 'thinking', 'false', '2025-12-21 13:11:24.838584+00', 'true', '1'],
    ['43d59275-c619-4b7f-9880-7896027c23f6', 'gpt-4o-realtime-preview-2024-10-01', 'gpt-4o-realtime-preview-2024-10-01', 'thinking', 'false', '2025-12-21 13:11:24.838584+00', 'true', '1'],
    ['ff95aa73-d511-4297-a124-7cf3586e909a', 'gpt-4o-realtime-preview-2024-12-17', 'gpt-4o-realtime-preview-2024-12-17', 'thinking', 'false', '2025-12-21 13:11:24.838584+00', 'true', '1'],
    ['83ba32d7-1310-4f39-a1a7-bc6f63be564a', 'gpt-4o-realtime-preview-2025-06-03', 'gpt-4o-realtime-preview-2025-06-03', 'thinking', 'false', '2025-12-21 13:11:24.838584+00', 'true', '1']
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

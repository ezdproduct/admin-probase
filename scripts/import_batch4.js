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
    ['55fb00e4-a7f2-4395-8677-2e5ffb68aec8', 'gpt-4o-search-preview', 'gpt-4o-search-preview', 'thinking', 'false', '2025-12-21 13:11:24.838584+00', 'true', '1'],
    ['1ebee304-1afc-4694-8fc7-666f2a42b7e2', 'gpt-4o-search-preview-2025-03-11', 'gpt-4o-search-preview-2025-03-11', 'thinking', 'false', '2025-12-21 13:11:24.838584+00', 'true', '1'],
    ['07a57d85-f3ae-4521-8af3-c7685d2f2ceb', 'gpt-4o-study', 'gpt-4o-study', 'thinking', 'false', '2025-12-21 13:11:23.414812+00', 'true', '1'],
    ['c9f9e652-a194-4422-96aa-cb757dd5d310', 'gpt-4o-transcribe', 'gpt-4o-transcribe', 'thinking', 'false', '2025-12-21 13:11:24.838584+00', 'true', '1'],
    ['5cce499f-0222-4989-87da-0ea9c44d7563', 'gpt-5', 'gpt-5', 'thinking', 'false', '2025-12-21 13:11:22.599315+00', 'true', '1'],
    ['38877e08-79cb-441f-b9b5-3872709f3fec', 'gpt-5-2025-08-07', 'gpt-5-2025-08-07', 'thinking', 'false', '2025-12-21 13:11:22.599315+00', 'true', '1'],
    ['286f70fe-fe72-42dd-a237-0f421e22ce94', 'gpt-5-all', 'gpt-5-all', 'thinking', 'false', '2025-12-21 13:11:24.98619+00', 'true', '1'],
    ['38f3cb32-4e4d-4fbd-b205-456e67310295', 'gpt-5-chat', 'gpt-5-chat', 'thinking', 'false', '2025-12-21 13:11:22.599315+00', 'true', '1'],
    ['66aa53b3-b0da-45ac-82bf-0e6d8cf94531', 'gpt-5-chat-2025-08-07', 'gpt-5-chat-2025-08-07', 'thinking', 'false', '2025-12-21 13:11:22.599315+00', 'true', '1'],
    ['298ed6a5-40f3-4b1a-97f1-1bd1c775f680', 'gpt-5-chat-latest', 'gpt-5-chat-latest', 'thinking', 'false', '2025-12-21 13:11:22.599315+00', 'true', '1'],
    ['82613f92-dfa4-4d71-ac1b-1ca3b11b0181', 'gpt-5-codex', 'gpt-5-codex', 'thinking', 'false', '2025-12-21 13:11:23.414812+00', 'true', '1'],
    ['51cd90ef-d1af-4306-ac2c-14aea98d64de', 'gpt-5-codex-high', 'gpt-5-codex-high', 'thinking', 'false', '2025-12-21 13:11:23.414812+00', 'true', '1'],
    ['fb0ab10a-522f-4725-8ce2-b5163b30c5f9', 'gpt-5-codex-low', 'gpt-5-codex-low', 'thinking', 'false', '2025-12-21 13:11:23.414812+00', 'true', '1'],
    ['5a3c012a-e381-4975-bc50-cb53590fd6b9', 'gpt-5-codex-medium', 'gpt-5-codex-medium', 'thinking', 'false', '2025-12-21 13:11:23.414812+00', 'true', '1'],
    ['31629538-dbef-4b31-901c-c64f05d47312', 'gpt-5-high', 'gpt-5-high', 'thinking', 'false', '2025-12-21 13:11:22.599315+00', 'true', '1'],
    ['1888a624-4f74-45e0-bdd9-0d2fa5ce763a', 'gpt-5-low', 'gpt-5-low', 'thinking', 'false', '2025-12-21 13:11:22.599315+00', 'true', '1'],
    ['77187995-82fc-4d0b-a24b-d233b80ecdef', 'gpt-5-medium', 'gpt-5-medium', 'thinking', 'false', '2025-12-21 13:11:22.599315+00', 'true', '1'],
    ['fff84d83-f61a-4417-ab3a-5ace3bc3e57d', 'gpt-5-mini-2025-08-07', 'gpt-5-mini-2025-08-07', 'thinking', 'false', '2025-12-21 13:11:22.599315+00', 'true', '1'],
    ['d7f0508c-8b08-412d-a5c3-c4688b88f774', 'gpt-5-mini-flex', 'gpt-5-mini-flex', 'thinking', 'false', '2025-12-21 13:11:24.838584+00', 'true', '1'],
    ['e1f36070-258a-4d2c-9839-36ffb223de1d', 'gpt-5-mini-medium', 'gpt-5-mini-medium', 'thinking', 'false', '2025-12-21 13:11:24.838584+00', 'true', '1'],
    ['1a04109f-3a76-4137-8a83-9cab29f48457', 'gpt-5-mini-minimal', 'gpt-5-mini-minimal', 'thinking', 'false', '2025-12-21 13:11:24.838584+00', 'true', '1'],
    ['944ebb26-b3dc-4244-9ec0-55577acbed2d', 'gpt-5-minimal', 'gpt-5-minimal', 'thinking', 'false', '2025-12-21 13:11:23.414812+00', 'true', '1'],
    ['90f0d486-6d54-434e-b27a-ec7a61391d50', 'gpt-5-nano-2025-08-07', 'gpt-5-nano-2025-08-07', 'thinking', 'false', '2025-12-21 13:11:22.599315+00', 'true', '1'],
    ['72a2328c-bbd2-4b53-9140-3bb625828486', 'gpt-5-pro', 'gpt-5-pro', 'thinking', 'false', '2025-12-21 13:11:24.838584+00', 'true', '1'],
    ['c956694c-e251-48b0-a9fa-06f59c572819', 'gpt-5-pro-high', 'gpt-5-pro-high', 'thinking', 'false', '2025-12-21 13:11:24.838584+00', 'true', '1'],
    ['e2bbcbe1-d34c-491b-a1e0-c52d095f0a7d', 'gpt-5-search-api', 'gpt-5-search-api', 'thinking', 'false', '2025-12-21 13:11:24.838584+00', 'true', '1'],
    ['dea1afa8-b7b7-4ecf-b89a-23883b6f6629', 'gpt-5-search-api-2025-10-14', 'gpt-5-search-api-2025-10-14', 'thinking', 'false', '2025-12-21 13:11:24.838584+00', 'true', '1'],
    ['9f9ac1e7-f266-4445-8acc-0c648038bc3f', 'gpt-5-thinking', 'gpt-5-thinking', 'thinking', 'false', '2025-12-21 13:11:24.98619+00', 'true', '1'],
    ['e7d933c1-987f-4acf-b1ad-a7574691fae1', 'gpt-5-thinking-all', 'gpt-5-thinking-all', 'thinking', 'false', '2025-12-21 13:11:24.98619+00', 'true', '1'],
    ['8eda9906-6055-4e6d-a253-d106a1e84603', 'gpt-5.1-2025-11-13', 'gpt-5.1-2025-11-13', 'thinking', 'false', '2025-12-21 13:11:23.414812+00', 'true', '1'],
    ['9f6064b2-f6ed-4d6a-9b3a-e626f760c74b', 'gpt-5.1-all', 'gpt-5.1-all', 'thinking', 'false', '2025-12-21 13:11:23.414812+00', 'true', '1'],
    ['78ae6d17-a616-4c96-b8e3-3e7e0d84f127', 'gpt-5.1-chat-latest', 'gpt-5.1-chat-latest', 'thinking', 'false', '2025-12-21 13:11:24.838584+00', 'true', '1'],
    ['c4a88435-e0df-49f5-8878-cb719ea6db62', 'gpt-5.1-codex', 'gpt-5.1-codex', 'thinking', 'false', '2025-12-21 13:11:23.414812+00', 'true', '1'],
    ['5be31741-d894-4f54-b490-68bf49e9b28b', 'gpt-5.1-codex-high', 'gpt-5.1-codex-high', 'thinking', 'false', '2025-12-21 13:11:23.414812+00', 'true', '1'],
    ['e4b7f913-9616-427a-b392-280e4bc7ea16', 'gpt-5.1-codex-medium', 'gpt-5.1-codex-medium', 'thinking', 'false', '2025-12-21 13:11:23.414812+00', 'true', '1'],
    ['423ce9b2-635d-46cf-b427-4be863ecbc9c', 'gpt-5.1-codex-mini', 'gpt-5.1-codex-mini', 'thinking', 'false', '2025-12-21 13:11:23.414812+00', 'true', '1']
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

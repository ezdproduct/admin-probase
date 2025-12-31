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
    ['8f3a5719-fd4d-4d98-91aa-085cdf3684be', 'gpt-5.1-low', 'gpt-5.1-low', 'thinking', 'false', '2025-12-21 13:11:23.414812+00', 'true', '1'],
    ['283f1f3e-3e88-4f0f-b5f5-80ee2fbcd1ac', 'gpt-5.1-medium', 'gpt-5.1-medium', 'thinking', 'false', '2025-12-21 13:11:23.414812+00', 'true', '1'],
    ['92fa56e9-1d45-42f1-b981-581385f7454f', 'gpt-5.1-thinking', 'gpt-5.1-thinking', 'thinking', 'false', '2025-12-21 13:11:23.414812+00', 'true', '1'],
    ['66bf3166-982e-42fa-8ed3-ea7af1f3b074', 'gpt-5.1-thinking-all', 'gpt-5.1-thinking-all', 'thinking', 'false', '2025-12-21 13:11:23.414812+00', 'true', '1'],
    ['aeddfafc-b181-4a77-8745-9bc8863f4ae3', 'gpt-5.2-2025-12-11', 'gpt-5.2-2025-12-11', 'thinking', 'false', '2025-12-21 08:45:48.45586+00', 'true', '1'],
    ['fa219cb6-0362-4195-81a5-f8e087dbdfcb', 'gpt-5.2-all', 'gpt-5.2-all', 'thinking', 'false', '2025-12-21 13:11:23.414812+00', 'true', '1'],
    ['ee8be4be-7911-458c-bc46-c08ec75d979d', 'gpt-5.2-codex', 'gpt-5.2-codex', 'thinking', 'false', '2025-12-21 13:11:23.414812+00', 'true', '1'],
    ['9de47ab1-23b5-4ee3-8fe2-0d13e4c1a4a0', 'gpt-5.2-pro-2025-12-11', 'gpt-5.2-pro-2025-12-11', 'thinking', 'false', '2025-12-21 13:11:24.838584+00', 'true', '1'],
    ['be3dae40-d0b2-4a04-ba8e-49585c21c2cf', 'gpt-audio', 'gpt-audio', 'thinking', 'false', '2025-12-21 13:11:24.838584+00', 'true', '1'],
    ['24c357eb-cae7-48d9-90b3-37a377a7579e', 'gpt-audio-2025-08-28', 'gpt-audio-2025-08-28', 'thinking', 'false', '2025-12-21 13:11:24.838584+00', 'true', '1'],
    ['5e42dc63-55cd-49fd-95ca-678bc8a85a51', 'gpt-audio-mini', 'gpt-audio-mini', 'thinking', 'false', '2025-12-21 13:11:24.838584+00', 'true', '1'],
    ['b572fdbf-8c30-402e-b089-98c8d5ec098e', 'gpt-audio-mini-2025-10-06', 'gpt-audio-mini-2025-10-06', 'thinking', 'false', '2025-12-21 13:11:24.838584+00', 'true', '1'],
    ['f8bae702-8c8a-4844-8f84-93841c71f4dd', 'gpt-oss-120b', 'gpt-oss-120b', 'thinking', 'false', '2025-12-21 13:11:23.414812+00', 'true', '1'],
    ['87dd4f01-1f34-430d-97fd-ca1a8a0f01bc', 'gpt-oss-20b', 'gpt-oss-20b', 'thinking', 'false', '2025-12-21 13:11:23.414812+00', 'true', '1'],
    ['42473ba3-c45d-4762-b389-8e0abae22c1b', 'net-gpt-3.5-turbo', 'net-gpt-3.5-turbo', 'thinking', 'false', '2025-12-21 13:11:23.917918+00', 'true', '1'],
    ['cec4980e-bd8b-4172-a6fc-9e32c363ab82', 'net-gpt-3.5-turbo-0613', 'net-gpt-3.5-turbo-0613', 'thinking', 'false', '2025-12-21 13:11:23.917918+00', 'true', '1'],
    ['706982c9-2244-42f8-9356-d1eeb456308d', 'net-gpt-3.5-turbo-16k', 'net-gpt-3.5-turbo-16k', 'thinking', 'false', '2025-12-21 13:11:23.917918+00', 'true', '1'],
    ['4301c5fa-af14-4966-b901-9a5d290d2f1f', 'net-gpt-3.5-turbo-16k-0613', 'net-gpt-3.5-turbo-16k-0613', 'thinking', 'false', '2025-12-21 13:11:23.917918+00', 'true', '1'],
    ['07ac2fba-d80b-4d2b-bf20-f4ec6c628edd', 'net-gpt-4', 'net-gpt-4', 'thinking', 'false', '2025-12-21 13:11:23.917918+00', 'true', '1'],
    ['2a5b6a1b-1902-4552-9de8-572f18ac9b91', 'net-gpt-4-0125-preview', 'net-gpt-4-0125-preview', 'thinking', 'false', '2025-12-21 13:11:23.917918+00', 'true', '1'],
    ['e2efd9ae-f03a-4599-bf46-9bc119f8020a', 'net-gpt-4-0314', 'net-gpt-4-0314', 'thinking', 'false', '2025-12-21 13:11:23.917918+00', 'true', '1'],
    ['eb32c22f-92c7-4b12-8b56-bdfe99a9d0a9', 'net-gpt-4-0613', 'net-gpt-4-0613', 'thinking', 'false', '2025-12-21 13:11:23.917918+00', 'true', '1'],
    ['5d9367c1-a1c8-4725-b48d-82f8a13faec7', 'net-gpt-4-1106-preview', 'net-gpt-4-1106-preview', 'thinking', 'false', '2025-12-21 13:11:23.917918+00', 'true', '1'],
    ['9450b4df-0349-44e2-bf6e-d7061f884eb6', 'net-gpt-4-32k', 'net-gpt-4-32k', 'thinking', 'false', '2025-12-21 13:11:23.917918+00', 'true', '1'],
    ['f7c81f61-b307-48e1-a91e-f36dd9c493e9', 'net-gpt-4-turbo', 'net-gpt-4-turbo', 'thinking', 'false', '2025-12-21 13:11:23.917918+00', 'true', '1'],
    ['b633d6d8-c517-4205-9376-6fb262e8e315', 'net-gpt-4-turbo-preview', 'net-gpt-4-turbo-preview', 'thinking', 'false', '2025-12-21 13:11:23.917918+00', 'true', '1'],
    ['4e31b4d0-bef9-4bb3-a477-57a40fd39ed4', 'net-gpt-4o', 'net-gpt-4o', 'thinking', 'false', '2025-12-21 13:11:23.917918+00', 'true', '1'],
    ['5e28ad7f-154b-4acc-b6d4-ad5321236069', 'search-gpts', 'search-gpts', 'thinking', 'false', '2025-12-21 13:11:24.23411+00', 'true', '1'],
    ['bb6f96e7-e322-4e35-aceb-38e6c1f9b381', 'search-gpts-chat', 'search-gpts-chat', 'thinking', 'false', '2025-12-21 13:11:24.23411+00', 'true', '1'],
    ['a07610fb-c576-4c21-b4c9-7de0cf8ed032', 'gpt-4o-image', 'gpt-4o-image', 'generation', 'false', '2025-12-21 13:11:23.414812+00', 'true', '1'],
    ['87574e6b-6dff-408e-991d-b09adb02873b', 'gpt-4o-image-vip', 'gpt-4o-image-vip', 'generation', 'false', '2025-12-21 13:11:23.414812+00', 'true', '1'],
    ['af9e493e-526b-428d-bc53-85ceb4934698', 'gpt-4o-mini-tts', 'gpt-4o-mini-tts', 'generation', 'false', '2025-12-21 13:11:24.838584+00', 'true', '1'],
    ['a38e5cbd-13b5-479e-92ec-f10174a15485', 'gpt-image-1-mini', 'gpt-image-1-mini', 'generation', 'false', '2025-12-21 13:11:24.838584+00', 'true', '1']
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

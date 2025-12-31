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
    ['773f9c2b-75c3-4629-9a2e-9e831ca7e5e7', 'mj_fast_inpaint', 'mj_fast_inpaint', 'thinking', 'false', '2025-12-21 13:11:23.751132+00', 'false', '1'],
    ['4b8987cd-9324-43dc-8c92-fd900dc32368', 'mj_fast_low_variation', 'mj_fast_low_variation', 'thinking', 'false', '2025-12-21 13:11:23.751132+00', 'false', '1'],
    ['b8afff9b-f4b1-4246-9952-8f57dfc02845', 'mj_fast_modal', 'mj_fast_modal', 'thinking', 'false', '2025-12-21 13:11:23.751132+00', 'false', '1'],
    ['2375c7e5-f29e-4caf-ad66-37c9b9f3c2e9', 'mj_fast_outpaint', 'mj_fast_outpaint', 'thinking', 'false', '2025-12-21 13:11:23.751132+00', 'false', '1'],
    ['276bb8ed-c5a5-40fb-a576-7bb8838fbb7e', 'mj_fast_pan', 'mj_fast_pan', 'thinking', 'false', '2025-12-21 13:11:23.751132+00', 'false', '1'],
    ['e65a821a-2a56-42c4-a478-7d315e9b1b2a', 'mj_fast_reroll', 'mj_fast_reroll', 'thinking', 'false', '2025-12-21 13:11:23.751132+00', 'false', '1'],
    ['da4e05e4-ab35-4341-b867-c0aefc1e3852', 'mj_fast_ric_reader', 'mj_fast_ric_reader', 'thinking', 'false', '2025-12-21 13:11:23.751132+00', 'false', '1'],
    ['75d70af5-21e1-4b80-b333-68736c432068', 'mj_fast_ricreader_retry', 'mj_fast_ricreader_retry', 'thinking', 'false', '2025-12-21 13:11:23.751132+00', 'false', '1'],
    ['4e2f51b7-812b-4f99-af59-d01ee99a6204', 'mj_fast_shorten', 'mj_fast_shorten', 'thinking', 'false', '2025-12-21 13:11:23.751132+00', 'false', '1'],
    ['7ffed921-3c79-4d94-9d6d-1b6e8385b505', 'mj_fast_upload', 'mj_fast_upload', 'thinking', 'false', '2025-12-21 13:11:23.751132+00', 'false', '1'],
    ['55c91d29-54ee-4463-80f8-5e8920af1011', 'mj_fast_upscale', 'mj_fast_upscale', 'thinking', 'false', '2025-12-21 13:11:23.751132+00', 'false', '1'],
    ['ce524da4-33b7-468a-a74f-76521557dbec', 'mj_fast_upscale_2x', 'mj_fast_upscale_2x', 'thinking', 'false', '2025-12-21 13:11:23.751132+00', 'false', '1'],
    ['4c54f496-02b1-433c-a3cc-8bb830a7c217', 'mj_fast_upscale_4x', 'mj_fast_upscale_4x', 'thinking', 'false', '2025-12-21 13:11:23.751132+00', 'false', '1'],
    ['157098b4-8039-4d0d-8e88-9990973942b8', 'mj_fast_variation', 'mj_fast_variation', 'thinking', 'false', '2025-12-21 13:11:23.751132+00', 'false', '1'],
    ['732ba16e-cda9-4571-840f-89a57c82019e', 'mj_fast_zoom', 'mj_fast_zoom', 'thinking', 'false', '2025-12-21 13:11:23.751132+00', 'false', '1'],
    ['71aa83f1-d056-4aa4-911a-5a140387558e', 'mj_relax_blend', 'mj_relax_blend', 'thinking', 'false', '2025-12-21 13:11:23.751132+00', 'false', '1'],
    ['179dc0e2-50d7-4339-9b3b-a020e2fd0b87', 'mj_relax_custom_zoom', 'mj_relax_custom_zoom', 'thinking', 'false', '2025-12-21 13:11:23.751132+00', 'false', '1'],
    ['38b6ccf2-e5f2-4683-bc94-610abd2977d4', 'mj_relax_describe', 'mj_relax_describe', 'thinking', 'false', '2025-12-21 13:11:23.751132+00', 'false', '1'],
    ['775f01fc-20d7-4814-a787-993fdcb5cb77', 'mj_relax_edits', 'mj_relax_edits', 'thinking', 'false', '2025-12-21 13:11:23.751132+00', 'false', '1'],
    ['a2b44f7f-54f2-4acb-ad5a-d47950e06430', 'mj_relax_high_variation', 'mj_relax_high_variation', 'thinking', 'false', '2025-12-21 13:11:23.751132+00', 'false', '1'],
    ['78c804a2-6b00-4872-9964-08f89384450d', 'mj_relax_imagine', 'mj_relax_imagine', 'thinking', 'false', '2025-12-21 13:11:23.751132+00', 'false', '1'],
    ['65f12c87-ada9-4467-a96e-333cc6902301', 'mj_relax_inpaint', 'mj_relax_inpaint', 'thinking', 'false', '2025-12-21 13:11:23.751132+00', 'false', '1'],
    ['f2bfb618-1d5e-455b-807a-89b7ee60d3ce', 'mj_relax_low_variation', 'mj_relax_low_variation', 'thinking', 'false', '2025-12-21 13:11:23.751132+00', 'false', '1'],
    ['f381dab7-3ca5-486b-9736-19ad1ce38852', 'mj_relax_modal', 'mj_relax_modal', 'thinking', 'false', '2025-12-21 13:11:23.751132+00', 'false', '1'],
    ['2b5a4020-7e2c-49e2-824f-49be765aef6e', 'mj_relax_outpaint', 'mj_relax_outpaint', 'thinking', 'false', '2025-12-21 13:11:23.751132+00', 'false', '1'],
    ['cc13e86e-6d4a-4c51-9ef8-1018d2b86eeb', 'mj_relax_pan', 'mj_relax_pan', 'thinking', 'false', '2025-12-21 13:11:23.751132+00', 'false', '1'],
    ['22c2e60c-f7a8-4056-ad03-9a91baf95030', 'mj_relax_reroll', 'mj_relax_reroll', 'thinking', 'false', '2025-12-21 13:11:23.751132+00', 'false', '1'],
    ['1f05b5cd-8aee-4184-bbb4-baa5deabd4d7', 'mj_relax_ric_reader', 'mj_relax_ric_reader', 'thinking', 'false', '2025-12-21 13:11:23.751132+00', 'false', '1'],
    ['720fc55f-bc30-4084-b039-534dbd488278', 'mj_relax_ricreader_retry', 'mj_relax_ricreader_retry', 'thinking', 'false', '2025-12-21 13:11:23.751132+00', 'false', '1'],
    ['15bf4705-69e8-4227-b315-de0716fb926e', 'mj_relax_shorten', 'mj_relax_shorten', 'thinking', 'false', '2025-12-21 13:11:23.751132+00', 'false', '1'],
    ['23d1c619-7df2-41d4-8248-df1d81ff98b1', 'mj_relax_upload', 'mj_relax_upload', 'thinking', 'false', '2025-12-21 13:11:23.751132+00', 'false', '1'],
    ['ed25c926-a94d-44db-af94-c3c87e84f901', 'mj_relax_upscale', 'mj_relax_upscale', 'thinking', 'false', '2025-12-21 13:11:23.751132+00', 'false', '1'],
    ['8339d04c-0328-45f5-ab03-e49f0b0601f2', 'mj_relax_upscale_2x', 'mj_relax_upscale_2x', 'thinking', 'false', '2025-12-21 13:11:23.751132+00', 'false', '1'],
    ['135f678a-c6f9-49da-8b3c-d31cee52307d', 'mj_relax_upscale_4x', 'mj_relax_upscale_4x', 'thinking', 'false', '2025-12-21 13:11:23.751132+00', 'false', '1'],
    ['fbcc6791-49e6-4893-b92e-e74ff015af70', 'mj_relax_variation', 'mj_relax_variation', 'thinking', 'false', '2025-12-21 13:11:23.917918+00', 'false', '1'],
    ['de9653e3-574e-445a-9629-e0b4b3a8809d', 'mj_relax_zoom', 'mj_relax_zoom', 'thinking', 'false', '2025-12-21 13:11:23.917918+00', 'false', '1'],
    ['ec2c8592-8198-487d-878e-b58dd2a54e50', 'moonshot-v1-128k', 'moonshot-v1-128k', 'thinking', 'false', '2025-12-21 13:11:23.917918+00', 'false', '1'],
    ['983288c0-48ba-4540-89cf-00042736664c', 'moonshot-v1-32k', 'moonshot-v1-32k', 'thinking', 'false', '2025-12-21 13:11:23.917918+00', 'false', '1'],
    ['78d4d35f-d9a4-4c10-98b9-bdbbf5b438c3', 'moonshot-v1-8k', 'moonshot-v1-8k', 'thinking', 'false', '2025-12-21 13:11:23.917918+00', 'false', '1'],
    ['04be18df-93a6-414a-8e38-e787a70ecb94', 'moonshotai/kimi-k2-instruct', 'moonshotai/kimi-k2-instruct', 'thinking', 'false', '2025-12-21 13:11:23.917918+00', 'false', '1']
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

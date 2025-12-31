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
    ['fb567ef7-7bda-4251-bcc6-83f4ffd6b0de', 'gemini-1.5-flash', 'gemini-1.5-flash', 'thinking', 'true', '2025-12-21 13:11:23.269049+00', 'true', '1'],
    ['88f8a6d8-cc07-42fc-8eef-1ec5fa95416c', 'gemini-1.5-flash-002', 'gemini-1.5-flash-002', 'thinking', 'true', '2025-12-21 13:11:23.269049+00', 'true', '1'],
    ['50496ec7-ce29-4a31-8481-c25828296369', 'gemini-1.5-pro', 'gemini-1.5-pro', 'thinking', 'true', '2025-12-21 13:11:23.269049+00', 'true', '1'],
    ['84badf26-145e-4224-8787-ada31cb167a2', 'gemini-1.5-pro-002', 'gemini-1.5-pro-002', 'thinking', 'true', '2025-12-21 13:11:23.269049+00', 'true', '1'],
    ['5d0f77d4-b722-4fd3-84c8-5197d807775d', 'gemini-2.0-flash', 'gemini-2.0-flash', 'thinking', 'true', '2025-12-21 08:45:48.45586+00', 'true', '1'],
    ['9f633626-cdd9-491f-a7eb-5eafc350d2c0', 'gemini-2.0-flash-001', 'gemini-2.0-flash-001', 'thinking', 'true', '2025-12-21 13:11:23.269049+00', 'true', '1'],
    ['a23aac86-d9e2-4739-9ee3-edc235388233', 'gemini-2.0-flash-lite', 'gemini-2.0-flash-lite', 'thinking', 'true', '2025-12-21 13:11:23.269049+00', 'true', '1'],
    ['2c324841-9a0b-4523-b5df-55ea70fca88a', 'gemini-2.0-flash-lite-001', 'gemini-2.0-flash-lite-001', 'thinking', 'true', '2025-12-21 13:11:23.269049+00', 'true', '1'],
    ['b441fee9-50a7-4164-bbda-27ac723f3dda', 'gemini-2.5-flash', 'gemini-2.5-flash', 'thinking', 'true', '2025-12-21 13:11:23.269049+00', 'true', '1'],
    ['598d2d6e-d0cd-45bf-b747-1bfba788ffbe', 'gemini-2.5-flash-lite', 'gemini-2.5-flash-lite', 'thinking', 'true', '2025-12-21 13:11:23.269049+00', 'true', '1'],
    ['03fe7709-32aa-4ef4-aeef-d6869b27bb41', 'gemini-2.5-flash-preview-04-17', 'gemini-2.5-flash-preview-04-17', 'thinking', 'true', '2025-12-21 13:11:23.269049+00', 'true', '1'],
    ['4eb5276b-b739-4447-bb5c-4716d6641224', 'gemini-2.5-flash-preview-05-20', 'gemini-2.5-flash-preview-05-20', 'thinking', 'true', '2025-12-21 13:11:23.269049+00', 'true', '1'],
    ['a5437aa4-934a-4ae5-bb1f-81ab1ef990d0', 'gemini-2.5-flash-thinking', 'gemini-2.5-flash-thinking', 'thinking', 'true', '2025-12-21 13:11:23.269049+00', 'true', '1'],
    ['67347603-f07e-4053-b216-e5cece273372', 'gemini-2.5-pro', 'gemini-2.5-pro', 'thinking', 'true', '2025-12-21 13:11:23.269049+00', 'true', '1'],
    ['f4d2d5b2-45f8-4a44-b78e-0a2d55a3856d', 'gemini-2.5-pro-nothinking', 'gemini-2.5-pro-nothinking', 'thinking', 'true', '2025-12-21 13:11:23.269049+00', 'true', '1'],
    ['fb37b4b9-40cc-4204-b877-511519aa1ce2', 'gemini-2.5-pro-preview-03-25', 'gemini-2.5-pro-preview-03-25', 'thinking', 'true', '2025-12-21 13:11:23.269049+00', 'true', '1'],
    ['ff2509d7-b903-4e66-862c-ea39e76cb158', 'gemini-2.5-pro-preview-05-06', 'gemini-2.5-pro-preview-05-06', 'thinking', 'true', '2025-12-21 13:11:23.269049+00', 'true', '1'],
    ['157e6739-f629-44d0-9bed-efd632a527fa', 'gemini-2.5-pro-preview-06-05', 'gemini-2.5-pro-preview-06-05', 'thinking', 'true', '2025-12-21 13:11:23.269049+00', 'true', '1'],
    ['43fe6753-e2cd-4dee-8574-5c5d6859b741', 'gemini-2.5-pro-thinking-*', 'gemini-2.5-pro-thinking-*', 'thinking', 'true', '2025-12-21 13:11:23.269049+00', 'true', '1'],
    ['9aee39bd-4b7e-4a53-891c-1de5d9dfab69', 'gemini-3-flash-preview', 'gemini-3-flash-preview', 'thinking', 'true', '2025-12-21 13:11:23.269049+00', 'true', '1'],
    ['3b0b82e5-02b2-47f9-b942-825af07dacc7', 'gemini-3-pro-preview', 'gemini-3-pro-preview', 'thinking', 'true', '2025-12-21 13:11:23.269049+00', 'true', '1'],
    ['d229e81b-0720-4c24-acf3-0ccc6203a2a5', 'gemini-3-pro-preview-thinking-*', 'gemini-3-pro-preview-thinking-*', 'thinking', 'true', '2025-12-21 13:11:23.269049+00', 'true', '1'],
    ['1ed0221d-428f-4570-ba09-574d2cbd825b', 'gemini-pro', 'gemini-pro', 'thinking', 'true', '2025-12-21 13:11:23.269049+00', 'true', '1'],
    ['14406cf2-7e54-48ff-b935-fc50e20fcadd', 'google-palm', 'google-palm', 'thinking', 'true', '2025-12-21 13:11:23.269049+00', 'true', '1'],
    ['bfb85c2f-4268-4737-9c9a-61551e8a4876', 'gpt-5-mini', 'gpt-5-mini', 'thinking', 'true', '2025-12-21 13:11:22.599315+00', 'true', '1'],
    ['bdd4ba7c-1017-4798-9703-ffde76419a51', 'gpt-5-nano', 'gpt-5-nano', 'thinking', 'true', '2025-12-21 13:11:22.599315+00', 'true', '1'],
    ['0701f67c-f968-494a-8533-8da10bcdbe7b', 'gpt-5.1', 'gpt-5.1', 'thinking', 'true', '2025-12-21 13:11:23.414812+00', 'true', '1'],
    ['7e0acbdb-698d-4cdb-b301-9cd363c90916', 'gpt-5.1-high', 'gpt-5.1-high', 'thinking', 'true', '2025-12-21 13:11:23.414812+00', 'true', '1'],
    ['551e2080-ccc1-4287-a0c9-d38d5b9efc77', 'gpt-5.2', 'gpt-5.2', 'thinking', 'true', '2025-12-21 13:11:23.414812+00', 'true', '1'],
    ['9bb682f0-ba3c-465c-ac93-85d82e8742ee', 'gpt-5.2-chat-latest', 'gpt-5.2-chat-latest', 'thinking', 'true', '2025-12-21 13:11:24.838584+00', 'true', '1'],
    ['61a6f230-e80f-4827-952e-0c020fde21f4', 'gpt-5.2-pro', 'gpt-5.2-pro', 'thinking', 'true', '2025-12-21 13:11:24.838584+00', 'true', '1'],
    ['c5658355-5652-4518-b88c-71d736482f51', 'gpt-5.2-thinking', 'gpt-5.2-thinking', 'thinking', 'true', '2025-12-21 13:11:23.414812+00', 'true', '1'],
    ['b1e9c28f-a0e3-4ca5-b464-ebd879883929', 'ideogram-generate-v3', 'ideogram-generate-v3', 'thinking', 'true', '2025-12-21 13:11:24.688779+00', 'true', '1'],
    ['fe64c2ba-2bfc-4b78-b0ad-c8d57efc5e5e', 'mj_fast_imagine', 'mj_fast_imagine', 'thinking', 'true', '2025-12-21 13:11:23.751132+00', 'true', '1'],
    ['add48037-6180-4442-abd5-34a598500750', 'recraft-ai/recraft-v3', 'recraft-ai/recraft-v3', 'thinking', 'true', '2025-12-21 13:11:24.688779+00', 'true', '1'],
    ['bc7b7da3-fa03-4bb7-a981-3ea5363adb0f', 'recraftv3', 'recraftv3', 'thinking', 'true', '2025-12-21 13:11:24.23411+00', 'true', '1'],
    ['67bf7dfe-6608-4250-a487-3d0c24310179', 'flux', 'flux', 'generation', 'true', '2025-12-21 13:11:23.127436+00', 'true', '1'],
    ['bddd84fb-13e4-4eb3-a998-27e8115dbd19', 'gemini-2.0-flash-exp-image-generation', 'gemini-2.0-flash-exp-image-generation', 'generation', 'true', '2025-12-21 13:11:23.269049+00', 'true', '1'],
    ['4c977b10-62a4-4a3c-880e-981412c2a9c4', 'gemini-2.0-flash-preview-image-generation', 'gemini-2.0-flash-preview-image-generation', 'generation', 'true', '2025-12-21 13:11:23.269049+00', 'true', '1'],
    ['27a35439-7c07-46d2-8d52-79dae56ac00b', 'gemini-2.5-flash-image', 'gemini-2.5-flash-image', 'generation', 'true', '2025-12-21 13:11:23.269049+00', 'true', '1'],
    ['c9192f61-f2b2-4a1f-9496-31cffae71745', 'gemini-2.5-flash-image-preview', 'gemini-2.5-flash-image-preview', 'generation', 'true', '2025-12-21 13:11:23.269049+00', 'true', '1'],
    ['cc5ab8a6-8f10-4da1-946d-78127615c55c', 'gemini-3-pro-image-preview', 'gemini-3-pro-image-preview', 'generation', 'true', '2025-12-21 13:11:23.269049+00', 'true', '1'],
    ['a25a2705-ac52-4072-b75c-266c034d3dee', 'google/imagen-4', 'google/imagen-4', 'generation', 'true', '2025-12-21 13:11:24.688779+00', 'true', '1'],
    ['3ad7a90d-c953-4500-a6ea-932aea9c35a3', 'google/imagen-4-fast', 'google/imagen-4-fast', 'generation', 'true', '2025-12-21 13:11:24.688779+00', 'true', '1'],
    ['95273f0b-9693-4ff4-9ed8-45fa830e8640', 'google/imagen-4-ultra', 'google/imagen-4-ultra', 'generation', 'true', '2025-12-21 13:11:24.688779+00', 'true', '1'],
    ['1366141c-e98f-44ba-bfd6-18dbbe4fcfe3', 'gpt-image-1', 'gpt-image-1', 'generation', 'true', '2025-12-21 13:11:23.414812+00', 'true', '1'],
    ['64eefc9b-813d-427b-9789-6a2595fdebb9', 'gpt-image-1.5', 'gpt-image-1.5', 'generation', 'true', '2025-12-21 13:11:23.414812+00', 'true', '1'],
    ['ceb5baa0-de83-453c-be83-641451886b71', 'sora_image', 'sora_image', 'generation', 'true', '2025-12-21 13:11:24.23411+00', 'true', '1'],
    ['d189ad3c-2550-4cd7-901f-76c708139a85', 'sora_image-vip', 'sora_image-vip', 'generation', 'true', '2025-12-21 13:11:24.23411+00', 'true', '1'],
    ['0744914c-3fa8-4e54-97b1-f70d07128d6a', 'chatgpt-4o-latest', 'chatgpt-4o-latest', 'thinking', 'false', '2025-12-21 13:11:22.599315+00', 'true', '1'],
    ['222d5bb2-9568-4b35-aa29-e416089e3896', 'gemini-2.5-flash-lite-preview-06-17', 'gemini-2.5-flash-lite-preview-06-17', 'thinking', 'false', '2025-12-21 13:11:23.269049+00', 'true', '1'],
    ['0e43eacb-d309-4189-a074-e33f2357d213', 'gemini-2.5-flash-lite-preview-09-2025', 'gemini-2.5-flash-lite-preview-09-2025', 'thinking', 'false', '2025-12-21 13:11:23.269049+00', 'true', '1'],
    ['7fefaab2-a951-4535-bc79-cb08afbad5f9', 'gemini-2.5-flash-nothinking', 'gemini-2.5-flash-nothinking', 'thinking', 'false', '2025-12-21 13:11:23.269049+00', 'true', '1']
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

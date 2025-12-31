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
    ['73d4f9f1-04e3-4e39-9e07-58c79b4f33ee', 'advanced-voice', 'advanced-voice', 'thinking', 'false', '2025-12-21 13:11:22.8222+00', 'false', '1'],
    ['ccfae66b-aa4b-48eb-8660-b186c90f7f19', 'animate-anyone-detect-gen2', 'animate-anyone-detect-gen2', 'thinking', 'false', '2025-12-21 13:11:22.8222+00', 'false', '1'],
    ['7d43c899-2423-4485-bd26-db54e6f136c1', 'animate-anyone-gen2', 'animate-anyone-gen2', 'thinking', 'false', '2025-12-21 13:11:22.8222+00', 'false', '1'],
    ['b03d6204-2fca-4b66-905d-da124a77a30b', 'animate-anyone-template-gen2', 'animate-anyone-template-gen2', 'thinking', 'false', '2025-12-21 13:11:22.8222+00', 'false', '1'],
    ['80da8a04-409e-4cb6-bcaa-9c6cbb246931', 'avatar-generate', 'avatar-generate', 'thinking', 'false', '2025-12-21 13:11:22.8222+00', 'false', '1'],
    ['3808e7c3-6a6c-4343-b163-a47cb48a2ad8', 'avatar-voice', 'avatar-voice', 'thinking', 'false', '2025-12-21 13:11:22.8222+00', 'false', '1'],
    ['804d93b2-37e9-4360-9c14-11d44d009f72', 'BAAI/bge-large-en-v1.5', 'BAAI/bge-large-en-v1.5', 'thinking', 'false', '2025-12-21 13:11:22.8222+00', 'false', '1'],
    ['ab408c65-0a46-4e09-b85e-2f220db95ae0', 'BAAI/bge-large-zh-v1.5', 'BAAI/bge-large-zh-v1.5', 'thinking', 'false', '2025-12-21 13:11:22.8222+00', 'false', '1'],
    ['3b0b6d3a-51fd-4300-be95-836a8041f279', 'BAAI/bge-m3', 'BAAI/bge-m3', 'thinking', 'false', '2025-12-21 13:11:22.8222+00', 'false', '1'],
    ['22f85898-b2c4-4d2f-bf45-163495bfd7e0', 'BAAI/bge-reranker-v2-m3', 'BAAI/bge-reranker-v2-m3', 'thinking', 'false', '2025-12-21 13:11:22.8222+00', 'false', '1'],
    ['4bec04a8-9c24-4208-a071-3ea7ffcdbaf2', 'babbage-002', 'babbage-002', 'thinking', 'false', '2025-12-21 13:11:24.688779+00', 'false', '1'],
    ['c39adc13-53ba-4e31-8383-315c4ab2423e', 'Balanced', 'Balanced', 'thinking', 'false', '2025-12-21 13:11:22.8222+00', 'false', '1'],
    ['f4781e16-d72f-426f-bf41-3f7357ce8e32', 'bge-m3', 'bge-m3', 'thinking', 'false', '2025-12-21 13:11:22.980216+00', 'false', '1'],
    ['e96c6a23-4058-4df9-b4b9-66390254ccc7', 'Bing', 'Bing', 'thinking', 'false', '2025-12-21 13:11:22.980216+00', 'false', '1'],
    ['99685a67-a473-4c63-9923-3db9e5f96753', 'chat_fast_imagine', 'chat_fast_imagine', 'thinking', 'false', '2025-12-21 13:11:22.980216+00', 'false', '1'],
    ['bf2b9fa0-73a2-4df3-9181-400fc0fdc77d', 'chat_relax_imagine', 'chat_relax_imagine', 'thinking', 'false', '2025-12-21 13:11:22.980216+00', 'false', '1'],
    ['a54298c2-c8d2-4854-9648-ac24bfb0938c', 'chirp-v2-xxl-alpha', 'chirp-v2-xxl-alpha', 'thinking', 'false', '2025-12-21 13:11:22.980216+00', 'false', '1'],
    ['9f10fd4a-d61b-42bc-b40c-6930ee96664e', 'chirp-v3-0', 'chirp-v3-0', 'thinking', 'false', '2025-12-21 13:11:22.980216+00', 'false', '1'],
    ['0e249357-b104-4d4c-99d3-f8cc7b3d75d2', 'cjwbw/rembg', 'cjwbw/rembg', 'thinking', 'false', '2025-12-21 13:11:24.532293+00', 'false', '1'],
    ['e7dda085-80c2-43f3-b78f-4d382903dbc9', 'claude-1.3-100k', 'claude-1.3-100k', 'thinking', 'false', '2025-12-21 13:11:22.980216+00', 'false', '1'],
    ['5b5a7514-a37b-47e3-b991-995e1c3772d9', 'claude-3-5-haiku-20241022', 'claude-3-5-haiku-20241022', 'thinking', 'false', '2025-12-21 13:11:22.8222+00', 'false', '1'],
    ['1e0ffbe9-0328-4f06-a07e-e80840c0c059', 'claude-3-5-haiku-latest', 'claude-3-5-haiku-latest', 'thinking', 'false', '2025-12-21 13:11:22.8222+00', 'false', '1'],
    ['f7f955ca-7461-40a8-9ea7-bef6fb596de1', 'claude-3-5-sonnet', 'claude-3-5-sonnet', 'thinking', 'false', '2025-12-21 13:11:24.98619+00', 'false', '1'],
    ['0a3fd067-6fe6-46c1-b714-e99f992cfba2', 'claude-3-5-sonnet-20240620', 'claude-3-5-sonnet-20240620', 'thinking', 'false', '2025-12-21 13:11:22.8222+00', 'false', '1'],
    ['7a1a6698-59ee-4d42-9d65-c3bf1d8748f8', 'claude-3-5-sonnet-20241022', 'claude-3-5-sonnet-20241022', 'thinking', 'false', '2025-12-21 13:11:22.8222+00', 'false', '1'],
    ['4c3729ef-bc13-4ac7-9254-6a4e0c0b2563', 'claude-3-5-sonnet-all', 'claude-3-5-sonnet-all', 'thinking', 'false', '2025-12-21 13:11:22.980216+00', 'false', '1'],
    ['db7cc36d-53c0-4060-b107-97ebf8a01ad6', 'claude-3-5-sonnet-latest', 'claude-3-5-sonnet-latest', 'thinking', 'false', '2025-12-21 13:11:22.8222+00', 'false', '1'],
    ['7835816b-27fa-43d6-9821-66e17218b5e1', 'claude-3-7-sonnet-20250219', 'claude-3-7-sonnet-20250219', 'thinking', 'false', '2025-12-21 13:11:22.8222+00', 'false', '1'],
    ['77d79866-18a1-42ec-aa37-f898d66fb8fd', 'claude-3-7-sonnet-20250219-thinking', 'claude-3-7-sonnet-20250219-thinking', 'thinking', 'false', '2025-12-21 13:11:22.8222+00', 'false', '1'],
    ['055070e7-8f5e-48e0-8d43-7818027d69e9', 'claude-3-7-sonnet-thinking', 'claude-3-7-sonnet-thinking', 'thinking', 'false', '2025-12-21 13:11:22.8222+00', 'false', '1'],
    ['8db1c4b8-3177-45b1-858a-4384a4cbdebc', 'claude-3-haiku-20240307', 'claude-3-haiku-20240307', 'thinking', 'false', '2025-12-21 13:11:22.8222+00', 'false', '1'],
    ['9924ec2b-2a5e-4d66-9d09-713688cf9ecb', 'claude-3-opus-20240229', 'claude-3-opus-20240229', 'thinking', 'false', '2025-12-21 13:11:22.8222+00', 'false', '1'],
    ['b1fec579-5b27-4c9c-8ead-ddc14ec3ec22', 'claude-3-opus-latest', 'claude-3-opus-latest', 'thinking', 'false', '2025-12-21 13:11:22.8222+00', 'false', '1']
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

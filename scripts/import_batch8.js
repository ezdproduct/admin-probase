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
    ['67540bdc-a8ce-43c7-b3a1-91bd472cc648', 'deepseek-r1-metasearch', 'deepseek-r1-metasearch', 'thinking', 'false', '2025-12-21 13:11:22.980216+00', 'false', '1'],
    ['2ca2cce5-09fd-4dbd-b325-59da30802654', 'deepseek-r1-search', 'deepseek-r1-search', 'thinking', 'false', '2025-12-21 13:11:22.980216+00', 'false', '1'],
    ['f000f35f-708e-45d6-8c36-bfa7c0fdb78b', 'deepseek-r1:1.5b', 'deepseek-r1:1.5b', 'thinking', 'false', '2025-12-21 13:11:22.980216+00', 'false', '1'],
    ['baf9b1b3-0673-44c3-bc78-1dc1e03760ff', 'deepseek-r1:70b', 'deepseek-r1:70b', 'thinking', 'false', '2025-12-21 13:11:22.980216+00', 'false', '1'],
    ['3a2bd212-6d9b-4567-b120-5771e81d0956', 'deepseek-r1:8b', 'deepseek-r1:8b', 'thinking', 'false', '2025-12-21 13:11:22.980216+00', 'false', '1'],
    ['6be47e27-9259-4979-a1fb-3d1f48005153', 'deepseek-reasoner', 'deepseek-reasoner', 'thinking', 'false', '2025-12-21 13:11:22.980216+00', 'false', '1'],
    ['e5256628-cb21-4c68-86e9-f6ebc9800985', 'deepseek-reasoner-164k', 'deepseek-reasoner-164k', 'thinking', 'false', '2025-12-21 13:11:22.980216+00', 'false', '1'],
    ['6e19afb2-cc41-4863-9f6b-4628d1297917', 'deepseek-reasoner-all', 'deepseek-reasoner-all', 'thinking', 'false', '2025-12-21 13:11:22.980216+00', 'false', '1'],
    ['72f63d61-b6f7-4b5f-b6b1-00febc6da749', 'deepseek-search', 'deepseek-search', 'thinking', 'false', '2025-12-21 13:11:22.980216+00', 'false', '1'],
    ['c10fd827-e45a-4188-9dc9-1d65bad4f1a8', 'deepseek-v3', 'deepseek-v3', 'thinking', 'false', '2025-12-21 13:11:22.980216+00', 'false', '1'],
    ['5b15d4d1-52f2-4ad4-80de-c5cfc8d9af44', 'deepseek-v3-0324', 'deepseek-v3-0324', 'thinking', 'false', '2025-12-21 13:11:22.980216+00', 'false', '1'],
    ['6da9c02e-9809-42bb-b9da-f1c26bd52cc9', 'deepseek-v3-1-250821', 'deepseek-v3-1-250821', 'thinking', 'false', '2025-12-21 13:11:22.980216+00', 'false', '1'],
    ['14de1b0f-f5cd-443f-88c9-de6c951f4f9d', 'deepseek-v3-1-250821-thinking', 'deepseek-v3-1-250821-thinking', 'thinking', 'false', '2025-12-21 13:11:22.980216+00', 'false', '1'],
    ['3fa6325f-f212-4e39-b111-6bb5cb0db353', 'deepseek-v3-1-terminus', 'deepseek-v3-1-terminus', 'thinking', 'false', '2025-12-21 13:11:22.980216+00', 'false', '1'],
    ['c6a176ab-2ab4-4ba4-8fec-4c7d8fe44582', 'deepseek-v3-2-exp', 'deepseek-v3-2-exp', 'thinking', 'false', '2025-12-21 13:11:22.980216+00', 'false', '1'],
    ['2ec1c6a1-fc97-41bb-8edf-1ba3538acc8e', 'deepseek-v3-250324', 'deepseek-v3-250324', 'thinking', 'false', '2025-12-21 13:11:22.980216+00', 'false', '1'],
    ['96247acd-9822-4f30-8bb6-5613fa841af6', 'deepseek-v3.1', 'deepseek-v3.1', 'thinking', 'false', '2025-12-21 13:11:22.980216+00', 'false', '1'],
    ['c0aa0eb8-7ff2-41d7-8854-eb067ffaa01f', 'deepseek-v3.2', 'deepseek-v3.2', 'thinking', 'false', '2025-12-21 13:11:22.980216+00', 'false', '1'],
    ['d70141c1-bd08-4390-9e67-e54e8dd7b2bb', 'direct-generate-pptx', 'direct-generate-pptx', 'thinking', 'false', '2025-12-21 13:11:22.980216+00', 'false', '1'],
    ['4b643b7e-3a88-4f05-a0e0-46fa6abac394', 'docmee-ppt-generate', 'docmee-ppt-generate', 'thinking', 'false', '2025-12-21 13:11:22.980216+00', 'false', '1'],
    ['315fa0f2-c52b-4f47-9388-def085075a3b', 'docmee-ppt-proxy', 'docmee-ppt-proxy', 'thinking', 'false', '2025-12-21 13:11:23.127436+00', 'false', '1'],
    ['df1cc31b-d125-4410-8eed-6f4997c702bd', 'doubao-1-5-pro-256k-250115', 'doubao-1-5-pro-256k-250115', 'thinking', 'false', '2025-12-21 13:11:23.127436+00', 'false', '1'],
    ['5da376ca-6c58-4942-88db-6a95f83681b9', 'doubao-1-5-pro-32k-250115', 'doubao-1-5-pro-32k-250115', 'thinking', 'false', '2025-12-21 13:11:23.127436+00', 'false', '1'],
    ['225f8e22-046b-4d4b-b618-02a51e9d9d57', 'doubao-1-5-pro-thinking', 'doubao-1-5-pro-thinking', 'thinking', 'false', '2025-12-21 13:11:23.127436+00', 'false', '1'],
    ['2db989ad-d137-4a6a-9de5-d221b32030aa', 'doubao-1-5-thinking-pro-250415', 'doubao-1-5-thinking-pro-250415', 'thinking', 'false', '2025-12-21 13:11:23.127436+00', 'false', '1'],
    ['21c116ce-37e3-411b-9e70-984be3e8da15', 'doubao-1-5-thinking-pro-m-250428', 'doubao-1-5-thinking-pro-m-250428', 'thinking', 'false', '2025-12-21 13:11:23.127436+00', 'false', '1'],
    ['7d1a8fa4-6d4c-486e-af8a-b32e791cbd78', 'doubao-1-5-thinking-vision-pro-250428', 'doubao-1-5-thinking-vision-pro-250428', 'thinking', 'false', '2025-12-21 13:11:23.127436+00', 'false', '1'],
    ['694ff6c3-4509-4481-a23a-8d8f03a2d3c6', 'doubao-1-5-vision-pro-32k', 'doubao-1-5-vision-pro-32k', 'thinking', 'false', '2025-12-21 13:11:23.127436+00', 'false', '1'],
    ['d17364c5-5fe5-41c4-9db5-add7e0e79ee7', 'doubao-1-5-vision-pro-32k-250115', 'doubao-1-5-vision-pro-32k-250115', 'thinking', 'false', '2025-12-21 13:11:23.127436+00', 'false', '1'],
    ['c186c213-5343-4b66-bd2d-2a05d0fcacd5', 'doubao-1.5-pro-256k', 'doubao-1.5-pro-256k', 'thinking', 'false', '2025-12-21 13:11:23.127436+00', 'false', '1'],
    ['aa5595c2-344e-4ff3-8918-72b433929a81', 'doubao-1.5-vision-pro-250328', 'doubao-1.5-vision-pro-250328', 'thinking', 'false', '2025-12-21 13:11:23.127436+00', 'false', '1'],
    ['70eb679f-108c-4c6e-b938-37d381eb740b', 'doubao-1.5-vision-pro-32k', 'doubao-1.5-vision-pro-32k', 'thinking', 'false', '2025-12-21 13:11:23.127436+00', 'false', '1'],
    ['5a80ddad-e27f-4e94-b819-0b660d37d8ca', 'doubao-lite-128k', 'doubao-lite-128k', 'thinking', 'false', '2025-12-21 13:11:23.127436+00', 'false', '1'],
    ['d1ad401e-610c-4a96-8c19-2c6324e7854e', 'doubao-lite-32k', 'doubao-lite-32k', 'thinking', 'false', '2025-12-21 13:11:23.127436+00', 'false', '1'],
    ['545b4e49-fa57-4e09-832e-9a633bebd64d', 'doubao-lite-4k', 'doubao-lite-4k', 'thinking', 'false', '2025-12-21 13:11:23.127436+00', 'false', '1'],
    ['55c21c03-e83f-44e1-aeaa-c64a72bc9ecb', 'doubao-pro-128k', 'doubao-pro-128k', 'thinking', 'false', '2025-12-21 13:11:23.127436+00', 'false', '1'],
    ['d722882a-db03-4c27-a4df-3bc92fc78fb5', 'doubao-pro-256k', 'doubao-pro-256k', 'thinking', 'false', '2025-12-21 13:11:23.127436+00', 'false', '1'],
    ['8b7cdebe-badd-4b3e-9f57-a914d3363775', 'doubao-pro-32k', 'doubao-pro-32k', 'thinking', 'false', '2025-12-21 13:11:23.127436+00', 'false', '1'],
    ['edf0618e-c820-4031-bb21-2d921e448928', 'doubao-pro-32k-character', 'doubao-pro-32k-character', 'thinking', 'false', '2025-12-21 13:11:23.127436+00', 'false', '1'],
    ['36aae523-f638-4d52-a0fa-bfe1c52dfeb8', 'doubao-pro-4k', 'doubao-pro-4k', 'thinking', 'false', '2025-12-21 13:11:23.127436+00', 'false', '1'],
    ['63855ffa-1093-4f36-9c71-09b319408aa9', 'doubao-seed-1-6-250615', 'doubao-seed-1-6-250615', 'thinking', 'false', '2025-12-21 13:11:23.127436+00', 'false', '1'],
    ['b6fd96c2-bf06-47d9-b5ff-bddf6222a0c5', 'doubao-seed-1-6-251015', 'doubao-seed-1-6-251015', 'thinking', 'false', '2025-12-21 13:11:23.127436+00', 'false', '1'],
    ['0914c8b7-739d-49ab-ae7a-7a3fff60f208', 'doubao-seed-1-6-flash-250615', 'doubao-seed-1-6-flash-250615', 'thinking', 'false', '2025-12-21 13:11:23.127436+00', 'false', '1'],
    ['556c0777-ae07-470c-91c6-612207b75856', 'doubao-seed-1-6-nothinking-250615', 'doubao-seed-1-6-nothinking-250615', 'thinking', 'false', '2025-12-21 13:11:23.127436+00', 'false', '1'],
    ['37682194-e6a3-43a3-92b0-a1f1ce9a27d3', 'doubao-seed-1-6-nothinking-250715', 'doubao-seed-1-6-nothinking-250715', 'thinking', 'false', '2025-12-21 13:11:23.127436+00', 'false', '1'],
    ['1cbaed78-ffd3-4100-a652-7b47567a3ff3', 'doubao-seed-1-6-thinking-250615', 'doubao-seed-1-6-thinking-250615', 'thinking', 'false', '2025-12-21 13:11:23.127436+00', 'false', '1'],
    ['f7c9eb09-2f7f-4916-a8bd-d8d4d983ce72', 'doubao-seed-1-6-thinking-250715', 'doubao-seed-1-6-thinking-250715', 'thinking', 'false', '2025-12-21 13:11:23.127436+00', 'false', '1'],
    ['f23de0d1-87b0-456e-8b4a-f19730e09ca8', 'doubao-seedance-1-0-lite-i2v-250428', 'doubao-seedance-1-0-lite-i2v-250428', 'thinking', 'false', '2025-12-21 13:11:23.127436+00', 'false', '1'],
    ['4b703641-a823-46d9-8fe3-496c278df502', 'doubao-seedance-1-0-lite-t2v-250428', 'doubao-seedance-1-0-lite-t2v-250428', 'thinking', 'false', '2025-12-21 13:11:23.127436+00', 'false', '1'],
    ['aface4ad-a43d-4551-a6ff-333daca23322', 'doubao-seedance-1-0-pro-250528', 'doubao-seedance-1-0-pro-250528', 'thinking', 'false', '2025-12-21 13:11:23.127436+00', 'false', '1'],
    ['d11e31d9-86b4-4076-8990-c4a4307c50d9', 'doubao-seededit-3-0-i2i-250628', 'doubao-seededit-3-0-i2i-250628', 'thinking', 'false', '2025-12-21 13:11:23.127436+00', 'false', '1']
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

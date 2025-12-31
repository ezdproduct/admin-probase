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
    ['345851fe-e88b-431f-bd15-05daf42409af', 'doubao-seedream-3-0-t2i-250415', 'doubao-seedream-3-0-t2i-250415', 'thinking', 'false', '2025-12-21 13:11:23.127436+00', 'false', '1'],
    ['aa4918fb-266c-4f8c-b2b9-79fb1b804c4e', 'doubao-seedream-4-0-250828', 'doubao-seedream-4-0-250828', 'thinking', 'false', '2025-12-21 13:11:23.127436+00', 'false', '1'],
    ['50dfecb7-834c-4106-acf8-3e6c8df6f3a7', 'doubao-seedream-4-5-251128', 'doubao-seedream-4-5-251128', 'thinking', 'false', '2025-12-21 13:11:23.127436+00', 'false', '1'],
    ['2dc7b54d-d5d7-41c2-bd2f-d12269c241d7', 'doubao-vision-pro-32k', 'doubao-vision-pro-32k', 'thinking', 'false', '2025-12-21 13:11:23.127436+00', 'false', '1'],
    ['da44e1a5-e93c-4076-b1c2-e017e6b909c3', 'emo-detect-v1', 'emo-detect-v1', 'thinking', 'false', '2025-12-21 13:11:23.127436+00', 'false', '1'],
    ['183577dc-1184-4a26-a7b2-917f020c22d6', 'emo-v1', 'emo-v1', 'thinking', 'false', '2025-12-21 13:11:23.127436+00', 'false', '1'],
    ['a8f1f172-07d1-4bac-aaf5-aa2944e34400', 'emoji-detect-v1', 'emoji-detect-v1', 'thinking', 'false', '2025-12-21 13:11:23.127436+00', 'false', '1'],
    ['181ae334-b99d-45f3-b60b-6d05fd2277bf', 'emoji-v1', 'emoji-v1', 'thinking', 'false', '2025-12-21 13:11:23.127436+00', 'false', '1'],
    ['a8ae099d-bab3-4d23-b931-c47d24308060', 'fal-ai/bytedance/seedream/v4/edit', 'fal-ai/bytedance/seedream/v4/edit', 'thinking', 'false', '2025-12-21 13:11:24.532293+00', 'false', '1'],
    ['80a6f8bb-a366-4345-96c2-c0a2b1d7a2ab', 'fal-ai/luma-dream-machine', 'fal-ai/luma-dream-machine', 'thinking', 'false', '2025-12-21 13:11:24.532293+00', 'false', '1'],
    ['6df9bae2-fcdc-4aae-883f-6f56aedf71f5', 'fal-ai/luma-dream-machine/ray-2', 'fal-ai/luma-dream-machine/ray-2', 'thinking', 'false', '2025-12-21 13:11:24.532293+00', 'false', '1'],
    ['152fdc34-2199-46ed-9df9-bc46fb1bd932', 'fal-ai/luma-dream-machine/ray-2-flash', 'fal-ai/luma-dream-machine/ray-2-flash', 'thinking', 'false', '2025-12-21 13:11:24.532293+00', 'false', '1'],
    ['e9b3f805-995a-4186-8359-6c9ce7b62971', 'fal-ai/nano-banana', 'fal-ai/nano-banana', 'thinking', 'false', '2025-12-21 13:11:24.532293+00', 'false', '1'],
    ['48d49139-81ea-4486-9a3c-cbf0afa7a6e0', 'fal-ai/nano-banana/edit', 'fal-ai/nano-banana/edit', 'thinking', 'false', '2025-12-21 13:11:24.532293+00', 'false', '1'],
    ['405356e2-246f-4813-96b6-f0c4ebf5ad96', 'fal-ai/recraft/upscale/creative', 'fal-ai/recraft/upscale/creative', 'thinking', 'false', '2025-12-21 13:11:24.688779+00', 'false', '1'],
    ['094b9b4c-5f73-44e0-b692-ee3357509272', 'fal-ai/recraft/upscale/crisp', 'fal-ai/recraft/upscale/crisp', 'thinking', 'false', '2025-12-21 13:11:24.688779+00', 'false', '1'],
    ['8b1ee39c-be71-4a9a-aae5-3dd81e552410', 'fal-ai/recraft/vectorize', 'fal-ai/recraft/vectorize', 'thinking', 'false', '2025-12-21 13:11:24.688779+00', 'false', '1'],
    ['00701e77-0b8a-4ac8-8a51-57f312edd7ba', 'glm-3-turbo', 'glm-3-turbo', 'thinking', 'false', '2025-12-21 13:11:23.269049+00', 'false', '1'],
    ['14c7e882-eabf-4c82-aef9-6e2f05494cef', 'glm-4', 'glm-4', 'thinking', 'false', '2025-12-21 13:11:23.269049+00', 'false', '1'],
    ['105fb3d6-8e12-4566-921a-b109055c666b', 'glm-4.5', 'glm-4.5', 'thinking', 'false', '2025-12-21 13:11:23.269049+00', 'false', '1'],
    ['7c98ba6f-40c6-4964-98f2-8b7719a3cf62', 'glm-4.5-air', 'glm-4.5-air', 'thinking', 'false', '2025-12-21 13:11:23.269049+00', 'false', '1'],
    ['752f3cc9-e612-4498-b409-d29e34b83656', 'glm-4.5-airx', 'glm-4.5-airx', 'thinking', 'false', '2025-12-21 13:11:23.269049+00', 'false', '1'],
    ['ac4f7fd8-5305-4bf3-b629-d7d8d0ce08d6', 'glm-4.5-flash', 'glm-4.5-flash', 'thinking', 'false', '2025-12-21 13:11:23.269049+00', 'false', '1'],
    ['c4c418fa-8b7a-43a8-b672-1b844f2eb70a', 'glm-4.5-x', 'glm-4.5-x', 'thinking', 'false', '2025-12-21 13:11:23.269049+00', 'false', '1'],
    ['0731577e-243d-4c79-a824-84be7b88f754', 'glm-4v', 'glm-4v', 'thinking', 'false', '2025-12-21 13:11:23.269049+00', 'false', '1'],
    ['022e428b-8d0d-42ed-bbbb-ed1b48be5b1b', 'grok-2-1212', 'grok-2-1212', 'thinking', 'false', '2025-12-21 13:11:24.838584+00', 'false', '1'],
    ['6d8fc36c-e14a-4988-b50c-bd9ecda2ad11', 'grok-2-vision-1212', 'grok-2-vision-1212', 'thinking', 'false', '2025-12-21 13:11:24.838584+00', 'false', '1'],
    ['9a53445b-f9b3-4f64-be5b-ea20f8e0659b', 'grok-3', 'grok-3', 'thinking', 'false', '2025-12-21 13:11:23.414812+00', 'false', '1'],
    ['1404ae27-402a-4970-8aed-2b901e4dddc0', 'grok-3-beta', 'grok-3-beta', 'thinking', 'false', '2025-12-21 13:11:24.838584+00', 'false', '1'],
    ['cacb2f6f-5ab2-4a16-b45e-148c5e2bdb63', 'grok-3-fast-beta', 'grok-3-fast-beta', 'thinking', 'false', '2025-12-21 13:11:24.838584+00', 'false', '1'],
    ['6adc135a-0198-4627-b11f-ab04df45dbcd', 'grok-3-mini-beta', 'grok-3-mini-beta', 'thinking', 'false', '2025-12-21 13:11:24.838584+00', 'false', '1'],
    ['3c8c943b-9088-4730-aa67-ee01c4fa5601', 'grok-3-mini-beta-high', 'grok-3-mini-beta-high', 'thinking', 'false', '2025-12-21 13:11:24.838584+00', 'false', '1'],
    ['56a63d7a-8156-4f74-aa01-840d618578ce', 'grok-3-mini-beta-low', 'grok-3-mini-beta-low', 'thinking', 'false', '2025-12-21 13:11:24.838584+00', 'false', '1'],
    ['451e7210-ec6c-4c9c-8f8b-9caa5ee819d5', 'grok-3-mini-beta-medium', 'grok-3-mini-beta-medium', 'thinking', 'false', '2025-12-21 13:11:24.838584+00', 'false', '1'],
    ['e1b33e58-060f-4532-a08c-c85f99206933', 'grok-3-mini-fast-beta', 'grok-3-mini-fast-beta', 'thinking', 'false', '2025-12-21 13:11:24.838584+00', 'false', '1'],
    ['544160d1-e33a-468e-a1de-6c71bca86e32', 'grok-3-mini-fast-beta-high', 'grok-3-mini-fast-beta-high', 'thinking', 'false', '2025-12-21 13:11:24.838584+00', 'false', '1'],
    ['c50b724b-46d6-4690-b059-016ea7eb703c', 'grok-3-mini-fast-beta-low', 'grok-3-mini-fast-beta-low', 'thinking', 'false', '2025-12-21 13:11:24.838584+00', 'false', '1'],
    ['32a64f66-fffd-4a6d-9fe9-998e5b5862fb', 'grok-3-mini-fast-beta-medium', 'grok-3-mini-fast-beta-medium', 'thinking', 'false', '2025-12-21 13:11:24.838584+00', 'false', '1'],
    ['f7f2a474-fd8b-4319-91b8-d57cccbb22bd', 'grok-4', 'grok-4', 'thinking', 'false', '2025-12-21 13:11:23.414812+00', 'false', '1'],
    ['2784a031-0470-4eca-8fc4-11132886b3a1', 'grok-4-0709', 'grok-4-0709', 'thinking', 'false', '2025-12-21 13:11:24.838584+00', 'false', '1'],
    ['716744e0-a94a-48b0-9517-0591f024ac1c', 'grok-4-1-fast-non-reasoning', 'grok-4-1-fast-non-reasoning', 'thinking', 'false', '2025-12-21 13:11:24.838584+00', 'false', '4'],
    ['d3f8962d-ee85-4511-8276-fad5d0a5b697', 'grok-4-1-fast-reasoning', 'grok-4-1-fast-reasoning', 'thinking', 'false', '2025-12-21 13:11:24.838584+00', 'false', '1'],
    ['b7c03d06-4546-49d2-81f9-87e589342759', 'grok-4-fast-non-reasoning', 'grok-4-fast-non-reasoning', 'thinking', 'false', '2025-12-21 13:11:24.838584+00', 'false', '1'],
    ['01d3738b-d600-47ce-a939-ac2f903b2a83', 'grok-4-fast-reasoning', 'grok-4-fast-reasoning', 'thinking', 'false', '2025-12-21 13:11:23.414812+00', 'false', '1'],
    ['c3e40030-b890-4a11-a60a-d5e11baef100', 'grok-4.1', 'grok-4.1', 'thinking', 'false', '2025-12-21 13:11:24.98619+00', 'false', '1'],
    ['7d0b204b-cb3e-4daa-bc63-4920bc32e919', 'grok-beta', 'grok-beta', 'thinking', 'false', '2025-12-21 13:11:24.838584+00', 'false', '1'],
    ['1ca53963-dd29-4f9a-bc96-d84ed402e44d', 'grok-code-fast-1', 'grok-code-fast-1', 'thinking', 'false', '2025-12-21 13:11:24.838584+00', 'false', '1'],
    ['4ac9323d-98a1-40c4-ae90-2e862e34130f', 'grok-vision-beta', 'grok-vision-beta', 'thinking', 'false', '2025-12-21 13:11:24.838584+00', 'false', '1'],
    ['c64e499e-7849-4a0a-8b48-90c98be13257', 'higgsfield-ads', 'higgsfield-ads', 'thinking', 'false', '2025-12-21 13:11:23.414812+00', 'false', '1'],
    ['a0ebe149-803b-42e8-ba1e-20cf2e8e4e73', 'higgsfield-lite', 'higgsfield-lite', 'thinking', 'false', '2025-12-21 13:11:23.414812+00', 'false', '1'],
    ['369909a5-2cb8-4df8-93fc-db7a6292a1a4', 'higgsfield-speech', 'higgsfield-speech', 'thinking', 'false', '2025-12-21 13:11:23.414812+00', 'false', '1'],
    ['2244ed15-301a-4a25-b43c-fc3f6ec05f0e', 'higgsfield-standard', 'higgsfield-standard', 'thinking', 'false', '2025-12-21 13:11:23.414812+00', 'false', '1'],
    ['bb834339-33fe-4907-aa59-2f591160db4e', 'higgsfield-turbo', 'higgsfield-turbo', 'thinking', 'false', '2025-12-21 13:11:23.414812+00', 'false', '1'],
    ['d43f5701-1d1b-4414-be06-f18c13d80e85', 'hunyuan-t1', 'hunyuan-t1', 'thinking', 'false', '2025-12-21 13:11:23.414812+00', 'false', '1'],
    ['37986adf-dbff-44e5-b29e-11bb58fbf30c', 'I2V-01', 'I2V-01', 'thinking', 'false', '2025-12-21 13:11:23.414812+00', 'false', '1'],
    ['ae0c1b56-4643-4a35-80ff-9f3188d99348', 'I2V-01-Director', 'I2V-01-Director', 'thinking', 'false', '2025-12-21 13:11:23.414812+00', 'false', '1'],
    ['a201b1bd-aaab-496f-acd8-d08d807c23a0', 'I2V-01-live', 'I2V-01-live', 'thinking', 'false', '2025-12-21 13:11:23.414812+00', 'false', '1'],
    ['0389cebe-f14e-44a8-85b1-ffc950efc2b4', 'ideogram-ai/ideogram-v2-turbo', 'ideogram-ai/ideogram-v2-turbo', 'thinking', 'false', '2025-12-21 13:11:24.688779+00', 'false', '1'],
    ['a330343b-960a-4353-b587-1e12409098ae', 'ideogram-edit-v3', 'ideogram-edit-v3', 'thinking', 'false', '2025-12-21 13:11:24.688779+00', 'false', '1'],
    ['d880d3ed-3f2e-4874-8e97-0f18be5fb8a2', 'ideogram-reframe-v3', 'ideogram-reframe-v3', 'thinking', 'false', '2025-12-21 13:11:24.688779+00', 'false', '1'],
    ['874bc88a-4a27-47cf-bd20-6a930969244b', 'ideogram-remix-v3', 'ideogram-remix-v3', 'thinking', 'false', '2025-12-21 13:11:24.688779+00', 'false', '1'],
    ['26e46c92-9459-4993-8c13-60fa278a9078', 'ideogram-replace-background-v3', 'ideogram-replace-background-v3', 'thinking', 'false', '2025-12-21 13:11:24.688779+00', 'false', '1'],
    ['a9a07f3e-dbd4-4efa-b359-6a0dbdff5d88', 'jina-reranker-v2-base-multilingual', 'jina-reranker-v2-base-multilingual', 'thinking', 'false', '2025-12-21 13:11:23.414812+00', 'false', '1'],
    ['9cdbd268-39fe-4f6d-8f3c-fea4c6117512', 'kimi-k2-0711-preview', 'kimi-k2-0711-preview', 'thinking', 'false', '2025-12-21 13:11:23.414812+00', 'false', '1'],
    ['bbac9cc9-2981-4d83-b4c7-962a180cb1fb', 'kimi-k2-250905', 'kimi-k2-250905', 'thinking', 'false', '2025-12-21 13:11:23.575115+00', 'false', '1'],
    ['ab5792e5-d3fa-40ca-8049-a0ae3c3f4f5e', 'kling-custom-elements', 'kling-custom-elements', 'thinking', 'false', '2025-12-21 13:11:23.575115+00', 'false', '1'],
    ['8263bf94-c3be-491b-86b4-f7175cfadd73', 'kling-effects', 'kling-effects', 'thinking', 'false', '2025-12-21 13:11:23.575115+00', 'false', '1'],
    ['4df37bc2-6a21-4217-b6a0-bae784d44306', 'kling-kolors-virtual-try-on', 'kling-kolors-virtual-try-on', 'thinking', 'false', '2025-12-21 13:11:23.575115+00', 'false', '1'],
    ['d6fed13f-e1e4-48af-90de-97520d3efa7a', 'kling-lip-sync', 'kling-lip-sync', 'thinking', 'false', '2025-12-21 13:11:23.575115+00', 'false', '1'],
    ['ca27ce63-be49-4702-a403-2f46a71d75e3', 'kling-text-to-audio', 'kling-text-to-audio', 'thinking', 'false', '2025-12-21 13:11:23.575115+00', 'false', '1'],
    ['aa1b397a-c029-4dee-b1a8-74825994b1c8', 'kolors-virtual-try-on-v1', 'kolors-virtual-try-on-v1', 'thinking', 'false', '2025-12-21 13:11:23.575115+00', 'false', '1'],
    ['d665d9eb-f459-4771-bb88-9eea5ee81139', 'kolors-virtual-try-on-v1-5', 'kolors-virtual-try-on-v1-5', 'thinking', 'false', '2025-12-21 13:11:23.575115+00', 'false', '1'],
    ['9338a500-71d4-45cb-84db-84bd074aa900', 'liveportrait', 'liveportrait', 'thinking', 'false', '2025-12-21 13:11:23.575115+00', 'false', '1'],
    ['17266272-b98a-4eab-a982-aee47c9dd1f6', 'liveportrait-detect', 'liveportrait-detect', 'thinking', 'false', '2025-12-21 13:11:23.575115+00', 'false', '1'],
    ['38a95d25-0399-44c7-9962-c97b2f53a95f', 'llama-2-13b', 'llama-2-13b', 'thinking', 'false', '2025-12-21 13:11:23.575115+00', 'false', '1']
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

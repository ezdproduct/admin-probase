const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
require('dotenv').config({ path: '.env.local' });

// Simple env parser as backup
function getEnv() {
    try {
        const envFile = fs.readFileSync('.env.local', 'utf8');
        const env = {};
        envFile.split('\n').forEach(line => {
            const [key, value] = line.split('=');
            if (key && value) env[key.trim()] = value.trim();
        });
        return env;
    } catch (e) {
        return process.env;
    }
}

const env = getEnv();
const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase environment variables');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const models = [
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
    ['7fefaab2-a951-4535-bc79-cb08afbad5f9', 'gemini-2.5-flash-nothinking', 'gemini-2.5-flash-nothinking', 'thinking', 'false', '2025-12-21 13:11:23.269049+00', 'true', '1'],
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
    ['d051af03-7095-42e7-b0cd-80dc0daf949c', 'gpt-4-dalle', 'gpt-4-dalle', 'thinking', 'false', '2025-12-21 13:11:23.269049+00', 'true', '1'],
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
    ['83ba32d7-1310-4f39-a1a7-bc6f63be564a', 'gpt-4o-realtime-preview-2025-06-03', 'gpt-4o-realtime-preview-2025-06-03', 'thinking', 'false', '2025-12-21 13:11:24.838584+00', 'true', '1'],
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
    ['fff84d83-f61a-4417-ab3a-5ace3bc3e57d', 'gpt-5-mini-2025-08-07', 'gpt-5-mini-2025-08-07', 'thinking', 'false', '2025-12-21 13:11:22.599315+00', 'true', '1']
];

async function importAll() {
    console.log(`Starting import for ${models.length} models...`);

    const aiModelsData = models.map(m => ({
        id: m[0],
        model_id: m[1],
        name: m[2],
        type: m[3],
        is_active: m[4] === 'true',
        created_at: m[5],
        display: m[6] === 'true',
        level: parseInt(m[7])
    }));

    const modelProvidersData = models.map(m => ({
        model_id: m[1],
        name: m[2],
        pricing_unit: '1k-tokens',
        base_cost: 0,
        rate_rmb_vnd: 3500,
        factor_economy: 1,
        factor_standard: 1.5,
        factor_advanced: 2,
        factor_pro: 2.5,
        sell_economy: 0,
        sell_standard: 0,
        sell_advanced: 0,
        sell_pro: 0
    }));

    // Batch insert into ai_models
    const { error: error1 } = await supabase.from('ai_models').upsert(aiModelsData, { onConflict: 'id' });
    if (error1) console.error('Error in ai_models upsert:', error1.message);
    else console.log('Successfully upserted ai_models');

    // Batch insert into model_providers
    const { error: error2 } = await supabase.from('model_providers').upsert(modelProvidersData, { onConflict: 'model_id' });
    if (error2) console.error('Error in model_providers upsert:', error2.message);
    else console.log('Successfully upserted model_providers');

    console.log('Import task finished.');
}

importAll();

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

function getEnv() {
    try {
        const envPath = path.resolve(process.cwd(), '.env.local');
        const envFile = fs.readFileSync(envPath, 'utf8');
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
    } catch (e) {
        return process.env;
    }
}

const env = getEnv();
const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const data = [
    { id: "chatgpt-4o-latest", name: "ChatGPT 4o Latest" },
    { id: "dall-e-3", name: "DALL-E 3" },
    { id: "gpt-3.5-turbo", name: "GPT-3.5 Turbo" },
    { id: "gpt-3.5-turbo-0125", name: "GPT-3.5 Turbo 0125" },
    { id: "gpt-3.5-turbo-0301", name: "GPT-3.5 Turbo 0301" },
    { id: "gpt-3.5-turbo-0613", name: "GPT-3.5 Turbo 0613" },
    { id: "gpt-3.5-turbo-1106", name: "GPT-3.5 Turbo 1106" },
    { id: "gpt-3.5-turbo-16k", name: "GPT-3.5 Turbo 16k" },
    { id: "gpt-3.5-turbo-16k-0613", name: "GPT-3.5 Turbo 16k 0613" },
    { id: "gpt-3.5-turbo-instruct", name: "GPT-3.5 Turbo Instruct" },
    { id: "gpt-4", name: "GPT-4" },
    { id: "gpt-4-0125-preview", name: "GPT-4 0125 Preview" },
    { id: "gpt-4-0314", name: "GPT-4 0314" },
    { id: "gpt-4-0613", name: "GPT-4 0613" },
    { id: "gpt-4-1106-preview", name: "GPT-4 1106 Preview" },
    { id: "gpt-4-1106-vision-preview", name: "GPT-4 1106 Vision Preview" },
    { id: "gpt-4-32k", name: "GPT-4 32k" },
    { id: "gpt-4-32k-0314", name: "GPT-4 32k 0314" },
    { id: "gpt-4-32k-0613", name: "GPT-4 32k 0613" },
    { id: "gpt-4-turbo", name: "GPT-4 Turbo" },
    { id: "gpt-4-turbo-2024-04-09", name: "GPT-4 Turbo 2024-04-09" },
    { id: "gpt-4-turbo-preview", name: "GPT-4 Turbo Preview" },
    { id: "gpt-4-vision-preview", name: "GPT-4 Vision Preview" },
    { id: "gpt-4.1", name: "GPT-4.1" },
    { id: "gpt-4.1-2025-04-14", name: "GPT-4.1 2025-04-14" },
    { id: "gpt-4.1-mini", name: "GPT-4.1 Mini" },
    { id: "gpt-4.1-mini-2025-04-14", name: "GPT-4.1 Mini 2025-04-14" },
    { id: "gpt-4.1-nano", name: "GPT-4.1 Nano" },
    { id: "gpt-4.1-nano-2025-04-14", name: "GPT-4.1 Nano 2025-04-14" },
    { id: "gpt-4o", name: "GPT-4o" },
    { id: "gpt-4o-2024-05-13", name: "GPT-4o 2024-05-13" },
    { id: "gpt-4o-2024-08-06", name: "GPT-4o 2024-08-06" },
    { id: "gpt-4o-2024-11-20", name: "GPT-4o 2024-11-20" },
    { id: "gpt-4o-mini", name: "GPT-4o Mini" },
    { id: "gpt-4o-mini-2024-07-18", name: "GPT-4o Mini 2024-07-18" },
    { id: "gpt-5", name: "GPT-5" },
    { id: "gpt-5-2025-08-07", name: "GPT-5 2025-08-07" },
    { id: "gpt-5-chat", name: "GPT-5 Chat" },
    { id: "gpt-5-chat-2025-08-07", name: "GPT-5 Chat 2025-08-07" },
    { id: "gpt-5-chat-latest", name: "GPT-5 Chat Latest" },
    { id: "gpt-5-high", name: "GPT-5 High" },
    { id: "gpt-5-low", name: "GPT-5 Low" },
    { id: "gpt-5-medium", name: "GPT-5 Medium" },
    { id: "gpt-5-mini", name: "GPT-5 Mini" },
    { id: "gpt-5-mini-2025-08-07", name: "GPT-5 Mini 2025-08-07" },
    { id: "gpt-5-nano", name: "GPT-5 Nano" },
    { id: "gpt-5-nano-2025-08-07", name: "GPT-5 Nano 2025-08-07" },
    { id: "o1", name: "O1" },
    { id: "o1-2024-12-17", name: "O1 2024-12-17" },
    { id: "o1-mini", name: "O1 Mini" },
    { id: "o1-mini-2024-09-12", name: "O1 Mini 2024-09-12" },
    { id: "o1-preview", name: "O1 Preview" },
    { id: "o1-preview-2024-09-12", name: "O1 Preview 2024-09-12" },
    { id: "o3", name: "O3" },
    { id: "o3-2025-04-16", name: "O3 2025-04-16" },
    { id: "o3-mini", name: "O3 Mini" },
    { id: "o3-mini-2025-01-31", name: "O3 Mini 2025-01-31" },
    { id: "o3-mini-2025-01-31-high", name: "O3 Mini 2025-01-31 High" },
    { id: "o3-mini-2025-01-31-low", name: "O3 Mini 2025-01-31 Low" },
    { id: "o3-mini-2025-01-31-medium", name: "O3 Mini 2025-01-31 Medium" },
    { id: "o3-mini-high", name: "O3 Mini High" },
    { id: "o3-mini-low", name: "O3 Mini Low" },
    { id: "o3-mini-medium", name: "O3 Mini Medium" },
    { id: "o4-mini", name: "O4 Mini" },
    { id: "o4-mini-2025-04-16", name: "O4 Mini 2025-04-16" },
    { id: "claude-3-7-sonnet-20250219", name: "Claude 3.7 Sonnet 20250219" },
    { id: "claude-3-7-sonnet-20250219-thinking", name: "Claude 3.7 Sonnet 20250219 Thinking" },
    { id: "claude-haiku-4-5-20251001", name: "Claude Haiku 4.5 20251001" },
    { id: "claude-haiku-4-5-20251001-thinking", name: "Claude Haiku 4.5 20251001 Thinking" },
    { id: "claude-sonnet-4-20250514", name: "Claude Sonnet 4 20250514" },
    { id: "claude-sonnet-4-20250514-thinking", name: "Claude Sonnet 4 20250514 Thinking" },
    { id: "claude-sonnet-4-5-20250929", name: "Claude Sonnet 4.5 20250929" },
    { id: "claude-sonnet-4-5-20250929-thinking", name: "Claude Sonnet 4.5 20250929 Thinking" },
    { id: "claude-3-5-sonnet-20241022", name: "Claude 3.5 Sonnet 20241022" },
    { id: "claude-3-opus-20240229", name: "Claude 3 Opus 20240229" },
    { id: "claude-opus-4-1-20250805", name: "Claude Opus 4.1 20250805" },
    { id: "claude-opus-4-1-20250805-thinking", name: "Claude Opus 4.1 20250805 Thinking" },
    { id: "claude-opus-4-20250514", name: "Claude Opus 4 20250514" },
    { id: "claude-opus-4-20250514-thinking", name: "Claude Opus 4 20250514 Thinking" },
    { id: "claude-opus-4-5-20251101", name: "Claude Opus 4.5 20251101" },
    { id: "claude-opus-4-5-20251101-thinking", name: "Claude Opus 4.5 20251101 Thinking" },
    { id: "claude-3-5-haiku-20241022", name: "Claude 3.5 Haiku 20241022" },
    { id: "claude-3-5-haiku-latest", name: "Claude 3.5 Haiku Latest" },
    { id: "claude-3-5-sonnet-20240620", name: "Claude 3.5 Sonnet 20240620" },
    { id: "claude-3-5-sonnet-latest", name: "Claude 3.5 Sonnet Latest" },
    { id: "claude-3-7-sonnet-thinking", name: "Claude 3.7 Sonnet Thinking" },
    { id: "claude-3-haiku-20240307", name: "Claude 3 Haiku 20240307" },
    { id: "claude-3-opus-latest", name: "Claude 3 Opus Latest" },
    { id: "claude-3-sonnet-20240229", name: "Claude 3 Sonnet 20240229" },
    { id: "deepseek-chat", name: "DeepSeek Chat" },
    { id: "deepseek-reasoner", name: "DeepSeek Reasoner" },
    { id: "deepseek-v3", name: "DeepSeek V3" },
    { id: "deepseek-r1", name: "DeepSeek R1" },
    { id: "gemini-1.5-flash", name: "Gemini 1.5 Flash" },
    { id: "gemini-1.5-pro", name: "Gemini 1.5 Pro" },
    { id: "gemini-2.0-flash", name: "Gemini 2.0 Flash" },
    { id: "qwen-plus", name: "Qwen Plus" },
    { id: "qwen-turbo", name: "Qwen Turbo" },
    { id: "flux", name: "Flux" },
    { id: "midjourney", name: "Midjourney" }
];

async function run() {
    console.log('Fetching system settings...');
    const { data: settings } = await supabase.from('system_settings').select('value').eq('key', 'rate_rmb_vnd').single();
    const rate = settings ? settings.value : 3500;

    console.log('Cleaning model_providers...');
    await supabase.from('model_providers').delete().neq('id', 0);

    const modelProviders = data.map(m => ({
        model_id: m.id,
        name: m.name,
        pricing_unit: '1k-tokens',
        base_cost: 0,
        rate_rmb_vnd: rate,
        factor_economy: 1,
        factor_standard: 1.5,
        factor_advanced: 2,
        factor_pro: 2.5,
        sell_economy: 0,
        sell_standard: 0,
        sell_advanced: 0,
        sell_pro: 0
    }));

    console.log(`Inserting ${modelProviders.length} models...`);
    const { error } = await supabase.from('model_providers').insert(modelProviders);

    if (error) {
        console.error('Error:', error.message);
    } else {
        console.log('Successfully updated model_providers.');
    }
}

run();

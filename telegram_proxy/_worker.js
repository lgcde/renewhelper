// telegram_proxy.js
// 部署到 Cloudflare Workers / Pages / Snippets
// 文档：https://developers.cloudflare.com/workers/
// 用于转发 Telegram API 请求，实现中国大陆稳定访问
// 优先级说明：
// 1. 如果设置了环境变量 TG_ALLOW_TOKENS，用,隔开多个token，将优先使用（忽略下方硬编码配置）
// 2. 如果未设置环境变量，将使用下方 WHITELIST_TOKENS 配置

// 【配置区】硬编码白名单 (当没有环境变量时使用)
// 填入你的 Bot Token，可以填多个
const WHITELIST_TOKENS = [
    "1234567890:Abcdefg",
    "3216549870:defghijk"
];

export default {
    async fetch(request, env, ctx) {
        // 兼容性处理：防止 env 为空 (主要针对某些本地调试或特殊运行时)
        env = env || {};

        // 1. 初始化白名单
        // 优先读取环境变量，如果没有则使用硬编码配置
        let whitelist = [];
        const envTokens = env.TG_ALLOW_TOKENS || "";

        if (envTokens) {
            whitelist = envTokens.split(",").map(t => t.trim()).filter(Boolean);
            // console.log("Using Environment Variables for whitelist");
        } else {
            whitelist = WHITELIST_TOKENS;
            // console.log("Using Hardcoded Config for whitelist");
        }

        // 如果白名单最终为空，拒绝服务
        if (!whitelist || whitelist.length === 0) {
            return new Response("Configuration Error: No allowed tokens found (Check TG_ALLOW_TOKENS or WHITELIST_TOKENS).", { status: 500 });
        }

        const url = new URL(request.url);

        // 2. 基础安全检查：仅允许 POST 和 GET
        if (!["POST", "GET"].includes(request.method)) {
            return new Response("Method Not Allowed", { status: 405 });
        }

        // 3. 严格路径正则匹配
        // Telegram API 格式: /bot<token>/<method> 或 /file/bot<token>/<path>
        // 提取 Token 用于校验
        const botPathRegex = /^\/?(bot|file\/bot)([^/]+)\/.*$/;
        const match = url.pathname.match(botPathRegex);

        if (!match) {
            // 路径格式虽不匹配 TG API，但可能是根路径探测，直接返回 404 伪装成普通网站或空
            return new Response("Not Found", { status: 404 });
        }

        const requestToken = match[2]; // 正则第2组是 Token

        // 4. Token 白名单校验
        if (!whitelist.includes(requestToken)) {
            // 【安全策略】防暴力破解/枚举
            // 如果 Token 不在白名单中，不要立即返回，而是随机延迟 1-3 秒
            // 增加攻击者的时间成本，同时混淆判断
            await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

            // 返回 404 而不是 403，伪装成该 Token 不存在（与 TG 官方行为一致）
            return new Response("Not Found", { status: 404 });
        }

        // 5. 构造目标 URL
        const targetUrl = new URL(url.pathname + url.search, "https://api.telegram.org");

        // 6. 构造新请求
        const newRequest = new Request(targetUrl, {
            method: request.method,
            headers: request.headers,
            body: request.body,
            redirect: "follow"
        });

        // 7. 发送请求
        try {
            const response = await fetch(newRequest);
            return response;
        } catch (e) {
            return new Response("Proxy Error: " + e.message, { status: 502 });
        }
    }
};
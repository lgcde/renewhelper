/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                sans: ['Rajdhani', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace']
            },
            colors: {
                body: 'var(--bg-body)',
                panel: 'var(--bg-panel)',
                border: 'var(--border)',
                textMain: 'var(--text-main)',
                textDim: 'var(--text-dim)'
            }
        }
    },
    plugins: [],
}

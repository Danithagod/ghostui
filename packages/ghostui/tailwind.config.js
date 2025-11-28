/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                ghost: {
                    purple: '#A855F7',
                    green: '#90FFB5',
                    blood: '#FF4D4D',
                    white: '#E6E6E6',
                },
            },
            animation: {
                'slow-float': 'float 6s ease-in-out infinite',
                'fog-drift-1': 'fog-drift-1 45s ease-in-out infinite',
                'fog-drift-2': 'fog-drift-2 30s ease-in-out infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                'fog-drift-1': {
                    '0%': { transform: 'translate3d(-10%, 0, 0)' },
                    '50%': { transform: 'translate3d(5%, 0, 0)' },
                    '100%': { transform: 'translate3d(-10%, 0, 0)' },
                },
                'fog-drift-2': {
                    '0%': { transform: 'translate3d(0, -10%, 0) scale(1.1)' },
                    '50%': { transform: 'translate3d(-5%, 0, 0) scale(1.2)' },
                    '100%': { transform: 'translate3d(0, -10%, 0) scale(1.1)' },
                },
            },
        },
    },
    plugins: [],
}

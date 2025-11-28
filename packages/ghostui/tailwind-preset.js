module.exports = {
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
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
            },
        },
    },
    plugins: [],
};

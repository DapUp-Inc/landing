import tailwindcssAnimate from "tailwindcss-animate";

export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
  	extend: {
  		screens: {
  			xs: '360px',
  			xl2: '1440px'
  		},
  		fontFamily: {
  			sans: [
  				'Inter',
  				'SF Pro Display',
  				'-apple-system',
  				'BlinkMacSystemFont',
  				'system-ui',
  				'sans-serif'
  			],
  			display: [
  				'Space Grotesk"',
  				'Inter',
  				'SF Pro Display',
  				'-apple-system',
  				'BlinkMacSystemFont',
  				'system-ui',
  				'sans-serif'
  			]
  		},
  		fontSize: {
  			'hero-xl': [
  				'clamp(3rem, 8vw, 6rem)',
  				{
  					lineHeight: '1.1',
  					letterSpacing: '-0.02em'
  				}
  			],
  			'hero-lg': [
  				'clamp(2.5rem, 6vw, 4.5rem)',
  				{
  					lineHeight: '1.1',
  					letterSpacing: '-0.02em'
  				}
  			],
  			'hero-md': [
  				'clamp(2rem, 4vw, 3rem)',
  				{
  					lineHeight: '1.2',
  					letterSpacing: '-0.01em'
  				}
  			]
  		},
  		spacing: {
  			'18': '4.5rem',
  			'22': '5.5rem',
  			'26': '6.5rem',
  			'30': '7.5rem'
  		},
  		colors: {
  			primary: {
  				'50': '#fefbf3',
  				'100': '#fdf5e1',
  				'200': '#fae8c1',
  				'300': '#f6d596',
  				'400': '#f1be69',
  				'500': '#F4B942',
  				'600': '#e09d1a',
  				'700': '#bb7d15',
  				'800': '#976318',
  				'900': '#7a5117',
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			'tech-blue': '#00D4FF',
  			'tech-cyan': '#00FFF0',
  			'tech-purple': '#A855F7',
  			'tech-neon': '#39FF14',
  			'dark-900': '#0A0A0A',
  			'dark-800': '#1A1A1A',
  			'dark-700': '#2A2A2A',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		backgroundImage: {
  			'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
  			'gradient-gold-blue': 'linear-gradient(135deg, #F4B942 0%, #00D4FF 100%)',
  			'gradient-dark': 'linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 100%)'
  		},
  		animation: {
  			'fade-in': 'fadeIn 0.6s ease-out',
  			'slide-up': 'slideUp 0.8s ease-out',
  			'slide-in': 'slideIn 0.3s ease-out',
  			float: 'float 6s ease-in-out infinite',
  			glow: 'glow 2s ease-in-out infinite alternate'
  		},
  		keyframes: {
  			fadeIn: {
  				'0%': {
  					opacity: '0'
  				},
  				'100%': {
  					opacity: '1'
  				}
  			},
  			slideUp: {
  				'0%': {
  					opacity: '0',
  					transform: 'translateY(30px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateY(0)'
  				}
  			},
  			slideIn: {
  				'0%': {
  					opacity: '0',
  					transform: 'translateX(100%)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateX(0)'
  				}
  			},
  			float: {
  				'0%, 100%': {
  					transform: 'translateY(0px)'
  				},
  				'50%': {
  					transform: 'translateY(-20px)'
  				}
  			},
  			glow: {
  				'0%': {
  					boxShadow: '0 0 5px #F4B942, 0 0 10px #F4B942'
  				},
  				'100%': {
  					boxShadow: '0 0 10px #F4B942, 0 0 20px #F4B942, 0 0 30px #F4B942'
  				}
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [tailwindcssAnimate],
};

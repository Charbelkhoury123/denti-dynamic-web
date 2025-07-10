import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					light: 'hsl(var(--primary-light))',
					hover: 'hsl(var(--primary-hover))',
					50: 'hsl(var(--primary-50))',
					100: 'hsl(var(--primary-100))',
					200: 'hsl(var(--primary-200))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				success: {
					DEFAULT: 'hsl(var(--success))',
					foreground: 'hsl(var(--success-foreground))'
				},
				warning: {
					DEFAULT: 'hsl(var(--warning))',
					foreground: 'hsl(var(--warning-foreground))'
				},
				info: {
					DEFAULT: 'hsl(var(--info))',
					foreground: 'hsl(var(--info-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				dental: {
					mint: 'hsl(var(--dental-mint))',
					'mint-light': 'hsl(var(--dental-mint-light))',
					blue: 'hsl(var(--dental-blue))',
					'blue-light': 'hsl(var(--dental-blue-light))',
					gray: 'hsl(var(--dental-gray))',
					'gray-light': 'hsl(var(--dental-gray-light))'
				}
			},
			fontSize: {
				'xs': ['var(--font-size-xs)', { lineHeight: 'var(--line-height-tight)' }],
				'sm': ['var(--font-size-sm)', { lineHeight: 'var(--line-height-normal)' }],
				'base': ['var(--font-size-base)', { lineHeight: 'var(--line-height-normal)' }],
				'lg': ['var(--font-size-lg)', { lineHeight: 'var(--line-height-normal)' }],
				'xl': ['var(--font-size-xl)', { lineHeight: 'var(--line-height-tight)' }],
				'2xl': ['var(--font-size-2xl)', { lineHeight: 'var(--line-height-tight)' }],
				'3xl': ['var(--font-size-3xl)', { lineHeight: 'var(--line-height-tight)' }],
				'4xl': ['var(--font-size-4xl)', { lineHeight: 'var(--line-height-tight)' }],
				'5xl': ['var(--font-size-5xl)', { lineHeight: 'var(--line-height-tight)' }],
				'6xl': ['var(--font-size-6xl)', { lineHeight: 'var(--line-height-tight)' }]
			},
			fontWeight: {
				normal: 'var(--font-weight-normal)',
				medium: 'var(--font-weight-medium)',
				semibold: 'var(--font-weight-semibold)',
				bold: 'var(--font-weight-bold)'
			},
			spacing: {
				'0.5': 'var(--space-0-5)',
				'1': 'var(--space-1)',
				'1.5': 'var(--space-1-5)',
				'2': 'var(--space-2)',
				'2.5': 'var(--space-2-5)',
				'3': 'var(--space-3)',
				'3.5': 'var(--space-3-5)',
				'4': 'var(--space-4)',
				'5': 'var(--space-5)',
				'6': 'var(--space-6)',
				'7': 'var(--space-7)',
				'8': 'var(--space-8)',
				'10': 'var(--space-10)',
				'12': 'var(--space-12)',
				'16': 'var(--space-16)',
				'20': 'var(--space-20)',
				'24': 'var(--space-24)',
				'32': 'var(--space-32)'
			},
			borderRadius: {
				'none': 'var(--radius-none)',
				'sm': 'var(--radius-sm)',
				DEFAULT: 'var(--radius)',
				'md': 'var(--radius-md)',
				'lg': 'var(--radius-lg)',
				'xl': 'var(--radius-xl)',
				'2xl': 'var(--radius-2xl)',
				'full': 'var(--radius-full)'
			},
			boxShadow: {
				'xs': 'var(--shadow-xs)',
				'sm': 'var(--shadow-sm)',
				'soft': 'var(--shadow-soft)',
				'medium': 'var(--shadow-medium)',
				'strong': 'var(--shadow-strong)',
				'xl': 'var(--shadow-xl)',
				'2xl': 'var(--shadow-2xl)'
			},
			transitionTimingFunction: {
				'fast': 'var(--transition-fast)',
				'smooth': 'var(--transition-smooth)',
				'slow': 'var(--transition-slow)',
				'bounce': 'var(--transition-bounce)',
				'spring': 'var(--transition-spring)'
			},
			keyframes: {
				'aurora': {
					'0%': {
						'background-position': '50% 50%, 50% 50%'
					},
					'50%': {
						'background-position': '350% 50%, 350% 50%'
					},
					'100%': {
						'background-position': '50% 50%, 50% 50%'
					}
				},
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'aurora': 'aurora 60s ease-in-out infinite',
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			},
			fontFamily: {
				sans: ["Poppins", "ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif"]
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
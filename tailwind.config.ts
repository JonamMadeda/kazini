import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#000047",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#0066FF",
          foreground: "#FFFFFF",
        },
        destructive: {
          DEFAULT: "#F43F5E",
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "#64748B",
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#F4F4F5",
          foreground: "#000047",
        },
        popover: {
          DEFAULT: "#FFFFFF",
          foreground: "#000047",
        },
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#000047",
        },
        success: "#10B981",
        warning: "#F59E0B",
        navy: {
          50: "#F0F4FF",
          100: "#E0E8FF",
          200: "#C4D1FF",
          300: "#A3B8FF",
          400: "#7A96FF",
          500: "#5C73FF",
          600: "#2B4AFF",
          700: "#000047",
          800: "#00003A",
          900: "#00002D",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in": {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "slide-in": "slide-in 0.3s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
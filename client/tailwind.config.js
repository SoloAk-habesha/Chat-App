const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        light: {
          background: "#f5f5f5",
          text: "#111827",
          card: "#ffffff",
          border: "#e5e7eb",
          dropdownText: "#4b5563",
          buttonHover: "#e5e7ff",
          textHover: "#4f46e5",
          heading: "#1f2937",
          primary: "#1D4ED8",
          secondary: "#D97706",
          success: "#10B981",
          error: "#DC2626",
          warning: "#F59E0B",
          info: "#3B82F6",
        },
        dark: {
          background: "#1F2937",
          text: "#F9FAFB",
          card: "#2D3748",
          border: "#4A5568",
          dropdownText: "#CBD5E0",
          buttonHover: "#2B6CB0",
          textHover: "#5A67D8",
          heading: "#E2E8F0",
          primary: "#1D4ED8",
          secondary: "#D97706",
          success: "#10B981",
          error: "#DC2626",
          warning: "#F59E0B",
          info: "#3B82F6",
        },
      },
      keyframes: {
        "fade-out-down": {
          "0%": {
            opacity: 1,
          },
          "100%": {
            opacity: 0,
            transform: "translate3d(0, 100%, 0)",
          },
        },
      },
      animation: {
        fadeoutdown: "fade-out-down 1s ease-in-out 0.25s 1",
      },
      scrollbar: {
        thin: {
          /* Hide scrollbar for webkit browsers */
          "scrollbar-width": "none" /* Firefox */,
          "-ms-overflow-style": "none" /* IE and Edge */,
        },
      },
    },
  },
  darkMode: "class",
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".no-scrollbar": {
          overflow: "hidden",
          "scrollbar-width": "none" /* Firefox */,
          "-ms-overflow-style": "none" /* IE and Edge */,
        },
        ".scrollbar-thin": {
          overflow: "auto",
          "scrollbar-width": "thin" /* Firefox */,
          "-ms-overflow-style": "auto" /* IE and Edge */,
        },
        ".scrollbar-hidden": {
          overflow: "auto",
          "scrollbar-width": "none" /* Firefox */,
          "-ms-overflow-style": "none" /* IE and Edge */,
        },
      });
    },
  ],
});

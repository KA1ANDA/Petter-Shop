module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {

    fontFamily: {
      nunito: ['Nunito', 'sans-serif'],
      lato:['Lato', 'sans-serif']
    },

    colors: {
      primary:'#7c58d3',
      secondary:'#ffda47',
      additional:'#ff47a2',
      white:'#fff',
      grayText:'#a7a7a7',
      bgGray:'#FBF9FF',
      lightPrimary:'#ebe5f7',
      black:'#000000',
      transparent:'transparent'
    },

    borderRadius: {
      standart:'8px'
    },

    fontSize: {
      h1: '4.25rem',
      h2: '3rem',
      h3: '2rem',
      h4: '1.5rem',
      h5: '1.125rem',
      h6: '1rem',
      offerText:'1.813rem'
    },
    
    extend: {
      animation: {
        'spin-slow': 'spin 5s linear infinite',
      },
    },
  },
  plugins: [],
}


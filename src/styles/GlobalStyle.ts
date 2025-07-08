import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body, #root { 
    height: 100%; 
  }

  html {
    font-size: 1rem; /* 16px */
  }

  body {
    font-family: ${({ theme }) => theme.typography.fontFamily};
    background-color: ${({ theme }) => theme.colors.beige[100]};
    color: ${({ theme }) => theme.colors.grey[900]};
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  ul {
    list-style: none;
  }

  button, input, textarea {
    font-family: inherit;
  }

  textarea, input, select {
    box-shadow: 0 0 0 0;
    border: 0 none;
    outline: 0;
  } 

  /* ---- Scroll bar ---- */
  /* Firefox */
  * {
    scrollbar-width: thin;
    scrollbar-color: #EEEE transparent;
    :hover {
      scrollbar-color: #E0E0E0 transparent;
    }
  }
  /* Chrome / Safari / Edge */
  *::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }
  *::-webkit-scrollbar-track {
    background: transparent;
  }
  *::-webkit-scrollbar-thumb {
    background-color: #fafafa;
    border-radius: 9999px;
    border: 1px solid transparent;
    background-clip: padding-box;
  }
  *::-webkit-scrollbar-thumb:hover {
    background-color: #E0E0E0;
  }
  /* Evita layout-shift */
  * {
    scrollbar-gutter: stable;          
  }
`
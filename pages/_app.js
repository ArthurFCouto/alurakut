import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { AlurakutStyles } from './../src/lib/AlurakutCommons';

//Configurações do CSS da DIV body, a div principal.
//Estas configurações serão adicionadas a toda tela de navegação
const GlobalStyle = createGlobalStyle`
  /* Aplicar a todas as tags além do Body*/
  /* Reset CSS */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: sans-serif;
    background-color: #D9E6F6;
  }

  #__next {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  ${AlurakutStyles}
`

const theme = {
  colors: {
    //primary: '#0070f3',
    primary: '#000',
  },
}

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}

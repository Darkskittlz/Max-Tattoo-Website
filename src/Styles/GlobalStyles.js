import { createGlobalStyle } from 'styled-components';
import typewriter from '../assets/notMyType.otf';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Typewriter';
    src: url(${typewriter}) format('opentype');
    font-weight: normal;
    font-style: normal;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Typewriter', sans-serif;
  }
`;

export default GlobalStyle;


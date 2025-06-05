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

  .image-gallery-slide img,
  .image-gallery-thumbnail img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }

  .image-gallery-slide {
    height: 550px;
    width: 550px;
  }

  .image-gallery-thumbnail .image-gallery-thumbnail-image {
    cursor: pointer;
    height: 80px;
  }

  .image-gallery-thumbnail.active {
    border: 5px solid #337ab7;
  }

  .image-gallery-thumbnail hover {
    border: none;
  }
`;

export default GlobalStyle;


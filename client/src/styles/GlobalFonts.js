import { createGlobalStyle } from 'styled-components';

const GlobalFonts = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
  
  * {
    font-family: 'Poppins', sans-serif;
  }
  
  body {
    font-family: 'Poppins', sans-serif;
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Poppins', sans-serif;
  }
  
  p {
    font-family: 'Poppins', sans-serif;
  }
  
  button {
    font-family: 'Poppins', sans-serif;
  }
  
  input, textarea {
    font-family: 'Poppins', sans-serif;
  }
`;

export default GlobalFonts;
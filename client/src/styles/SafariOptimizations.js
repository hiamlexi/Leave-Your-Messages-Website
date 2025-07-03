import { createGlobalStyle } from 'styled-components';

const SafariOptimizations = createGlobalStyle`
  /* Global Safari optimizations for smooth scrolling and parallax */
  * {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* Optimize all sections for Safari */
  section, div[class*="Section"] {
    /* Hardware acceleration */
    -webkit-transform: translateZ(0);
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-perspective: 1000px;
    perspective: 1000px;
    
    /* Smooth scrolling on iOS */
    -webkit-overflow-scrolling: touch;
    
    /* Prevent flickering */
    -webkit-transform-style: preserve-3d;
    transform-style: preserve-3d;
    
    /* Performance optimization */
    will-change: transform, opacity;
  }

  /* Fix 100vh issue on iOS Safari */
  section, div[class*="Section"] {
    min-height: 100vh;
    min-height: -webkit-fill-available;
    
    @supports (-webkit-touch-callout: none) {
      /* iOS only */
      height: 100vh;
      height: -webkit-fill-available;
    }
  }

  /* Optimize images for parallax */
  img {
    -webkit-transform: translateZ(0);
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    image-rendering: -webkit-optimize-contrast;
  }

  /* Optimize transitions for Safari */
  * {
    -webkit-transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* Fix scroll-snap for Safari */
  @supports (-webkit-touch-callout: none) {
    /* Disable scroll-snap on iOS for smoother parallax */
    [class*="Container"] {
      scroll-snap-type: none !important;
      -webkit-scroll-snap-type: none !important;
    }
    
    section, div[class*="Section"] {
      scroll-snap-align: none !important;
      -webkit-scroll-snap-align: none !important;
    }
  }

  /* Optimize animations */
  @media (prefers-reduced-motion: no-preference) {
    [class*="animated"], [class*="motion"] {
      -webkit-transform: translateZ(0);
      transform: translateZ(0);
    }
  }

  /* Fix position: fixed elements on iOS */
  [class*="Navbar"], [class*="fixed"] {
    -webkit-transform: translateZ(0);
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }
`;

export default SafariOptimizations;
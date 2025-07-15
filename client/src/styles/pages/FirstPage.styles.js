import styled, { keyframes } from "styled-components";
import { media, responsiveFontSize } from "../breakpoints";

// Keyframe animations
const animate = keyframes`
  from {
    transform: translate(-50%, -50%) translateY(0);
  }
  to {
    transform: translate(-50%, -50%) translateY(20px);
  }
`;

const shine = keyframes`
  0% {
    background-position: 0%;
  }
  100% {
    background-position: 200%;
  }
`;

// Styled components
export const Container = styled.div`
  width: 100%;
  max-width: 1400px;
  display: flex;
  justify-content: space-between;
  height: 100%;
  margin: 0 auto;
  padding: 0 60px;

  ${media.xl} {
    max-width: 1200px;
    padding: 0 40px;
  }

  ${media.lg} {
    max-width: 992px;
    padding: 0 30px;
  }

  ${media.md} {
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 20px;
  }

  ${media.sm} {
    padding: 0 15px;
  }

  ${media.xs} {
    padding: 0 10px;
  }
`;

export const CanvasWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;

  ${media.md} {
    position: relative;
    height: 100%;
    min-height: 300px;
  }

  ${media.sm} {
    min-height: 250px;
  }

  ${media.xs} {
    min-height: 200px;
  }
`;

export const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 80px 0;
  overflow: visible;
  position: relative;

  ${media.lg} {
    padding: 60px 0;
  }

  ${media.md} {
    flex: 1;
    align-items: center;
    padding: 40px 0;
    gap: 40px;
  }

  ${media.sm} {
    padding: 30px 0;
    gap: 30px;
  }

  ${media.xs} {
    padding: 20px 0;
    gap: 20px;
  }
`;

export const Right = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;

  ${media.lg} {
    min-height: 380px;
  }

  ${media.md} {
    flex: 1;
    width: 100%;
    min-height: 350px;
  }

  ${media.sm} {
    min-height: 300px;
  }

  ${media.xs} {
    min-height: 250px;
  }
`;

export const NumberSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50%;
  order: 1; /* Desktop: numbers first */
  overflow: visible;
  position: relative;
  
  ${media.md} {
    height: auto;
    padding: 60px 0 40px 0;
    order: 2; /* Mobile: numbers second */
  }

  ${media.sm} {
    padding: 40px 0 30px 0;
  }

  ${media.xs} {
    padding: 30px 0 20px 0;
  }
`;

export const TextSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 50%;
  padding: 40px 40px 0 40px;
  order: 2; /* Desktop: text second */
  
  ${media.lg} {
    padding: 30px 30px 0 30px;
    gap: 18px;
  }

  ${media.md} {
    height: auto;
    padding: 40px 20px 0 20px;
    text-align: center;
    order: 1; /* Mobile: text first */
  }

  ${media.sm} {
    padding: 30px 15px 0 15px;
    gap: 15px;
  }

  ${media.xs} {
    padding: 20px 10px 0 10px;
    gap: 12px;
  }
`;

export const Title = styled.h1`
  ${responsiveFontSize('3.5rem', '3rem', '2.5rem', '2rem', '1.75rem')}
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
  line-height: 1.2;
`;

export const Subtitle = styled.h2`
  ${responsiveFontSize('2rem', '1.75rem', '1.5rem', '1.25rem', '1.1rem')}
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  color: #da4ea2;
  margin: 0;
  line-height: 1.3;
`;

export const Paragraph = styled.p`
  ${responsiveFontSize('1.2rem', '1.1rem', '1rem', '0.95rem', '0.9rem')}
  font-family: 'Poppins', sans-serif;
  color: #cccccc;
  line-height: 1.6;
  margin: 0;
  max-width: 500px;
  
  ${media.md} {
    max-width: 100%;
  }
`;

export const Img = styled.img`
  width: 90%;
  max-width: 800px;
  height: auto;
  max-height: 600px;
  object-fit: contain;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: ${animate} 2s infinite ease alternate;
  z-index: 1;

  ${media.xl} {
    width: 85%;
    max-width: 600px;
    max-height: 500px;
  }

  ${media.lg} {
    width: 80%;
    max-width: 500px;
    max-height: 400px;
  }

  ${media.md} {
    width: 70%;
    max-width: 350px;
    max-height: 350px;
  }

  ${media.sm} {
    width: 65%;
    max-width: 280px;
    max-height: 280px;
  }

  ${media.xs} {
    width: 60%;
    max-width: 220px;
    max-height: 220px;
  }
`;

export const Box = styled.div`
  position: relative;
  cursor: pointer;
  display: flex;
  justify-content: center;
  gap: 0.2em;
  overflow: visible;
  height: 100px;
  min-width: 200px;
  padding: 0 50px;

  &::before,
  &::after {
    position: absolute;
    top: -1.2em;
    left: 50%;
    transform: translateX(-50%) translateY(100px);
    width: auto;
    white-space: nowrap;
    text-align: center;
    font-family: 'Poppins', sans-serif;
    font-weight: 700;
    font-size: clamp(2rem, 5vw, 74px);
    background: linear-gradient(90deg, #da4ea2, #fcf0f7, #da4ea2);
    background-size: 200%;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: ${shine} 3s linear infinite;
    transition: 1s;
    opacity: 0;
    overflow: visible;
    filter: blur(30px);
  }

  &::before {
    content: "Byeeee!";
    transform: translateX(-50%) translateY(0);
    opacity: 1;
    filter: blur(0);
  }

  &:hover::before {
    transform: translateX(-50%) translateY(-100px);
    opacity: 0;
    filter: blur(30px);
  }

  &::after {
    content: "Bonjour!";
  }

  &:hover::after {
    transform: translateX(-50%) translateY(0px);
    opacity: 1;
    filter: blur(0px);
  }
`;

export const Span = styled.span`
  color: #fff;
  font-weight: bold;
  filter: blur(1px);
  font-size: 10em;

  ${media.xl} {
    font-size: 8em;
  }

  ${media.lg} {
    font-size: 6em;
  }

  ${media.md} {
    font-size: 5em;
  }

  ${media.sm} {
    font-size: 4em;
  }

  ${media.xs} {
    font-size: 3em;
  }
`;

export const DigitWrapper = styled.div`
  position: relative;
  width: 1em;
  height: 1em;
`;

export const OldDigit = styled(Span)`
  position: absolute;
  top: 0;
  left: 0;
  transition: 2s;
  color: rgb(192, 199, 7);

  ${Box}:hover & {
    transform: rotate(45deg) translateY(-200px);
    opacity: 0;
    filter: blur(4px);
  }
`;

export const NewDigit = styled(Span)`
  position: absolute;
  top: 0;
  left: 0;
  transition: 2s;
  color: rgb(214, 8, 94);
  transform: rotate(-45deg) translateY(200px);
  opacity: 0;
  filter: blur(4px);

  ${Box}:hover & {
    transform: rotate(0deg) translateY(0px);
    opacity: 1;
    filter: blur(0px);
  }
`;
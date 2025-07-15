import React, { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import winter from "../assets/winter.gif";
import summer from "../assets/summer.gif";
import {
  Section,
  Container,
  Left,
  Right,
  FlipWrapper,
  FlipCard,
  Front,
  Back,
  Ring,
  RotatingRing,
  InnerWrapper,
  CircularImg,
  TypingHeader,
  TypingParagraph
} from "../styles/pages/FourthPage.styles";

function typeEffect(element, speed) {
  const text = element.innerText;
  element.innerText = "";
  let i = 0;

  const timer = setInterval(() => {
    if (i < text.length) {
      element.append(text.charAt(i));
      i++;
    } else {
      clearInterval(timer);
    }
  }, speed);
}

const ImgSection = (
  <FlipWrapper>
    <FlipCard>
      <Front>
        <RotatingRing>
          <InnerWrapper>
            <CircularImg src={winter} alt="Me front" />
          </InnerWrapper>
        </RotatingRing>
      </Front>
      <Back>
        <Ring>
          <CircularImg src={summer} alt="Me flipped" />
        </Ring>
      </Back>
    </FlipCard>
  </FlipWrapper>
);

const FourthPage = (props) => {
  const headerRef = useRef(null);
  const paragraphRef = useRef(null);
  const sectionRef = useRef(null);
  const hasTypedRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTypedRef.current) {
            hasTypedRef.current = true;

            const h1 = headerRef.current;
            const p = paragraphRef.current;
            const headerSpeed = 50;
            const paragraphSpeed = Math.floor(headerSpeed / 3);

            if (h1 && p) {
              const delay = h1.innerText.length * headerSpeed + headerSpeed;

              typeEffect(h1, headerSpeed);
              setTimeout(() => {
                p.style.display = "block";
                typeEffect(p, paragraphSpeed);

                if (sectionRef.current) {
                  observer.unobserve(sectionRef.current);
                }
              }, delay);
            }
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <Section ref={sectionRef} id={props.id}>
      <Container>
        <Left>
          <TypingHeader ref={headerRef}>Welcome to Our Journey</TypingHeader>
          <TypingParagraph ref={paragraphRef}>
            Every season brings its own magic, just like every message carries its
            own story. This interactive space celebrates the beauty of transitions -
            from winter's quiet reflection to summer's vibrant energy. Hover over
            the image to experience the transformation, and remember that your words
            have the power to create lasting connections. Whether you're sharing
            memories, expressing gratitude, or simply saying hello, your message
            matters. Take a moment to explore, reflect, and leave your mark on this
            digital canvas where stories come to life and connections are made.
          </TypingParagraph>
        </Left>
        <Right>{ImgSection}</Right>
      </Container>
    </Section>
  );
};

export default FourthPage;

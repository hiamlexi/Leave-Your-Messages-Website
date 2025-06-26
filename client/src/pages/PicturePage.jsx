import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import winter from "../assets/winter.gif";

const styles = `

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

.about-title {
  font-size: 5rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: -0.03em;
  position: absolute;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
  pointer-events: none;
  background: linear-gradient(to right, #60a5fa 0%, #e879f9 50%, #f472b6 100%);
  animation: shimmer 8s infinite linear;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  z-index: 1;
  text-shadow: 0 0 20px rgba(125, 211, 252, 0.2);
}

@keyframes shimmer {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}

.carousel-container {
  width: 100%;
  max-width: 1400px;
  height: 500px;
  position: relative;
  perspective: 2000px;
  margin-top: 60px;
  z-index: 2;
}

.carousel-track {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.8s cubic-bezier(0.68, -0.6, 0.32, 1.6);
}

.card {
  position: absolute;
  width: 300px;
  height: 420px;
  background: #1e293b;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  transition: all 0.8s cubic-bezier(0.68, -0.6, 0.32, 1.6);
  cursor: pointer;
  will-change: transform, opacity;
  transform-origin: center;
  border: 1px solid rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  background: linear-gradient(145deg, rgba(30, 41, 59, 0.9), rgba(15, 23, 42, 0.9));
}

.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.8);
}

.card-content {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 30px;
  color: white;
  transform: translateY(100%);
  transition: transform 0.4s cubic-bezier(0.68, -0.6, 0.32, 1.6);
  background: linear-gradient(to top, rgba(15,23,42,0.95) 0%, rgba(15,23,42,0.8) 50%, transparent 100%);
  backdrop-filter: blur(5px);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card:hover .card-content {
  transform: translateY(0);
}

.card-name {
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
}

.card-role {
  font-size: 0.9rem;
  color: #94a3b8;
  text-align: center;
}

.card.center {
  z-index: 10;
  transform: scale(1.15);
}

.card.left-2 {
  z-index: 1;
  transform: translateX(-400px) scale(0.8) rotateY(15deg);
  opacity: 0.6;
}

.card.left-1 {
  z-index: 5;
  transform: translateX(-200px) scale(0.95) rotateY(8deg);
  opacity: 0.8;
}

.card.right-1 {
  z-index: 5;
  transform: translateX(200px) scale(0.95) rotateY(-8deg);
  opacity: 0.8;
}

.card.right-2 {
  z-index: 1;
  transform: translateX(400px) scale(0.8) rotateY(-15deg);
  opacity: 0.6;
}

.card.hidden {
  opacity: 0;
  pointer-events: none;
}

.dots {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 60px;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(203, 213, 225, 0.2);
  cursor: pointer;
  border: 2px solid rgba(255,255,255,0.1);
}

.dot.active {
  background: linear-gradient(135deg, #60a5fa 0%, #e879f9 100%);
  transform: scale(1.3);
}

.sender-info {
  text-align: center;
  margin-top: 2rem;
  min-height: 150px;
}

.sender-name {
  font-size: 2rem;
  font-weight: 700;
  background: linear-gradient(to right, #60a5fa, #e879f9);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.sender-role {
  font-size: 1.1rem;
  color: #94a3b8;
  text-transform: uppercase;
}

.nav-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: linear-gradient(135deg, #60a5fa 0%, #e879f9 100%);
  color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.5rem;
  z-index: 20;
}

.nav-arrow.left { left: 20px; }
.nav-arrow.right { right: 20px; }

.card-avatar-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}

.card-avatar-img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 2px solid rgba(255, 255, 255, 0.2);
}

.card-avatar-img:hover {
  transform: scale(1.1) rotate(6deg);
  box-shadow: 0 4px 12px rgba(255, 255, 255, 0.3);
}
`;

const Section = styled.section`
  height: 100vh;
  width: 100%;
  scroll-snap-align: start;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`;

const senders = [
  { name: "Sender 1", role: "Sender Role" },
  { name: "Sender 2", role: "Sender Role" },
  { name: "Sender 3", role: "Sender Role" },
  { name: "Sender 4", role: "Sender Role" },
  { name: "Sender 5", role: "Sender Role" },
  { name: "Sender 6", role: "Sender Role" },
];

const PicturePage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const senderInfoRef = useRef(null);
  const [animating, setAnimating] = useState(false);

  const updateCarousel = (newIndex) => {
    if (animating) return;
    setAnimating(true);

    const corrected = (newIndex + senders.length) % senders.length;
    setCurrentIndex(corrected);

    if (senderInfoRef.current) {
      senderInfoRef.current.classList.add("animate-out");
      setTimeout(() => {
        senderInfoRef.current.classList.remove("animate-out");
        senderInfoRef.current.classList.add("animate-in");
      }, 300);
      setTimeout(() => {
        senderInfoRef.current.classList.remove("animate-in");
      }, 600);
    }

    setTimeout(() => setAnimating(false), 800);
  };

  const getClass = (i) => {
    const offset = (i - currentIndex + senders.length) % senders.length;
    if (offset === 0) return "card center";
    if (offset === 1) return "card right-1";
    if (offset === 2) return "card right-2";
    if (offset === senders.length - 1) return "card left-1";
    if (offset === senders.length - 2) return "card left-2";
    return "card hidden";
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") updateCarousel(currentIndex - 1);
      if (e.key === "ArrowRight") updateCarousel(currentIndex + 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [currentIndex]);

  return (
    <Section>
      <style>{styles}</style>

      <div className="carousel-container">
        <div
          className="nav-arrow left"
          onClick={() => updateCarousel(currentIndex - 1)}
        >
          &lt;
        </div>
        <div className="carousel-track">
          {senders.map((sender, i) => (
            <div
              key={i}
              className={getClass(i)}
              onClick={() => updateCarousel(i)}
            >
              <img className="card-img" src={winter} alt={sender.name} />
              <div className="card-content">
                <div className="card-avatar-wrapper">
                  <img className="card-avatar-img" src={winter} alt="avatar" />
                </div>
                <div className="card-name">{sender.name}</div>
                <div className="card-role">{sender.role}</div>
              </div>
            </div>
          ))}
        </div>
        <div
          className="nav-arrow right"
          onClick={() => updateCarousel(currentIndex + 1)}
        >
          &gt;
        </div>
      </div>

      <div className="dots">
        {senders.map((_, i) => (
          <div
            key={i}
            className={`dot ${i === currentIndex ? "active" : ""}`}
            onClick={() => updateCarousel(i)}
          />
        ))}
      </div>

      <div className="sender-info" ref={senderInfoRef}>
        <div className="sender-name">{senders[currentIndex].name}</div>
        <div className="sender-role">{senders[currentIndex].role}</div>
      </div>
    </Section>
  );
};

export default PicturePage;

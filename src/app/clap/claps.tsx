"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import ClapsFilled from "./icons/claps-fill.svg";
import ClapsOutlined from "./icons/claps-outline.svg";

const MIN_DEG = 1;
const MAX_DEG = 72;
const TOTAL_COUNT = 111;

function Claps() {
  const [accCounter, setAccCounter] = useState<number>(0);
  const particlesClasses = useMemo(
    () => [
      {
        class: "pop-top",
      },
      {
        class: "pop-top-left",
      },
      {
        class: "pop-top-right",
      },
      {
        class: "pop-bottom-right",
      },
      {
        class: "pop-bottom-left",
      },
    ],
    []
  );

  const clapRef = useRef<HTMLDivElement>(null);
  const sonarClapRef = useRef<HTMLDivElement>(null);
  const clickerCounterRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const particles2Ref = useRef<HTMLDivElement>(null);
  const particles3Ref = useRef<HTMLDivElement>(null);
  const totalCounterRef = useRef<HTMLDivElement>(null);

  const onClapClick = useCallback(function () {
    clapRef.current?.classList.add("clicked");
    upClickCounter();

    runAnimationCycle(clapRef.current, "scale");

    if (!particlesRef.current?.classList.contains("animating")) {
      animateParticles(particlesRef.current, 700);
    } else if (!particles2Ref.current?.classList.contains("animating")) {
      animateParticles(particles2Ref.current, 700);
    } else if (!particles3Ref.current?.classList.contains("animating")) {
      animateParticles(particles3Ref.current, 700);
    }
  }, []);

  const onClapHover = useCallback(function () {
    sonarClapRef.current?.classList.add("hover-active");
    setTimeout(() => {
      sonarClapRef.current?.classList.remove("hover-active");
    }, 2000);
  }, []);

  const upClickCounter = useCallback(function () {
    setAccCounter((prev) => prev + 1);

    if (clickerCounterRef.current?.classList.contains("first-active")) {
      runAnimationCycle(clickerCounterRef.current, "active");
    } else {
      runAnimationCycle(clickerCounterRef.current, "first-active");
    }
    runAnimationCycle(totalCounterRef.current, "fader");
  }, []);

  const runAnimationCycle = useCallback(function (
    el: HTMLElement | null,
    className: string,
    duration?: number
  ) {
    if (!el) {
      console.error("Element not found", el, className, duration);
      debugger;
      return;
    }

    if (el && !el.classList.contains(className)) {
      el.classList.add(className);
    } else {
      el.classList.remove(className);
      void el.offsetWidth; // Trigger a reflow in between removing and adding the class name
      el.classList.add(className);
    }
  },
  []);

  const runParticleAnimationCycle = useCallback(function (
    el: HTMLElement,
    className: string,
    duration: number
  ) {
    if (el && !el.classList.contains(className)) {
      el.classList.add(className);

      setTimeout(() => {
        el.classList.remove(className);
      }, duration);
    }
  },
  []);

  const animateParticles = useCallback(function (
    particles: HTMLDivElement | null,
    dur: number
  ) {
    if (!particles) return;

    addRandomParticlesRotation(particles, MIN_DEG, MAX_DEG);
    for (let i = 0; i < particlesClasses.length; i++) {
      runParticleAnimationCycle(
        particles.children[i] as HTMLElement,
        particlesClasses[i].class,
        dur
      );
    }
    // Boolean functionality only to activate particles2, particles3 when needed
    particles.classList.add("animating");
    setTimeout(() => {
      particles.classList.remove("animating");
    }, dur);
  },
  []);

  const getRandomInt = useCallback(function (min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }, []);

  const addRandomParticlesRotation = useCallback(function (
    particlesEl: HTMLElement,
    minDeg: number,
    maxDeg: number
  ) {
    const randomRotationAngle = getRandomInt(minDeg, maxDeg) + "deg";
    particlesEl.style.transform = `rotate(${randomRotationAngle})`;
  },
  []);

  return (
    <Container>
      <div className='canvas'>
        <div ref={totalCounterRef} id='totalCounter' className='total-counter'>
          {TOTAL_COUNT + accCounter}
        </div>

        <div
          id='clap'
          ref={clapRef}
          className='clap-container'
          onClick={onClapClick}
          onMouseOver={onClapHover}
        >
          {accCounter === 0 ? <ClapsOutlined /> : <ClapsFilled />}
        </div>

        <div
          ref={clickerCounterRef}
          id='clicker'
          className='click-counter select-none'
        >
          <span className='counter'>{"+" + " " + accCounter}</span>
        </div>

        <div
          ref={sonarClapRef}
          id='sonar-clap'
          className='clap-container-sonar'
        ></div>

        <div ref={particlesRef} id='particles' className='particles-container'>
          <div className='triangle'>
            <div className='square'></div>
          </div>
          <div className='triangle'>
            <div className='square'></div>
          </div>
          <div className='triangle'>
            <div className='square'></div>
          </div>
          <div className='triangle'>
            <div className='square'></div>
          </div>
          <div className='triangle'>
            <div className='square'></div>
          </div>
        </div>

        <div
          ref={particles2Ref}
          id='particles-2'
          className='particles-container'
        >
          <div className='triangle'>
            <div className='square'></div>
          </div>
          <div className='triangle'>
            <div className='square'></div>
          </div>
          <div className='triangle'>
            <div className='square'></div>
          </div>
          <div className='triangle'>
            <div className='square'></div>
          </div>
          <div className='triangle'>
            <div className='square'></div>
          </div>
        </div>

        <div
          ref={particles3Ref}
          id='particles-3'
          className='particles-container'
        >
          <div className='triangle'>
            <div className='square'></div>
          </div>
          <div className='triangle'>
            <div className='square'></div>
          </div>
          <div className='triangle'>
            <div className='square'></div>
          </div>
          <div className='triangle'>
            <div className='square'></div>
          </div>
          <div className='triangle'>
            <div className='square'></div>
          </div>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  $default-clap-color: #6c5ce7;

  display: flex;
  align-items: center;
  justify-content: center;

  .canvas {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 300px;
    height: 300px;
    position: relative;
    .total-counter {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      position: absolute;
      margin-top: -45px;
      color: gray;
      font-family: sans-serif;
      font-size: 16px;
    }
    .total-counter.fader {
      animation: fade-in 1400ms forwards;
    }
    .clap-container {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      width: 60px;
      height: 60px;
      border: 1px solid rgba(0, 0, 0, 0.15);
      border-radius: 50%;
      z-index: 2;
      background: #fff;
      cursor: pointer;
      .clap-icon {
        font-size: 30px;
        color: $default-clap-color;
        width: 30px;
        height: 30px;
      }
    }
    .clap-container:hover {
      border: 1px solid $default-clap-color;
    }
    .clap-container.scale {
      animation: scaleAndBack 700ms forwards;
    }
    .click-counter {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 35px;
      height: 35px;
      position: absolute;
      top: 132px;
      background-color: $default-clap-color;
      border-radius: 50%;
      z-index: 1;
      .counter {
        font-family: sans-serif;
        font-size: 14px;
        color: #fff;
      }
    }
    .click-counter.first-active {
      animation: first-bump-in 1s forwards;
    }
    .click-counter.active {
      animation: bump-in 1s forwards;
    }
    .clap-container-sonar {
      width: 60px;
      height: 60px;
      background: $default-clap-color;
      border-radius: 50%;
      position: absolute;
      opacity: 0;
      z-index: 0;
    }
    .hover-active {
      animation: sonar-wave 2s forwards;
    }
    .particles-container {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 60px;
      height: 60px;
      position: absolute;
      /* border: 1px solid gray; */
      /* z-index: 3; */
      .triangle {
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        border-top: 10px solid red;
        border-bottom: 4px solid transparent;
        position: absolute;
        .square {
          width: 5px;
          height: 5px;
          background: $default-clap-color;
          position: absolute;
          left: -15px;
          top: 0;
        }
      }
      .pop-top {
        animation: pop-top 1s forwards;
      }
      .pop-top-left {
        animation: pop-top-left 1s forwards;
      }
      .pop-top-right {
        animation: pop-top-right 1s forwards;
      }
      .pop-bottom-right {
        animation: pop-bottom-right 1s forwards;
      }
      .pop-bottom-left {
        animation: pop-bottom-left 1s forwards;
      }
    }
  }

  // * * * Animations * * * //
  @keyframes sonar-wave {
    0% {
      opacity: 0.7;
    }
    100% {
      transform: scale(1.4);
      opacity: 0;
    }
  }
  @keyframes fade-in {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  // * * * Pop Animations * * * //
  @keyframes pop-top {
    0% {
      transform: translate(0, 0) rotate(0);
      opacity: 0.4;
    }
    100% {
      transform: translate(0, -100px) rotate(0);
      opacity: 0;
    }
  }
  @keyframes pop-top-left {
    0% {
      transform: translate(0, 0) rotate(-55deg);
      opacity: 0.4;
    }
    100% {
      transform: translate(-100px, -50px) rotate(-55deg);
      opacity: 0;
    }
  }
  @keyframes pop-top-right {
    0% {
      transform: translate(0, 0) rotate(55deg);
      opacity: 0.4;
    }
    100% {
      transform: translate(100px, -50px) rotate(55deg);
      opacity: 0;
    }
  }
  @keyframes pop-bottom-right {
    0% {
      transform: translate(0, 0) rotate(135deg);
      opacity: 0.4;
    }
    100% {
      transform: translate(70px, 80px) rotate(135deg);
      opacity: 0;
    }
  }
  @keyframes pop-bottom-left {
    0% {
      transform: translate(0, 0) rotate(-135deg);
      opacity: 0.4;
    }
    100% {
      transform: translate(-70px, 80px) rotate(-135deg);
      opacity: 0;
    }
  }
  @keyframes first-bump-in {
    0% {
      transform: translateY(-65px);
      opacity: 1;
    }
    50% {
      transform: translateY(-80px);
      opacity: 1;
    }
    100% {
      transform: translateY(-100px);
      opacity: 0;
    }
  }

  @keyframes bump-in {
    0% {
      transform: translateY(-80px) scale(0.9);
      opacity: 1;
    }
    50% {
      transform: translateY(-80px) scale(1);
      opacity: 1;
    }
    100% {
      transform: translateY(-100px) scale(1);
      opacity: 0;
    }
  }
  @keyframes scaleAndBack {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.15);
    }
    100% {
      transform: scale(1);
    }
  }
`;

export default Claps;

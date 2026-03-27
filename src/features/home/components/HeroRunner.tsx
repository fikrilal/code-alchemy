"use client";

import { useEffect, useRef, useState } from "react";

const RUNNER_LABEL = "MOBILE ENGINEER • FOUNDING ENGINEER";
const RUNNER_SEQUENCE = Array.from({ length: 6 }, () => RUNNER_LABEL);
const RUNNER_DURATION_MS = 24_000;
const GAP_LEAD_MS = 450;
const JUMP_TO_FALL_MS = 360;
const FALL_TO_ROLL_MS = 245;
const ROLL_TO_RUN_MS = 420;
const JUMP_ARC_HEIGHT_PX = 20;
const JUMP_ARC_PEAK_OFFSET = 0.34;

function buildJumpArcKeyframes() {
  const samples = [
    0,
    0.08,
    0.16,
    0.24,
    0.34,
    0.44,
    0.56,
    0.68,
    0.8,
    0.9,
    1,
  ];

  return samples.map((offset) => {
    const normalized =
      offset <= JUMP_ARC_PEAK_OFFSET
        ? (offset / JUMP_ARC_PEAK_OFFSET) * 0.5
        : 0.5 +
          ((offset - JUMP_ARC_PEAK_OFFSET) / (1 - JUMP_ARC_PEAK_OFFSET)) * 0.5;
    const lift = Math.pow(Math.sin(Math.PI * normalized), 0.78);
    const translateY = -(JUMP_ARC_HEIGHT_PX * lift);

    return {
      transform: `translate3d(0, ${translateY.toFixed(3)}px, 0)`,
      offset,
    };
  });
}

function getSpriteModeProps(mode: "run" | "jump" | "fall" | "roll") {
  switch (mode) {
    case "jump":
      return {
        className: "hero-runner-sheet hero-runner-sheet--jump",
        image: "/hero/free-knight-jump-sheet.png",
      };
    case "fall":
      return {
        className: "hero-runner-sheet hero-runner-sheet--fall",
        image: "/hero/free-knight-jump-fall-sheet.png",
      };
    case "roll":
      return {
        className: "hero-runner-sheet hero-runner-sheet--roll",
        image: "/hero/free-knight-roll-sheet.png",
      };
    default:
      return {
        className: "hero-runner-sheet hero-runner-sheet--run",
        image: "/hero/free-knight-run-sheet.png",
      };
  }
}

function findNextEventIndex(eventTimes: number[], currentTime: number) {
  const nextIndex = eventTimes.findIndex((eventTime) => eventTime > currentTime + 16);

  return nextIndex === -1 ? 0 : nextIndex;
}

function parseGapPx(group: HTMLElement) {
  const styles = getComputedStyle(group);

  return Number.parseFloat(styles.columnGap || styles.gap || "0") || 0;
}

export default function HeroRunner() {
  const marqueeRef = useRef<HTMLDivElement | null>(null);
  const primaryGroupRef = useRef<HTMLDivElement | null>(null);
  const spriteRef = useRef<HTMLDivElement | null>(null);
  const primarySpanRefs = useRef<HTMLSpanElement[]>([]);
  const timeoutsRef = useRef<number[]>([]);
  const motionRef = useRef<Animation | null>(null);
  const eventTimesRef = useRef<number[]>([]);
  const nextEventIndexRef = useRef(0);
  const lastTimeRef = useRef(0);
  const isJumpingRef = useRef(false);
  const [spriteMode, setSpriteMode] = useState<"run" | "jump" | "fall" | "roll">("run");

  useEffect(() => {
    let frameId = 0;
    let disposed = false;
    const timeoutIds = timeoutsRef.current;

    const hop = () => {
      const sprite = spriteRef.current;
      if (isJumpingRef.current || !sprite) return;

      isJumpingRef.current = true;
      setSpriteMode("jump");

      motionRef.current?.cancel();
      motionRef.current = sprite.animate(
        buildJumpArcKeyframes(),
        {
          duration: JUMP_TO_FALL_MS + FALL_TO_ROLL_MS,
          easing: "linear",
          fill: "none",
        },
      );

      const fallTimer = window.setTimeout(() => {
        setSpriteMode("fall");
      }, JUMP_TO_FALL_MS);

      const rollTimer = window.setTimeout(() => {
        setSpriteMode("roll");
      }, JUMP_TO_FALL_MS + FALL_TO_ROLL_MS);

      const runTimer = window.setTimeout(() => {
        setSpriteMode("run");
        isJumpingRef.current = false;
      }, JUMP_TO_FALL_MS + FALL_TO_ROLL_MS + ROLL_TO_RUN_MS);

      timeoutIds.push(fallTimer, rollTimer, runTimer);
    };

    const measure = () => {
      const marquee = marqueeRef.current;
      const primaryGroup = primaryGroupRef.current;
      const sprite = spriteRef.current;
      const spans = primarySpanRefs.current.filter(Boolean);
      const marqueeAnimation = marquee?.getAnimations()?.[0];

      if (!marquee || !primaryGroup || !sprite || spans.length === 0 || !marqueeAnimation) {
        return;
      }

      const groupRect = primaryGroup.getBoundingClientRect();
      const spriteRect = sprite.getBoundingClientRect();
      const gapPx = parseGapPx(primaryGroup);
      const currentTimeRaw = Number(marqueeAnimation.currentTime ?? 0);
      const currentTime =
        ((currentTimeRaw % RUNNER_DURATION_MS) + RUNNER_DURATION_MS) %
        RUNNER_DURATION_MS;
      const runnerAnchorX =
        spriteRect.left + spriteRect.width * 0.42 - groupRect.left;
      const speedPxPerMs = groupRect.width / RUNNER_DURATION_MS;

      const eventTimes = spans
        .map((span) => {
          const gapCenterX = span.offsetLeft + span.offsetWidth + gapPx / 2;
          const distanceUntilGap =
            ((gapCenterX - runnerAnchorX) % groupRect.width + groupRect.width) %
            groupRect.width;

          return (
            currentTime +
            distanceUntilGap / speedPxPerMs -
            GAP_LEAD_MS +
            RUNNER_DURATION_MS
          ) % RUNNER_DURATION_MS;
        })
        .sort((left, right) => left - right);

      eventTimesRef.current = eventTimes;
      nextEventIndexRef.current = findNextEventIndex(eventTimes, currentTime);
      lastTimeRef.current = currentTime;
    };

    const tick = () => {
      if (disposed) return;

      const marqueeAnimation = marqueeRef.current?.getAnimations()?.[0];
      const eventTimes = eventTimesRef.current;
      if (marqueeAnimation && eventTimes.length > 0) {
        const currentTimeRaw = Number(marqueeAnimation.currentTime ?? 0);
        const currentTime =
          ((currentTimeRaw % RUNNER_DURATION_MS) + RUNNER_DURATION_MS) %
          RUNNER_DURATION_MS;

        if (currentTime + 120 < lastTimeRef.current) {
          nextEventIndexRef.current = 0;
        }

        while (nextEventIndexRef.current < eventTimes.length) {
          const nextEventTime = eventTimes[nextEventIndexRef.current];
          if (nextEventTime === undefined || currentTime < nextEventTime) {
            break;
          }

          hop();
          nextEventIndexRef.current += 1;
        }

        lastTimeRef.current = currentTime;
      }

      frameId = window.requestAnimationFrame(tick);
    };

    const resizeObserver = new ResizeObserver(() => {
      measure();
    });

    if (primaryGroupRef.current) {
      resizeObserver.observe(primaryGroupRef.current);
    }

    if (spriteRef.current) {
      resizeObserver.observe(spriteRef.current);
    }

    measure();
    void document.fonts?.ready.then(() => {
      measure();
    });
    frameId = window.requestAnimationFrame(tick);

    return () => {
      disposed = true;
      resizeObserver.disconnect();
      window.cancelAnimationFrame(frameId);
      for (const timeoutId of timeoutIds) {
        window.clearTimeout(timeoutId);
      }
      motionRef.current?.cancel();
    };
  }, []);

  const spriteProps = getSpriteModeProps(spriteMode);

  return (
    <div className="hero-runner relative w-full max-w-[40rem] pt-5">
      <div
        ref={spriteRef}
        className="hero-runner-sprite pointer-events-none absolute left-4 top-[-1.8rem] z-10 h-12 w-14 overflow-hidden sm:left-5"
      >
        <div
          aria-hidden="true"
          className={spriteProps.className}
          style={{ backgroundImage: `url(${spriteProps.image})` }}
        />
      </div>

      <div className="hero-runner-mask overflow-hidden pl-1">
        <div
          ref={marqueeRef}
          className="hero-runner-marquee text-sm font-mono whitespace-nowrap leading-none tracking-[0.22em] text-slate-300/80 uppercase"
        >
          <div ref={primaryGroupRef} className="hero-runner-group">
            {RUNNER_SEQUENCE.map((label, index) => (
              <span
                key={`primary-${index}`}
                ref={(node) => {
                  if (!node) return;
                  primarySpanRefs.current[index] = node;
                }}
              >
                {label}
              </span>
            ))}
          </div>
          <div className="hero-runner-group" aria-hidden="true">
            {RUNNER_SEQUENCE.map((label, index) => (
              <span key={`secondary-${index}`}>
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .hero-runner-marquee {
          display: flex;
          width: max-content;
          animation: heroRunnerMarquee 24s linear infinite;
          will-change: transform;
        }

        .hero-runner-mask {
          -webkit-mask-image: linear-gradient(
            90deg,
            transparent 0%,
            black 3%,
            black 97%,
            transparent 100%
          );
          mask-image: linear-gradient(
            90deg,
            transparent 0%,
            black 3%,
            black 97%,
            transparent 100%
          );
        }

        .hero-runner-group {
          display: flex;
          flex-shrink: 0;
          gap: 3.25rem;
          padding-right: 3.25rem;
        }

        .hero-runner-sheet {
          width: 5.5rem;
          height: calc(5.5rem * 2 / 3);
          margin-top: -0.7rem;
          margin-left: -0.55rem;
          background-repeat: no-repeat;
          background-position: 0 0;
          background-size: auto 100%;
          image-rendering: pixelated;
          filter: drop-shadow(0 0 14px rgba(74, 222, 128, 0.16));
        }

        .hero-runner-sheet--run {
          animation: heroRunnerSheetRun 680ms steps(10) infinite;
        }

        .hero-runner-sheet--jump {
          animation: heroRunnerSheetJump ${JUMP_TO_FALL_MS}ms steps(3) 1 both;
        }

        .hero-runner-sheet--fall {
          animation: heroRunnerSheetFall ${FALL_TO_ROLL_MS}ms steps(2) 1 both;
        }

        .hero-runner-sheet--roll {
          animation: heroRunnerSheetRoll ${ROLL_TO_RUN_MS}ms steps(12) 1 both;
        }

        @keyframes heroRunnerMarquee {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }

        @keyframes heroRunnerSheetRun {
          from {
            background-position-x: 0;
          }
          to {
            background-position-x: -55rem;
          }
        }

        @keyframes heroRunnerSheetJump {
          from {
            background-position-x: 0;
          }
          to {
            background-position-x: -16.5rem;
          }
        }

        @keyframes heroRunnerSheetFall {
          from {
            background-position-x: 0;
          }
          to {
            background-position-x: -11rem;
          }
        }

        @keyframes heroRunnerSheetRoll {
          from {
            background-position-x: 0;
          }
          to {
            background-position-x: -66rem;
          }
        }
      `}</style>
    </div>
  );
}

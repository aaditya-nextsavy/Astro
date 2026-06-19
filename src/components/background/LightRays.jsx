"use client";

import { useEffect, useRef } from "react";

export default function LightRays({ className = "" }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");

        const resize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };

        resize();

        const ro = new ResizeObserver(resize);
        ro.observe(canvas);

        const rays = Array.from({ length: 12 }, (_, i) => ({
            width: 20 + Math.random() * 60,
            offset: (Math.random() - 0.5) * 500,
            spread: 2 + Math.random() * 3,
            opacity: 0.03 + Math.random() * 0.06,
            speed: 0.2 + Math.random() * 0.8,
            seed: i * 1000,
        }));

        let t = 0;
        let raf;

        const draw = () => {
            const W = canvas.width;
            const H = canvas.height;

            ctx.clearRect(0, 0, W, H);

            const angle =
                128 +
                2 * Math.sin(t * 0.00012);

            const angleRad =
                (angle * Math.PI) / 180;

            const dx = Math.cos(angleRad);
            const dy = Math.sin(angleRad);

            const perp =
                angleRad - Math.PI / 2;

            const px = Math.cos(perp);
            const py = Math.sin(perp);

            const originX = W * 0.72;
            const originY = -H * 0.12;

            const breathe =
                0.85 +
                Math.sin(t * 0.00035) * 0.15;

            const rayLen =
                Math.sqrt(W * W + H * H) * 2;

            ctx.globalCompositeOperation =
                "screen";

            rays.forEach((ray) => {
                const drift =
                    Math.sin(
                        t *
                        0.00025 *
                        ray.speed +
                        ray.seed
                    ) * 30;

                const offset =
                    ray.offset + drift;

                const cx =
                    originX + px * offset;

                const cy =
                    originY + py * offset;

                const nearWidth =
                    ray.width * 0.15;

                const farWidth =
                    ray.width * ray.spread;

                const x0 =
                    cx + px * -nearWidth;
                const y0 =
                    cy + py * -nearWidth;

                const x1 =
                    cx + px * nearWidth;
                const y1 =
                    cy + py * nearWidth;

                const x2 =
                    cx +
                    dx * rayLen +
                    px * farWidth;

                const y2 =
                    cy +
                    dy * rayLen +
                    py * farWidth;

                const x3 =
                    cx +
                    dx * rayLen -
                    px * farWidth;

                const y3 =
                    cy +
                    dy * rayLen -
                    py * farWidth;

                const grad =
                    ctx.createLinearGradient(
                        cx,
                        cy,
                        cx + dx * rayLen,
                        cy + dy * rayLen
                    );

                grad.addColorStop(
                    0,
                    `rgba(255,250,220,${ray.opacity *
                    breathe *
                    1.4
                    })`
                );

                grad.addColorStop(
                    0.3,
                    `rgba(255,245,210,${ray.opacity *
                    breathe
                    })`
                );

                grad.addColorStop(
                    0.7,
                    `rgba(230,240,255,${ray.opacity *
                    0.4 *
                    breathe
                    })`
                );

                grad.addColorStop(
                    1,
                    "rgba(230,240,255,0)"
                );

                ctx.beginPath();

                ctx.moveTo(x0, y0);
                ctx.lineTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.lineTo(x3, y3);

                ctx.closePath();

                ctx.fillStyle = grad;
                ctx.fill();
            });

            // atmospheric haze
            const haze =
                ctx.createRadialGradient(
                    originX,
                    originY,
                    0,
                    originX,
                    originY,
                    W * 0.9
                );

            haze.addColorStop(
                0,
                `rgba(255,245,220,${0.12 * breathe
                })`
            );

            haze.addColorStop(
                0.35,
                `rgba(255,245,220,${0.05 * breathe
                })`
            );

            haze.addColorStop(
                1,
                "rgba(255,245,220,0)"
            );

            ctx.fillStyle = haze;
            ctx.fillRect(0, 0, W, H);

            // source glow
            const glow =
                ctx.createRadialGradient(
                    originX,
                    originY,
                    0,
                    originX,
                    originY,
                    W * 0.45
                );

            glow.addColorStop(
                0,
                `rgba(255,250,230,${0.22 * breathe
                })`
            );

            glow.addColorStop(
                0.3,
                `rgba(255,245,220,${0.08 * breathe
                })`
            );

            glow.addColorStop(
                1,
                "rgba(255,245,220,0)"
            );

            ctx.fillStyle = glow;
            ctx.fillRect(0, 0, W, H);

            t += 1;

            raf = requestAnimationFrame(draw);
        };

        raf = requestAnimationFrame(draw);

        return () => {
            cancelAnimationFrame(raf);
            ro.disconnect();
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className={className}
            style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                pointerEvents: "none",
            }}
        />
    );
}
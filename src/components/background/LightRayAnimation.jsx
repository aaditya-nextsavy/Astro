"use client"

import { useRef, useEffect, useState } from 'react';


const hexToRgb = (hex) => {
    const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return m
        ? [parseInt(m[1], 16) / 255, parseInt(m[2], 16) / 255, parseInt(m[3], 16) / 255]
        : [1, 1, 1];
};

const getAnchorAndDir = (origin, w, h) => {
    const outside = 0.2;
    switch (origin) {
        case 'top-left': return { anchor: [0, -outside * h], dir: [0, 1] };
        case 'top-right': return { anchor: [w, -outside * h], dir: [0, 1] };
        case 'left': return { anchor: [-outside * w, 0.5 * h], dir: [1, 0] };
        case 'right': return { anchor: [(1 + outside) * w, 0.5 * h], dir: [-1, 0] };
        case 'bottom-left': return { anchor: [0, (1 + outside) * h], dir: [0, -1] };
        case 'bottom-center': return { anchor: [0.5 * w, (1 + outside) * h], dir: [0, -1] };
        case 'bottom-right': return { anchor: [w, (1 + outside) * h], dir: [0, -1] };
        default: return { anchor: [0.5 * w, -outside * h], dir: [0, 1] };
    }
};

const VERT = `
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}`;

const FRAG = `precision highp float;

uniform float iTime;
uniform vec2  iResolution;
uniform vec2  rayPos;
uniform vec2  rayDir;
uniform vec3  raysColor;
uniform float raysSpeed;
uniform float lightSpread;
uniform float rayLength;
uniform float pulsating;
uniform float fadeDistance;
uniform float saturation;
uniform vec2  mousePos;
uniform float mouseInfluence;
uniform float noiseAmount;
uniform float distortion;

varying vec2 vUv;

float noise(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

float rayStrength(vec2 raySource, vec2 rayRefDirection, vec2 coord,
                  float seedA, float seedB, float speed) {
  vec2  sourceToCoord  = coord - raySource;
  vec2  dirNorm        = normalize(sourceToCoord);
  float cosAngle       = dot(dirNorm, rayRefDirection);

  float distortedAngle = cosAngle
    + distortion * sin(iTime * 2.0 + length(sourceToCoord) * 0.01) * 0.2;

  float spreadFactor = pow(max(distortedAngle, 0.0), 1.0 / max(lightSpread, 0.001));

  float dist       = length(sourceToCoord);
  float maxDist    = iResolution.x * rayLength;
  float lengthFall = clamp((maxDist - dist) / maxDist, 0.0, 1.0);
  float fadeFall   = clamp(
    (iResolution.x * fadeDistance - dist) / (iResolution.x * fadeDistance),
    0.5, 1.0
  );
  float pulse = pulsating > 0.5
    ? (0.8 + 0.2 * sin(iTime * speed * 3.0))
    : 1.0;

  float baseStrength = clamp(
    (0.45 + 0.15 * sin(distortedAngle * seedA + iTime * speed)) +
    (0.30 + 0.20 * cos(-distortedAngle * seedB + iTime * speed)),
    0.0, 1.0
  );

  return baseStrength * lengthFall * fadeFall * spreadFactor * pulse;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 coord = vec2(fragCoord.x, iResolution.y - fragCoord.y);

  vec2 finalRayDir = rayDir;
  if (mouseInfluence > 0.0) {
    vec2 mouseScreen    = mousePos * iResolution.xy;
    vec2 mouseDirection = normalize(mouseScreen - rayPos);
    finalRayDir = normalize(mix(rayDir, mouseDirection, mouseInfluence));
  }

  vec4 rays1 = vec4(1.0) * rayStrength(rayPos, finalRayDir, coord, 36.2214, 21.11349, 1.5 * raysSpeed);
  vec4 rays2 = vec4(1.0) * rayStrength(rayPos, finalRayDir, coord, 22.3991, 18.0234,  1.1 * raysSpeed);
  fragColor  = rays1 * 0.5 + rays2 * 0.4;

  if (noiseAmount > 0.0) {
    float n = noise(coord * 0.01 + iTime * 0.1);
    fragColor.rgb *= (1.0 - noiseAmount + noiseAmount * n);
  }

  float brightness = 1.0 - (coord.y / iResolution.y);
  fragColor.x *= 0.1 + brightness * 0.8;
  fragColor.y *= 0.3 + brightness * 0.6;
  fragColor.z *= 0.5 + brightness * 0.5;

  if (saturation != 1.0) {
    float gray = dot(fragColor.rgb, vec3(0.299, 0.587, 0.114));
    fragColor.rgb = mix(vec3(gray), fragColor.rgb, saturation);
  }

  fragColor.rgb *= raysColor;
}

void main() {
  vec4 color;
  mainImage(color, gl_FragCoord.xy);
  gl_FragColor = color;
}`;

const LightRayAnimation = ({
    raysOrigin = 'top-right',
    raysColor = '#fff',
    raysSpeed = 1.5,
    lightSpread = 0.8,
    rayLength = 1.2,
    pulsating = false,
    fadeDistance = 1.0,
    saturation = 1.0,
    followMouse = true,
    mouseInfluence = 0.1,
    noiseAmount = 0.1,
    distortion = 0.05,
    className = '',
}) => {
    const containerRef = useRef(null);
    const mouseRef = useRef({ x: 0.5, y: 0.5 });
    const smoothMouseRef = useRef({ x: 0.5, y: 0.5 });
    const rafRef = useRef(null);
    const uniformsRef = useRef({});
    const [isVisible, setIsVisible] = useState(false);

    // prop refs — lets the render loop read latest values without re-initialising WebGL
    const raysOriginRef = useRef(raysOrigin);
    const raysColorRef = useRef(raysColor);
    const raysSpeedRef = useRef(raysSpeed);
    const lightSpreadRef = useRef(lightSpread);
    const rayLengthRef = useRef(rayLength);
    const pulsatingRef = useRef(pulsating);
    const fadeDistanceRef = useRef(fadeDistance);
    const saturationRef = useRef(saturation);
    const followMouseRef = useRef(followMouse);
    const mouseInfluenceRef = useRef(mouseInfluence);
    const noiseAmountRef = useRef(noiseAmount);
    const distortionRef = useRef(distortion);

    useEffect(() => { raysOriginRef.current = raysOrigin; }, [raysOrigin]);
    useEffect(() => { raysColorRef.current = raysColor; }, [raysColor]);
    useEffect(() => { raysSpeedRef.current = raysSpeed; }, [raysSpeed]);
    useEffect(() => { lightSpreadRef.current = lightSpread; }, [lightSpread]);
    useEffect(() => { rayLengthRef.current = rayLength; }, [rayLength]);
    useEffect(() => { pulsatingRef.current = pulsating; }, [pulsating]);
    useEffect(() => { fadeDistanceRef.current = fadeDistance; }, [fadeDistance]);
    useEffect(() => { saturationRef.current = saturation; }, [saturation]);
    useEffect(() => { followMouseRef.current = followMouse; }, [followMouse]);
    useEffect(() => { mouseInfluenceRef.current = mouseInfluence; }, [mouseInfluence]);
    useEffect(() => { noiseAmountRef.current = noiseAmount; }, [noiseAmount]);
    useEffect(() => { distortionRef.current = distortion; }, [distortion]);

    // intersection observer — pause when off-screen
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { threshold: 0.1 }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    // WebGL setup — runs once when element becomes visible
    useEffect(() => {
        if (!isVisible) return;
        const container = containerRef.current;
        if (!container) return;

        const canvas = document.createElement('canvas');
        canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;';
        container.appendChild(canvas);

        const gl = canvas.getContext('webgl', { alpha: true });
        if (!gl) { canvas.remove(); return; }

        const compile = (type, src) => {
            const s = gl.createShader(type);
            gl.shaderSource(s, src);
            gl.compileShader(s);
            return s;
        };

        const prog = gl.createProgram();
        gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
        gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
        gl.linkProgram(prog);
        gl.useProgram(prog);

        const buf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buf);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
        const posLoc = gl.getAttribLocation(prog, 'position');
        gl.enableVertexAttribArray(posLoc);
        gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

        const U = {};
        [
            'iTime', 'raysSpeed', 'lightSpread', 'rayLength', 'pulsating',
            'fadeDistance', 'saturation', 'mouseInfluence', 'noiseAmount', 'distortion',
            'iResolution', 'rayPos', 'rayDir', 'mousePos', 'raysColor',
        ].forEach(n => { U[n] = gl.getUniformLocation(prog, n); });
        uniformsRef.current = U;

        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio, 2);
            canvas.width = container.clientWidth * dpr;
            canvas.height = container.clientHeight * dpr;
            gl.viewport(0, 0, canvas.width, canvas.height);
        };
        resize();
        window.addEventListener('resize', resize);

        const loop = (t) => {
            const time = t * 0.001;
            const w = canvas.width, h = canvas.height;
            const U = uniformsRef.current;

            gl.uniform1f(U.iTime, time);
            gl.uniform2f(U.iResolution, w, h);
            gl.uniform1f(U.raysSpeed, raysSpeedRef.current);
            gl.uniform1f(U.lightSpread, lightSpreadRef.current);
            gl.uniform1f(U.rayLength, rayLengthRef.current);
            gl.uniform1f(U.pulsating, pulsatingRef.current ? 1.0 : 0.0);
            gl.uniform1f(U.fadeDistance, fadeDistanceRef.current);
            gl.uniform1f(U.saturation, saturationRef.current);
            gl.uniform1f(U.mouseInfluence, mouseInfluenceRef.current);
            gl.uniform1f(U.noiseAmount, noiseAmountRef.current);
            gl.uniform1f(U.distortion, distortionRef.current);

            const [r, g, b] = hexToRgb(raysColorRef.current);
            gl.uniform3f(U.raysColor, r, g, b);

            const { anchor, dir } = getAnchorAndDir(raysOriginRef.current, w, h);
            gl.uniform2f(U.rayPos, anchor[0], anchor[1]);
            gl.uniform2f(U.rayDir, dir[0], dir[1]);

            if (followMouseRef.current && mouseInfluenceRef.current > 0) {
                const s = 0.92;
                smoothMouseRef.current.x = smoothMouseRef.current.x * s + mouseRef.current.x * (1 - s);
                smoothMouseRef.current.y = smoothMouseRef.current.y * s + mouseRef.current.y * (1 - s);
                gl.uniform2f(U.mousePos, smoothMouseRef.current.x, smoothMouseRef.current.y);
            } else {
                gl.uniform2f(U.mousePos, 0.5, 0.5);
            }

            gl.enable(gl.BLEND);
            gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
            gl.clearColor(0, 0, 0, 0);
            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.drawArrays(gl.TRIANGLES, 0, 3);

            rafRef.current = requestAnimationFrame(loop);
        };

        rafRef.current = requestAnimationFrame(loop);

        return () => {
            window.removeEventListener('resize', resize);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            const ext = gl.getExtension('WEBGL_lose_context');
            if (ext) ext.loseContext();
            if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
            uniformsRef.current = {};
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isVisible]);

    // mouse tracking
    useEffect(() => {
        if (!followMouse) return;
        const onMove = (e) => {
            const el = containerRef.current;
            if (!el) return;
            const rect = el.getBoundingClientRect();
            mouseRef.current = {
                x: (e.clientX - rect.left) / rect.width,
                y: (e.clientY - rect.top) / rect.height,
            };
        };
        window.addEventListener('mousemove', onMove);
        return () => window.removeEventListener('mousemove', onMove);
    }, [followMouse]);

    return (
        <div
            ref={containerRef}
            className={`light-rays-container${className ? ` ${className}` : ''}`}
        />
    );
};

export default LightRayAnimation;

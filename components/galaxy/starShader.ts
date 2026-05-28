export const vertexShader = /* glsl */ `
  attribute float aSize;
  attribute float aBrightness;
  attribute vec3 aColor;

  uniform float uTime;
  uniform vec2 uMouse;       // normalized -1..1
  uniform vec2 uClickPos;
  uniform float uClickTime;
  uniform float uScrollY;    // normalized scroll 0..1
  uniform vec2 uResolution;

  varying float vBrightness;
  varying vec3 vColor;
  varying float vSize;

  // Simple hash / noise helpers
  float hash(float n) {
    return fract(sin(n) * 43758.5453123);
  }

  void main() {
    vBrightness = aBrightness;
    vColor = aColor;
    vSize = aSize;

    vec3 pos = position;

    // Twinkle: per-star phase offset via hash of x+z
    float phase = hash(pos.x * 127.1 + pos.z * 311.7);
    float twinkle = 0.5 + 0.5 * sin(uTime * 1.8 + phase * 6.2831);
    vBrightness = aBrightness * (0.7 + 0.3 * twinkle);

    // Project to clip space first so we can compute screen-space mouse distance
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    vec4 clipPos = projectionMatrix * mvPosition;

    // NDC position
    vec2 ndc = clipPos.xy / clipPos.w;

    // Cursor repulsion in screen space
    vec2 toMouse = ndc - uMouse;
    float dist = length(toMouse);
    float radius = 0.25;
    float strength = smoothstep(radius, 0.0, dist) * 0.08;
    pos += vec3(normalize(vec3(toMouse, 0.0)) * strength * abs(mvPosition.z * 0.01));

    // Click shockwave
    if (uClickTime > 0.0) {
      float age = uClickTime; // 0..1 over 1 second
      vec2 toClick = ndc - uClickPos;
      float dClick = length(toClick);
      float waveFront = age * 1.5;
      float waveWidth = 0.12;
      float waveMask = smoothstep(waveWidth, 0.0, abs(dClick - waveFront));
      pos.z += waveMask * 0.15 * (1.0 - age);
    }

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = aSize * (300.0 / -mvPosition.z) * (0.8 + 0.2 * twinkle);
  }
`;

export const fragmentShader = /* glsl */ `
  varying float vBrightness;
  varying vec3 vColor;
  varying float vSize;

  void main() {
    // Circular point with soft edge
    vec2 uv = gl_PointCoord - vec2(0.5);
    float dist = length(uv);
    if (dist > 0.5) discard;

    // Soft circle with bloom core
    float alpha = smoothstep(0.5, 0.1, dist);
    float core = smoothstep(0.15, 0.0, dist) * 0.6;

    gl_FragColor = vec4(vColor * vBrightness, alpha + core) * vBrightness;
  }
`;

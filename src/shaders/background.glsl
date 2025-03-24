// GLSL 300 es
precision highp float;

uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uMouse;

varying vec2 vUv;

#define PI 3.14159265359

// Hash function for stars
float hash(vec2 p) {
    float h = dot(p, vec2(127.1, 311.7));
    return fract(sin(h) * 43758.5453);
}

// Simple noise function
float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

// Enhanced star field
float starField(vec2 uv, float threshold) {
    float n = hash(uv * 800.0);
    float star = step(threshold, n);
    
    // Add glow around stars
    float glow = smoothstep(threshold - 0.01, threshold, n);
    return star * (1.0 + glow * 0.5);
}

// Cosmic dust
float cosmicdust(vec2 uv, float time) {
    float n = 0.0;
    float amplitude = 0.7;
    float frequency = 2.5;
    
    // Multiple layers of noise
    for (int i = 0; i < 4; i++) {
        n += amplitude * noise(uv * frequency + time * 0.15);
        amplitude *= 0.6;
        frequency *= 2.1;
    }
    
    return n;
}

// Nebula effect
vec3 nebula(vec2 uv, float time) {
    float n = cosmicdust(uv * 0.8, time * 0.5);
    
    // Create color bands with vibrant colors
    vec3 nebulaColor;
    
    // Purple to pink gradients
    if (n < 0.3) {
        nebulaColor = mix(
            vec3(0.4, 0.0, 0.6), // Deep purple
            vec3(0.6, 0.0, 0.8), // Bright purple
            n / 0.3
        );
    } else if (n < 0.6) {
        nebulaColor = mix(
            vec3(0.6, 0.0, 0.8), // Bright purple
            vec3(0.8, 0.0, 0.6), // Pink
            (n - 0.3) / 0.3
        );
    } else {
        nebulaColor = mix(
            vec3(0.8, 0.0, 0.6), // Pink
            vec3(0.2, 0.05, 0.5), // Dark purple
            (n - 0.6) / 0.4
        );
    }
    
    // Add blue accents
    float blueNoise = cosmicdust(uv * 1.2 + vec2(0.5, 0.7), time * 0.3);
    nebulaColor = mix(
        nebulaColor,
        vec3(0.0, 0.4, 0.8), // Bright blue
        blueNoise * 0.4
    );
    
    return nebulaColor;
}

// Main function
void main() {
    vec2 uv = vUv;
    
    // Create cosmic background colors
    vec3 bg1 = vec3(0.07, 0.0, 0.15); // Deep purple
    vec3 bg2 = vec3(0.3, 0.0, 0.5);   // Bright purple
    vec3 bg3 = vec3(0.0, 0.3, 0.7);   // Vibrant blue
    
    // Enhanced mouse interaction
    vec2 mousePos = uMouse.xy / uResolution.xy;
    float distortion = sin(uTime * 0.4) * 0.03 + mousePos.x * 0.04;
    
    // Create animated background
    float noise1 = cosmicdust(uv + mousePos * 0.2 + distortion, uTime);
    float noise2 = cosmicdust(uv * 1.8 + vec2(0.2, 0.4) + distortion, uTime * 1.2);
    
    // Base color with dynamic mixing
    vec3 color = mix(bg1, bg2, noise1 * 1.2);
    color = mix(color, bg3, noise2 * 0.8);
    
    // Add nebula effect
    vec3 nebulaColor = nebula(uv + vec2(sin(uTime * 0.1), cos(uTime * 0.12)) * 0.1, uTime);
    color = mix(color, nebulaColor, 0.6);
    
    // Enhanced stars
    float stars = starField(uv, 0.975);
    float twinkling = sin(uTime * 4.0 + uv.x * 15.0 + uv.y * 7.0) * 0.5 + 0.5;
    stars *= mix(0.7, 1.2, twinkling);
    
    // Add bigger brighter stars
    float bigStars = starField(uv, 0.992);
    float bigTwinkling = sin(uTime * 3.0 + uv.y * 25.0) * 0.5 + 0.5;
    bigStars *= mix(0.8, 2.0, bigTwinkling);
    
    // Add cosmic dust swirls
    float swirl = sin(uv.x * 15.0 + uTime * 0.7) * sin(uv.y * 12.0 - uTime * 0.5) * 0.25;
    
    // Add shooting stars
    float shootingStar = 0.0;
    vec2 shootingStarPos = vec2(
        mod(uTime * 0.2, 2.0) - 1.0,
        mod(uTime * 0.3 + 0.5, 2.0) - 1.0
    );
    float shootingDist = length(uv - (shootingStarPos * 0.5 + 0.5));
    shootingStar = 0.02 / (shootingDist + 0.01) * smoothstep(0.0, 0.05, sin(uTime) * 0.5 + 0.5);
    
    // Combine effects
    color += vec3(stars) * vec3(0.9, 0.95, 1.0);
    color += vec3(bigStars) * vec3(1.0, 0.85, 1.0) * 1.5;
    color += swirl * vec3(0.7, 0.4, 1.0) * 1.3;
    color += vec3(shootingStar) * vec3(0.9, 0.9, 1.0);
    
    // Add subtle vignette
    float vignette = 1.0 - length(uv - 0.5) * 0.7;
    vignette = smoothstep(0.2, 0.8, vignette);
    color *= vignette;
    
    // Add multiple pulsing glow effects
    // Center glow
    float centerGlow = distance(uv, vec2(0.5, 0.5));
    centerGlow = 0.15 / (centerGlow + 0.1) * (sin(uTime * 0.5) * 0.5 + 0.5);
    color += vec3(0.7, 0.3, 1.0) * centerGlow * 0.15;
    
    // Bottom glow (moon effect)
    float moonGlow = distance(uv, vec2(0.5, 0.2));
    moonGlow = 0.15 / (moonGlow + 0.1) * (sin(uTime * 0.3) * 0.5 + 0.5);
    color += vec3(0.7, 0.4, 1.0) * moonGlow * 0.3;
    
    // Top right accent glow
    float accentGlow = distance(uv, vec2(0.8, 0.3));
    accentGlow = 0.1 / (accentGlow + 0.1) * (sin(uTime * 0.7) * 0.5 + 0.5);
    color += vec3(0.2, 0.5, 0.9) * accentGlow * 0.25;
    
    // Subtle color enhancement
    color = mix(color, vec3(color.r * 0.8, color.g * 0.7, color.b * 1.2), 0.3);
    
    gl_FragColor = vec4(color, 1.0);
} 
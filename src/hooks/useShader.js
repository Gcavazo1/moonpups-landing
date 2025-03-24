import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export const useShader = (fragmentShader) => {
  const mountRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const materialRef = useRef(null);
  const mouseRef = useRef(new THREE.Vector2(0, 0));
  const animationRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const lastTimeRef = useRef(0);

  useEffect(() => {
    // Setup scene, camera, and renderer
    sceneRef.current = new THREE.Scene();
    cameraRef.current = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    rendererRef.current = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: 'high-performance',
      precision: 'highp'
    });
    
    // Create shader material with fragment shader
    materialRef.current = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2() },
        uMouse: { value: new THREE.Vector2() }
      },
      fragmentShader,
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `
    });

    // Create a plane with the material
    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, materialRef.current);
    sceneRef.current.add(mesh);

    // Update renderer size with higher precision
    const updateSize = () => {
      if (mountRef.current && rendererRef.current) {
        const { clientWidth: width, clientHeight: height } = mountRef.current;
        
        // Set renderer size directly without rounding
        rendererRef.current.setSize(width, height, false);
        
        // Update shader resolution uniform
        materialRef.current.uniforms.uResolution.value.set(width, height);
        
        // Update state
        setDimensions({ width, height });
        
        // Force render to apply changes
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };

    // Enhanced mouse handler with interpolation
    const handleMouseMove = (event) => {
      if (mountRef.current) {
        const rect = mountRef.current.getBoundingClientRect();
        const targetX = event.clientX - rect.left;
        const targetY = rect.height - (event.clientY - rect.top);
        
        // Smooth interpolation for mouse movement
        mouseRef.current.x = targetX;
        mouseRef.current.y = targetY;
        
        // Update shader uniform
        materialRef.current.uniforms.uMouse.value.copy(mouseRef.current);
      }
    };

    // Debounced resize handler for better performance
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(updateSize, 100);
    };

    // Optimized animation loop with delta time
    const animate = (time) => {
      const delta = time - lastTimeRef.current;
      lastTimeRef.current = time;
      
      // Update time uniform (convert to seconds)
      materialRef.current.uniforms.uTime.value = time * 0.001;
      
      // Render only if component is mounted
      if (mountRef.current && rendererRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };

    // Initialize and mount
    if (mountRef.current) {
      // Clear any existing content
      while (mountRef.current.firstChild) {
        mountRef.current.removeChild(mountRef.current.firstChild);
      }
      
      // Enhanced renderer canvas style
      const canvas = rendererRef.current.domElement;
      canvas.style.position = 'absolute';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      canvas.style.pointerEvents = 'none'; // Allow clicking through the canvas
      
      // Append canvas and force immediate size update
      mountRef.current.appendChild(canvas);
      updateSize();
      
      // Add event listeners
      window.addEventListener('resize', handleResize);
      window.addEventListener('mousemove', handleMouseMove);
      
      // Set initial mouse position to center
      mouseRef.current.set(
        mountRef.current.clientWidth / 2,
        mountRef.current.clientHeight / 2
      );
      materialRef.current.uniforms.uMouse.value.copy(mouseRef.current);
      
      // Start animation loop
      lastTimeRef.current = performance.now();
      animationRef.current = requestAnimationFrame(animate);
    }

    // Cleanup
    return () => {
      // Clean up event listeners
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      
      // Cancel animation
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      
      // Clean up THREE.js resources
      if (geometry) geometry.dispose();
      if (materialRef.current) materialRef.current.dispose();
      if (rendererRef.current) {
        if (mountRef.current && mountRef.current.contains(rendererRef.current.domElement)) {
          mountRef.current.removeChild(rendererRef.current.domElement);
        }
        rendererRef.current.dispose();
      }
    };
  }, [fragmentShader]);

  return { mountRef, dimensions };
};

export default useShader; 
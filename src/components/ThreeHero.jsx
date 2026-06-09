import { useEffect, useRef } from "react";
import * as THREE from "three";

function ThreeHero() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      42,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );

    camera.position.set(0, 0.1, 8.2);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });

    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // ============================
    // Lights
    // ============================
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 2.9);
    mainLight.position.set(4, 5, 6);
    scene.add(mainLight);

    const cyanLight = new THREE.PointLight(0x00d9ff, 3.4, 38);
    cyanLight.position.set(-4, 2.5, 4);
    scene.add(cyanLight);

    const blueLight = new THREE.PointLight(0x2563eb, 2.4, 38);
    blueLight.position.set(4, -2, -3);
    scene.add(blueLight);

    const purpleLight = new THREE.PointLight(0x7c3aed, 1.8, 35);
    purpleLight.position.set(0, 3, -4);
    scene.add(purpleLight);

    // ============================
    // Main Group
    // ============================
    const group = new THREE.Group();
    scene.add(group);

    // ============================
    // Cube with different faces
    // ============================
    const createFaceTexture = (text, subText = "") => {
      const canvas = document.createElement("canvas");
      canvas.width = 512;
      canvas.height = 512;

      const ctx = canvas.getContext("2d");

      const gradient = ctx.createLinearGradient(0, 0, 512, 512);
      gradient.addColorStop(0, "#0f172a");
      gradient.addColorStop(0.5, "#061826");
      gradient.addColorStop(1, "#020617");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 512, 512);

      // Grid lines
      ctx.strokeStyle = "rgba(0, 217, 255, 0.12)";
      ctx.lineWidth = 2;

      for (let i = 0; i <= 512; i += 64) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, 512);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(512, i);
        ctx.stroke();
      }

      // Border glow
      ctx.strokeStyle = "rgba(0, 217, 255, 0.8)";
      ctx.lineWidth = 10;
      ctx.strokeRect(18, 18, 476, 476);

      ctx.shadowColor = "rgba(0, 217, 255, 0.9)";
      ctx.shadowBlur = 30;

      ctx.fillStyle = "#00d9ff";
      ctx.font = "bold 110px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text, 256, 235);

      ctx.shadowBlur = 0;

      if (subText) {
        ctx.fillStyle = "#dbeafe";
        ctx.font = "bold 32px Arial";
        ctx.fillText(subText, 256, 330);
      }

      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      return texture;
    };

    const faceTextures = [
      createFaceTexture("</>", "CODE"),
      createFaceTexture("JS", "Logic"),
      createFaceTexture("Java", "DSA"),
      createFaceTexture("React", "UI"),
      createFaceTexture("Node", "API"),
      createFaceTexture("DB", "Mongo"),
    ];

    const cubeMaterials = faceTextures.map(
      (texture) =>
        new THREE.MeshStandardMaterial({
          map: texture,
          metalness: 0.45,
          roughness: 0.22,
          emissive: 0x001a2e,
          emissiveIntensity: 0.25,
        })
    );

    const cubeGeometry = new THREE.BoxGeometry(2.1, 2.1, 2.1);
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterials);
    group.add(cube);

    // Wire cube
    const wireGeometry = new THREE.BoxGeometry(2.25, 2.25, 2.25);
    const wireMaterial = new THREE.MeshBasicMaterial({
      color: 0x00d9ff,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });

    const wireCube = new THREE.Mesh(wireGeometry, wireMaterial);
    group.add(wireCube);

    // Inner glow cube
    const innerGeometry = new THREE.BoxGeometry(1.22, 1.22, 1.22);
    const innerMaterial = new THREE.MeshStandardMaterial({
      color: 0x00d9ff,
      transparent: true,
      opacity: 0.16,
      metalness: 0.25,
      roughness: 0.15,
      emissive: 0x00d9ff,
      emissiveIntensity: 1,
    });

    const innerCube = new THREE.Mesh(innerGeometry, innerMaterial);
    group.add(innerCube);

    // Big glow sphere
    const glowGeometry = new THREE.SphereGeometry(2.95, 32, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0x00d9ff,
      transparent: true,
      opacity: 0.04,
      side: THREE.BackSide,
    });

    const glowSphere = new THREE.Mesh(glowGeometry, glowMaterial);
    group.add(glowSphere);

    // ============================
    // Premium rings
    // ============================
    const createRing = (radius, color, opacity, rotation) => {
      const geometry = new THREE.TorusGeometry(radius, 0.014, 16, 140);
      const material = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity,
      });

      const ring = new THREE.Mesh(geometry, material);
      ring.rotation.set(rotation.x, rotation.y, rotation.z);
      group.add(ring);

      return { ring, geometry, material };
    };

    const ringOneObj = createRing(2.12, 0x00d9ff, 0.58, {
      x: Math.PI / 2,
      y: 0,
      z: 0,
    });

    const ringTwoObj = createRing(2.52, 0x2563eb, 0.45, {
      x: 0,
      y: Math.PI / 2,
      z: 0,
    });

    const ringThreeObj = createRing(2.9, 0x7dd3fc, 0.32, {
      x: Math.PI / 3,
      y: Math.PI / 5,
      z: 0,
    });

    const ringFourObj = createRing(3.25, 0x7c3aed, 0.22, {
      x: Math.PI / 4,
      y: Math.PI / 2.8,
      z: Math.PI / 5,
    });

    // ============================
    // Orbiting neon balls
    // ============================
    const ballGeometry = new THREE.SphereGeometry(0.075, 24, 24);

    const ballMaterials = [
      new THREE.MeshStandardMaterial({
        color: 0x00d9ff,
        emissive: 0x00d9ff,
        emissiveIntensity: 1.4,
      }),
      new THREE.MeshStandardMaterial({
        color: 0x7dd3fc,
        emissive: 0x7dd3fc,
        emissiveIntensity: 1.2,
      }),
      new THREE.MeshStandardMaterial({
        color: 0x2563eb,
        emissive: 0x2563eb,
        emissiveIntensity: 1.2,
      }),
    ];

    const orbitBalls = [];

    for (let i = 0; i < 8; i++) {
      const ball = new THREE.Mesh(ballGeometry, ballMaterials[i % 3]);
      group.add(ball);
      orbitBalls.push(ball);
    }

    // ============================
    // Floating badges
    // ============================
    const createTextSprite = (text, position, scale = 1) => {
      const canvas = document.createElement("canvas");
      canvas.width = 700;
      canvas.height = 240;

      const ctx = canvas.getContext("2d");

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const gradient = ctx.createLinearGradient(0, 0, 700, 240);
      gradient.addColorStop(0, "rgba(0, 217, 255, 0.95)");
      gradient.addColorStop(1, "rgba(37, 99, 235, 0.95)");

      ctx.shadowColor = "rgba(0, 217, 255, 0.55)";
      ctx.shadowBlur = 26;

      ctx.fillStyle = gradient;
      ctx.roundRect(35, 55, 630, 130, 54);
      ctx.fill();

      ctx.shadowBlur = 0;

      ctx.strokeStyle = "rgba(255, 255, 255, 0.42)";
      ctx.lineWidth = 4;
      ctx.roundRect(35, 55, 630, 130, 54);
      ctx.stroke();

      ctx.fillStyle = "#050816";
      ctx.font = "bold 56px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text, 350, 120);

      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;

      const material = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
      });

      const sprite = new THREE.Sprite(material);
      sprite.position.set(position.x, position.y, position.z);
      sprite.scale.set(1.16 * scale, 0.4 * scale, 1);

      scene.add(sprite);

      return {
        sprite,
        texture,
        material,
        baseX: position.x,
        baseY: position.y,
      };
    };

    const badges = [
      createTextSprite("React.js", { x: -2.75, y: 1.5, z: 0.2 }),
      createTextSprite("Java", { x: 2.65, y: 1.2, z: 0.2 }),
      createTextSprite("DSA", { x: -2.42, y: -1.22, z: 0.2 }),
      createTextSprite("MERN", { x: 2.4, y: -1.05, z: 0.2 }),
    ];

    // ============================
    // Background particles
    // ============================
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 420;
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i++) {
      particlePositions[i] = (Math.random() - 0.5) * 12.5;
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.018,
      color: 0x9beeff,
      transparent: true,
      opacity: 0.48,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // ============================
    // Mouse movement
    // ============================
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // ============================
    // Resize
    // ============================
    const handleResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(mount.clientWidth, mount.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener("resize", handleResize);

    // ============================
    // Animation
    // ============================
    let animationId = 0;

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      const time = performance.now() * 0.001;

      group.rotation.x = time * 0.13;
      group.rotation.y = time * 0.28;

      cube.rotation.x = Math.sin(time * 0.45) * 0.08;
      cube.rotation.z = Math.cos(time * 0.45) * 0.05;

      wireCube.rotation.x = -time * 0.24;
      wireCube.rotation.y = time * 0.22;

      innerCube.rotation.x = time * 0.5;
      innerCube.rotation.y = -time * 0.38;

      ringOneObj.ring.rotation.z = time * 0.45;
      ringTwoObj.ring.rotation.x = time * 0.32;
      ringThreeObj.ring.rotation.z = -time * 0.2;
      ringFourObj.ring.rotation.y = time * 0.18;

      orbitBalls.forEach((ball, index) => {
        const angle = time * 1.05 + index * ((Math.PI * 2) / orbitBalls.length);
        const radius = 2.22 + (index % 2) * 0.18;

        ball.position.x = Math.cos(angle) * radius;
        ball.position.y = Math.sin(angle) * radius * 0.52;
        ball.position.z = Math.sin(angle * 1.15) * 0.7;
      });

      particles.rotation.y = time * 0.01;
      particles.rotation.x = time * 0.003;

      badges.forEach((item, index) => {
        item.sprite.position.y =
          item.baseY + Math.sin(time * 1.35 + index) * 0.1;

        item.sprite.position.x =
          item.baseX + Math.sin(time * 0.9 + index) * 0.035;
      });

      camera.position.x += (mouseX * 0.18 - camera.position.x) * 0.035;
      camera.position.y += ((0.1 - mouseY * 0.1) - camera.position.y) * 0.035;

      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    // ============================
    // Cleanup
    // ============================
    return () => {
      cancelAnimationFrame(animationId);

      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);

      if (mount && renderer.domElement && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }

      cubeGeometry.dispose();
      cubeMaterials.forEach((material) => material.dispose());
      faceTextures.forEach((texture) => texture.dispose());

      wireGeometry.dispose();
      wireMaterial.dispose();

      innerGeometry.dispose();
      innerMaterial.dispose();

      glowGeometry.dispose();
      glowMaterial.dispose();

      ringOneObj.geometry.dispose();
      ringOneObj.material.dispose();

      ringTwoObj.geometry.dispose();
      ringTwoObj.material.dispose();

      ringThreeObj.geometry.dispose();
      ringThreeObj.material.dispose();

      ringFourObj.geometry.dispose();
      ringFourObj.material.dispose();

      ballGeometry.dispose();
      ballMaterials.forEach((material) => material.dispose());

      particlesGeometry.dispose();
      particlesMaterial.dispose();

      badges.forEach((item) => {
        item.texture.dispose();
        item.material.dispose();
      });

      renderer.dispose();
    };
  }, []);

  return <div className="three-container" ref={mountRef}></div>;
}

export default ThreeHero;
import { useEffect, useRef } from "react";
import * as THREE from "three";

function ThreeBackground() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      58,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    camera.position.set(0, 0, 9.5);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    const colors = {
      emerald: "#10b981",
      purple: "#a855f7",
      gold: "#f59e0b",
      pink: "#ec4899",
      text: "#e5e7eb",
      mint: "#a7f3d0",
      dark: "rgba(2, 6, 23, 0.84)",
    };

    const createTerminalTexture = (
      title,
      lines,
      accent = colors.emerald,
      width = 950,
      height = 300
    ) => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");

      ctx.clearRect(0, 0, width, height);

      const radius = 28;

      ctx.beginPath();
      ctx.moveTo(radius, 0);
      ctx.lineTo(width - radius, 0);
      ctx.quadraticCurveTo(width, 0, width, radius);
      ctx.lineTo(width, height - radius);
      ctx.quadraticCurveTo(width, height, width - radius, height);
      ctx.lineTo(radius, height);
      ctx.quadraticCurveTo(0, height, 0, height - radius);
      ctx.lineTo(0, radius);
      ctx.quadraticCurveTo(0, 0, radius, 0);
      ctx.closePath();

      ctx.fillStyle = colors.dark;
      ctx.fill();

      ctx.strokeStyle = accent;
      ctx.globalAlpha = 0.38;
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.globalAlpha = 1;

      const headerGradient = ctx.createLinearGradient(0, 0, width, 0);
      headerGradient.addColorStop(0, "rgba(255, 255, 255, 0.055)");
      headerGradient.addColorStop(0.5, "rgba(255, 255, 255, 0.025)");
      headerGradient.addColorStop(1, "rgba(255, 255, 255, 0.045)");

      ctx.fillStyle = headerGradient;
      ctx.fillRect(0, 0, width, 62);

      ctx.fillStyle = "#ff5f57";
      ctx.beginPath();
      ctx.arc(35, 31, 9, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#ffbd2e";
      ctx.beginPath();
      ctx.arc(65, 31, 9, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#28c840";
      ctx.beginPath();
      ctx.arc(95, 31, 9, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "rgba(229, 231, 235, 0.78)";
      ctx.font = "bold 24px Menlo, Monaco, Consolas, monospace";
      ctx.fillText(title, 135, 40);

      ctx.font = "24px Menlo, Monaco, Consolas, monospace";

      lines.forEach((line, index) => {
        const y = 105 + index * 42;

        ctx.fillStyle = accent;
        ctx.globalAlpha = 0.95;
        ctx.fillText(">", 38, y);
        ctx.globalAlpha = 1;

        ctx.fillStyle = line.color || colors.text;
        ctx.fillText(line.text, 76, y);
      });

      ctx.fillStyle = accent;
      ctx.globalAlpha = 0.8;
      ctx.fillRect(76, height - 48, 16, 28);
      ctx.globalAlpha = 1;

      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;

      return texture;
    };

    const terminalData = [
      {
        title: "arman@portfolio — main",
        accent: colors.emerald,
        lines: [
          { text: "const developer = 'Armaan Srivastav';", color: colors.text },
          { text: "role = 'MERN Stack Developer';", color: colors.mint },
          { text: "focus = ['Java', 'DSA', 'Projects'];", color: "#fde68a" },
          { text: "status: building clean web apps", color: colors.text },
        ],
      },
      {
        title: "skills.engine",
        accent: colors.purple,
        lines: [
          { text: "React.components.render();", color: colors.text },
          { text: "Node.api.connect(MongoDB);", color: colors.mint },
          { text: "Java.solve(problem);", color: "#fde68a" },
          { text: "GitHub.push(progress);", color: colors.text },
        ],
      },
      {
        title: "project.pipeline",
        accent: colors.gold,
        lines: [
          { text: "npm run build", color: "#fde68a" },
          { text: "testing responsive layout...", color: colors.text },
          { text: "deploying portfolio UI...", color: colors.mint },
          { text: "done ✓", color: "#86efac" },
        ],
      },
    ];

    const cards = [];

    terminalData.forEach((item, index) => {
      const texture = createTerminalTexture(item.title, item.lines, item.accent);

      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 0.46,
        depthWrite: false,
      });

      const geometry = new THREE.PlaneGeometry(4.9, 1.55);
      const card = new THREE.Mesh(geometry, material);

      card.position.set(
        index === 1 ? 3.95 : 3.35,
        1.65 - index * 1.62,
        -1.8 - index * 0.16
      );

      card.rotation.y = -0.44;
      card.rotation.x = 0.06;
      card.rotation.z = -0.018;

      mainGroup.add(card);

      cards.push({
        card,
        geometry,
        material,
        texture,
        originalY: card.position.y,
        originalX: card.position.x,
        speed: 0.36 + index * 0.07,
      });
    });

    const gridMaterial = new THREE.LineBasicMaterial({
      color: 0xa855f7,
      transparent: true,
      opacity: 0.085,
      depthWrite: false,
    });

    const gridSize = 14;
    const gridDivisions = 18;
    const step = gridSize / gridDivisions;
    const gridPoints = [];

    for (let i = 0; i <= gridDivisions; i++) {
      const p = -gridSize / 2 + i * step;

      gridPoints.push(new THREE.Vector3(-gridSize / 2, p, 0));
      gridPoints.push(new THREE.Vector3(gridSize / 2, p, 0));

      gridPoints.push(new THREE.Vector3(p, -gridSize / 2, 0));
      gridPoints.push(new THREE.Vector3(p, gridSize / 2, 0));
    }

    const gridGeometry = new THREE.BufferGeometry().setFromPoints(gridPoints);
    const grid = new THREE.LineSegments(gridGeometry, gridMaterial);

    grid.position.set(3.35, -0.3, -3.3);
    grid.rotation.x = -0.24;
    grid.rotation.y = -0.62;
    grid.rotation.z = 0.05;

    mainGroup.add(grid);

    const scannerGeometry = new THREE.PlaneGeometry(5.5, 0.035);
    const scannerMaterial = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.5,
      depthWrite: false,
    });

    const scanner = new THREE.Mesh(scannerGeometry, scannerMaterial);
    scanner.position.set(3.55, 1.9, -1.15);
    scanner.rotation.y = -0.44;
    scanner.rotation.z = -0.018;
    mainGroup.add(scanner);

    const scannerGlowGeometry = new THREE.PlaneGeometry(5.5, 0.16);
    const scannerGlowMaterial = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      transparent: true,
      opacity: 0.1,
      depthWrite: false,
    });

    const scannerGlow = new THREE.Mesh(scannerGlowGeometry, scannerGlowMaterial);
    scannerGlow.position.set(3.55, 1.9, -1.16);
    scannerGlow.rotation.y = -0.44;
    scannerGlow.rotation.z = -0.018;
    mainGroup.add(scannerGlow);

    const createMiniBadgeTexture = (text, accent) => {
      const canvas = document.createElement("canvas");
      canvas.width = 460;
      canvas.height = 110;

      const ctx = canvas.getContext("2d");

      ctx.clearRect(0, 0, 460, 110);

      ctx.fillStyle = "rgba(2, 6, 23, 0.78)";
      ctx.fillRect(0, 0, 460, 110);

      ctx.strokeStyle = accent;
      ctx.globalAlpha = 0.36;
      ctx.lineWidth = 2;
      ctx.strokeRect(2, 2, 456, 106);
      ctx.globalAlpha = 1;

      ctx.fillStyle = accent;
      ctx.font = "bold 28px Menlo, Monaco, Consolas, monospace";
      ctx.fillText(text, 28, 68);

      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;

      return texture;
    };

    const miniBadges = [];

    const badgeItems = [
      { text: "<React />", color: colors.emerald, x: -4.65, y: 2.25, z: -2.3 },
      { text: "Java + DSA", color: colors.gold, x: -4.2, y: 1.25, z: -2.75 },
      { text: "MongoDB", color: colors.purple, x: -4.75, y: -1.35, z: -2.55 },
      { text: "Clean Code", color: colors.pink, x: -3.85, y: -2.35, z: -3.0 },
    ];

    badgeItems.forEach((item, index) => {
      const texture = createMiniBadgeTexture(item.text, item.color);

      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 0.32,
        depthWrite: false,
      });

      const geometry = new THREE.PlaneGeometry(2.2, 0.52);
      const badge = new THREE.Mesh(geometry, material);

      badge.position.set(item.x, item.y, item.z);
      badge.rotation.y = -0.26;
      badge.rotation.x = 0.035;

      mainGroup.add(badge);

      miniBadges.push({
        badge,
        geometry,
        material,
        texture,
        originalY: item.y,
        speed: 0.32 + index * 0.06,
      });
    });

    const nodeColors = [0x10b981, 0xa855f7, 0xf59e0b, 0xec4899];

    const nodeGeometry = new THREE.SphereGeometry(0.034, 16, 16);
    const nodes = [];

    for (let i = 0; i < 54; i++) {
      const nodeMaterial = new THREE.MeshBasicMaterial({
        color: nodeColors[i % nodeColors.length],
        transparent: true,
        opacity: 0.48,
        depthWrite: false,
      });

      const node = new THREE.Mesh(nodeGeometry, nodeMaterial);

      node.position.set(
        0.7 + Math.random() * 6.4,
        (Math.random() - 0.5) * 6.3,
        -2.2 + (Math.random() - 0.5) * 2.2
      );

      mainGroup.add(node);
      nodes.push({ node, material: nodeMaterial });
    }

    const connectionMaterials = [
      new THREE.LineBasicMaterial({
        color: 0x10b981,
        transparent: true,
        opacity: 0.055,
        depthWrite: false,
      }),
      new THREE.LineBasicMaterial({
        color: 0xa855f7,
        transparent: true,
        opacity: 0.05,
        depthWrite: false,
      }),
    ];

    const connectionObjects = [];

    for (let groupIndex = 0; groupIndex < 2; groupIndex++) {
      const connectionPoints = [];

      for (let i = 0; i < 28; i++) {
        const a = nodes[Math.floor(Math.random() * nodes.length)].node;
        const b = nodes[Math.floor(Math.random() * nodes.length)].node;

        connectionPoints.push(a.position.clone());
        connectionPoints.push(b.position.clone());
      }

      const connectionGeometry = new THREE.BufferGeometry().setFromPoints(
        connectionPoints
      );

      const connections = new THREE.LineSegments(
        connectionGeometry,
        connectionMaterials[groupIndex]
      );

      mainGroup.add(connections);
      connectionObjects.push({ connections, connectionGeometry });
    }

    const ringGeometry = new THREE.TorusGeometry(2.45, 0.006, 16, 180);

    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      transparent: true,
      opacity: 0.14,
      depthWrite: false,
    });

    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.position.set(3.65, -0.25, -2.85);
    ring.rotation.x = Math.PI / 2.65;
    ring.rotation.y = -0.55;
    mainGroup.add(ring);

    const secondRingMaterial = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      transparent: true,
      opacity: 0.08,
      depthWrite: false,
    });

    const secondRing = new THREE.Mesh(ringGeometry.clone(), secondRingMaterial);
    secondRing.position.set(3.95, 1.55, -3.1);
    secondRing.scale.set(0.7, 0.7, 0.7);
    secondRing.rotation.x = Math.PI / 2.4;
    secondRing.rotation.y = -0.35;
    mainGroup.add(secondRing);

    const binaryTextureCanvas = document.createElement("canvas");
    binaryTextureCanvas.width = 900;
    binaryTextureCanvas.height = 220;

    const binaryCtx = binaryTextureCanvas.getContext("2d");
    binaryCtx.clearRect(0, 0, 900, 220);

    const binaryGradient = binaryCtx.createLinearGradient(0, 0, 900, 0);
    binaryGradient.addColorStop(0, "rgba(16, 185, 129, 0.42)");
    binaryGradient.addColorStop(0.5, "rgba(168, 85, 247, 0.38)");
    binaryGradient.addColorStop(1, "rgba(245, 158, 11, 0.34)");

    binaryCtx.fillStyle = binaryGradient;
    binaryCtx.font = "22px Menlo, Monaco, Consolas, monospace";

    const binaryRows = [
      "01  API  DB  UI  MERN  JAVA  DSA  10",
      "REACT  NODE  EXPRESS  1010  CLEAN",
      "BUILD  LEARN  SHIP  0011  CODE",
    ];

    binaryRows.forEach((row, index) => {
      binaryCtx.fillText(row, 20, 55 + index * 58);
    });

    const binaryTexture = new THREE.CanvasTexture(binaryTextureCanvas);
    binaryTexture.needsUpdate = true;

    const binaryMaterial = new THREE.MeshBasicMaterial({
      map: binaryTexture,
      transparent: true,
      opacity: 0.18,
      depthWrite: false,
    });

    const binaryGeometry = new THREE.PlaneGeometry(4.9, 1.15);
    const binaryPanel = new THREE.Mesh(binaryGeometry, binaryMaterial);

    binaryPanel.position.set(3.45, -3.0, -2.6);
    binaryPanel.rotation.y = -0.42;
    binaryPanel.rotation.x = 0.04;

    mainGroup.add(binaryPanel);

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      const isMobile = window.innerWidth < 700;

      cards.forEach((item) => {
        item.card.visible = !isMobile;
      });

      miniBadges.forEach((item) => {
        item.badge.visible = !isMobile;
      });

      binaryPanel.visible = !isMobile;
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    let animationId;

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      const time = performance.now() * 0.001;

      cards.forEach((item, index) => {
        item.card.position.y =
          item.originalY + Math.sin(time * item.speed + index) * 0.08;

        item.card.position.x =
          item.originalX + Math.cos(time * 0.28 + index) * 0.035;

        item.material.opacity =
          0.38 + Math.sin(time * 0.85 + index) * 0.055;
      });

      miniBadges.forEach((item, index) => {
        item.badge.position.y =
          item.originalY + Math.sin(time * item.speed + index) * 0.08;
      });

      nodes.forEach((item, index) => {
        item.node.position.y += Math.sin(time + index) * 0.00065;
        item.material.opacity = 0.36 + Math.sin(time * 0.9 + index) * 0.08;
      });

      const scanY = 2.15 - ((time * 0.62) % 4.9);
      scanner.position.y = scanY;
      scannerGlow.position.y = scanY;

      grid.rotation.z = Math.sin(time * 0.16) * 0.035;

      ring.rotation.z = time * 0.09;
      secondRing.rotation.z = -time * 0.12;

      binaryPanel.position.x = 3.45 + Math.sin(time * 0.28) * 0.09;

      mainGroup.rotation.y = Math.sin(time * 0.12) * 0.028;
      mainGroup.rotation.x = Math.cos(time * 0.1) * 0.014;

      camera.position.x += (mouseX * 0.2 - camera.position.x) * 0.03;
      camera.position.y += (-mouseY * 0.12 - camera.position.y) * 0.03;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);

      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);

      if (mount && renderer.domElement && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }

      cards.forEach((item) => {
        item.geometry.dispose();
        item.material.dispose();
        item.texture.dispose();
      });

      miniBadges.forEach((item) => {
        item.geometry.dispose();
        item.material.dispose();
        item.texture.dispose();
      });

      gridGeometry.dispose();
      gridMaterial.dispose();

      scannerGeometry.dispose();
      scannerMaterial.dispose();

      scannerGlowGeometry.dispose();
      scannerGlowMaterial.dispose();

      nodeGeometry.dispose();

      nodes.forEach((item) => {
        item.material.dispose();
      });

      connectionObjects.forEach((item) => {
        item.connectionGeometry.dispose();
      });

      connectionMaterials.forEach((material) => {
        material.dispose();
      });

      ringGeometry.dispose();
      ringMaterial.dispose();

      secondRing.geometry.dispose();
      secondRingMaterial.dispose();

      binaryGeometry.dispose();
      binaryMaterial.dispose();
      binaryTexture.dispose();

      renderer.dispose();
    };
  }, []);

  return <div className="three-background" ref={mountRef}></div>;
}

export default ThreeBackground;
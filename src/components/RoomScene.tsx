import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useTheme } from "@/contexts/EditorialThemeContext";
import ryanProfile from "@/assets/ryan-profile.webp";

type Stop = { position: [number, number, number]; lookAt: [number, number, number] };

const stops: Record<string, Stop> = {
  room: { position: [1.4, 2.7, 7.8], lookAt: [1.5, 1.1, -0.5] },
  work: { position: [-0.7, 1.65, 1.2], lookAt: [-0.7, 1.35, -1.72] },
  profile: { position: [1.25, 2.35, 1.6], lookAt: [1.15, 1.45, -1.85] },
  record: { position: [2.1, 2.3, 1.4], lookAt: [2.25, 2.05, -1.82] },
  library: { position: [4.25, 2.25, 2.25], lookAt: [4.35, 1.85, -1.75] },
  football: { position: [5.6, 1.65, 3.65], lookAt: [5.75, 0.65, -1.15] },
  network: { position: [-3.75, 1.9, 1.7], lookAt: [-3.75, 1.35, -1.72] },
  contact: { position: [-2.1, 1.8, 2.1], lookAt: [-1.8, 1.05, -1.35] },
};

const homeSequence = [stops.room, stops.work, stops.record, stops.library, stops.football];

const zoneForPath = (pathname: string) => {
  if (/^\/(en|fr)\/?$/.test(pathname)) return "room";
  if (pathname.includes("football")) return "football";
  if (pathname.includes("anime") || pathname.includes("library") || pathname.includes("bibliotheque")) return "library";
  if (pathname.includes("experience") || pathname.includes("parcours")) return "record";
  if (pathname.includes("about") || pathname.includes("a-propos") || pathname.includes("cv")) return "profile";
  if (pathname.includes("network") || pathname.includes("reseau")) return "network";
  if (pathname.includes("contact")) return "contact";
  return "work";
};

const RoomScene = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pathRef = useRef(window.location.pathname);
  const themeRef = useRef<"light" | "dark">("light");
  const { pathname } = useLocation();
  const { theme } = useTheme();
  const [fallback, setFallback] = useState(false);

  pathRef.current = pathname;
  themeRef.current = theme;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
    let webgl: WebGLRenderingContext | WebGL2RenderingContext | null = null;
    try {
      const probe = document.createElement("canvas");
      webgl = probe.getContext("webgl2") || probe.getContext("webgl");
    } catch {
      webgl = null;
    }

    if (!webgl || connection?.saveData || (memory !== undefined && memory <= 2)) {
      setFallback(true);
      window.dispatchEvent(new Event("room11:ready"));
      return;
    }

    let disposed = false;
    let frame = 0;
    let destroy = () => undefined;

    const initialise = async () => {
      const THREE = await import("three");
      if (disposed) return;

      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: "high-performance" });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.25));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.05;
      const shadows = window.innerWidth > 760 && (memory === undefined || memory > 4);
      renderer.shadowMap.enabled = shadows;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(46, 1, 0.1, 40);
      const materials: THREE.MeshStandardMaterial[] = [];
      const makeMaterial = (gray: number, roughness = 0.72) => {
        const result = new THREE.MeshStandardMaterial({ color: new THREE.Color(gray, gray, gray), roughness, metalness: 0.03 });
        result.userData.gray = gray;
        materials.push(result);
        return result;
      };
      const box = (size: [number, number, number], position: [number, number, number], gray: number, parent: THREE.Object3D = scene) => {
        const mesh = new THREE.Mesh(new THREE.BoxGeometry(...size), makeMaterial(gray));
        mesh.position.set(...position);
        mesh.castShadow = shadows;
        mesh.receiveShadow = shadows;
        parent.add(mesh);
        return mesh;
      };
      const cylinder = (top: number, bottom: number, height: number, position: [number, number, number], gray: number, parent: THREE.Object3D = scene) => {
        const mesh = new THREE.Mesh(new THREE.CylinderGeometry(top, bottom, height, 16), makeMaterial(gray));
        mesh.position.set(...position);
        mesh.castShadow = shadows;
        mesh.receiveShadow = shadows;
        parent.add(mesh);
        return mesh;
      };

      const roomShell = new THREE.Group();
      const homeGroup = new THREE.Group();
      const workGroup = new THREE.Group();
      const profileGroup = new THREE.Group();
      const recordGroup = new THREE.Group();
      const libraryGroup = new THREE.Group();
      const networkGroup = new THREE.Group();
      const footballGroup = new THREE.Group();
      const contactGroup = new THREE.Group();
      scene.add(roomShell, homeGroup, workGroup, profileGroup, recordGroup, libraryGroup, networkGroup, footballGroup, contactGroup);

      const wallText = (text: string, position: [number, number, number], width: number, fontSize: number, parent: THREE.Object3D = roomShell) => {
        const textCanvas = document.createElement("canvas");
        textCanvas.width = 1200;
        textCanvas.height = 220;
        const context = textCanvas.getContext("2d");
        if (!context) return;
        context.clearRect(0, 0, textCanvas.width, textCanvas.height);
        context.fillStyle = "#111111";
        context.font = `700 ${fontSize}px Arial, sans-serif`;
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillText(text, textCanvas.width / 2, textCanvas.height / 2);
        const texture = new THREE.CanvasTexture(textCanvas);
        texture.colorSpace = THREE.SRGBColorSpace;
        const plane = new THREE.Mesh(new THREE.PlaneGeometry(width, width * (textCanvas.height / textCanvas.width)), new THREE.MeshBasicMaterial({ map: texture, transparent: true }));
        plane.position.set(...position);
        plane.userData.labelTexture = texture;
        parent.add(plane);
      };
      const wallImage = (src: string, size: [number, number], position: [number, number, number], parent: THREE.Object3D) => {
        const texture = new THREE.TextureLoader().load(src);
        texture.colorSpace = THREE.SRGBColorSpace;
        const image = new THREE.Mesh(new THREE.PlaneGeometry(...size), new THREE.MeshBasicMaterial({ map: texture, transparent: true }));
        image.position.set(...position);
        image.userData.labelTexture = texture;
        parent.add(image);
      };

      // Room and work station.
      box([18, 0.12, 10], [3, -0.06, 1], 0.58, roomShell);
      box([18, 6, 0.12], [3, 3, -2.05], 0.78, roomShell);
      box([0.12, 6, 10], [-6, 3, 1], 0.7, roomShell);
      wallText("RYAN ERICK", [0.2, 4.25, -1.97], 4.8, 152);
      wallText("BUILD USEFUL THINGS", [-3.55, 2.65, -1.97], 2.2, 78);
      wallText("LEARN · SHIP · IMPROVE", [4.25, 3.55, -1.97], 2.25, 68);

      // Home furniture: a low bed that completes the room without appearing in focused route views.
      box([2.8, 0.18, 1.72], [8.35, 0.34, -0.15], 0.18, homeGroup);
      box([2.65, 0.34, 1.6], [8.35, 0.58, -0.15], 0.82, homeGroup);
      box([2.8, 1.05, 0.12], [8.35, 0.82, -0.92], 0.22, homeGroup);
      box([0.86, 0.16, 0.58], [7.55, 0.84, -0.55], 0.92, homeGroup).rotation.z = -0.04;
      box([0.86, 0.16, 0.58], [8.55, 0.84, -0.55], 0.9, homeGroup).rotation.z = 0.04;
      box([2.7, 0.08, 0.82], [8.35, 0.82, 0.21], 0.46, homeGroup);
      box([4.4, 0.1, 1.45], [-0.55, 0.78, -1.22], 0.28, workGroup);
      [-2.5, 1.4].forEach((x) => box([0.09, 0.78, 1.3], [x, 0.39, -1.22], 0.22, workGroup));
      box([1.75, 1.03, 0.07], [-0.72, 1.48, -1.62], 0.1, workGroup);
      box([0.08, 0.46, 0.08], [-0.72, 1.02, -1.65], 0.14, workGroup);
      box([0.48, 0.03, 0.28], [-0.72, 0.82, -1.58], 0.16, workGroup);

      const screenCanvas = document.createElement("canvas");
      screenCanvas.width = 512;
      screenCanvas.height = 300;
      const screenContext = screenCanvas.getContext("2d");
      const screenTexture = new THREE.CanvasTexture(screenCanvas);
      screenTexture.colorSpace = THREE.SRGBColorSpace;
      const monitorScreen = new THREE.Mesh(new THREE.PlaneGeometry(1.62, 0.9), new THREE.MeshBasicMaterial({ map: screenTexture }));
      monitorScreen.position.set(-0.72, 1.48, -1.575);
      workGroup.add(monitorScreen);

      box([1.15, 0.035, 0.38], [-0.72, 0.85, -0.88], 0.12, workGroup);
      for (let row = 0; row < 4; row += 1) {
        for (let column = 0; column < 13; column += 1) {
          box([0.055, 0.025, 0.055], [-1.13 + column * 0.07 + row * 0.012, 0.88, -0.98 + row * 0.068], 0.25, workGroup);
        }
      }
      box([0.13, 0.035, 0.2], [0.12, 0.86, -0.9], 0.18, workGroup);
      cylinder(0.085, 0.072, 0.2, [-1.88, 0.92, -0.93], 0.83, workGroup);

      // Lamp.
      cylinder(0.12, 0.14, 0.035, [1.13, 0.84, -1.63], 0.12, workGroup);
      const lampArm = box([0.035, 0.62, 0.035], [1.13, 1.15, -1.63], 0.12, workGroup);
      lampArm.rotation.z = 0.28;
      const lampShade = new THREE.Mesh(new THREE.ConeGeometry(0.16, 0.24, 18, 1, true), makeMaterial(0.16));
      lampShade.position.set(0.92, 1.46, -1.63);
      lampShade.rotation.z = 0.28;
      workGroup.add(lampShade);
      const deskLight = new THREE.PointLight(0xf2eee6, 1.6, 5.5);
      deskLight.position.set(0.92, 1.34, -1.45);
      workGroup.add(deskLight);

      // Experience and anime shelves.
      [1.42, 2.04].forEach((y) => box([1.7, 0.055, 0.34], [2.15, y, -1.86], 0.28, recordGroup));
      for (let index = 0; index < 11; index += 1) {
        const book = box([0.065, 0.28 + (index % 3) * 0.05, 0.22], [1.48 + index * 0.13, 1.59 + (index % 3) * 0.025, -1.84], 0.16 + (index % 5) * 0.13, recordGroup);
        book.rotation.z = index === 8 ? -0.14 : 0;
      }
      box([0.82, 1.08, 0.04], [1.05, 2.35, -1.96], 0.12, profileGroup);
      const profileTexture = new THREE.TextureLoader().load(ryanProfile, () => window.dispatchEvent(new Event("room11:portrait-ready")));
      profileTexture.colorSpace = THREE.SRGBColorSpace;
      const profilePhoto = new THREE.Mesh(new THREE.PlaneGeometry(0.72, 0.98), new THREE.MeshBasicMaterial({ map: profileTexture }));
      profilePhoto.position.set(1.05, 2.35, -1.925);
      profilePhoto.userData.labelTexture = profileTexture;
      profileGroup.add(profilePhoto);
      [1.35, 1.98, 2.62].forEach((y) => box([1.72, 0.05, 0.34], [4.28, y, -1.85], 0.27, libraryGroup));
      for (let index = 0; index < 21; index += 1) {
        const row = Math.floor(index / 8);
        const column = index % 8;
        const book = box([0.075, 0.25 + (index % 4) * 0.035, 0.2], [3.64 + column * 0.16, 1.5 + row * 0.63, -1.83], 0.12 + (index % 6) * 0.13, libraryGroup);
        book.rotation.z = index % 7 === 0 ? 0.12 : 0;
      }
      cylinder(0.055, 0.075, 0.24, [4.72, 2.13, -1.82], 0.78, libraryGroup);
      const figureHead = new THREE.Mesh(new THREE.SphereGeometry(0.07, 12, 10), makeMaterial(0.78));
      figureHead.position.set(4.72, 2.31, -1.82);
      libraryGroup.add(figureHead);

      // Network station: a dedicated communications console and connected-node board.
      box([2.15, 0.08, 0.9], [-3.72, 0.82, -1.2], 0.26, networkGroup);
      [-4.55, -2.9].forEach((x) => box([0.07, 0.8, 0.75], [x, 0.4, -1.2], 0.2, networkGroup));
      box([1.25, 0.78, 0.06], [-3.72, 1.38, -1.68], 0.14, networkGroup);
      box([1.1, 0.64, 0.025], [-3.72, 1.38, -1.64], 0.84, networkGroup);
      const nodePositions = [[-4.25, 2.3], [-3.7, 2.65], [-3.15, 2.25], [-3.75, 1.95]] as const;
      nodePositions.forEach(([x, y]) => {
        const node = new THREE.Mesh(new THREE.SphereGeometry(0.075, 12, 10), makeMaterial(0.16));
        node.position.set(x, y, -1.9);
        networkGroup.add(node);
      });
      const nodeLines = new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-4.25, 2.3, -1.91), new THREE.Vector3(-3.7, 2.65, -1.91),
        new THREE.Vector3(-3.7, 2.65, -1.91), new THREE.Vector3(-3.15, 2.25, -1.91),
        new THREE.Vector3(-3.15, 2.25, -1.91), new THREE.Vector3(-3.75, 1.95, -1.91),
        new THREE.Vector3(-3.75, 1.95, -1.91), new THREE.Vector3(-4.25, 2.3, -1.91),
      ]), new THREE.LineBasicMaterial({ color: 0x333333 }));
      networkGroup.add(nodeLines);

      // Contact marker: a simple door and illuminated mail slot.
      box([1.25, 2.35, 0.08], [-5.15, 1.18, -1.92], 0.22, contactGroup);
      box([0.52, 0.08, 0.04], [-5.15, 1.25, -1.85], 0.82, contactGroup);
      cylinder(0.045, 0.045, 0.05, [-4.72, 1.08, -1.82], 0.72, contactGroup).rotation.x = Math.PI / 2;

      // Football corner with a playable ball and responsive net.
      wallImage("/images/football/raphinha-official.webp", [0.82, 1.05], [4.88, 2.45, -1.96], footballGroup);
      wallImage("/images/football/raphinha-supplied.webp", [0.82, 1.05], [5.82, 2.45, -1.96], footballGroup);
      wallImage("/images/football/fcb-official-badge.png", [2.25, 0.44], [7.2, 2.88, -1.95], footballGroup);
      wallText("MY FAVORITE CLUB", [7.2, 2.35, -1.96], 2.15, 70, footballGroup);
      const goal = new THREE.Group();
      cylinder(0.027, 0.027, 0.92, [-0.87, 0.46, 0], 0.88, goal);
      cylinder(0.027, 0.027, 0.92, [0.87, 0.46, 0], 0.88, goal);
      const crossbar = cylinder(0.027, 0.027, 1.78, [0, 0.92, 0], 0.88, goal);
      crossbar.rotation.z = Math.PI / 2;
      goal.position.set(5.75, 0, -1.72);
      footballGroup.add(goal);
      const netGeometry = new THREE.PlaneGeometry(1.74, 0.92, 14, 8);
      const net = new THREE.Mesh(netGeometry, new THREE.MeshBasicMaterial({ color: 0x777777, wireframe: true, transparent: true, opacity: 0.42 }));
      net.position.set(5.75, 0.46, -1.82);
      footballGroup.add(net);
      const netBase = Float32Array.from(netGeometry.attributes.position.array as ArrayLike<number>);
      const ballGroup = new THREE.Group();
      ballGroup.add(
        new THREE.Mesh(new THREE.SphereGeometry(0.17, 18, 14), makeMaterial(0.9)),
        new THREE.Mesh(new THREE.IcosahedronGeometry(0.173, 1), new THREE.MeshBasicMaterial({ color: 0x111111, wireframe: true })),
      );
      footballGroup.add(ballGroup);
      const ballStart = new THREE.Vector3(5.75, 0.18, 0.82);
      ballGroup.position.copy(ballStart);
      let kickTime = -1;
      let netAmplitude = 0;
      const kick = () => { if (kickTime < 0) kickTime = 0; };
      window.addEventListener("room11:kick", kick);

      const hemisphere = new THREE.HemisphereLight(0xffffff, 0x555555, 1.25);
      const sun = new THREE.DirectionalLight(0xffffff, 1.7);
      sun.position.set(4, 7, 6);
      sun.castShadow = shadows;
      scene.add(hemisphere, sun);

      const currentPosition = new THREE.Vector3(...stops.room.position);
      const currentLookAt = new THREE.Vector3(...stops.room.lookAt);
      const desiredPosition = currentPosition.clone();
      const desiredLookAt = currentLookAt.clone();
      let pointerX = 0;
      let pointerY = 0;
      let lastTime = performance.now();
      let lastRender = 0;
      let lastDark: boolean | null = null;
      let blinkAt = 0;
      let blink = true;
      let visibleZone = "";

      const routeGroups: Record<string, THREE.Group> = { home: homeGroup, work: workGroup, profile: profileGroup, record: recordGroup, library: libraryGroup, network: networkGroup, football: footballGroup, contact: contactGroup };
      const updateVisibility = () => {
        const nextZone = zoneForPath(pathRef.current);
        if (nextZone === visibleZone) return;
        visibleZone = nextZone;
        Object.entries(routeGroups).forEach(([name, group]) => { group.visible = nextZone === "room" || name === nextZone; });
      };

      const drawMonitor = () => {
        if (!screenContext) return;
        const dark = themeRef.current === "dark";
        screenContext.fillStyle = dark ? "#111111" : "#e7e7e3";
        screenContext.fillRect(0, 0, 512, 300);
        screenContext.fillStyle = dark ? "#ededeb" : "#111111";
        const workMode = zoneForPath(pathRef.current) === "work";
        if (workMode) {
          const codeLines = [
            "const room = createPortfolio({",
            "  owner: 'Ryan Erick',",
            "  stack: ['TS', 'React', 'Node'],",
            "  focus: 'useful products',",
            "  status: 'shipping'",
            "});",
            "room.deploy();",
          ];
          const visibleLines = 1 + Math.floor(performance.now() / 520) % codeLines.length;
          screenContext.font = "16px monospace";
          screenContext.fillStyle = dark ? "#7ee787" : "#176b37";
          screenContext.fillText("~/room11/work  main*", 24, 34);
          codeLines.slice(0, visibleLines).forEach((line, index) => {
            screenContext.fillStyle = dark ? "#777" : "#999";
            screenContext.fillText(String(index + 1).padStart(2, "0"), 24, 70 + index * 28);
            screenContext.fillStyle = dark ? "#ededeb" : "#111111";
            screenContext.fillText(line, 62, 70 + index * 28);
          });
          if (blink) screenContext.fillRect(62, 82 + visibleLines * 28, 11, 17);
        } else {
          screenContext.font = "20px monospace";
          screenContext.fillText("$ room --overview", 25, 42);
          const monitorLabels = ["PROJINA", "CHOPASAP", "EAGLE", "NEXTPY", "BAJOMA", "BUSEASE"];
          monitorLabels.forEach((label, index) => {
            screenContext.globalAlpha = index % 2 === 0 ? 0.9 : 0.5;
            screenContext.font = "bold 17px monospace";
            screenContext.fillText(label, 25 + (index % 2) * 235, 90 + Math.floor(index / 2) * 58);
            screenContext.fillRect(25 + (index % 2) * 235, 101 + Math.floor(index / 2) * 58, 165, 3);
          });
          screenContext.globalAlpha = 1;
        }
        screenTexture.needsUpdate = true;
      };
      const updateTheme = () => {
        const dark = themeRef.current === "dark";
        if (dark === lastDark) return;
        lastDark = dark;
        const scalar = dark ? 0.42 : 1;
        materials.forEach((entry) => entry.color.setScalar(Math.max(0.045, (entry.userData.gray as number) * scalar)));
        const background = dark ? 0x080808 : 0xd9d9d5;
        scene.background = new THREE.Color(background);
        scene.fog = new THREE.Fog(background, 7, 18);
        hemisphere.intensity = dark ? 0.55 : 1.25;
        sun.intensity = dark ? 0.7 : 1.7;
        deskLight.intensity = dark ? 2.1 : 0.8;
        drawMonitor();
      };
      const resize = () => {
        renderer.setSize(window.innerWidth, window.innerHeight, false);
        camera.aspect = window.innerWidth / Math.max(window.innerHeight, 1);
        camera.fov = camera.aspect < 0.9 ? 64 : 46;
        camera.updateProjectionMatrix();
      };
      const onPointer = (event: PointerEvent) => {
        pointerX = event.clientX / window.innerWidth - 0.5;
        pointerY = event.clientY / window.innerHeight - 0.5;
      };
      const updateTarget = () => {
        const path = pathRef.current;
        if (/^\/(en|fr)\/?$/.test(path)) {
          const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
          const progress = Math.min(0.999, window.scrollY / maxScroll) * (homeSequence.length - 1);
          const index = Math.min(homeSequence.length - 2, Math.floor(progress));
          const amount = progress - index;
          const smooth = amount * amount * (3 - 2 * amount);
          const from = homeSequence[index];
          const to = homeSequence[index + 1];
          desiredPosition.set(...from.position).lerp(new THREE.Vector3(...to.position), smooth);
          desiredLookAt.set(...from.lookAt).lerp(new THREE.Vector3(...to.lookAt), smooth);
        } else {
          const stop = stops[zoneForPath(path)];
          desiredPosition.set(...stop.position);
          desiredLookAt.set(...stop.lookAt);
        }
      };
      const render = (now: number) => {
        frame = 0;
        if (disposed || document.hidden) return;
        if (now - lastRender < 1000 / 45) {
          frame = requestAnimationFrame(render);
          return;
        }
        const delta = Math.min(0.05, (now - lastTime) / 1000);
        lastTime = now;
        lastRender = now;
        updateTheme();
        updateVisibility();
        updateTarget();
        const easing = reducedMotion ? 1 : Math.min(1, delta * 4.8);
        currentPosition.lerp(desiredPosition, easing);
        currentLookAt.lerp(desiredLookAt, easing);
        camera.position.set(currentPosition.x + (reducedMotion ? 0 : pointerX * 0.18), currentPosition.y + (reducedMotion ? 0 : -pointerY * 0.1), currentPosition.z);
        camera.lookAt(currentLookAt);

        if (!reducedMotion) {
          ballGroup.rotation.y += delta * 0.45;
          if (kickTime < 0) {
            ballGroup.position.set(ballStart.x, ballStart.y + Math.abs(Math.sin(now / 455)) * 0.12, ballStart.z);
          } else {
            kickTime += delta;
            if (kickTime <= 0.72) {
              const progress = kickTime / 0.72;
              ballGroup.position.set(ballStart.x, ballStart.y + Math.sin(Math.PI * progress) * 0.55, ballStart.z + (-1.79 - ballStart.z) * progress);
              ballGroup.rotation.x -= delta * 10;
              if (progress > 0.94) netAmplitude = 1;
            } else if (kickTime < 1.75) ballGroup.position.set(ballStart.x, 0.18, -1.79);
            else { kickTime = -1; ballGroup.position.copy(ballStart); }
          }
          if (netAmplitude > 0.002) {
            const positions = netGeometry.attributes.position;
            for (let index = 0; index < positions.count; index += 1) {
              const x = netBase[index * 3];
              const y = netBase[index * 3 + 1];
              positions.setZ(index, netBase[index * 3 + 2] - Math.sin(Math.hypot(x, y) * 8 - now / 75) * netAmplitude * 0.11);
            }
            positions.needsUpdate = true;
            netAmplitude *= Math.pow(0.04, delta);
          }
        }
        if (now - blinkAt > 560) { blinkAt = now; blink = !blink; drawMonitor(); }
        renderer.render(scene, camera);
        frame = requestAnimationFrame(render);
      };

      window.addEventListener("resize", resize, { passive: true });
      window.addEventListener("pointermove", onPointer, { passive: true });
      resize();
      updateTheme();
      frame = requestAnimationFrame(render);
      window.dispatchEvent(new Event("room11:ready"));

      destroy = () => {
        cancelAnimationFrame(frame);
        window.removeEventListener("resize", resize);
        window.removeEventListener("pointermove", onPointer);
        window.removeEventListener("room11:kick", kick);
        scene.traverse((object) => {
          if (object instanceof THREE.Mesh) {
            object.geometry.dispose();
            (Array.isArray(object.material) ? object.material : [object.material]).forEach((entry) => entry.dispose());
            const labelTexture = object.userData.labelTexture as { dispose?: () => void } | undefined;
            labelTexture?.dispose?.();
          }
        });
        screenTexture.dispose();
        renderer.dispose();
      };
    };

    void initialise();
    return () => { disposed = true; destroy(); };
  }, []);

  const zone = zoneForPath(pathname);
  return (
    <div className={`room-scene room-scene-${zone}${fallback ? " is-fallback" : ""}`} aria-hidden="true">
      <canvas ref={canvasRef} />
      <div className="room-fallback-grid" />
    </div>
  );
};

export default RoomScene;

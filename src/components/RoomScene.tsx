import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useTheme } from "@/contexts/EditorialThemeContext";
import ryanProfile from "@/assets/ryan-profile.webp";

type Stop = { position: [number, number, number]; lookAt: [number, number, number] };
type ProjectPreview = { slug: string; name: string; category: string; status: string; stack: string[]; liveUrl?: string; previewImage?: string };

const stops: Record<string, Stop> = {
  room: { position: [1.4, 2.7, 7.8], lookAt: [1.5, 1.1, -0.5] },
  work: { position: [-0.1, 1.72, 1.65], lookAt: [-0.1, 1.38, -1.72] },
  workPreview: { position: [0.22, 1.62, 0.62], lookAt: [0.22, 1.43, -1.62] },
  profile: { position: [1.82, 2.35, 1.65], lookAt: [1.82, 1.92, -1.85] },
  record: { position: [2.95, 2.3, 1.55], lookAt: [2.95, 2.05, -1.82] },
  certifications: { position: [9.55, 2.45, 2.25], lookAt: [9.55, 2.35, -1.86] },
  library: { position: [4.65, 2.25, 2.35], lookAt: [4.65, 1.85, -1.75] },
  football: { position: [5.6, 1.65, 3.65], lookAt: [5.75, 0.65, -1.15] },
  network: { position: [-4.55, 1.9, 1.85], lookAt: [-4.55, 1.35, -1.72] },
  contact: { position: [10.9, 1.75, 2.25], lookAt: [10.9, 1.15, -1.82] },
  beyond: { position: [8.25, 1.75, 3.35], lookAt: [8.3, 0.72, -0.22] },
};

const zoneForPath = (pathname: string) => {
  if (/^\/(en|fr)\/?$/.test(pathname)) return "room";
  if (pathname.includes("beyond-work") || pathname.includes("hors-travail")) return "beyond";
  if (pathname.includes("football")) return "football";
  if (pathname.includes("anime") || pathname.includes("library") || pathname.includes("bibliotheque")) return "library";
  if (pathname.includes("experience") || pathname.includes("parcours")) return "record";
  if (pathname.includes("certifications")) return "certifications";
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

    if (!webgl) {
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

      const mobile = window.innerWidth <= 760;
      const lowPower = mobile || connection?.saveData || (memory !== undefined && memory <= 4);
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: !lowPower, powerPreference: lowPower ? "low-power" : "high-performance" });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, lowPower ? 0.9 : 1.25));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.05;
      const shadows = !lowPower;
      renderer.shadowMap.enabled = shadows;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(46, 1, 0.1, 40);
      const materials: THREE.MeshStandardMaterial[] = [];
      const materialCache = new Map<string, THREE.MeshStandardMaterial>();
      const boxGeometryCache = new Map<string, THREE.BoxGeometry>();
      const makeMaterial = (gray: number, roughness = 0.72) => {
        const key = `${gray.toFixed(3)}:${roughness.toFixed(2)}`;
        const cachedMaterial = materialCache.get(key);
        if (cachedMaterial) return cachedMaterial;
        const result = new THREE.MeshStandardMaterial({ color: new THREE.Color(gray, gray, gray), roughness, metalness: 0.03 });
        result.userData.gray = gray;
        materials.push(result);
        materialCache.set(key, result);
        return result;
      };
      const box = (size: [number, number, number], position: [number, number, number], gray: number, parent: THREE.Object3D = scene) => {
        const geometryKey = size.join(":");
        let geometry = boxGeometryCache.get(geometryKey);
        if (!geometry) {
          geometry = new THREE.BoxGeometry(...size);
          boxGeometryCache.set(geometryKey, geometry);
        }
        const mesh = new THREE.Mesh(geometry, makeMaterial(gray));
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
      const furnitureGroup = new THREE.Group();
      const homeGroup = new THREE.Group();
      const workGroup = new THREE.Group();
      const profileGroup = new THREE.Group();
      const recordGroup = new THREE.Group();
      const certificationGroup = new THREE.Group();
      const libraryGroup = new THREE.Group();
      const networkGroup = new THREE.Group();
      const footballGroup = new THREE.Group();
      const contactGroup = new THREE.Group();
      scene.add(roomShell, furnitureGroup, homeGroup, workGroup, profileGroup, recordGroup, certificationGroup, libraryGroup, networkGroup, footballGroup, contactGroup);

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
      wallText("BUILD USEFUL THINGS", [-2.85, 4.35, -1.97], 2.7, 72);
      wallText("LEARN · SHIP · IMPROVE", [3.55, 4.35, -1.97], 2.75, 64);

      // Home furniture: a low bed that completes the room without appearing in focused route views.
      box([2.8, 0.18, 1.72], [8.15, 0.34, -0.05], 0.18, furnitureGroup);
      box([2.65, 0.34, 1.6], [8.15, 0.58, -0.05], 0.82, furnitureGroup);
      box([2.8, 1.05, 0.12], [8.15, 0.82, -0.82], 0.22, furnitureGroup);
      box([0.86, 0.16, 0.58], [7.35, 0.84, -0.45], 0.92, furnitureGroup).rotation.z = -0.04;
      box([0.86, 0.16, 0.58], [8.35, 0.84, -0.45], 0.9, furnitureGroup).rotation.z = 0.04;
      box([2.7, 0.08, 0.82], [8.15, 0.82, 0.31], 0.46, furnitureGroup);
      box([3.8, 0.1, 1.45], [-0.1, 0.78, -1.22], 0.28, furnitureGroup);
      [-1.82, 1.62].forEach((x) => box([0.09, 0.78, 1.3], [x, 0.39, -1.22], 0.22, furnitureGroup));
      box([1.75, 1.03, 0.07], [-0.72, 1.48, -1.62], 0.1, workGroup);
      box([0.08, 0.46, 0.08], [-0.72, 1.02, -1.65], 0.14, workGroup);
      box([0.48, 0.03, 0.28], [-0.72, 0.82, -1.58], 0.16, workGroup);

      const codeCanvas = document.createElement("canvas");
      codeCanvas.width = 512;
      codeCanvas.height = 300;
      const codeContext = codeCanvas.getContext("2d");
      const codeTexture = new THREE.CanvasTexture(codeCanvas);
      codeTexture.colorSpace = THREE.SRGBColorSpace;
      const monitorScreen = new THREE.Mesh(new THREE.PlaneGeometry(1.62, 0.9), new THREE.MeshBasicMaterial({ map: codeTexture }));
      monitorScreen.position.set(-0.72, 1.48, -1.575);
      workGroup.add(monitorScreen);

      const previewCanvas = document.createElement("canvas");
      previewCanvas.width = 512;
      previewCanvas.height = 300;
      const previewContext = previewCanvas.getContext("2d");
      const previewTexture = new THREE.CanvasTexture(previewCanvas);
      previewTexture.colorSpace = THREE.SRGBColorSpace;
      const curvedScreenGeometry = new THREE.PlaneGeometry(1.28, 0.79, 20, 1);
      const curvedScreenPositions = curvedScreenGeometry.attributes.position;
      for (let index = 0; index < curvedScreenPositions.count; index += 1) {
        const x = curvedScreenPositions.getX(index);
        curvedScreenPositions.setZ(index, -0.13 * x * x);
      }
      curvedScreenPositions.needsUpdate = true;
      curvedScreenGeometry.computeVertexNormals();
      const curvedScreen = new THREE.Mesh(curvedScreenGeometry, new THREE.MeshBasicMaterial({ map: previewTexture }));
      curvedScreen.position.set(0.62, 1.45, -1.54);
      curvedScreen.rotation.y = -0.08;
      workGroup.add(curvedScreen);
      box([1.38, 0.055, 0.055], [0.62, 1.88, -1.61], 0.09, workGroup);
      box([1.38, 0.055, 0.055], [0.62, 1.02, -1.61], 0.09, workGroup);
      box([0.06, 0.88, 0.055], [-0.08, 1.45, -1.61], 0.09, workGroup);
      box([0.06, 0.88, 0.055], [1.32, 1.45, -1.61], 0.09, workGroup);
      box([0.08, 0.45, 0.08], [0.62, 0.98, -1.64], 0.12, workGroup);
      box([0.52, 0.035, 0.26], [0.62, 0.81, -1.55], 0.14, workGroup);

      // Gaming desk details.
      box([2.65, 0.025, 0.62], [-0.12, 0.835, -1.01], 0.08, workGroup);
      box([1.15, 0.035, 0.38], [-0.72, 0.86, -0.88], 0.12, workGroup);
      const keyboardKeys: THREE.Mesh[] = [];
      for (let row = 0; row < 4; row += 1) {
        for (let column = 0; column < 13; column += 1) {
          keyboardKeys.push(box([0.055, 0.025, 0.055], [-1.13 + column * 0.07 + row * 0.012, 0.89, -0.98 + row * 0.068], 0.25, workGroup));
        }
      }
      const mouse = box([0.13, 0.035, 0.2], [0.16, 0.87, -0.9], 0.18, workGroup);
      cylinder(0.085, 0.072, 0.2, [-1.88, 0.92, -0.93], 0.83, workGroup);

      // PC tower, headphone hook, phone dock, and lamp.
      box([0.54, 0.72, 0.72], [1.28, 0.39, -1.2], 0.1, workGroup);
      box([0.45, 0.62, 0.02], [1.28, 0.39, -0.83], 0.22, workGroup);
      [0.2, 0.52].forEach((y) => {
        const fan = new THREE.Mesh(new THREE.TorusGeometry(0.13, 0.018, 8, 24), makeMaterial(0.72));
        fan.position.set(1.28, y, -0.81);
        workGroup.add(fan);
      });
      box([0.025, 0.44, 0.025], [-1.55, 1.05, -1.46], 0.12, workGroup);
      box([0.27, 0.025, 0.025], [-1.43, 1.27, -1.46], 0.12, workGroup);
      const headsetBand = new THREE.Mesh(new THREE.TorusGeometry(0.13, 0.025, 8, 22, Math.PI), makeMaterial(0.16));
      headsetBand.position.set(-1.31, 1.21, -1.46);
      headsetBand.rotation.z = Math.PI;
      workGroup.add(headsetBand);
      box([0.24, 0.035, 0.2], [0.34, 0.86, -0.7], 0.16, workGroup).rotation.x = -0.18;
      const phone = box([0.22, 0.4, 0.025], [0.34, 1.03, -0.78], 0.08, workGroup);
      phone.rotation.x = -0.18;
      box([0.17, 0.32, 0.012], [0.34, 1.03, -0.755], 0.72, workGroup).rotation.x = -0.18;

      cylinder(0.12, 0.14, 0.035, [1.58, 0.84, -1.55], 0.12, workGroup);
      const lampArm = box([0.035, 0.62, 0.035], [1.58, 1.15, -1.55], 0.12, workGroup);
      lampArm.rotation.z = 0.28;
      const lampShade = new THREE.Mesh(new THREE.ConeGeometry(0.16, 0.24, 18, 1, true), makeMaterial(0.16));
      lampShade.position.set(1.37, 1.46, -1.55);
      lampShade.rotation.z = 0.28;
      workGroup.add(lampShade);
      const deskLight = new THREE.PointLight(0xf2eee6, 1.6, 5.5);
      deskLight.position.set(1.36, 1.34, -1.38);
      workGroup.add(deskLight);

      // Experience and anime shelves.
      [1.42, 2.04].forEach((y) => box([1.65, 0.055, 0.34], [2.9, y, -1.86], 0.28, furnitureGroup));
      for (let index = 0; index < 11; index += 1) {
        const book = box([0.065, 0.28 + (index % 3) * 0.05, 0.22], [2.24 + index * 0.13, 1.59 + (index % 3) * 0.025, -1.84], 0.16 + (index % 5) * 0.13, recordGroup);
        book.rotation.z = index === 8 ? -0.14 : 0;
      }
      box([0.82, 1.08, 0.04], [1.55, 2.35, -1.96], 0.12, profileGroup);
      const profileTexture = new THREE.TextureLoader().load(ryanProfile, () => window.dispatchEvent(new Event("room11:portrait-ready")));
      profileTexture.colorSpace = THREE.SRGBColorSpace;
      const profilePhoto = new THREE.Mesh(new THREE.PlaneGeometry(0.72, 0.98), new THREE.MeshBasicMaterial({ map: profileTexture }));
      profilePhoto.position.set(1.55, 2.35, -1.925);
      profilePhoto.userData.labelTexture = profileTexture;
      profileGroup.add(profilePhoto);
      [1.35, 1.98, 2.62].forEach((y) => box([1.72, 0.05, 0.34], [4.65, y, -1.85], 0.27, furnitureGroup));
      for (let index = 0; index < 21; index += 1) {
        const row = Math.floor(index / 8);
        const column = index % 8;
        const book = box([0.075, 0.25 + (index % 4) * 0.035, 0.2], [4.01 + column * 0.16, 1.5 + row * 0.63, -1.83], 0.12 + (index % 6) * 0.13, libraryGroup);
        book.rotation.z = index % 7 === 0 ? 0.12 : 0;
      }
      cylinder(0.055, 0.075, 0.24, [5.09, 2.13, -1.82], 0.78, libraryGroup);
      const figureHead = new THREE.Mesh(new THREE.SphereGeometry(0.07, 12, 10), makeMaterial(0.78));
      figureHead.position.set(5.09, 2.31, -1.82);
      libraryGroup.add(figureHead);

      // Certificate wall: verified credentials are framed above the far end of the room.
      box([1.18, 1.42, 0.055], [9.55, 2.36, -1.96], 0.15, certificationGroup);
      box([1.03, 1.27, 0.018], [9.55, 2.36, -1.92], 0.88, certificationGroup);
      wallText("ASPIRE LEADERS", [9.55, 2.45, -1.89], 0.88, 66, certificationGroup);
      wallText("VERIFIED RECOGNITION", [9.55, 3.28, -1.95], 2.35, 50, certificationGroup);

      // Network station: separated from the workstation and built around event frames.
      box([2.1, 0.08, 0.9], [-4.65, 0.82, -1.2], 0.26, furnitureGroup);
      [-5.48, -3.82].forEach((x) => box([0.07, 0.8, 0.75], [x, 0.4, -1.2], 0.2, furnitureGroup));
      [
        { src: "/images/ngo/kidefind.webp", x: -5.25 },
        { src: "/images/ngo/amkay.webp", x: -4.65 },
        { src: "/images/ngo/tic-summit.webp", x: -4.05 },
      ].forEach(({ src, x }) => {
        box([0.52, 0.42, 0.04], [x, 1.12, -1.56], 0.14, networkGroup);
        wallImage(src, [0.44, 0.34], [x, 1.12, -1.53], networkGroup);
      });
      const nodePositions = [[-5.35, 2.3], [-4.8, 2.68], [-4.12, 2.28], [-4.72, 1.92]] as const;
      nodePositions.forEach(([x, y]) => {
        const node = new THREE.Mesh(new THREE.SphereGeometry(0.075, 12, 10), makeMaterial(0.16));
        node.position.set(x, y, -1.9);
        networkGroup.add(node);
      });
      const nodeLines = new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-5.35, 2.3, -1.91), new THREE.Vector3(-4.8, 2.68, -1.91),
        new THREE.Vector3(-4.8, 2.68, -1.91), new THREE.Vector3(-4.12, 2.28, -1.91),
        new THREE.Vector3(-4.12, 2.28, -1.91), new THREE.Vector3(-4.72, 1.92, -1.91),
        new THREE.Vector3(-4.72, 1.92, -1.91), new THREE.Vector3(-5.35, 2.3, -1.91),
      ]), new THREE.LineBasicMaterial({ color: 0x333333 }));
      networkGroup.add(nodeLines);

      // Contact marker: a simple door and illuminated mail slot.
      box([1.25, 2.35, 0.08], [11.15, 1.18, -1.92], 0.22, furnitureGroup);
      box([0.52, 0.08, 0.04], [11.15, 1.25, -1.85], 0.82, contactGroup);
      cylinder(0.045, 0.045, 0.05, [11.58, 1.08, -1.82], 0.72, contactGroup).rotation.x = Math.PI / 2;

      // Football corner with a playable ball and responsive net.
      wallImage("/images/football/fcb-official-badge.png", [2.45, 0.48], [6.75, 2.88, -1.95], footballGroup);
      wallText("MY FAVORITE CLUB", [6.75, 2.35, -1.96], 2.3, 64, footballGroup);
      wallText("MESSI · 10", [6.75, 1.98, -1.96], 1.45, 62, footballGroup);
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
      ballGroup.add(new THREE.Mesh(new THREE.SphereGeometry(0.31, 12, 10), new THREE.MeshBasicMaterial({ visible: false })));
      footballGroup.add(ballGroup);
      const ballStart = new THREE.Vector3(5.75, 0.18, 0.82);
      ballGroup.position.copy(ballStart);
      let kickTime = -1;
      let netAmplitude = 0;
      const kick = () => { if (kickTime < 0) kickTime = 0; };
      window.addEventListener("room11:kick", kick);
      const raycaster = new THREE.Raycaster();
      const kickPointer = new THREE.Vector2();
      const kickFromBall = (event: PointerEvent) => {
        const zone = zoneForPath(pathRef.current);
        if (!["room", "football", "beyond"].includes(zone) || !ballGroup.visible) return;
        kickPointer.set((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1);
        raycaster.setFromCamera(kickPointer, camera);
        if (raycaster.intersectObject(ballGroup, true).length) kick();
      };
      window.addEventListener("pointerdown", kickFromBall, { passive: true });

      const hemisphere = new THREE.HemisphereLight(0xffffff, 0x555555, 1.25);
      const sun = new THREE.DirectionalLight(0xffffff, 1.7);
      sun.position.set(4, 7, 6);
      sun.castShadow = shadows;
      const roomFill = new THREE.PointLight(0xffffff, 0.55, 9);
      roomFill.position.set(7.5, 3.5, 2.5);
      const networkFill = new THREE.PointLight(0xffffff, 0.45, 6);
      networkFill.position.set(-4.2, 2.8, 1.4);
      scene.add(hemisphere, sun, roomFill, networkFill);

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
      let monitorDrawAt = 0;
      let blink = true;
      let visibleZone = "";
      let visibleHomeStop = "";
      let projectPreview: ProjectPreview | null = null;
      const previewImages = new Map<string, HTMLImageElement>();
      let homeStop = "room";

      const routeGroups: Record<string, THREE.Group> = { home: homeGroup, work: workGroup, profile: profileGroup, record: recordGroup, certifications: certificationGroup, library: libraryGroup, network: networkGroup, football: footballGroup, contact: contactGroup };
      const updateHomeStop = () => {
        if (!/^\/(en|fr)\/?$/.test(pathRef.current)) return;
        const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-room-stop]"));
        if (!sections.length) {
          homeStop = "room";
          return;
        }
        const targetLine = window.innerHeight * 0.42;
        const closest = sections.reduce((best, section) => {
          const distance = Math.abs(section.getBoundingClientRect().top - targetLine);
          return distance < best.distance ? { section, distance } : best;
        }, { section: sections[0], distance: Number.POSITIVE_INFINITY });
        const candidate = closest.section.dataset.roomStop;
        if (candidate && stops[candidate]) homeStop = candidate;
      };
      const updateVisibility = () => {
        const nextZone = zoneForPath(pathRef.current);
        if (nextZone === visibleZone && (nextZone !== "room" || homeStop === visibleHomeStop)) return;
        visibleZone = nextZone;
        if (nextZone === "room") updateHomeStop();
        visibleHomeStop = homeStop;
        Object.entries(routeGroups).forEach(([name, group]) => {
          const roomOverview = nextZone === "room" && homeStop === "room" && ["home", "work"].includes(name);
          const beyondOverview = nextZone === "room" && homeStop === "beyond" && ["home", "library", "football"].includes(name);
          group.visible = name === nextZone || roomOverview || beyondOverview || (nextZone === "room" && name === homeStop);
        });
      };

      const showProjectPreview = (event: Event) => {
        projectPreview = (event as CustomEvent<ProjectPreview>).detail;
        if (projectPreview.previewImage && !previewImages.has(projectPreview.previewImage)) {
          const previewImage = new Image();
          previewImage.decoding = "async";
          previewImage.onload = () => drawMonitor();
          previewImage.src = projectPreview.previewImage;
          previewImages.set(projectPreview.previewImage, previewImage);
        }
        drawMonitor();
      };
      const clearProjectPreview = () => {
        projectPreview = null;
        drawMonitor();
      };
      window.addEventListener("room11:project-preview", showProjectPreview);
      window.addEventListener("room11:project-preview-clear", clearProjectPreview);

      const codeLines = [
        "const room = createPortfolio({",
        "  owner: 'Ryan Erick',",
        "  stack: ['TS', 'React', 'Node'],",
        "  focus: 'useful products',",
        "  status: 'shipping'",
        "});",
        "room.deploy();",
      ];
      const codeText = codeLines.join("\n");
      const getTypedCount = (time = performance.now()) => Math.min(codeText.length, Math.floor(time / 52) % (codeText.length + 46));

      const drawCodeMonitor = (time = performance.now()) => {
        if (!codeContext) return;
        const dark = themeRef.current === "dark";
        codeContext.fillStyle = dark ? "#0b0f0d" : "#e9ece8";
        codeContext.fillRect(0, 0, 512, 300);
        codeContext.font = "16px monospace";
        codeContext.fillStyle = dark ? "#7ee787" : "#176b37";
        codeContext.fillText("~/room11/work  main*", 24, 34);
        const typedLines = codeText.slice(0, getTypedCount(time)).split("\n");
        typedLines.forEach((line, index) => {
          codeContext.fillStyle = dark ? "#69716c" : "#8a918c";
          codeContext.fillText(String(index + 1).padStart(2, "0"), 24, 70 + index * 28);
          codeContext.fillStyle = dark ? "#ededeb" : "#111111";
          codeContext.fillText(line, 62, 70 + index * 28);
        });
        const activeLine = typedLines.at(-1) ?? "";
        const cursorX = 62 + codeContext.measureText(activeLine).width;
        const cursorY = 55 + Math.max(0, typedLines.length - 1) * 28;
        if (blink) codeContext.fillRect(cursorX + 2, cursorY, 9, 18);
        codeTexture.needsUpdate = true;
      };

      const drawPreviewMonitor = () => {
        if (!previewContext) return;
        const dark = themeRef.current === "dark";
        previewContext.fillStyle = dark ? "#111111" : "#e7e7e3";
        previewContext.fillRect(0, 0, 512, 300);
        previewContext.fillStyle = dark ? "#ededeb" : "#111111";
        if (projectPreview) {
          const preview = projectPreview;
          const capturedPreview = preview.previewImage ? previewImages.get(preview.previewImage) : undefined;
          if (capturedPreview?.complete && capturedPreview.naturalWidth > 0) {
            const destinationAspect = 512 / 300;
            const sourceAspect = capturedPreview.naturalWidth / capturedPreview.naturalHeight;
            let sourceX = 0;
            let sourceY = 0;
            let sourceWidth = capturedPreview.naturalWidth;
            let sourceHeight = capturedPreview.naturalHeight;
            if (sourceAspect > destinationAspect) {
              sourceWidth = sourceHeight * destinationAspect;
              sourceX = (capturedPreview.naturalWidth - sourceWidth) / 2;
            } else {
              sourceHeight = sourceWidth / destinationAspect;
              sourceY = Math.max(0, (capturedPreview.naturalHeight - sourceHeight) * 0.08);
            }
            previewContext.drawImage(capturedPreview, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, 512, 300);
            const overlay = previewContext.createLinearGradient(0, 190, 0, 300);
            overlay.addColorStop(0, "rgba(0,0,0,0)");
            overlay.addColorStop(1, "rgba(0,0,0,.9)");
            previewContext.fillStyle = overlay;
            previewContext.fillRect(0, 180, 512, 120);
            previewContext.fillStyle = "#ffffff";
            previewContext.font = "bold 25px Arial, sans-serif";
            previewContext.fillText(preview.name.toUpperCase(), 22, 264);
            previewContext.font = "11px monospace";
            previewContext.fillText(preview.liveUrl?.replace(/^https?:\/\//, "").replace(/\/$/, "").toUpperCase() ?? "PROJECT PREVIEW", 22, 285);
          } else {
            previewContext.font = "bold 12px monospace";
            previewContext.fillStyle = dark ? "#8b8b8b" : "#676767";
            previewContext.fillText(preview.previewImage ? "LOADING CAPTURE" : "PROJECT PREVIEW", 24, 38);
            previewContext.font = "bold 40px Arial, sans-serif";
            previewContext.fillStyle = dark ? "#f2f2ef" : "#101010";
            previewContext.fillText(preview.name.toUpperCase(), 24, 92);
            previewContext.font = "13px Arial, sans-serif";
            previewContext.fillStyle = dark ? "#b8b8b4" : "#4f4f4f";
            previewContext.fillText(preview.category.slice(0, 58), 24, 120);
            preview.stack.slice(0, 4).forEach((item, index) => {
              previewContext.strokeStyle = dark ? "#777" : "#555";
              previewContext.strokeRect(24 + (index % 2) * 235, 160 + Math.floor(index / 2) * 54, 210, 36);
              previewContext.fillText(item.toUpperCase().slice(0, 22), 36 + (index % 2) * 235, 183 + Math.floor(index / 2) * 54);
            });
          }
        } else {
          previewContext.font = "bold 12px monospace";
          previewContext.fillStyle = dark ? "#777" : "#696969";
          previewContext.fillText("SECONDARY DISPLAY / LIVE PREVIEW", 24, 38);
          previewContext.font = "bold 35px Arial, sans-serif";
          previewContext.fillStyle = dark ? "#f2f2ef" : "#111111";
          previewContext.fillText("SELECT A PROJECT", 24, 100);
          previewContext.font = "14px monospace";
          previewContext.fillStyle = dark ? "#aaa" : "#555";
          previewContext.fillText("Hover the work index to load its demo.", 24, 132);
          for (let row = 0; row < 3; row += 1) {
            previewContext.strokeStyle = dark ? "#333" : "#bbb";
            previewContext.strokeRect(24, 165 + row * 36, 464, 24);
          }
        }
        previewTexture.needsUpdate = true;
      };
      const drawMonitor = (time = performance.now()) => {
        drawCodeMonitor(time);
        drawPreviewMonitor();
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
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, window.innerWidth <= 760 ? 0.9 : (lowPower ? 1 : 1.25)));
        camera.aspect = window.innerWidth / Math.max(window.innerHeight, 1);
        camera.fov = camera.aspect < 0.9 ? 58 : 46;
        camera.updateProjectionMatrix();
      };
      const onPointer = (event: PointerEvent) => {
        if (event.pointerType && event.pointerType !== "mouse") return;
        pointerX = event.clientX / window.innerWidth - 0.5;
        pointerY = event.clientY / window.innerHeight - 0.5;
      };
      const setCameraStop = (stop: Stop, overview = false) => {
        const portrait = window.innerWidth / Math.max(window.innerHeight, 1) < 0.9;
        const mobileDistance = portrait ? (overview ? 3.1 : 1.85) : 0;
        desiredPosition.set(stop.position[0], stop.position[1] + (portrait ? 0.12 : 0), stop.position[2] + mobileDistance);
        desiredLookAt.set(...stop.lookAt);
      };
      const updateTarget = () => {
        const path = pathRef.current;
        if (/^\/(en|fr)\/?$/.test(path)) {
          const stop = stops[homeStop] ?? stops.room;
          setCameraStop(stop, homeStop === "room");
        } else {
          const zone = zoneForPath(path);
          const stop = zone === "work" && projectPreview ? stops.workPreview : stops[zone];
          setCameraStop(stop);
        }
      };
      const render = (now: number) => {
        frame = 0;
        if (disposed || document.hidden) return;
        if (now - lastRender < 1000 / (lowPower ? 30 : 45)) {
          frame = requestAnimationFrame(render);
          return;
        }
        const delta = Math.min(0.05, (now - lastTime) / 1000);
        lastTime = now;
        lastRender = now;
        updateTheme();
        updateVisibility();
        updateTarget();
        const onHome = /^\/(en|fr)\/?$/.test(pathRef.current);
        const easing = reducedMotion ? 1 : Math.min(1, delta * (onHome ? 6.2 : 9.5));
        currentPosition.lerp(desiredPosition, easing);
        currentLookAt.lerp(desiredLookAt, easing);
        camera.position.set(currentPosition.x + (reducedMotion ? 0 : pointerX * 0.18), currentPosition.y + (reducedMotion ? 0 : -pointerY * 0.1), currentPosition.z);
        camera.lookAt(currentLookAt);

        if (!reducedMotion) {
          const typedCount = getTypedCount(now);
          const activeKey = typedCount % keyboardKeys.length;
          keyboardKeys.forEach((key, index) => {
            const pressed = index === activeKey && typedCount < codeText.length;
            key.position.y = pressed ? 0.882 : 0.89;
            key.scale.y = pressed ? 0.55 : 1;
          });
          mouse.position.x = 0.16 + Math.sin(now / 880) * 0.025;
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
        if (now - blinkAt > 480) { blinkAt = now; blink = !blink; }
        if (now - monitorDrawAt > (lowPower ? 130 : 72)) {
          monitorDrawAt = now;
          drawCodeMonitor(now);
        }
        renderer.render(scene, camera);
        frame = requestAnimationFrame(render);
      };

      window.addEventListener("resize", resize, { passive: true });
      window.addEventListener("pointermove", onPointer, { passive: true });
      window.addEventListener("scroll", updateHomeStop, { passive: true });
      resize();
      updateHomeStop();
      updateTheme();
      frame = requestAnimationFrame(render);
      window.dispatchEvent(new Event("room11:ready"));

      destroy = () => {
        cancelAnimationFrame(frame);
        window.removeEventListener("resize", resize);
        window.removeEventListener("pointermove", onPointer);
        window.removeEventListener("scroll", updateHomeStop);
        window.removeEventListener("room11:kick", kick);
        window.removeEventListener("pointerdown", kickFromBall);
        window.removeEventListener("room11:project-preview", showProjectPreview);
        window.removeEventListener("room11:project-preview-clear", clearProjectPreview);
        const disposedGeometries = new Set<THREE.BufferGeometry>();
        const disposedMaterials = new Set<THREE.Material>();
        scene.traverse((object) => {
          if (object instanceof THREE.Mesh) {
            if (!disposedGeometries.has(object.geometry)) {
              object.geometry.dispose();
              disposedGeometries.add(object.geometry);
            }
            (Array.isArray(object.material) ? object.material : [object.material]).forEach((entry) => {
              if (!disposedMaterials.has(entry)) {
                entry.dispose();
                disposedMaterials.add(entry);
              }
            });
            const labelTexture = object.userData.labelTexture as { dispose?: () => void } | undefined;
            labelTexture?.dispose?.();
          }
        });
        codeTexture.dispose();
        previewTexture.dispose();
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

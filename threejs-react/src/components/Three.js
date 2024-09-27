import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import { PMREMGenerator } from "three/src/extras/PMREMGenerator.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import helvetikerFontJson from 'three/examples/fonts/optimer_regular.typeface.json'; 
import { gsap } from "gsap";
import Background from "../assets/environment.hdr";

function MyThree() {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const modelRef = useRef(null);
  const mixerRef = useRef(null);
  const actionsRef = useRef({});
  const linesAndLabelsRef = useRef([]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    const camera = new THREE.PerspectiveCamera(
      35,
      sizes.width / sizes.height,
      0.1,
      1000
    );
    camera.position.z = 5;
    camera.position.y = 0;
    camera.position.x = 0;
    scene.add(camera);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.6;
    rendererRef.current = renderer;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 2, 0);
    scene.add(directionalLight);

    const loadModel = () => {
      const fraesenUrl = new URL("../assets/27.glb", import.meta.url).href;
      const gLTFLoader = new GLTFLoader();
      gLTFLoader.load(
        fraesenUrl,
        (gltf) => {
          const model = gltf.scene;
          model.position.set(2.5, -0.5, 0);
          model.rotation.set(Math.PI * 0.1, Math.PI * 1.2, 0);
          model.scale.set(1, 1, 1);

          scene.add(model);
          modelRef.current = model;

          const mixer = new THREE.AnimationMixer(model);
          mixerRef.current = mixer;

          mixerRef.current.timeScale = 0.3; //Animationsgeschwindigkeit

          gltf.animations.forEach((clip) => {
            const action = mixer.clipAction(clip);
            actionsRef.current[clip.name] = action;
          });

          addLinesAndLabels();
        },
        undefined,
        (error) => console.error("An error happened while loading the model", error)
      );
    };

    const loadHDR = () => {
      const pmremGenerator = new PMREMGenerator(renderer);
      pmremGenerator.compileCubemapShader();

      new RGBELoader().load(Background, (texture)=> {
        texture.mapping=THREE.EquirectangularReflectionMapping;
        scene.background=texture;
        scene.environment=texture;
        })      
    };

    const createLine = (start, end, color = 0x000000) => {
      const material = new THREE.LineBasicMaterial({ color });
      const points = [start, end];
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      return new THREE.Line(geometry, material);
    };

    const createLabel = (text, position, size = 0.1, color = 0x000000) => {
      const loader = new FontLoader();
      const font = loader.parse(helvetikerFontJson);
  
        const geometry = new TextGeometry(text, {
          font: font, 
          size: size,
          height: 0.015,
        });
        const material = new THREE.MeshBasicMaterial({ color });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.copy(position);
        scene.add(mesh); 
        linesAndLabelsRef.current.push(mesh); 
    };

    const addLinesAndLabels = () => {
      const model = modelRef.current;

      if (!model) return;

      const yAxisStart = new THREE.Vector3(1.5, 1.2, 0);
      const yAxisEnd = new THREE.Vector3(1.5, 0.4, 0);
      const yAxisLine = createLine(yAxisStart, yAxisEnd);
      scene.add(yAxisLine);
      linesAndLabelsRef.current.push(yAxisLine);
      createLabel("Y-Achse (Brücke)", yAxisStart);

      const zAxisStart = new THREE.Vector3(2.25, 0.5, 0);
      const zAxisEnd = new THREE.Vector3(1.75, 0.5, 0);
      const zAxisLine = createLine(zAxisStart, zAxisEnd);
      scene.add(zAxisLine);
      linesAndLabelsRef.current.push(zAxisLine);
      createLabel("Z-Achse", zAxisStart);

      const xAxisStart = new THREE.Vector3(2.35, 0, 0);
      const xAxisEnd = new THREE.Vector3(1.25, 0, 0);
      const xAxisLine = createLine(xAxisStart, xAxisEnd);
      scene.add(xAxisLine);
      linesAndLabelsRef.current.push(xAxisLine);
      createLabel("X-Achse", xAxisStart);

      const coverStart = new THREE.Vector3(1.1, 1.35, 0);
      const coverEnd = new THREE.Vector3(1.1, 0.55, 0);
      const coverLine = createLine(coverStart, coverEnd);
      scene.add(coverLine);
      linesAndLabelsRef.current.push(coverLine);
      createLabel("Abdeckung", coverStart);

      const ButtonStart = new THREE.Vector3(2.6, 0.2, 0);
      const ButtonEnd = new THREE.Vector3(2.1, 0.2, 0);
      const ButtonLine = createLine(ButtonStart, ButtonEnd);
      scene.add(ButtonLine);
      linesAndLabelsRef.current.push(ButtonLine);
      createLabel("Not-Aus", ButtonStart);

      const EngineMountStart = new THREE.Vector3(2.28, 0.93, 0);
      const EngineMountEnd = new THREE.Vector3(1.78, 0.93, 0);
      const EngineMountLine = createLine(EngineMountStart, EngineMountEnd);
      scene.add(EngineMountLine);
      linesAndLabelsRef.current.push(EngineMountLine);
      createLabel("Schmiernippel \n (Motorlager)", EngineMountStart);
    };

      const toggleLinesAndLabels = (visible) => {
        linesAndLabelsRef.current.forEach(obj => {
          obj.visible = visible;
      });
    };

    const createFireworks = () => {
      const particleCount = 500; 
      const particles = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const velocities = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);
    
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 0] = 0; 
        positions[i * 3 + 1] = 0; 
        positions[i * 3 + 2] = 0; 
    
        velocities[i * 3 + 0] = (Math.random() - 0.5) * 2; 
        velocities[i * 3 + 1] = (Math.random() - 0.5) * 2; 
        velocities[i * 3 + 2] = (Math.random() - 0.5) * 2; 

        colors[i * 3 + 0] = Math.random(); 
        colors[i * 3 + 1] = Math.random(); 
        colors[i * 3 + 2] = Math.random(); 
      }
    
      particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const particleMaterial = new THREE.PointsMaterial({
        vertexColors: true,
        size: 0.1,
        transparent: true,
        opacity: 1,
      });
    
      const particleSystem = new THREE.Points(particles, particleMaterial);
      scene.add(particleSystem);
    
      const duration = 1.5;
      const animateParticles = () => {
        const startTime = Date.now();
    
        const animate = () => {
          const elapsedTime = (Date.now() - startTime) / 10000;
    
          for (let i = 0; i < particleCount; i++) {
            positions[i * 3 + 0] += velocities[i * 3 + 0] * elapsedTime; 
            positions[i * 3 + 1] += velocities[i * 3 + 1] * elapsedTime; 
            positions[i * 3 + 2] += velocities[i * 3 + 2] * elapsedTime; 
          }
    
          particles.attributes.position.needsUpdate = true;
    
          if (elapsedTime < duration) {
            requestAnimationFrame(animate);
          } else {
            scene.remove(particleSystem); 
          }
        };
    
        animate();
      };
    
      animateParticles();
    };


    const animate = () => {
      const clock = new THREE.Clock();

      const tick = () => {
        const deltaTime = clock.getDelta();

        if (mixerRef.current) {
          mixerRef.current.update(deltaTime);
        }

        renderer.render(scene, camera);
        requestAnimationFrame(tick);
      };

      tick();
    };

    const handleResize = () => {
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;

      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();

      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    const handleScroll = () => {
      const transformModel = [
        { rotationX: Math.PI * 0.1, rotationY: Math.PI * 1.2, rotationZ: 0, positionX: 2.5, positionY: -0.5, positionZ: 0}, //Start
        { rotationX: Math.PI * 0.1, rotationY: Math.PI * 1.3, rotationZ: 0, positionX: -0.5, positionY: -0.5, positionZ: 0}, //Vorbereitung
        { rotationX: Math.PI * 0.1, rotationY: Math.PI * 1.8, rotationZ: 0, positionX: 2.5, positionY: 0, positionZ: -1.5}, //Schritt 1
        { rotationX: Math.PI * 0.1, rotationY: Math.PI * 1.6, rotationZ: 0, positionX: 0.75, positionY: -0.5, positionZ: -1.5}, //Schritt 2
        { rotationX: Math.PI * 0.1, rotationY: Math.PI * 2.3, rotationZ: 0, positionX: -0.5, positionY: 0, positionZ: -1.5}, //Schritt 3
        { rotationX: Math.PI * 0.1, rotationY: Math.PI * 1.5, rotationZ: 0, positionX: 0.75, positionY: -0.5, positionZ: -0.5},  //Schritt 4
        { rotationX: Math.PI * 0.1, rotationY: Math.PI * 1.6, rotationZ: 0, positionX: 3, positionY: 0, positionZ: -1.25},  //Schritt 5
        { rotationX: Math.PI * 0.1, rotationY: Math.PI * 1.2, rotationZ: 0, positionX: 1, positionY: -1, positionZ: 0}, //Ende
      ];

      let currentSection = 0;

      const scrollHandler = () => {
        const newSection = Math.round(window.scrollY / sizes.height);

        if (newSection !== currentSection) {
          currentSection = newSection;

          if (modelRef.current && transformModel[currentSection]) {
            gsap.to(modelRef.current.rotation, {
              duration: 0.75,
              ease: "power2.out",
              x: transformModel[currentSection].rotationX, 
              y: transformModel[currentSection].rotationY, 
              z: transformModel[currentSection].rotationZ, 
            });
            gsap.to(modelRef.current.position, {
              duration: 0.75,
              ease: "power2.out",
              x: transformModel[currentSection].positionX,
              y: transformModel[currentSection].positionY,
              z: transformModel[currentSection].positionZ,
            });

            if (currentSection === 0) {
              toggleLinesAndLabels(true);
            } 
            else {
              toggleLinesAndLabels(false);
            }

            if (currentSection === 1) {
              ["ButtonVorbereitung", "WerkzeughalterVorbereitung", "ZAchseVorbereitung"].forEach(animation => {
                if (actionsRef.current[animation]) {
                  actionsRef.current[animation].reset().play();
                }
              });
            } else {
              ["ButtonVorbereitung", "WerkzeughalterVorbereitung", "ZAchseVorbereitung"].forEach(animation => {
                if (actionsRef.current[animation]) {
                  actionsRef.current[animation].stop();
                }
              });
            }
          }

          if (currentSection === 2) {
            ["Abdeckung1", "Button1", "Schraube1", "Schrauben1", "Werkzeughalter1", "ZAchse1", "Bruecke1"].forEach(animation => {
              if (actionsRef.current[animation]) {
                actionsRef.current[animation].reset().play();
              }
            });
          } else {
            ["Abdeckung1", "Button1", "Schraube1", "Schrauben1", "Werkzeughalter1", "ZAchse1", "Bruecke1"].forEach(animation => {
              if (actionsRef.current[animation]) {
                actionsRef.current[animation].stop();
              }
            });
          }

          if (currentSection === 3) {
            ["Abdeckung2", "Schraube2", "Schrauben2"].forEach(animation => {
              if (actionsRef.current[animation]) {
                actionsRef.current[animation].reset().play();
              }
            });
          } else {
            ["Abdeckung2", "Schraube2", "Schrauben2"].forEach(animation => {
              if (actionsRef.current[animation]) {
                actionsRef.current[animation].stop();
              }
            });
          }

          if (currentSection === 4) {
            ["Werkzeughalter3"].forEach(animation => {
              if (actionsRef.current[animation]) {
                actionsRef.current[animation].reset().play();
              }
            });
          } else {
            ["Werkzeughalter3"].forEach(animation => {
              if (actionsRef.current[animation]) {
                actionsRef.current[animation].stop();
              }
            });
          }

          if (currentSection === 5) {
            gsap.to(cameraRef.current.position, {
              duration: 1.25,
              ease: "power2.inOut",
              z: 0.25, //ran-/rauszoomen
              y: 0.8, //hoch-runter
              x: -0.45, //rechts-links
            });
          } else {
            gsap.to(cameraRef.current.position, {
              duration: 1.25,
              ease: "power2.inOut",
              z: 5, 
              y: 0,
              x: 0,
            });
          }

          if (currentSection === 6) {
            ["Abdeckung5", "Schraube5", "Schrauben5"].forEach(animation => {
              if (actionsRef.current[animation]) {
                actionsRef.current[animation].reset().play();
              }
            });
          } else {
            ["Abdeckung5", "Schraube5", "Schrauben5"].forEach(animation => {
              if (actionsRef.current[animation]) {
                actionsRef.current[animation].stop();
              }
            });
          }

          if (currentSection === 7) {
            createFireworks(); 
          }
        }
      };

      window.addEventListener("scroll", scrollHandler);
      return () => window.removeEventListener("scroll", scrollHandler);
    };

    loadModel();
    loadHDR();
    animate();
    handleScroll();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      // Clean up Three.js resources
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      if (sceneRef.current) {
        sceneRef.current.clear();
      }
    };
  }, []);

  return <canvas ref={canvasRef} className="webgl" />;
}

export default MyThree;
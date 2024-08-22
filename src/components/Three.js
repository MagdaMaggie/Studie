import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import { PMREMGenerator } from "three/src/extras/PMREMGenerator.js";
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

  // Three js logic after the component mounts
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
      const fraesenUrl = new URL("../assets/25.glb", import.meta.url).href;
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

          mixerRef.current.timeScale = 0.5;

          gltf.animations.forEach((clip) => {
            const action = mixer.clipAction(clip);
            actionsRef.current[clip.name] = action;
          });
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
        { rotationZ: 0, positionX: 2.5 },
        { rotationZ: 0, positionX: -1.3 },
        { rotationZ: 0, positionX: 2.5 },
        { rotationZ: 0, positionX: -1.3 },
        { rotationZ: 0, positionX: 2.5 },
        { rotationZ: 0, positionX: -1.3 },
        { rotationZ: 0, positionX: 2.5 },
        { rotationZ: 0, positionX: 0 },
      ];

      let currentSection = 0;

      const scrollHandler = () => {
        const newSection = Math.round(window.scrollY / sizes.height);

        if (newSection !== currentSection) {
          currentSection = newSection;

          if (modelRef.current && transformModel[currentSection]) {
            gsap.to(modelRef.current.rotation, {
              duration: 1.25,
              ease: "power2.inOut",
              z: transformModel[currentSection].rotationZ,
            });
            gsap.to(modelRef.current.position, {
              duration: 1.25,
              ease: "power2.inOut",
              x: transformModel[currentSection].positionX,
            });

          if (currentSection === 1) {
              ["ButtonVorbereitung", "KetteBrueckeVorbereitung", "Werkzeughaltervorbereitung", "ZAchseVorbereitung"].forEach(animation => {
                if (actionsRef.current[animation]) {
                  actionsRef.current[animation].reset().play();
                }
              });
            } else {
              ["ButtonVorbereitung", "KetteBrueckeVorbereitung", "Werkzeughaltervorbereitung", "ZAchseVorbereitung"].forEach(animation => {
                if (actionsRef.current[animation]) {
                  actionsRef.current[animation].stop();
                }
              });
            }
          }

          if (currentSection === 2) {
            ["Abdeckung1", "Button1", "KetteBruecke1", "KetteSeite1", "Schraube1", "Schrauben1", "Werkzeughalter1", "ZAchse1"].forEach(animation => {
              if (actionsRef.current[animation]) {
                actionsRef.current[animation].reset().play();
              }
            });
          } else {
            ["Abdeckung1", "Button1", "KetteBruecke1", "KetteSeite1", "Schraube1", "Schrauben1", "Werkzeughalter1", "ZAchse1"].forEach(animation => {
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
            ["camera4"].forEach(animation => {
              if (actionsRef.current[animation]) {
                actionsRef.current[animation].reset().play();
              }
            });
          } else {
            ["camera4"].forEach(animation => {
              if (actionsRef.current[animation]) {
                actionsRef.current[animation].stop();
              }
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
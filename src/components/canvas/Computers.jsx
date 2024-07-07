import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "../Loader";


const Computers = ({isMobile}) => {
  const computer = useGLTF("./desktop_pc/scene.gltf");
  
  return (
    <mesh>
     <hemisphereLight intensity ={3.5} groundColor='black'/>
     <pointLight intensity={1} position={[-2,-1,0.5]}/>
     <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      
     
      <primitive
      
        object={computer.scene}
        scale={isMobile?0.65:0.75}
        position={isMobile?[0,-2.5,-2]:[0, -2.8, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  );
};
const ComputersCanvas = () => {
  const [ isMobile , setIsMobile] = useState(false);
  useEffect(()=>{
    const mediaQuery = window.matchMedia('(max-width:500px)');
    setIsMobile(mediaQuery.matches);
    const handleMediaQuery = (event) =>{
      setIsMobile(event.matches);
    }
    mediaQuery.addEventListener('change',handleMediaQuery);
    return()=>{
      mediaQuery.removeEventListener('change',handleMediaQuery);
    }
  },[])
  return (
    <Canvas
      frameloop="demand"
      shadows
      
      camera={{ position: [20, 3, 5], fov: 25, exposure:2, }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom = {false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers isMobile={isMobile} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;

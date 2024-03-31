function Scene() {
    const pointsRef = useRef(null as unknown as Points);
    const radius = 2;

    const uniforms = useMemo(
        () => (
            {
                uTime: {
                    value: 0
                },
                uRadius: {
                    value: radius
                }
            }
        ), []);

    useFrame((state) => {
        (pointsRef.current.material as ShaderMaterial).uniforms.uTime.value = state.clock.getElapsedTime();
    });

    const count = 4000;

    const particlesPosition = useMemo(() => {
        const positions = new Float32Array(count * 3);
        
        for (let i = 0; i < count; i++) {
            const distance = Math.sqrt(Math.random()) * radius;
            const theta = MathUtils.randFloatSpread(360);
            const phi = MathUtils.randFloatSpread(360);
        
            const x = distance * Math.sin(theta) * Math.cos(phi)
            const y = distance * Math.sin(theta) * Math.sin(phi);
            const z = distance * Math.cos(theta);
        
            positions.set([x, y, z], i * 3);
        }
        
    
        return positions;
    }, [count]);

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                attach="attributes-position"
                count={particlesPosition.length / 3}
                array={particlesPosition}
                itemSize={3}
                />
            </bufferGeometry>
            <shaderMaterial
            depthWrite={false}
            uniforms={uniforms}
            vertexShader={vertexShader}
            fragmentShader={fragmentShader}
            />
        </points>
    );
}

const vertexShader = `
uniform float uTime;
uniform float uRadius;

mat3 rotation3dY(float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return mat3(
      c, 0.0, -s,
      0.0, 1.0, 0.0,
      s, 0.0, c
    );
}

void main() {
    float distanceFactor = pow(uRadius - distance(position, vec3(0.0)), 1.5);
    vec3 particlePosition = position * rotation3dY(uTime * 0.3 * distanceFactor);

    vec4 modelPosition = modelMatrix * vec4(particlePosition, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;
    gl_PointSize = 3.0;
}
`;

const fragmentShader = `
void main() {
    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
}
`;

const vertexShader = `
uniform float uTime;
uniform float uRadius;
precision mediump float;

void main() {
    float distanceFactor = pow(uRadius - distance(position, vec3(0.0)), 1.5);
    vec3 particlePosition = position * (uTime * 0.3 * distanceFactor);

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

`Using`;
<points ref={meshRef}>
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
    vertexShader={nightVertexShader}
    fragmentShader={nightFragmentShader}/>
</points>

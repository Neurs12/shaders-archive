const vertexShader = `
varying vec2 vUv;
varying float vZ;
uniform float uTime;

precision mediump float;

void main() {
    // uv -> A vec2 variable contains the information about the pixel (x, y).
    vUv = uv;

    // modelMatrix -> position, scale, ratation of model.
    // viewMatrix -> position, orientation of camera.
    // projectionMatrix -> projects object onto screen (aspect ratio & prespective)
    // position -> Current xyz of the vertex.

    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    modelPosition.z += sin(modelPosition.x * 2.0 + uTime * 2.0) * 0.5;
    modelPosition.x += sin(modelPosition.y * 2.0 + uTime * 2.0) * 0.5;
    modelPosition.y += sin(modelPosition.z * 2.0 + uTime * 2.0) * 0.5;

    vZ = modelPosition.y;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;
}
`;

const fragmentShader = `
varying vec2 vUv;
varying float vZ;

vec3 colorA = vec3(0.912,0.191,0.652);
vec3 colorB = vec3(1.000,0.777,0.052);

void main() {
    vec3 finalColor = mix(colorA, colorB, vZ);

    gl_FragColor = vec4(finalColor, 1.0);
}
`;

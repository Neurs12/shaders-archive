const nightVertexShader = `
uniform float uTime;

precision mediump float;

void main() {

    // modelMatrix -> position, scale, ratation of model.
    // viewMatrix -> position, orientation of camera.
    // projectionMatrix -> projects object onto screen (aspect ratio & prespective)
    // position -> Current xyz of the vertex.
    // normal -> Current facing directions of the vertex.

    vec3 newPosition = position + normal * ((sin(uTime) + 1.0) * 1.75);

    vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;
}
`;

const nightFragmentShader = `
void main() {
    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
}
`;

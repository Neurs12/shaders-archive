# Shaders Archive
A fun little repository for me to store some of my shaders

## Template
Vertex shader:
```glsl
varying vec2 vUv;
uniform float uTime;

precision mediump float;

void main() {
    // uv -> A vec2 variable contains the information about the pixel (x, y).
    vUv = uv;

    // modelMatrix -> position, scale, ratation of model.
    // viewMatrix -> position, orientation of camera.
    // projectionMatrix -> projects object onto screen (aspect ratio & prespective)
    // position -> Current xyz of the vertex.
    // normal -> Current facing directions of the vertex.

    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;
}
```

Fragment shader:
```glsl
varying vec2 vUv;

void main() {
    vec3 finalColor = vec3(1.0, 1.0, 1.0);

    gl_FragColor = vec4(finalColor, 1.0);
}
```

## Shaders folder
- `Ig_cloth`: A flying plane changing gradient color using with Y position.
- `Breathing`: A pulsing sphere, using normal.

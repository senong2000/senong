uniform float amplitude;

attribute float displacement;

varying vec3 vNormal;
varying vec2 vUv;

void main(void) {

    vNormal = normal;
    vUv = (.5 + amplitude) * uv + vec2(amplitude);

    vec3 newPosition = position + amplitude * normal * vec3(displacement);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.);

}
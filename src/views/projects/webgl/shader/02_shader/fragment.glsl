varying vec3 vNormal;
varying vec3 vColor;
void main() {
    vec3 color = vec3(vColor);
    gl_FragColor = vec4(color, 1.0);
}`
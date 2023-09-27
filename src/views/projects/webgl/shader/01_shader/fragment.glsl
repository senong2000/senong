varying vec3 vNormal;
varying vec2 vUv;

uniform vec3 color;
uniform sampler2D colorTexture;

void main(void){
    
    vec3 light=vec3(.5,.2,1.);
    light=normalize(light);
    
    float dProd=dot(vNormal,light)*.5+.5;
    
    vec4 tcolor=texture2D(colorTexture,vUv);
    vec4 gray=vec4(vec3(tcolor.r*.3+tcolor.g*.59+tcolor.b*.11),1.);
    
    gl_FragColor=gray*vec4(vec3(dProd)*vec3(color),1.);
    
}
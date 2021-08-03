precision highp float;

uniform sampler2D texture;

varying vec2 vUv;

void main() {
  vec4 textureColor = texture2D(texture, vUv);
  gl_FragColor = vec4(vec3(1.0), textureColor.r * 0.5);
}

precision highp float;

uniform sampler2D texture;
uniform vec3 color;

varying vec2 vUv;

void main() {
  vec4 textureColor = texture2D(texture, vUv);
  gl_FragColor = vec4(color, textureColor.r);
}

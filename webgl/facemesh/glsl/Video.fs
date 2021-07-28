precision highp float;

uniform sampler2D tVideo;

varying vec2 vUv;

void main() {
  vec4 videoColor = texture2D(tVideo, vUv);

  gl_FragColor = videoColor;
}

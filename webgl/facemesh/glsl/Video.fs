#version 300 es
precision highp float;

uniform sampler2D tVideo;

in vec2 vUv;

out vec4 fragColor;

void main() {
  vec4 videoColor = texture(tVideo, vUv);

  fragColor = videoColor;
}

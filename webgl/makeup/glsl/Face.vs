precision highp float;

attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;

uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;
uniform mat3 uvTransform;

varying vec2 vUv;

void main(void) {
  vec3 transformed = position;
  vec4 mvPosition = viewMatrix * modelMatrix * vec4(transformed, 1.0);

  vUv = (uvTransform * vec3(uv, 1.0)).xy;

  gl_Position = projectionMatrix * mvPosition;
}

#version 300 es
precision highp float;

in vec3 position;
in vec3 normal;
in vec2 uv;

uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;
uniform mat3 uvTransform;

out vec2 vUv;

void main(void) {
  vec3 transformed = position;
  vec4 mvPosition = viewMatrix * modelMatrix * vec4(transformed, 1.0);

  vUv = (uvTransform * vec3(uv, 1.0)).xy;

  gl_Position = projectionMatrix * mvPosition;
}

precision highp float;

attribute vec3 position;
attribute float pointSize;

uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;

void main(void) {
  vec3 transformed = position;
  vec4 mvPosition = viewMatrix * modelMatrix * vec4(transformed, 1.0);

  gl_Position = projectionMatrix * mvPosition;
  gl_PointSize = pointSize;
}

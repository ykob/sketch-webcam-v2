precision highp float;

uniform sampler2D texture;

void main() {
  vec4 textureColor = texture2D(texture, gl_PointCoord);
  gl_FragColor = vec4(textureColor.rgb, length(textureColor.rgb) * 0.25);
}

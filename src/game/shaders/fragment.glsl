precision mediump float;
uniform vec4 u_color;
uniform vec3 u_ambient_light;
uniform sampler2D u_diffuse;
uniform mat4 u_projection;

uniform vec3 u_point_light_positions[64];
uniform vec4 u_point_light_color[64];

varying vec2 v_texCoord;
varying vec4 v_worldCoord;

void main(){
	gl_FragColor = u_color * texture2D(u_diffuse, v_texCoord);
	if (gl_FragColor.w == 0.0){
		discard;
	}
}
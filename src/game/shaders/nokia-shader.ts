import { Shader } from "scrapy-engine";
import vertexSrc from "./vertex.glsl";
import fragmentSrc from "./fragment.glsl";

export class NokiaShader extends Shader {
	public get vertexSrc(): string {
		return vertexSrc;
	}
	public get fragmentSrc(): string {
		return fragmentSrc;
	}
	public get name(): string {
		return "NokiaShader";
	}
}
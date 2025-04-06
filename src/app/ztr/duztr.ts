import { e2i } from "./e2i";
import { i2l } from "./i2l";
import { u2i } from "./u2i";

export const duztr = function (ioz: { i: string; o: string; z: string  }): void {
	switch (ioz.z) {
		case "e2i": e2i(ioz); break;
		case "u2i":	u2i(ioz); break;
		case "i2l": i2l(ioz); break;
	}
}
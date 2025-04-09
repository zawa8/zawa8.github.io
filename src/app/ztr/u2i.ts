import { u2idict } from "./u2idict";
import { usinhl2idict } from "./usinhl2idict";

function u2i_pre(ioz: { i: string; o: string; z: string  }): void {
    ioz.i = ioz.i.toLowerCase();
    ioz.i = ioz.i.replaceAll(/([\s\b])क्ष/g, "$1sh").replaceAll(/^क्ष/g, 'sh').replaceAll('ज्ञ', 'gy');
}
/*
 * // .replaceAll(/([kgcztdTDpbs])___h/g, "$1_h").replaceAll(/___h/g, "h").replaceAll(/\b_/g, "")  
*/          
function u2i_post(ioz: { i: string; o: string; z: string  }): void {
	// wowel_chr at boundary/in_between
	//nई ई कई uई eई oई iई  αई Aई  aई Nई
    ioz.o = ioz.o.replaceAll(
		/^A([IUEO])/g, "$1").replaceAll(
		/([^kgcztdjqpbshɦyrlwmnf])A([IUEO])/g, "$1$2").replaceAll(
		/([IUEO])/g, function(v) { return v.toLowerCase(); }
	);
    ioz.o = ioz.o.replaceAll(
        /([a-zԃɦńᴛ])Aa/g,"$1a").replaceAll(
        /([iueo])A([αIUEO])/g,"$1$2").replaceAll(
        /wN\b/g,"wm").replaceAll(
        /([Aaiueo])N\b/g,"$1").replaceAll(
        /N([w])/g,"$1").replaceAll( //gaNw nhi gaw
        /(^r)N$/g,"$1").replaceAll(
        /N([),\'\s\.!\?naeiuhwv\b])/g,"$1").replaceAll(
        /N([bBpf])/g,"m$1").replaceAll(
        /N([^kgKG])/g,"n$1").replaceAll(
        /N/g,"n");
    //ioz.o = ioz.o.replaceAll( /chch/ig,"cch");
    //ioz.o = ioz.o.replaceAll( /([kgcztdjqpbs])ɦ/g,"$1ah");//.replaceAll("ɦ","h");
    //ioz.o = ioz.o.replaceAll( /([kgcztdjqpbs])ɦ/ig,"$1ah");//.replaceAll("ɦ","h");
}
/*
 * function is_in_it(list: Array<number> | Record<string, unknown>, val: number): boolean {
        if (!Array.isArray(list)) { list = Object.keys(list).map(Number); }
        return list.indexOf(val) !== -1;
}
*/
export function u2i(ioz: { i: string; o: string; z: string  }): void {
    u2i_pre(ioz);
    const inputLength: number = ioz.i.length;
    let indeks: number = 0;
    ioz.o = '';
    let curr_char: string = ''; let nekst_char: string = '';
    let curr_char_code: number = 0;
    let curr_lang_code: number = 0;
    let curr_char_modulo: number = 0;
    while (indeks < inputLength) {
        if (indeks === 0) { curr_char = ioz.i[indeks]; } else { curr_char = nekst_char; }
        curr_char_code = curr_char.charCodeAt(0);
        curr_lang_code = (curr_char_code / 0x80) >> 0;
        curr_char_modulo = curr_char_code % 0x80;        
        nekst_char = ioz.i[indeks + 1];
        if (curr_lang_code > 0x11 && curr_lang_code < 0x1B) {
			ioz.o += u2idict.all_phoniks_list[curr_char_modulo]; 
        } else if (curr_lang_code === 0x1B) {
			ioz.o += usinhl2idict.all_phoniks_list[curr_char_modulo]; 
        } else { ioz.o += curr_char; }
		indeks++;
    }
    u2i_post(ioz);
}

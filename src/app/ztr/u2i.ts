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
    ioz.i = ioz.o = ioz.o.replaceAll(/\ba([IUEO])/g, "$1");//.replaceAll(/([hiueo])A/g, "$1");
    ioz.i = ioz.o = ioz.o.replaceAll(
        /([a-zԃɦńᴛ])aa/ig,"$1a").replaceAll(
        /([iueo])a([αIUEO])/g,"$1$2").replaceAll(
        /wN$/g,"wm").replaceAll(
        /([aiueo])N\b/g,"$1").replaceAll(
        /N([w])/g,"$1").replaceAll( //gaNw nhi gaw
        /(^r)N$/g,"$1").replaceAll(
        /N([),\s\.!\?naeiuhwv\b])/g,"$1").replaceAll(
        /N([bp])/g,"m$1").replaceAll(
        /N([^kg])/g,"n$1");

    ioz.i = ioz.o = ioz.o.replaceAll( /chch/ig,"cch");
    ioz.i = ioz.o = ioz.o.replaceAll( /U/g,"u");
    ioz.i = ioz.o = ioz.o.replaceAll( /E/g,"e");
    ioz.i = ioz.o = ioz.o.replaceAll( /I/g,"i");
    ioz.i = ioz.o = ioz.o.replaceAll( /O/g,"o");

}
export function u2i(ioz: { i: string; o: string; z: string  }): void {
    function is_in_it(list: Array<number> | Record<string, unknown>, val: number): boolean {
        if (!Array.isArray(list)) { list = Object.keys(list).map(Number); }
        return list.indexOf(val) !== -1;
    }
    u2i_pre(ioz);
    const inputLength: number = ioz.i.length;
    let indeks: number = 0;
    ioz.o = '';
    let curr_char: string = ''; let nekst_char: string = '';
    let curr_char_code: number = 0;
    let prev_lang_code: number = 0; let curr_lang_code: number = 0;
    let prev_char_modulo: number = 0; let curr_char_modulo: number = 0;
    // let nekst_char_code: number = 0;
    // let nekst_lang_code: number = 0;
    // let nekst_char_modulo: number = 0;
    while (indeks < inputLength) {
        prev_lang_code = curr_lang_code; prev_char_modulo = curr_char_modulo; 
        if (indeks === 0) { curr_char = ioz.i[indeks]; } else { curr_char = nekst_char; }
        curr_char_code = curr_char.charCodeAt(0);
        curr_lang_code = (curr_char_code / 0x80) >> 0; curr_char_modulo = curr_char_code % 0x80;        
        nekst_char = ioz.i[indeks + 1];
        // if (indeks + 1 < inputLength) {
            // nekst_char_code = nekst_char.charCodeAt(0);
            //nekst_lang_code = (nekst_char_code / 0x80) >> 0;
            //nekst_char_modulo = nekst_char_code % 0x80;
        // } else { 
            // nekst_char_code = nekst_lang_code = nekst_char_modulo = -1; 
            // nekst_char_code = -1; 
        // }

        if (curr_lang_code > 0x11 && curr_lang_code < 0x1B) {
            if (is_in_it([7,8,9,10,13,14,15,16,19,20,21], curr_char_modulo)) {
                if (prev_lang_code > 0 && prev_char_modulo > 20 && prev_char_modulo < 58) {
                    // ioz.o += 'a'; // कई=kaI
                }
                ioz.o += u2idict.all_phoniks_list[curr_char_modulo];
            } else { 
                ioz.o += u2idict.all_phoniks_list[curr_char_modulo]; 
            }
            indeks++;
        } else if (curr_lang_code === 0x1B) {
            if (is_in_it([9,10,11,12,17,18,19,20], curr_char_modulo)) {
                if (prev_lang_code === 0x1B && prev_char_modulo > 0x19 && prev_char_modulo < 0x47 ) {
                    //ioz.o += 'a';  // कई
                }
                ioz.o += usinhl2idict.all_phoniks_list[curr_char_modulo];
            } else { 
                ioz.o += usinhl2idict.all_phoniks_list[curr_char_modulo]; 
            }
            indeks++;
        } else { 
            ioz.o += curr_char; 
            indeks++; 
        }
    }
    u2i_post(ioz);
}

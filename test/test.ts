import { Tinify } from "../mod.ts";

const img = await Deno.readFile('test/Uncompressed-image.jpg') ; 


const tinify = new Tinify({
    api_key:"<API_KEY>",
})


const reimage:any = await (await tinify.compress(img))
 console.log(await reimage.saveTo('test/Compressed-image.jpg'))
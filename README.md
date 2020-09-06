simple URL validator with Typescript for Deno 🦕
# Usag:
## Permssion Flags (``Require``):
- ``--allow-net``   : for API Requests To Tinify Server
- ``--allow-read``  : for read images and post it to server for compression process
- ``--allow-write`` : for create new Image after compression process
## Authentication:
You must have a valid Tinify ``API key`` (you can get your own from [here](https://tinypng.com/developers))
**If you need to save the compressed image to a server** :
 
```js
import { Tinify } from "https://deno.land/x/tinify/mod.ts";
// Read file frome the server
const img = await Deno.readFile('test/Uncompressed-image.jpg') ; 

// Replace <API_KEY> with your tinify api key for more info visite https://tinypng.com/developers
const tinify = new Tinify({
    api_key:"<API_KEY>"
})

const compressedImage:any = await (await tinify.compress(img)) // Image compression process

console.log(await compressedImage.saveTo('test/Compressed-image.jpg')) // save new compressed image in the server
 ```
## Output:
```js
{
  input: { size: 402678, type: "image/jpeg" },
  output: {
    size: 168904,
    type: "image/jpeg",
    width: 1920,
    height: 1280,
    ratio: 0.4195,
    url: "https://api.tinify.com/output/r72h1n39uugta3p2yybnqukdj3rbwhv6"
  },
  compressedImagePath: "test/Compressed-image.jpg"
}
```

**If you need to convert the compressed image to base64 string** :
```js

const compressedImage:any = await (await tinify.compress(img)) // Image compression process from Uint8Array encode (file)
const compressedImage:any = await (await tinify.compress(imgURL)) // Image compression process from url

console.log(await compressedImage.saveTo('test/Compressed-image.jpg'))
```
## Output:
```js
{
  input: { size: 402678, type: "image/jpeg" },
  output: {
    size: 168904,
    type: "image/jpeg",
    width: 1920,
    height: 1280,
    ratio: 0.4195,
    url: "https://api.tinify.com/output/r72h1n39uugta3p2yybnqukdj3rbwhv6"
  },
  base64Image: "base64 string of the compressed image"
}
```
## After (``Compressed``)
- Size: 168904 Byte (164.9 KB)

![Comressed image](https://raw.githubusercontent.com/moncefplastin07/deno-tinify/master/test/Compressed-image.jpg)
**``This picture is taken from Unsplash``** [Unsplash](https://unsplash.com/photos/IKUYGCFmfw4)
## Before (``Original``)
- Size: 402678 Byte (393.2 KB)

![Uncomressed image](https://raw.githubusercontent.com/moncefplastin07/deno-tinify/master/test/Uncompressed-image.jpg)

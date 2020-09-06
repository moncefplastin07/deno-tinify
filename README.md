simple URL validator with Typescript for Deno 🦕
# Usag:
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
const compressedImage:any = await (await tinify.compress(img)) // Image compression process

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
## After
- Size: 168904 Byte (164.9 KB)

![Comressed image](https://api.tinify.com/output/r72h1n39uugta3p2yybnqukdj3rbwhv6)
## Before
- Size: 402678 Byte (393.2 KB)
![Uncomressed image](https://deno.land/x/tinify/test/Uncompressed-image.jpg)

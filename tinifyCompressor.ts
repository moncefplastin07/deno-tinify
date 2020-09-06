import { Base64 } from "https://deno.land/x/bb64/mod.ts";
import { isURL } from "https://deno.land/x/is_url/mod.ts";
interface TinifyConfig {
  api_key: string;
  storagePath?: string;
}
const { writeFile } = Deno;
class Tinify {
  // AOI Key Declarion
  private API_KEY: string;

  // Storage path
  private storagePath: string = "";

  // API endpint
  private apiEndpoint = "https://api.tinify.com/shrink";

  // oject constructor
  constructor(config: TinifyConfig) {
    this.API_KEY = config.api_key;
    if (config.storagePath) {
      this.storagePath = config.storagePath;
    }
  }

  /**
     * genreate Authentication string for Basic scheme from api key
     * @returns Base64 string
     */
  private authString() {
    return Base64.fromString(`api:${this.API_KEY}`).toString();
  }

  /**
     * send the image to tinify API endpoint
     * @param requestInit RequestInit
     * @returns json
     */
  private async compressImageRequest(requestInit: RequestInit) {
    const response = await fetch(this.apiEndpoint, {
      method: "POST",
      ...requestInit,
    });

    const jsonReponse = await response.json()

    // throw Unauthorized Error whene Credentials are invalid. or success response
    return response.ok ?  Promise.resolve(jsonReponse) : Promise.reject(`${jsonReponse.error}: ${jsonReponse.message}`)
  }

  /**
     * get buffer image and return Uint8Array Encode
     * @param bufferImage ArrayBuffer
     * @returns Uint8Array
     */
  private bufferImageToUint8Array(bufferImage: ArrayBuffer) {
    return new Uint8Array(bufferImage);
  }

  // get the image as arrayBuffer from URL
  private async getImageFromURL(imageURL: string) {
    const response = await fetch(imageURL);
    return response.arrayBuffer();
  }

  public async compress(imageSource: Uint8Array | string) {
    let response: any;
    if (isURL(imageSource)) {
      response = await this.compressImageRequest({
        headers: {
          "Authorization": `Basic ${this.authString()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "source": {
            "url": imageSource,
          },
        }),
      });
    } else {
      response = await this.compressImageRequest({
        headers: {
          "Authorization": `Basic ${this.authString()}`,
        },
        body: imageSource,
      });
    }

    // get beffer compressed image from tinify API
    const bufferCompressedImage: any = await this.getImageFromURL(
      (await response).output.url,
    );

    return {
      // seve the compersed image as file to the server
      saveTo: async (fileName: string, storagePath?: string) => {
        // create new image
        await writeFile(
          `${storagePath ? storagePath : this.storagePath}${fileName}`,
          this.bufferImageToUint8Array(bufferCompressedImage),
        );

        return {
          ...await response,
          compressedImagePath: `${
            storagePath ? storagePath : this.storagePath
          }${fileName}`,
        };
      },

      /**
      * convert the compresed image to base64 stribng
      */
      toBase64: async () => {
          const base64Image = Base64.fromUint8Array(
            this.bufferImageToUint8Array(bufferCompressedImage),
          ).toString()
        return {
            ...await response,
            base64: base64Image,
          };

      }
    };
  }
}

export { Tinify };

import axios from "axios";

function uploadAdapter(loader) {
  return {
    upload: () => {
      return new Promise((resolve, reject) => {
        const body = new FormData();
        loader.file.then(async (file) => {
          body.append("file", file);

          try {
            const { data } = await axios.post(
              "http://192.168.3.136:5000/st/upload",    // upload req that it should make
              body
            );
console.log(data.data.url)
            resolve( data.data );
          } catch (err) {
            console.log(err);
            reject(err);
          }
        });
      });
    },
  };
}
export function uploadPlugin(editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    return uploadAdapter(loader);
  };
}

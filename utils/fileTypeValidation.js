import convertTo64 from "./converToBase64";

export const fileTypeVaidation = async (e) => {
  const file = e.target.files[0]
  const imageRegex = /image\//;

      if (!imageRegex.test(file.type)) {
        return "Please Only Upload img, jpg or png file";
      } else {
        const base64 = await convertTo64(e);
        return base64;
      }

  
};

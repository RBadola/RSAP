const imageToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export default async function convertTo64(e) {
  const file = e.target.files[0];
  if (file) {
    try {
      const base64 = await imageToBase64(file);
      return base64; 
    } catch (error) {
     return new Error("Error converting image to base64: ",   );
    }
  }
  return null; 
}

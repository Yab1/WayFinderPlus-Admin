const fileReader = (file, handleSuccess, handleFailure) => {
  if (file && file.type.startsWith("image/")) {
    const reader = new FileReader();

    reader.onload = (e) => {
      handleSuccess(file, e.target.result);
    };

    reader.onerror = (e) => {
      handleFailure(e.target.error);
    };

    reader.readAsDataURL(file);
  } else {
    handleFailure("Please select an image file");
  }
};

export default fileReader;

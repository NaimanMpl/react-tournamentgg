export const getBase64Image = (image) => {
    if (image === '') return;
    return `data:image/jpeg;base64,${image}`;
}
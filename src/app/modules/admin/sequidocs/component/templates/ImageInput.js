import React, { useState } from 'react';

const ImageInput = () => {
  const [text, setText] = useState('');

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handlePaste = (e) => {
    const items = e.clipboardData.items;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.type.indexOf('image') !== -1) {
        const blob = item.getAsFile();
        const reader = new FileReader();

        reader.onloadend = () => {
          const img = new Image();
          img.src = reader.result;
          img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;

            const context = canvas.getContext('2d');
            context.drawImage(img, 0, 0);

            const dataUrl = canvas.toDataURL('image/png');
            const newText = `${text} ![Pasted Image](${dataUrl}) `;
            setText(newText);
          };
        };

        reader.readAsDataURL(blob);
        break;
      }
    }
  };

  return (
    <div>
      <textarea
        value={text}
        onChange={handleTextChange}
        onPaste={handlePaste}
        placeholder="Type here or paste an image..."
      />
    </div>
  );
};

export default ImageInput;

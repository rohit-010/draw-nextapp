export default async function handler(req, res) {
  const text = req.body?.message;
  console.log('text-->', text);
  const reqBody = {
    text: text,
  };

  const response = await fetch('https://draw-backend-7omz.onrender.com/draw', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(reqBody),
  });
  // console.log('handler--> response', response);
  // const data = await response.json();
  const data = await response.arrayBuffer();
  const buffer = Buffer.from(data);
  //
  console.log('buffer:', buffer);

  // console.log('buffer--> length', buffer.length);

  res.status(200).send(buffer);
}

function toArrayBuffer(buffer) {
  const arrayBuffer = new ArrayBuffer(buffer.length);
  const view = new Uint8Array(arrayBuffer);
  for (let i = 0; i < buffer.length; ++i) {
    view[i] = buffer[i];
  }
  return arrayBuffer;
}

export default async function handler(req, res) {
  const text = req.body?.message;
  console.log('text-->', text);
  const reqBody = {
    text: text,
  };

  const response = await fetch(process.env.DRAW_BACKEND_API, {
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
  console.log('buffer byte length:', buffer?.byteLength);
  if (buffer?.byteLength) {
    res.status(200).send(buffer);
  }

  res.status(500).send('Error occurred in backend api');
  // console.log('buffer--> length', buffer.length);
}

function toArrayBuffer(buffer) {
  const arrayBuffer = new ArrayBuffer(buffer.length);
  const view = new Uint8Array(arrayBuffer);
  for (let i = 0; i < buffer.length; ++i) {
    view[i] = buffer[i];
  }
  return arrayBuffer;
}

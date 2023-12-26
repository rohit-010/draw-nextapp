'use client';
import React from 'react';
import { useState, useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';

export default function Home() {
  const [drawData, setDrawData] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.ChangeEvent<any>) {
    e.preventDefault();
    const data: any = new FormData(e.currentTarget);
    try {
      setIsLoading(true);
      const response = await fetch('/api/draw', {
        method: 'post',
        body: new URLSearchParams(data),
      });
      if (response.status != 200) {
        setIsLoading(false);
        throw new Error(`Invalid response: ${response.status}`);
      }

      if (response) {
        // res.setHeader('Content-Length', buffer.length);
        // res.write(buffer, 'binary');
        // res.end();

        const blob = await response.blob();

        const blobURL = URL.createObjectURL(blob);
        console.log('blobURL', blobURL);
        // const drawData = await response.json();
        setIsLoading(false);
        setDrawData(blobURL);
      }

      // alert('Thanks for contacting us, we will get back to you soon!');
    } catch (err) {
      console.error(err);
      alert('Error occurred in backend request, try again some time later?');
    }
  }

  const downloadImage = () => {
    const link = document.createElement('a');
    link.href = drawData;
    link.download = 'download';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <form className="container" onSubmit={handleSubmit}>
        <h1>
          You imagine and provide text input and we provide output in image
        </h1>

        <div className="message block">
          <label htmlFor="frm-message">Message</label>
          <textarea id="frm-message" rows={6} name="message"></textarea>
        </div>
        <div className="button-block block">
          <button type="submit" disabled={isLoading}>
            Draw
          </button>
          <button type="button" onClick={() => document.location.reload()}>
            Reload
          </button>
        </div>
      </form>

      {isLoading && (
        <div>
          <LoadingSpinner />
        </div>
      )}

      {drawData && (
        <div className="ai-image">
          <div className="button block">
            <button type="button" onClick={downloadImage}>
              Download Image
            </button>
          </div>
          <div className="text-center">
            <img src={drawData} alt="home"></img>
          </div>
        </div>
      )}
    </div>
  );
}

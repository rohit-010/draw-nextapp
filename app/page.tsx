'use client';
import React from 'react';
import { useState, useEffect } from 'react';

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
      if (!response.ok) {
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
      alert("We can't submit the form, try again later?");
    }
  }

  return (
    <form className="container" onSubmit={handleSubmit}>
      <h1>Submit the Text you want to Draw</h1>
      <h3>
        <i>draw anything</i>
      </h3>
      <div className="message block">
        <label htmlFor="frm-message">Message</label>
        <textarea id="frm-message" rows={6} name="message"></textarea>
      </div>
      <div className="button block">
        <button type="submit">Draw</button>
      </div>
      <div className="button block">
        <button type="button" onClick={() => document.location.reload()}>
          Reload
        </button>
      </div>

      {isLoading && (
        <div className="text-center">Drawing your data .........</div>
      )}

      {drawData && (
        <div className="text-center">
          <img src={drawData} alt="home"></img>
        </div>
      )}
    </form>
  );
}

'use client';
import React from 'react';
import { useState, useEffect } from 'react';

export default function Home() {
  const [drawData, setDrawData] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    try {
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
      <div className="message block">
        <label htmlFor="frm-message">Message</label>
        <textarea
          id="frm-message"
          rows="6"
          columns="20"
          name="message"
        ></textarea>
      </div>
      <div className="button block">
        <button type="submit">Draw</button>
      </div>
      <div className="button block">
        <button type="button" onClick={() => document.location.reload()}>
          Reload
        </button>
      </div>

      {drawData && (
        <div className="text-center">
          <img src={drawData} alt="home"></img>
        </div>
      )}
    </form>
  );
}

"use client";
import React, { useEffect, useRef, useState } from "react";
import QRCodeStyling, { FileExtension } from "qr-code-styling";

const QRStyler = () => {
  const [url, setUrl] = useState("https://qrexperiences.com");
  const [fileExt, setFileExt] = useState<FileExtension>("png");
  const [inputType, setInputType] = useState("url");
  const [inputValue, setInputValue] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const qrCodeRef = useRef<QRCodeStyling | null>(null);

  useEffect(() => {
    qrCodeRef.current = new QRCodeStyling({
      width: 300,
      height: 300,
      image: "/sparkles.svg", // Use the local image
      dotsOptions: {
        color: "#4267b2",
        type: "rounded",
      },
      imageOptions: {
        crossOrigin: "anonymous",
        margin: 20,
      },
    });

    if (ref.current) {
      qrCodeRef.current.append(ref.current);
    }
  }, []);

  useEffect(() => {
    qrCodeRef.current?.update({
      data: url,
    });
  }, [url]);

  const onExtensionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFileExt(event.target.value as FileExtension);
  };

  const onDownloadClick = () => {
    qrCodeRef.current?.download({
      extension: fileExt,
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleCreateQR = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let data;
    switch (inputType) {
      case "url":
        data = inputValue;
        break;
      case "text":
        data = inputValue;
        break;
      case "email":
        data = `mailto:${inputValue}`;
        break;
      case "vcard":
        data = `BEGIN:VCARD\n${inputValue}\nEND:VCARD`;
        break;
      case "wifi":
        data = `WIFI:T:WPA;S:${inputValue};`;
        break;
      default:
        data = inputValue;
    }
    setUrl(data);
  };

  return (
    <div className="App">
      <form onSubmit={handleCreateQR}>
        <div style={styles.inputWrapper}>
          <div>
            <label>
              <input
                type="radio"
                name="inputType"
                value="url"
                checked={inputType === "url"}
                onChange={() => setInputType("url")}
              />
              URL
            </label>
            <label>
              <input
                type="radio"
                name="inputType"
                value="text"
                checked={inputType === "text"}
                onChange={() => setInputType("text")}
              />
              Text
            </label>
            <label>
              <input
                type="radio"
                name="inputType"
                value="email"
                checked={inputType === "email"}
                onChange={() => setInputType("email")}
              />
              E-mail
            </label>
            <label>
              <input
                type="radio"
                name="inputType"
                value="vcard"
                checked={inputType === "vcard"}
                onChange={() => setInputType("vcard")}
              />
              VCard
            </label>
            <label>
              <input
                type="radio"
                name="inputType"
                value="wifi"
                checked={inputType === "wifi"}
                onChange={() => setInputType("wifi")}
              />
              WiFi
            </label>
          </div>
          <input value={inputValue} onChange={handleInputChange} style={styles.inputBox} placeholder="Add URL" />
          <button type="submit">Create QR</button>
          <select onChange={onExtensionChange} value={fileExt}>
            <option value="png">PNG</option>
            <option value="jpeg">JPEG</option>
            <option value="webp">WEBP</option>
          </select>
          <button type="button" onClick={onDownloadClick}>Download</button>
        </div>
      </form>
      <div className="qr-container">
        <div ref={ref} />
        <img src="/circle-pattern.svg" className="circle-pattern" alt="Circular Pattern" />
      </div>
    </div>
  );
};

const styles = {
  inputWrapper: {
    margin: "20px 0",
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
  inputBox: {
    flexGrow: 1,
    marginRight: 20,
  },
};

export default QRStyler;

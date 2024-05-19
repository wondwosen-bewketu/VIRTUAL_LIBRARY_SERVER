import React, { useState } from "react";
import { FormattedMessage, IntlProvider } from "react-intl";
import ReadingBook from "./Reading.gif";
import enMessages from "../locales/en.json";
import amMessages from "../locales/am.json";
import omMessages from "../locales/om.json";
import tgMessages from "../locales/tg.json";

const LandingPage = () => {
  const [locale, setLocale] = useState("en");

  const messages = {
    en: enMessages,
    am: amMessages,
    om: omMessages,
    tg: tgMessages,
  };

  const handleLanguageChange = (selectedLocale) => {
    setLocale(selectedLocale);
  };

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <div
        style={{
          backgroundColor: "#f0f4f8",
          minHeight: "100vh",
          width: "100vw",
          padding: "32px",
          boxSizing: "border-box",
          fontFamily: "'Poppins', sans-serif",
          color: "#333",
        }}
      >
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "48px",
            padding: "0 16px",
          }}
        >
          <img
            src="./Kitab_logo.png"
            alt="logo"
            style={{
              width: "180px",
              height: "120px",
              marginLeft: "-70px",
              marginTop: "-50px",
            }}
          />
          <h1
            style={{
              marginLeft: "-450px",
              marginTop: "-20px",
              fontSize: "2.5rem",
              fontWeight: "bold",
              color: "#ff6f61",
              display: "flex",
              alignItems: "center",
            }}
          >
            <FormattedMessage id="landingPage.header.title" />
          </h1>
          <div style={{ marginTop: "-60px", display: "flex", gap: "32px" }}>
            {["Library", "Authors", "Collections"].map((text) => (
              <a
                key={text}
                href="#"
                style={{
                  fontSize: "1.125rem",
                  fontWeight: "500",
                  color: "#333",
                  textDecoration: "none",
                  position: "relative",
                  padding: "8px 0",
                  transition: "color 0.3s",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#ff6f61")}
                onMouseLeave={(e) => (e.target.style.color = "#333")}
              >
                {text}
              </a>
            ))}
            <div style={{ marginTop: "7px", display: "flex", gap: "16px" }}>
              <a
                href="/register"
                style={{
                  fontSize: "1.125rem",
                  fontWeight: "500",
                  color: "#333",
                  textDecoration: "none",
                  transition: "color 0.3s",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#ff6f61")}
                onMouseLeave={(e) => (e.target.style.color = "#333")}
              >
                <FormattedMessage id="landingPage.header.button" />
              </a>
              <div style={{ position: "relative" }}>
                <button
                  style={{
                    fontSize: "1.125rem",
                    padding: "8px 16px",
                    backgroundColor: "#ff6f61",
                    color: "white",
                    border: "none",
                    borderRadius: "24px",
                    marginTop: "-10px",
                    cursor: "pointer",
                    transition: "background-color 0.3s, transform 0.3s",
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                  }}
                  onClick={(e) => {
                    const dropdown = e.currentTarget.nextElementSibling;
                    dropdown.style.display === "block"
                      ? (dropdown.style.display = "none")
                      : (dropdown.style.display = "block");
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "#e65c50";
                    e.target.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "#ff6f61";
                    e.target.style.transform = "translateY(0)";
                  }}
                >
                  EN
                </button>
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                    padding: "8px",
                    display: "none",
                  }}
                >
                  <button
                    style={{
                      fontSize: "1rem",
                      backgroundColor: "transparent",
                      border: "none",
                      cursor: "pointer",
                      padding: "4px 8px",
                      display: "block",
                      width: "100%",
                      textAlign: "left",
                    }}
                    onClick={() => handleLanguageChange("en")}
                  >
                    EN
                  </button>
                  <button
                    style={{
                      fontSize: "1rem",
                      backgroundColor: "transparent",
                      border: "none",
                      cursor: "pointer",
                      padding: "4px 8px",
                      display: "block",
                      width: "100%",
                      textAlign: "left",
                    }}
                    onClick={() => handleLanguageChange("am")}
                  >
                    AM
                  </button>
                  <button
                    style={{
                      fontSize: "1rem",
                      backgroundColor: "transparent",
                      border: "none",
                      cursor: "pointer",
                      padding: "4px 8px",
                      display: "block",
                      width: "100%",
                      textAlign: "left",
                    }}
                    onClick={() => handleLanguageChange("om")}
                  >
                    OM
                  </button>
                  <button
                    style={{
                      fontSize: "1rem",
                      backgroundColor: "transparent",
                      border: "none",
                      cursor: "pointer",
                      padding: "4px 8px",
                      display: "block",
                      width: "100%",
                      textAlign: "left",
                    }}
                    onClick={() => handleLanguageChange("tg")}
                  >
                    TG
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>
        <main
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            height: "calc(100vh - 128px)",
            gap: "32px",
            padding: "0 16px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "24px",
              flex: "1",
            }}
          >
            <h2 style={{ fontSize: "3rem", fontWeight: "bold", color: "#333" }}>
              <FormattedMessage id="landingPage.main.heading" />
            </h2>
            <p style={{ fontSize: "1.125rem", color: "gray" }}>
              <FormattedMessage id="landingPage.main.description" />
            </p>
            <div style={{ display: "flex", gap: "16px" }}>
              <button
                style={{
                  fontSize: "1.125rem",
                  padding: "12px 24px",
                  backgroundColor: "#ff6f61",
                  color: "white",
                  border: "none",
                  borderRadius: "24px",
                  cursor: "pointer",
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                  transition: "background-color 0.3s, transform 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#e65c50";
                  e.target.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "#ff6f61";
                  e.target.style.transform = "translateY(0)";
                }}
              >
                <FormattedMessage id="landingPage.main.downloadButton" />
              </button>
              <button
                style={{
                  fontSize: "1.125rem",
                  padding: "12px 24px",
                  backgroundColor: "transparent",
                  color: "#ff6f61",
                  border: "2px solid #ff6f61",
                  borderRadius: "24px",
                  cursor: "pointer",
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                  transition:
                    "background-color 0.3s, color 0.3s, transform 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#ff6f61";
                  e.target.style.color = "white";
                  e.target.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "transparent";
                  e.target.style.color = "#ff6f61";
                  e.target.style.transform = "translateY(0)";
                }}
              >
                <FormattedMessage id="landingPage.main.trialButton" />
              </button>
            </div>
          </div>
          <div
            style={{
              flex: "1",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={ReadingBook}
              alt="Reading illustration"
              style={{
                width: "100%",
                maxWidth: "500px",
                height: "auto",
                borderRadius: "24px",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              }}
            />
          </div>
        </main>
      </div>
    </IntlProvider>
  );
};

export default LandingPage;

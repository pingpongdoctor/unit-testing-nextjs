"use client";
import styles from "./page.module.scss";
import { useState } from "react";
import UserProfile from "./components/UserProfile";
import UserList from "./components/UserList";

export default function HomePage() {
  const [showText, setShowText] = useState<boolean>(false);
  const [showText2, setShowText2] = useState<boolean>(false);
  return (
    <main className={styles.mainElement}>
      {/* ELEMENTS FOR RENDERING TESTING */}
      <div style={{ marginBottom: "1rem" }}>
        {" "}
        <h1>Home Page</h1>
        <button>Click</button>
        <label htmlFor="input-1">Input Label</label>
        <input placeholder="This is a placeholder" type="text" id="input-1" />
      </div>

      {/* ELEMENTS FOR BEHAVIOUR TESTING */}
      <div>
        {/* TEXT THAT APPEAR IMMEDIATELY AFTER THE BUTTON IS CLICKED */}
        {showText && <p>Text that is rendered depending on state</p>}
        <button
          onClick={() => {
            setShowText(!showText);
          }}
        >
          Button to show the text
        </button>

        {/* TEXT THAT APPEAR AFTER A WHILE AFTER THE BUTTON IS CLICKED */}
        {showText2 && (
          <p>Text that is rendered after a while depending on state</p>
        )}
        <button
          onClick={() => {
            setTimeout(() => {
              setShowText2(!showText);
            }, 1100);
          }}
        >
          Button to show the text after a while
        </button>
      </div>
      <UserProfile
        name="simonfewfewfewfewcvwefwfewfewfewewfewfewfewfew"
        age={18}
        isVip={true}
      />

      <UserList />
    </main>
  );
}

import { useState } from "react";
import { CircuitTraces } from "../components/CircuitTraces";
import { DotNetworks } from "../components/DotNetworks";
import { MatrixRain } from "../components/MatrixRain";

export function Home() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");
  const [selected, setSelected] = useState("");

  return (
    <div>
      <MatrixRain>
        <section className="hero">
          <h1 className="font-3xl my-sm ink-dim">HACKING ACADEMY</h1>
          <p className="font-sm my-xs ink-dim">Foundational style showcase</p>
        </section>
      </MatrixRain>
      <CircuitTraces>
        <div className="container my-xl">
          <header className="my-3xl">
            <h2 className="font-xl my-sm text-center">Component showcase</h2>
            <p className="font-sm my-xs ink-dim text-center">
              Foundation styles and reusable controls
            </p>
          </header>

          <section className="card my-lg">
            <h2 className="font-xl my-sm">Interactive Controls</h2>

            <div className="my-md">
              <p className="font-sm my-xs" id="counter-label">
                Counter
              </p>
              <div
                className="flex gap-sm my-xs"
                role="group"
                aria-labelledby="counter-label"
              >
                <button
                  aria-label="Decrease count"
                  onClick={() => setCount((c) => c - 1)}
                >
                  &minus;
                </button>
                <button
                  aria-label="Increase count"
                  onClick={() => setCount((c) => c + 1)}
                >
                  +
                </button>
                <output className="font-lg mx-sm my-auto" aria-live="polite">
                  {count}
                </output>
              </div>
            </div>

            <div className="my-md">
              <label className="font-sm my-xs block" htmlFor="text-input">
                Text Input
              </label>
              <input
                id="text-input"
                type="text"
                placeholder="Type something..."
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>

            <div className="my-md">
              <label className="font-sm my-xs block" htmlFor="password-input">
                Password
              </label>
              <input
                id="password-input"
                type="password"
                placeholder="••••••••"
              />
            </div>

            <div className="my-md">
              <label className="font-sm my-xs block" htmlFor="email-input">
                Email
              </label>
              <input
                id="email-input"
                type="email"
                placeholder="you@academy.net"
              />
            </div>

            <div className="my-md">
              <label className="font-sm my-xs block" htmlFor="message-input">
                Textarea
              </label>
              <textarea
                id="message-input"
                placeholder="Multi-line input..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={3}
              />
            </div>

            <div className="my-md">
              <label className="font-sm my-xs block" htmlFor="module-select">
                Select
              </label>
              <select
                id="module-select"
                value={selected}
                onChange={(e) => setSelected(e.target.value)}
              >
                <option value="">Choose a module...</option>
                <option value="phishing">Phishing Defense</option>
                <option value="recon">Network Recon</option>
                <option value="exploit">Exploit Development</option>
                <option value="crypto">Cryptography</option>
              </select>
            </div>
          </section>

          <section className="my-lg">
            <h2 className="font-xl my-sm">Button Variants</h2>
            <div className="flex gap-sm my-md flex-wrap">
              <button>Primary</button>
              <button className="danger">Danger</button>
              <button className="warning">Warning</button>
              <button className="success">Success</button>
              <button className="invert">Invert</button>
              <button disabled>Disabled</button>
            </div>
          </section>

          <section className="card my-lg">
            <h2 className="font-xl my-sm">Card &amp; Details</h2>
            <div className="card my-md">
              <code>hello world</code>
            </div>
            <details>
              <summary>More info</summary>
              <p className="my-xs">
                This is collapsible content inside a details panel.
              </p>
            </details>
          </section>
        </div>
      </CircuitTraces>
      <DotNetworks>
        <div className="container my-xl">
          <section className="card my-lg">
            <h2 className="font-xl my-sm">Checkboxes &amp; Radio Buttons</h2>
            <fieldset className="my-md">
              <legend className="font-sm my-xs">Lab preferences</legend>
              <label>
                <input type="checkbox" defaultChecked />
                Show hints
              </label>
              <br />
              <label>
                <input type="checkbox" />
                Enable sound effects
              </label>
            </fieldset>
            <fieldset className="my-md">
              <legend className="font-sm my-xs">Difficulty</legend>
              <label>
                <input
                  type="radio"
                  name="difficulty"
                  value="beginner"
                  defaultChecked
                />
                Beginner
              </label>
              <br />
              <label>
                <input type="radio" name="difficulty" value="advanced" />
                Advanced
              </label>
            </fieldset>
          </section>
        </div>
      </DotNetworks>

      <section className="card my-lg">
        <h2 className="font-xl my-sm">Table</h2>
        <div className="table-wrap">
          <table>
            <caption className="font-sm">Training modules</caption>
            <thead>
              <tr>
                <th scope="col">Module</th>
                <th scope="col">Level</th>
                <th scope="col">Duration</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Network Recon</th>
                <td>Beginner</td>
                <td>45 min</td>
              </tr>
              <tr>
                <th scope="row">Cryptography</th>
                <td>Intermediate</td>
                <td>60 min</td>
              </tr>
              <tr>
                <th scope="row">Exploit Development</th>
                <td>Advanced</td>
                <td>90 min</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <footer className="my-3xl text-center">
        <p className="font-xs ink-dim">
          © 2026 Hacking Academy · Built with React + Vite
        </p>
      </footer>
    </div>
  );
}

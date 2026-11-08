import { Link } from "react-router-dom";
import { DotNetworks } from "../bg/DotNetworks";
import "./Hero.css";

export function Hero() {
  return (
    <DotNetworks>
      <section className="hero-section" aria-labelledby="hero-title">
        <div className="hero-section__inner">
          <div className="hero-copy">
            <p className="hero-eyebrow">
              <span aria-hidden="true">●</span> Ethical hacking, made clear
            </p>
            <h1 id="hero-title">
              Build skills.
              <br />
              <span>Protect what matters.</span>
            </h1>
            <p className="hero-copy__intro">
              Learn the foundations of cybersecurity through practical,
              responsible training.
            </p>

            <div className="hero-actions">
              <Link className="hero-action-button" to="/enroll">
                Start Learning <span aria-hidden="true">→</span>
              </Link>
              <Link
                className="hero-action-button hero-action-button--outline"
                to="/#courses"
              >
                View Courses
              </Link>
            </div>
            <p className="hero-note">
              Start with the basics. Build at your own pace.
            </p>
          </div>

          <div
            className="terminal"
            role="img"
            aria-label="Training terminal showing security fundamentals, a controlled lab environment, and authorized practice"
          >
            <div className="terminal__bar" aria-hidden="true">
              <span />
              <span />
              <span />
              <span>andeluse-lab — safe practice</span>
            </div>
            <div className="terminal__body" aria-hidden="true">
              <p>
                <span className="terminal__prompt">learner@andeluse:~$</span>{" "}
                start learning-path
              </p>
              <p>
                <span className="terminal__muted">[01]</span> Security
                fundamentals <span className="terminal__ok">ready</span>
              </p>
              <p>
                <span className="terminal__muted">[02]</span> Controlled lab
                environment <span className="terminal__ok">ready</span>
              </p>
              <p>
                <span className="terminal__muted">[03]</span> Responsible
                practice <span className="terminal__ok">always</span>
              </p>
              <p className="terminal__last">
                <span className="terminal__prompt">learner@andeluse:~$</span>{" "}
                <span className="terminal__cursor" />
              </p>
            </div>
            <p className="terminal__caption">
              <span aria-hidden="true">●</span> Training environment: authorized
            </p>
          </div>
        </div>
      </section>
    </DotNetworks>
  );
}

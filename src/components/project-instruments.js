import Image from "next/image";

function RenderLayer({ name, priority = false }) {
  return (
    <picture>
      <source
        media="(max-width: 599px)"
        srcSet={`/projects/${name}-small.webp`}
      />
      <Image
        src={`/projects/${name}.webp`}
        alt=""
        width={1000}
        height={640}
        unoptimized
        loading={priority ? "eager" : "lazy"}
        draggable={false}
      />
    </picture>
  );
}

export function CapacityMeter({ priority }) {
  return (
    <figure
      className="capacity-meter proof-instrument"
      aria-label="Allowance capacity meter"
    >
      <div className="proof-stage" aria-hidden="true">
        <RenderLayer name="bench-meter" priority={priority} />
        <svg viewBox="0 0 1000 640">
          {/* Orthographic face projection from the modeled dial. */}
          <g transform="matrix(1.61841 .13959 0 1.65349 448.386 447.798)">
            <g className="meter-needle">
              <path fill="#783f27" d="M-4 10 -1.6 -128 1.6 -128 4 10Z" />
              <path fill="#c35d32" d="M-2 10 -.5 -128 1 -128 1 10Z" />
            </g>
            <circle r="8" fill="#75523a" />
            <circle r="5.4" fill="#cd9871" />
            <circle r="2.2" fill="#345053" />
          </g>
        </svg>
        <label
          htmlFor="window-short"
          className="meter-key short-key"
          title="Show 5-hour window"
        />
        <label
          htmlFor="window-weekly"
          className="meter-key weekly-key"
          title="Show weekly window"
        />
      </div>
      <figcaption className="proof-caption">
        <fieldset>
          <legend className="proof-label">Simulated usage windows</legend>
          <div className="window-choices">
            <label>
              <input
                id="window-short"
                type="radio"
                name="usage-window"
                value="short"
                defaultChecked
                aria-describedby="short-capacity"
              />
              5-hour
            </label>
            <label>
              <input
                id="window-weekly"
                type="radio"
                name="usage-window"
                value="weekly"
                aria-describedby="weekly-capacity"
              />
              Weekly
            </label>
          </div>
        </fieldset>
        <div className="meter-reading" aria-live="polite">
          <p id="short-capacity">
            <strong>34% left</strong>
            <span>Resets at 4 pm</span>
          </p>
          <p id="weekly-capacity">
            <strong>72% left</strong>
            <span>Resets Friday at 9 am</span>
          </p>
        </div>
      </figcaption>
    </figure>
  );
}

export function SourceDrawer({ priority }) {
  return (
    <figure
      className="source-drawer proof-instrument"
      aria-label="Memorex cited decision"
    >
      <details>
        <summary>
          <span className="proof-stage" aria-hidden="true">
            <RenderLayer name="record-tray" priority={priority} />
            <svg viewBox="0 0 1000 640">
              {/* The moving record sits between the stack and the front lip. */}
              <g transform="matrix(1.4116 0.17023 0 1.4409 226.92645 238.35991)">
                <g className="source-record">
                  <rect
                    width="344"
                    height="175"
                    rx="4"
                    fill="#f3ecda"
                    stroke="#a89c83"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M0 40H344 M0 82H344 M0 110H344 M0 138H344"
                    stroke="#b1c2b9"
                    strokeWidth="1.1"
                  />
                  <path d="M17 0V175" stroke="#c38d79" />
                  <text
                    x="31"
                    y="28"
                    fontSize="15"
                    letterSpacing="1.4"
                    fontWeight="650"
                  >
                    DECISION / 04
                  </text>
                  <text x="31" y="72" fontSize="26" fontWeight="650">
                    Skip empty notes.
                  </text>
                  <text x="31" y="103" fontSize="17">
                    A blank field looked like
                  </text>
                  <text x="31" y="131" fontSize="17">
                    a completed visit.
                  </text>
                </g>
              </g>
            </svg>
            <RenderLayer name="record-tray-lip" priority={priority} />
          </span>
          <span className="proof-caption drawer-caption">
            <span>
              <span className="proof-label">Invented session brief</span>
              <strong>Omit blank visit notes.</strong>
            </span>
            <span className="drawer-action">
              <span className="open-record">Pull cited record ↑</span>
              <span className="close-record">File record ↓</span>
            </span>
          </span>
        </summary>
        <p className="record-transcript">
          <b>Decision 04</b> · A blank note on the printed route looked like a
          completed visit. Leave it off the page.
        </p>
      </details>
    </figure>
  );
}

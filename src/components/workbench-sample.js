export function WorkbenchSample() {
  return (
    <figure className="workbench-sample">
      <div className="sample-top">
        <span>MK Workbench</span>
        <span>Recreated example</span>
      </div>
      <div className="sample-sheets">
        <div className="source-slip">
          <span className="slip-label">Field note · 014</span>
          <p>
            Kitchen sink trap replaced.
            <br />
            Used one elbow fitting.
          </p>
        </div>
        <div className="review-slip">
          <span className="slip-label">Invoice review</span>
          <strong>Sink trap repair</strong>
          <div className="review-line">
            <span>Elbow fitting</span>
            <span>Qty 1</span>
          </div>
          <div className="review-check">
            <span aria-hidden="true">✓</span> Checked against job note
          </div>
        </div>
      </div>
      <figcaption>Sample job with invented details.</figcaption>
    </figure>
  );
}

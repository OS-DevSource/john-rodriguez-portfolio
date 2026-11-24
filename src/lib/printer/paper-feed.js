// Left edge of the paper from the thermal head, over the platen and onto the bench.
// Each point is [distance along sheet, image x, image y] in the fixed camera view.
const GUIDE = [
  [0, 471.83, 171.98],
  [21.74, 463.96, 186.3],
  [71.84, 445.69, 224.46],
  [156.71, 414.72, 290.12],
  [208.19, 395.93, 330.43],
  [233.32, 386.79, 351.58],
  [250.56, 380.7, 368.16],
  [268.13, 375.12, 387.34],
  [289.1, 369.53, 411.36],
  [319.81, 361.92, 446.67],
  [356.76, 353.29, 489.1],
  [393.17, 344.65, 530.94],
  [427.52, 335.52, 570.31],
  [458.21, 325.87, 604.01],
  [486.76, 315.72, 630.98],
  [515.98, 305.05, 653.7],
  [545.39, 294.39, 673.47],
  [572, 284.75, 690.14],
];
const WIDTH = 320;
const SIDE_MARGIN = 34;
const PRINT_WIDTH = WIDTH - 2 * SIDE_MARGIN;
export const LENGTH = GUIDE.at(-1)[0];
const ACROSS = [358.05, 80.75];

// Print the foot of the invoice first. The finished sheet reads upright from the slot.
const lines = [
  [76, 44, "INVOICE"],
  [121, 26, "No. 014"],
  [215, 36, "Sink trap"],
  [264, 36, "repair"],
  [347, 21, "PARTS"],
  [399, 33, "1 × elbow"],
  [510, 30, "REVIEWED"],
];
const rules = [148, 295, 450, 532];

export function createFeed(canvas) {
  const context = canvas.getContext("2d");
  const spool = document.createElement("canvas");
  spool.width = WIDTH;
  spool.height = LENGTH;
  const head = spool.getContext("2d");
  if (!context || !head) throw new Error("Paper rendering unavailable");

  let printed = 0;
  function reset() {
    const width = Math.min(
      1120,
      Math.max(
        1,
        Math.round(canvas.clientWidth * Math.min(devicePixelRatio, 2)),
      ),
    );
    canvas.width = width;
    canvas.height = Math.round((width * 5) / 7);
    head.clearRect(0, 0, WIDTH, LENGTH);
    printed = 0;
  }

  // Fire only the dot rows that have crossed the head since the last frame.
  // Ink lives on the spool in material coordinates throughout the rest of its travel.
  function burn(travel) {
    const next = Math.floor(travel);
    if (next <= printed) return;
    const top = LENGTH - next;
    const bottom = LENGTH - printed;
    head.save();
    head.beginPath();
    head.rect(0, top, WIDTH, bottom - top);
    head.clip();
    head.fillStyle = "#1d2e35";
    for (const [y, size, text] of lines) {
      if (y + size * 0.25 < top || y - size > bottom) continue;
      head.font = `bold ${size}px ${text === "INVOICE" ? "Arial, sans-serif" : "monospace"}`;
      head.fillText(text, SIDE_MARGIN, y, PRINT_WIDTH);
    }
    for (const y of rules) {
      if (y + 2 >= top && y <= bottom) head.fillRect(SIDE_MARGIN, y, PRINT_WIDTH, 2);
    }
    head.restore();
    printed = next;
  }

  function draw(travel) {
    burn(travel);
    context.setTransform(canvas.width / 1120, 0, 0, canvas.height / 800, 0, 0);
    context.clearRect(0, 0, 1120, 800);
    if (travel <= 0) return;
    const edge = [GUIDE[0]];
    for (let i = 1; i < GUIDE.length; i++) {
      const [s, x, y] = GUIDE[i];
      const [last, lx, ly] = GUIDE[i - 1];
      if (s < travel) {
        edge.push(GUIDE[i]);
        continue;
      }
      const t = (travel - last) / (s - last);
      edge.push([travel, lx + (x - lx) * t, ly + (y - ly) * t]);
      break;
    }

    const [dx, dy] = ACROSS;
    context.beginPath();
    edge.forEach(([, x, y], i) =>
      i ? context.lineTo(x, y) : context.moveTo(x, y),
    );
    for (let i = edge.length - 1; i >= 0; i--)
      context.lineTo(edge[i][1] + dx, edge[i][2] + dy);
    context.closePath();
    context.save();
    context.shadowColor = "#07101370";
    context.shadowBlur = (5 * canvas.width) / 1120;
    context.shadowOffsetY = (3 * canvas.height) / 800;
    context.fillStyle = "#eaede6";
    context.fill();
    context.restore();

    // Affine strips follow the calibrated curve. Shade the bend and the slot in
    // machine coordinates, while the source rows advance with the moving sheet.
    for (let i = 1; i < edge.length; i++) {
      const [s, x, y] = edge[i - 1];
      const [end, ex, ey] = edge[i];
      const length = end - s;
      if (length < 0.001) continue;
      context.save();
      context.transform(
        dx / WIDTH,
        dy / WIDTH,
        (ex - x) / length,
        (ey - y) / length,
        x,
        y,
      );
      const shade = (d) =>
        0.19 * Math.exp(-d / 8) + 0.13 * Math.exp(-((d - 345) ** 2) / 10000);
      const gradient = context.createLinearGradient(0, 0, 0, length);
      gradient.addColorStop(0, `rgba(43,55,68,${shade(s)})`);
      gradient.addColorStop(1, `rgba(43,55,68,${shade(end)})`);
      context.fillStyle = gradient;
      context.fillRect(0, 0, WIDTH, length);
      context.drawImage(
        spool,
        0,
        LENGTH - travel + s,
        WIDTH,
        length,
        0,
        0,
        WIDTH,
        length,
      );
      context.restore();
    }
  }
  return { reset, draw };
}

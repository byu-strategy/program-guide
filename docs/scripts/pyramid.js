// scripts/pyramid.js
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("pyramid-container");
  const palette  = document.getElementById("course-palette");

  // 1) your layers
  const layers = [
    { name: "Prerequisites", color: "#a6cee3" },
    { name: "Junior Core",   color: "#1f78b4" },
    { name: "Capstone",      color: "#b2df8a" }
  ];

  // 2) your catalog of courses
  const courses = [
    "ACC 200", "IS 201",
    "ACC 310", "ECON 110", "FIN 201", "GSCM 201", "GSCM 211",
    "IS 303", "MKTG 201", "STAT 121",
    "STRAT 326", "STRAT 401", "STRAT 402", "STRAT 431",
    "STRAT 411", "STRAT 412", "STRAT 432",
    "STRAT 421", "ENT 401",
    "STRAT 490R", "MSB 341", "MSB 342", "STRAT 477"
    // …add any others you like
  ];

  // Populate the course‐palette
  courses.forEach(name => {
    const block = document.createElement("div");
    block.className = "course-block";
    block.textContent = name;
    block.draggable = true;
    block.addEventListener("dragstart", e => {
      e.dataTransfer.setData("text/plain", name);
    });
    palette.appendChild(block);
  });

  // Create an SVG inside our container
  const W = 400, H = 300, N = layers.length, h = H / N;
  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("width", W);
  svg.setAttribute("height", H);
  container.appendChild(svg);

  // We'll track how many items have been dropped in each layer
  const dropCounts = Array(N).fill(0);

  // Build each layer as a polygon + drop‐zone
  layers.forEach((L, i) => {
    // compute trapezoid geometry
    const y1 = H - i * h, y0 = y1 - h;
    const w1 = W * ((N - i) / N), w0 = W * ((N - i - 1) / N);
    const pts = [
      [(W - w1) / 2, y1],
      [(W + w1) / 2, y1],
      [(W + w0) / 2, y0],
      [(W - w0) / 2, y0]
    ].map(p => p.join(",")).join(" ");

    // draw the filled layer
    const poly = document.createElementNS(svgNS, "polygon");
    poly.setAttribute("points", pts);
    poly.setAttribute("fill", L.color);
    poly.setAttribute("stroke", "#333");
    svg.appendChild(poly);

    // label it
    const tx = document.createElementNS(svgNS, "text");
    tx.setAttribute("x", W/2);
    tx.setAttribute("y", y0 + h/2 + 5);
    tx.setAttribute("text-anchor", "middle");
    tx.setAttribute("font-family", "sans-serif");
    tx.setAttribute("fill", "#fff");
    tx.setAttribute("font-size", "14px");
    tx.textContent = L.name;
    svg.appendChild(tx);

    // make it a drop‐zone
    poly.classList.add("layer-dropzone");
    poly.addEventListener("dragover", ev => {
      ev.preventDefault();
      poly.classList.add("hover");
    });
    poly.addEventListener("dragleave", () => {
      poly.classList.remove("hover");
    });
    poly.addEventListener("drop", ev => {
      ev.preventDefault();
      poly.classList.remove("hover");
      const course = ev.dataTransfer.getData("text/plain");
      if (!course) return;

      // compute bounding box
      const bb = poly.getBBox();
      const BLOCK_H = 20, PADDING = 4;
      const count  = dropCounts[i]++;

      // create a little div inside the pyramid container
      const d = document.createElement("div");
      d.className = "course-block dropped";
      d.textContent = course;
      // absolute position them stacking from the bottom
      d.style.left = `${bb.x + PADDING}px`;
      d.style.top  = `${bb.y + bb.height - (count+1)*(BLOCK_H + PADDING)}px`;
      d.style.width = `${bb.width - 2*PADDING}px`;
      d.style.height = `${BLOCK_H}px`;

      container.appendChild(d);
    });
  });
});

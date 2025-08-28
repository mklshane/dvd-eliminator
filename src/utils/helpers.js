import { LOGO_SIZE } from "./constants";

export const parseNames = (input) =>
  input
    .split(/[\n,]/)
    .map((name) => name.trim())
    .filter((name) => name.length > 0);

export const positionNames = (namesArray, container, colors) => {
  if (!container) return [];
  const newNameElements = [];

  for (const name of namesArray) {
    const tempDiv = document.createElement("div");
    tempDiv.style.fontSize = "14px";
    tempDiv.style.fontWeight = "600";
    tempDiv.style.padding = "6px 0";
    tempDiv.style.position = "absolute";
    tempDiv.style.visibility = "hidden";
    tempDiv.textContent = name;
    document.body.appendChild(tempDiv);
    const { width, height } = tempDiv.getBoundingClientRect();
    document.body.removeChild(tempDiv);

    let x, y;
    let attempts = 0;
    const maxAttempts = 50;
    const margin = 20;

    do {
      x = Math.random() * (container.clientWidth - width - margin * 2) + margin;
      y =
        Math.random() * (container.clientHeight - height - margin * 2) + margin;
      attempts++;
    } while (
      attempts < maxAttempts &&
      newNameElements.some(
        (existing) =>
          Math.abs(x - existing.x) < width + 20 &&
          Math.abs(y - existing.y) < height + 20
      )
    );

    newNameElements.push({
      id: Math.random().toString(36).substr(2, 9),
      name,
      x,
      y,
      width,
      height,
      color: colors[Math.floor(Math.random() * colors.length)],
      eliminated: false,
    });
  }
  return newNameElements;
};

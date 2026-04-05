import { useEffect, useState } from "react";
import "./CaseStudyCard.css";

const DARK_TEXT_COLOR = "#060010";
const LIGHT_TEXT_COLOR = "#FFFFFE";
const BRIGHTNESS_THRESHOLD = 160;

function sampleImageBrightness(imageSrc, onComplete) {
  const image = new Image();
  image.crossOrigin = "anonymous";

  image.onload = () => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d", { willReadFrequently: true });

    if (!context) {
      onComplete(LIGHT_TEXT_COLOR);
      return;
    }

    const sampleWidth = Math.max(1, Math.floor(image.naturalWidth * 0.28));
    const sampleHeight = Math.max(1, Math.floor(image.naturalHeight * 0.22));
    const startX = Math.max(0, image.naturalWidth - sampleWidth);
    const startY = 0;

    canvas.width = sampleWidth;
    canvas.height = sampleHeight;
    context.drawImage(
      image,
      startX,
      startY,
      sampleWidth,
      sampleHeight,
      0,
      0,
      sampleWidth,
      sampleHeight
    );

    try {
      const { data } = context.getImageData(0, 0, sampleWidth, sampleHeight);
      let totalBrightness = 0;
      let pixelCount = 0;

      for (let index = 0; index < data.length; index += 4) {
        const alpha = data[index + 3];
        if (alpha === 0) continue;

        const red = data[index];
        const green = data[index + 1];
        const blue = data[index + 2];

        totalBrightness += 0.299 * red + 0.587 * green + 0.114 * blue;
        pixelCount += 1;
      }

      if (pixelCount === 0) {
        onComplete(LIGHT_TEXT_COLOR);
        return;
      }

      const averageBrightness = totalBrightness / pixelCount;
      onComplete(
        averageBrightness >= BRIGHTNESS_THRESHOLD
          ? DARK_TEXT_COLOR
          : LIGHT_TEXT_COLOR
      );
    } catch {
      onComplete(LIGHT_TEXT_COLOR);
    }
  };

  image.onerror = () => onComplete(LIGHT_TEXT_COLOR);
  image.src = imageSrc;
}

function CaseStudyCard(props) {
  const [readTimeColor, setReadTimeColor] = useState(LIGHT_TEXT_COLOR);

  useEffect(() => {
    if (props.readTimeColor) {
      setReadTimeColor(props.readTimeColor);
      return undefined;
    }

    if (!props.img) {
      setReadTimeColor(LIGHT_TEXT_COLOR);
      return;
    }

    let isActive = true;

    sampleImageBrightness(props.img, (nextColor) => {
      if (isActive) {
        setReadTimeColor(nextColor);
      }
    });

    return () => {
      isActive = false;
    };
  }, [props.img, props.readTimeColor]);

  return (
    // Reusable portfolio card with support for read-time, tags, and optional image overlays.
    <a className="case case-link" href={props.href || "#"}>
      <div className="case-header">
        <img src={props.img} alt={props.title} crossOrigin="anonymous" />
        {props.overlayImg ? (
          <img
            src={props.overlayImg}
            alt=""
            aria-hidden="true"
            className={`case-overlay ${props.overlayClassName || ""}`.trim()}
          />
        ) : null}
        <p className="read-time" style={{ "--case-time-color": readTimeColor }}>
          {props.time}
        </p>
        {props.tags?.length ? (
          <div className="case-tags">
            {props.tags.map((tag) => (
              <span className="case-tag" key={tag}>
                {tag}
              </span>
            ))}
          </div>
        ) : null}
      </div>
      <div className="case-info">
        <p className="case-title">{props.title}</p>
        <p className="case-description">{props.description}</p>
      </div>
    </a>
  );
}

export default CaseStudyCard;

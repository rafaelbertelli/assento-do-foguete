import s from "./Avatar.module.css";

export function Avatar({
  src,
  alt = "avatar",
  hasOutline = true,
  cssClass = "",
}) {
  const cssClasses = `${s.avatar} ${
    hasOutline ? s.hasOutline : ""
  } ${cssClass}`;

  return <img className={cssClasses} alt={alt} src={src} />;
}

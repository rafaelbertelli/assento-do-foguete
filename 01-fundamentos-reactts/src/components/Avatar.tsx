import { ImgHTMLAttributes } from "react";
import s from "./Avatar.module.css";

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  hasOutline?: boolean;
  cssClass?: string;
}

export function Avatar({
  src,
  alt = "avatar",
  hasOutline = true,
  cssClass = "",
}: AvatarProps) {
  const cssClasses = `${s.avatar} ${
    hasOutline ? s.hasOutline : ""
  } ${cssClass}`;

  return <img className={cssClasses} alt={alt} src={src} />;
}

// react
import { JSX } from "react";

// npm
import { FaPlaystation } from "react-icons/fa";
import { SiNintendoswitch } from "react-icons/si";
import { FaXbox } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import { DiAndroid } from "react-icons/di";
import { FaWindows } from "react-icons/fa";
import { FaLinux } from "react-icons/fa";
import { FaAppStoreIos } from "react-icons/fa";

const platformIcons: Record<string, JSX.Element> = {
  PC: <FaWindows />,
  PlayStation: <FaPlaystation />,
  Xbox: <FaXbox />,
  Nintendo: <SiNintendoswitch />,
  iOS: <FaApple />,
  Android: <DiAndroid />,
  Linux: <FaLinux />,
  "Apple Macintosh": <FaAppStoreIos />,
};

export default function getPlatform(platform: string): JSX.Element | null {
  return platformIcons[platform] || null;
}

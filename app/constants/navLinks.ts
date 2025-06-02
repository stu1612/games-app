import actionIcon from "../../public/assets/action.png";
import adventureIcon from "../../public/assets/adventure.png";
import puzzleIcon from "../../public/assets/puzzle.png";
import racingIcon from "../../public/assets/racing.png";
import rpgIcon from "../../public/assets/rpg.png";
import shooterIcon from "../../public/assets/shooter.png";
import sportsIcon from "../../public/assets/sports.png";
import strategyIcon from "../../public/assets/strategy.png";

import { BsFillTrophyFill } from "react-icons/bs";
import { BsSkipForwardFill } from "react-icons/bs";
import { DiCodeigniter } from "react-icons/di";
import { HiStar } from "react-icons/hi";
import { RiBarChartFill } from "react-icons/ri";
import { SiStarship } from "react-icons/si";

import { FaPlaystation } from "react-icons/fa";
import { FaWindows } from "react-icons/fa";
import { BsXbox } from "react-icons/bs";
import { BsNintendoSwitch } from "react-icons/bs";
import { BsAndroid2 } from "react-icons/bs";
import { MdOutlinePhoneIphone } from "react-icons/md";

const genreIcons = {
  action: actionIcon,
  adventure: adventureIcon,
  puzzle: puzzleIcon,
  racing: racingIcon,
  rpg: rpgIcon,
  shooter: shooterIcon,
  sports: sportsIcon,
  strategy: strategyIcon,
};

const releaseIcons = {
  lastWeek: HiStar,
  thisWeek: DiCodeigniter,
  nextMonth: BsSkipForwardFill,
};

const popularIcons = {
  bestThisYear: BsFillTrophyFill,
  bestLastYear: RiBarChartFill,
  allStars: SiStarship,
};

const platformIcons = {
  playstation: FaPlaystation,
  pc: FaWindows,
  xbox: BsXbox,
  nintendo: BsNintendoSwitch,
  android: BsAndroid2,
  ios: MdOutlinePhoneIphone,
};

export const navLinks = [
  {
    title: "New Releases",
    links: [
      {
        label: "Last 30 days",
        href: "/discover/last-month",
        icon: null,
        componentIcon: releaseIcons.lastWeek,
      },
      {
        label: "This week",
        href: "/discover/this-week",
        icon: null,
        componentIcon: releaseIcons.thisWeek,
      },
      {
        label: "Next month",
        href: "/discover/next-month",
        icon: null,
        componentIcon: releaseIcons.nextMonth,
      },
    ],
  },
  {
    title: "Popular",
    links: [
      {
        label: "Best of the Year",
        href: "/discover/best-of-the-year",
        icon: null,
        componentIcon: popularIcons.bestThisYear,
      },
      {
        label: "Popular Last Year",
        href: "/discover/popular-last-year",
        icon: null,
        componentIcon: popularIcons.bestLastYear,
      },
      {
        label: "All stars",
        href: "/discover/all-stars",
        icon: null,
        componentIcon: popularIcons.allStars,
      },
    ],
  },
  {
    title: "Platforms",
    links: [
      {
        label: "PC",
        href: "/games/pc",
        icon: null,
        componentIcon: platformIcons.pc,
      },
      {
        label: "Playstation 5",
        href: "/games/playstation-5",
        icon: null,
        componentIcon: platformIcons.playstation,
      },
      {
        label: "Xbox One",
        href: "/games/xbox-one",
        icon: null,
        componentIcon: platformIcons.xbox,
      },
      {
        label: "Nintendo Switch",
        href: "/games/nintendo-switch",
        icon: null,
        componentIcon: platformIcons.nintendo,
      },
      {
        label: "iOS",
        href: "/games/ios",
        icon: null,
        componentIcon: platformIcons.ios,
      },
      {
        label: "Android",
        href: "/games/android",
        icon: null,
        componentIcon: platformIcons.android,
      },
    ],
  },
  {
    title: "Genres",
    links: [
      {
        label: "Action",
        href: "/games/action",
        icon: genreIcons.action,
        componentIcon: null,
      },
      {
        label: "Adventure",
        href: "/games/adventure",
        icon: genreIcons.adventure,
      },
      {
        label: "RPG",
        href: "/games/rpg",
        icon: genreIcons.rpg,
        componentIcon: null,
      },
      {
        label: "Shooter",
        href: "/games/shooter",
        icon: genreIcons.shooter,
        componentIcon: null,
      },
      {
        label: "Puzzle",
        href: "/games/puzzle",
        icon: genreIcons.puzzle,
        componentIcon: null,
      },
      {
        label: "Racing",
        href: "/games/racing",
        icon: genreIcons.racing,
        componentIcon: null,
      },
      {
        label: "Sports",
        href: "/games/sports",
        icon: genreIcons.sports,
        componentIcon: null,
      },
    ],
  },
];

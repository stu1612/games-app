import { twMerge } from "tailwind-merge";

type ImageCarouselProps = {
  images: { image: string }[];
  className?: string;
};

export default function ImageCarousel({
  images,
  className,
}: ImageCarouselProps) {
  return (
    // <div
    //   className={twMerge(
    //     "z-20 absolute bottom-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 px-4 md:px-8 w-full gap-4",
    //     className
    //   )}
    // >
    <div
      className={twMerge(
        "z-20 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 px-4 md:px-8 w-full gap-4",
        className
      )}
    >
      {images.slice(1, 5).map((img: any, idx: any) => (
        <img
          src={img.image}
          alt="hi"
          key={idx}
          className="h-50 md:h-40 w-full rounded-2xl object-cover"
        />
      ))}
    </div>
  );
}

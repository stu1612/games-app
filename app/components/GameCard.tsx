// type GameCardProps = {
//     game : {

//     }
// }

export default function GameCard({ game }) {
  console.log(game);
  return (
    <div
      className="rounded-2xl h-fit overflow-visible flex flex-col cards cursor-pointer mb-8 relative"
      // onMouseEnter={handleHover}
      // onMouseLeave={handleHover}
    >
      <div className="h-44 ">
        <img
          src={game.background_image}
          alt={game.name}
          className="h-full w-full rounded-t-2xl object-cover"
        />
      </div>
      <div className="pt-4 px-4 pb-8">
        <div className="flex flex-row ">
          {game.parent_platforms?.map((item, idx) => (
            <div className="h-5 w-5 mr-2" key={idx}>
              {/* {getPlatform(item.platform.name)} */}
            </div>
          ))}
        </div>

        <h1 className="relative w-auto font-bold text-2xl mt-2 pr-12">
          {game.name}
          <span
            className="absolute bottom-0"
            //   onMouseEnter={openTooltip}
            //   onMouseLeave={openTooltip}
          >
            {/* {getRatings(returnFirstIndexRating)}
            {showTooltip && <Tooltip message={returnFirstIndexRating} />} */}
          </span>
        </h1>
        {/* {onHover && <BottomContent game={game} />} */}
        <div className="block md:hidden">
          {/* <BottomContent game={game} /> */}
        </div>
      </div>
    </div>
  );
}

export const capitalizeText = (title: string) => {
  if (!title) return null;

  const firstLetter = title.charAt(0);
  const capitalizeLetter = firstLetter.toUpperCase();
  const remainingText = title.slice(1);
  const newTitle = capitalizeLetter + remainingText;
  return newTitle;
};

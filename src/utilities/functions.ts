export const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

export const capitalizeFirstLetter = (str?: string): string | undefined => {
  if (str === undefined) {
      return undefined;
  }
  return str.charAt(0).toUpperCase() + str?.slice(1);
};
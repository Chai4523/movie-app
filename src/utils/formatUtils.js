export const formatDate = (date, month = "long") => {
  if (!date) return null;
  // const date = new Date(dateString);
  // TODO: refactor this function in other components 
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: month,
    year: "numeric",
  }).format(date);
};

export const formatCurrency = (value) => {
  if (!value) return null;
  else
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
};

export const formatRuntime = (runtime) => {
  if (!runtime || runtime === 0) return null;
  const hours = Math.floor(runtime / 60);
  const mins = runtime % 60;

  let output = "";
  if (hours > 0) output += `${hours} hour${hours > 1 ? "s" : ""}`;
  if (mins > 0) output += ` ${mins} minutes`;

  return output;
};

export const formatMediaType = (media_type) => {
  if (media_type == "tv") return "TV";
  return (
    String(media_type).charAt(0).toUpperCase() + String(media_type).slice(1)
  );
};

export function parseHtmlText(html) {
  const temp = document.createElement('div');
  temp.innerHTML = html;
  return temp.textContent || "";
}
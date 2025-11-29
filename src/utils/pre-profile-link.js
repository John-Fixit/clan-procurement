export const preProfileLink = (name = "") => {
  const firstName = name?.split(" ")[0];
  const lastName = name?.split(" ")[1];
  const bgColor = stringToColor(name); // dynamic color from name
  const color = "eeeeee";
  return `https://ui-avatars.com/api/?name=${firstName} ${lastName}&background=${bgColor.replace(
    "#",
    ""
  )}&color=${color}`;
};

function stringToColor(str) {
  let hash = 0;
  for (let i = 0; i < str?.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash) % 360; // keep it within [0, 360)
  return `hsl(${hue}, 60%, 40%)`;
}

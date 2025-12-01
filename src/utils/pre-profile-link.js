const avatarColors = [
  "#FF6B6B", // red
  "#FF8E72", // warm orange
  "#FFB562", // sand yellow
  "#e08d4b", // bright yellow
  "#6BCB77", // green
  "#4D96FF", // blue
  "#6A4CFE", // indigo
  "#A66BFE", // purple
  "#FF6EC7", // pink
  "#3EC1D3", // cyan
];
function getAvatarColor(name) {
  let hash = 0;
  for (let i = 0; i < name?.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  return avatarColors[Math.abs(hash) % avatarColors?.length];
}

export const preProfileLink = (name = "") => {
  const nameArr = name?.split(" ");
  const firstName = nameArr?.[0];
  const lastName = nameArr?.[1];
  const bgColor = getAvatarColor(name).replace("#", "");
  const color = "FFFFFF"; // white text

  return `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=${bgColor}&color=${color}`;
};

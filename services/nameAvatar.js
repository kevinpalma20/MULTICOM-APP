export default function avatarName(firtsName, lastName) {
  let av = "";
  try {
    let fn = firtsName.charAt(0);
    let ln = lastName.charAt(0);
    av = fn + ln;
  } catch (error) {
    return "";
  } finally {
    return av;
  }
}

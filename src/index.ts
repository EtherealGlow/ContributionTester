import { getComment } from "./helpers/github";
import { addresses } from "./mapping";
const strOfLinks =
  "https://github.com/ubiquity/ubiquity-dollar/issues/606#issuecomment-1547864277,https://github.com/ubiquity/ubiquity-dollar/issues/603#issuecomment-1606964861,https://github.com/ubiquity/ubiquity-dollar/issues/486#issuecomment-1493558651,https://github.com/ubiquity/ubiquibot/issues/741#issuecomment-1712946825,https://github.com/ubiquity/ubiquibot/issues/719#issuecomment-1726227243,https://github.com/ubiquity/ubiquibot/issues/624#issuecomment-1710013063,https://github.com/ubiquity/ubiquibot/issues/619#issuecomment-1694382312,https://github.com/ubiquity/ubiquibot/issues/590#issuecomment-1676317288,https://github.com/ubiquity/ubiquibot/issues/549#issuecomment-1655315045,https://github.com/ubiquity/ubiquibot/issues/524#issuecomment-1654846706,https://github.com/ubiquity/ubiquibot/issues/513#issuecomment-1639994736,https://github.com/ubiquity/ubiquibot/issues/503#issuecomment-1712775815,https://github.com/ubiquity/ubiquibot/issues/497#issuecomment-1654862492,https://github.com/ubiquity/ubiquibot/issues/495#issuecomment-1705750560,https://github.com/ubiquity/ubiquibot/issues/494#issuecomment-1656767965,https://github.com/ubiquity/ubiquibot/issues/493#issuecomment-1667537583,https://github.com/ubiquity/ubiquibot/issues/489#issuecomment-1643786088,https://github.com/ubiquity/ubiquibot/issues/446#issuecomment-1636043771,https://github.com/ubiquity/ubiquibot/issues/423#issuecomment-1637271557,https://github.com/ubiquity/ubiquibot/issues/419#issuecomment-1661766546,https://github.com/ubiquity/ubiquibot/issues/358#issuecomment-1638044598,https://github.com/ubiquity/ubiquibot/issues/357#issuecomment-1683240787,https://github.com/ubiquity/ubiquibot/issues/323#issuecomment-1712765380,https://github.com/ubiquity/ubiquibot/issues/302#issuecomment-1662215622,https://github.com/ubiquity/ubiquibot/issues/252#issuecomment-1657002699,https://github.com/ubiquity/ubiquibot/issues/234#issuecomment-1655638322,https://github.com/ubiquity/ubiquibot/issues/216#issuecomment-1488779098,https://github.com/ubiquity/ubiquibot/issues/216#issuecomment-1488779099,https://github.com/ubiquity/.github/issues/57#issuecomment-1532198942,https://github.com/ubiquity/.github/issues/56#issuecomment-1532196449,https://github.com/ubiquity/.github/issues/53#issuecomment-1532167985,https://github.com/ubiquity/.github/issues/50#issuecomment-1530319767,https://github.com/ubiquity/.github/issues/49#issuecomment-1530309908,https://github.com/ubiquity/.github/issues/37#issuecomment-1502768019,https://github.com/ubiquity/.github/issues/37#issuecomment-1510418873,https://github.com/ubiquity/.github/issues/37#issuecomment-1540119332,https://github.com/ubiquity/.github/issues/35#issuecomment-1502769843,https://github.com/ubiquity/.github/issues/35#issuecomment-1513387668,https://github.com/ubiquity/.github/issues/33#issuecomment-1513105062,https://github.com/ubiquity/.github/issues/30#issuecomment-1502858182,https://github.com/ubiquity/.github/issues/30#issuecomment-1513455285,https://github.com/ubiquity/pay.ubq.fi/issues/52#issuecomment-1524678816,https://github.com/ubiquity/business-development/issues/48#issuecomment-1624259869,https://github.com/ubiquity/business-development/issues/35#issuecomment-1623128125,https://github.com/ubiquity/business-development/issues/11#issuecomment-1552792181,https://github.com/ubiquity/business-development/issues/4#issuecomment-1500866348,https://github.com/ubiquity/business-development/issues/4#issuecomment-1529681568,https://github.com/ubiquity/business-development/issues/2#issuecomment-1513070041";
const listOfLinks = strOfLinks.split(",");

for (const comment in listOfLinks) {
  const listComment = listOfLinks[comment].split("/");
  const owner = listComment[3];
  const repo = listComment[4];
  const commentId = Number(listComment[6].split("-").pop());
  let addr: string;
  const issueComment = await getComment(owner, repo, commentId);
  try {
    addr = issueComment.data.body?.split("```")[1].split("...")[0] ?? "";
  } catch (error) {
    console.log("couldnt parse rewards for: " + issueComment.data.html_url);
    continue;
  }
  addresses.forEach((e) => {
    if (e.startsWith(addr)) {
      console.log("Found a existing address");
      console.log("this is found in comment " + comment);
    }
  });
}

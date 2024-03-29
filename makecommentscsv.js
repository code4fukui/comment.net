import { CSV } from "https://js.sabae.cc/CSV.js";
import { DateTime } from "https://js.sabae.cc/DateTime.js";
import { ArrayUtil } from "https://js.sabae.cc/ArrayUtil.js";

if (Deno.args.length == 0) {
  console.log("makecommentscsv [key]");
  Deno.exit();
}
const key = Deno.args[0];
const url = `http://sabae.club/commgate/1/get.json?cid=sharetext2-${key}&callback=_cb_989264`;
//const txt0 = await Deno.readTextFile("./get.json");
const txt0 = await (await fetch(url)).text();
const txt = txt0.substring(txt0.indexOf("(") + 1, txt0.length - 4) + "}";
const data = JSON.parse(txt);

const comments = [];

for (const user in data) {
  const comment0 = decodeURIComponent(data[user].data);
  const comment1 = comment0.split("\t");
  for (let i = 0; i < comment1.length; i += 2) {
    const ts0 = comment1[i].split("/");
    const ts = ts0[0];
    const reply = ts0[1];
    const c = { id: 0, user, ts, parent: "", reply0: reply, comment: comment1[i + 1] };
    comments.push(c);
  }
  //const ts = data[id].ts;
  //console.log(id, ts, comment);
}
const errs = comments.filter(i => isNaN(parseInt(i.ts)));
if (errs.length > 0) {
  await Deno.writeTextFile("comments_err.csv", CSV.stringify(errs));
}

const cms = comments.filter(i => !isNaN(i.ts));

cms.sort((a, b) => parseInt(a.ts) - parseInt(b.ts));
cms.forEach((i, idx) => i.id = idx + 1);
cms.forEach(i => {
  if (i.reply0) {
    const r = cms.find(j => j.ts == i.reply0);
    i.parent = r ? r.id : "-1";
  }
});
cms.forEach(i => delete i.reply0);
cms.forEach(i => {
  try {
    i.ts = new DateTime(parseInt(i.ts)).toString();
  } catch (e) {
  }
});
await Deno.writeTextFile("comments.csv", CSV.stringify(cms));

console.log("comments:", cms.length, "users:", ArrayUtil.toUnique(cms.map(i => i.user)).length, "errs:", errs.length);

import { CSV } from "https://js.sabae.cc/CSV.js";
import { DateTime } from "https://js.sabae.cc/DateTime.js";

const txt0 = await Deno.readTextFile("./get.json");
const txt = txt0.substring(txt0.indexOf("(") + 1, txt0.length - 4) + "}";
//console.log(txt);
const data = JSON.parse(txt);

const comments = [];

//console.log(data);
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
await Deno.writeTextFile("comments_err.csv", CSV.stringify(errs));

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

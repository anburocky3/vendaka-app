// test-rate-limit.mjs
const BASE_URL = process.env.BASE_URL || "http://localhost:5000/";
const TOTAL_REQUESTS = Number(process.env.TOTAL || 110);

let okCount = 0;
let limitedCount = 0;
let otherCount = 0;
let first429At = null;

for (let i = 1; i <= TOTAL_REQUESTS; i++) {
  try {
    const res = await fetch(BASE_URL, { method: "GET" });

    if (res.status === 429) {
      limitedCount++;
      if (first429At === null) first429At = i;
    } else if (res.ok) {
      okCount++;
    } else {
      otherCount++;
    }

    console.log(`#${i} -> ${res.status}`);
  } catch (err) {
    otherCount++;
    console.log(`#${i} -> ERROR: ${err.message}`);
  }
}

console.log("\n--- Summary ---");
console.log("Total:", TOTAL_REQUESTS);
console.log("2xx:", okCount);
console.log("429:", limitedCount);
console.log("Other/Error:", otherCount);
console.log("First 429 at request:", first429At ?? "not hit");

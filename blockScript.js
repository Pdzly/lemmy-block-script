// Config:
const instance = "https://lemmy.world"; // the instance you want to block from

const toBlock = []; // the communities you want to block (the "qualified" name, /c/this_is_the_name => this_is_the_name OR the ID of the community IDs are instance specific! )

const delay = 2500; // Keep this at 2500 or higher to avoid rate limiting

const jwt_token = ""; // find it in your browser's local storage (F12 -> Network -> Headers -> Body -> auth)

const should_block = true; // set to false to unblock communities

// Don't touch anything below this line
// ------------------------------------
const apiUrl = instance + "/api/v3/";

let i = 0;

const blockContent = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};
const getContent = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
};

function encodeGetParams(p) {
  return Object.entries(p)
    .filter((kv) => !!kv[1])
    .map((kv) => kv.map(encodeURIComponent).join("="))
    .join("&");
}

async function getCommunity(name) {
  const url =
    apiUrl +
    "community" +
    "?" +
    encodeGetParams({ auth: jwt_token, name: name });

  return await (await fetch(url, getContent)).json();
}

async function blockCommunity(comm) {
  const api = apiUrl + "community/block";

  let commId = comm;
  if(typeof(comm) !== "number") {
    const commun = await getCommunity(comm)
    commId = commun.community_view.community.id;
  }
  const params = blockContent;

  params.body = JSON.stringify({
    auth: jwt_token,
    community_id: commId,
    block: should_block,
  });
  await fetch(api, params);
}

let id = 0;
function blockAll() {
  id = setInterval(async () => {
    console.log("Blocking: " + toBlock[i]);
    try {
      await blockCommunity(toBlock[i]);
    } catch (exc) {
      console.log(`Failed to block ${toBlock[i]}!`);
      console.log(exc);
    }
    console.log(`Blocked ${toBlock[i]} successfully!`);
    i++;
    if (i >= toBlock.length) {
      console.log("Finished blocking all communities! Ending script.");
      clearInterval(id);
    }
  }, delay);
}
blockAll();

function stop() {
  clearInterval(id);
}

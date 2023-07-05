// Config:
const instance = "https://lemmy.world"; // the instance you want to block from

const toBlock = []; // the communities you want to block (the "qualified" name, /c/this_is_the_name => this_is_the_name )

const delay = 5000; // Keep this at 5000 or higher to avoid rate limiting

const jwt_token = ""; // find it in your browser's local storage (F12 -> Network -> Headers -> Body -> auth)

const block = true; // set to false to unblock communities

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

  const id = (await getCommunity(comm)).community_view.community.id;
  const params = blockContent;

  params.body = JSON.stringify({
    auth: jwt_token,
    community_id: id,
    block: block,
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

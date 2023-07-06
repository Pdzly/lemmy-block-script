const instance = "https://ANYLEMMYINSTANCE.ml"; // the instance you want to get the communities from 

const delay = 2000; // Keep this at 2500 or higher to avoid rate limiting

// Don't touch anything below this line
// ------------------------------------

const plainInstance =  instance.replace("https://", "").replace("http://", "")

const apiUrl = instance + "/api/v3/";
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

async function fetchCommunities(page) {
  const request = {
    type_: "Local",
    sort: "New",
    show_nsfw: true,
    page: page,
    limit: 50,
  };

  const response = await fetch(
    apiUrl + "community/list" + "?" + encodeGetParams(request),
    getContent
  );
  return (await response.json()).communities.map(c => {
    return c.community.name + "@" + plainInstance;
  });
}

async function startFetching() {
  let page = 1;
  const fetchedCommunities = [];
  let communities = await fetchCommunities(page);
  let intervalId;
  intervalId = setInterval(async () => {
    console.log(communities);
    page++;
    communities = await fetchCommunities(page);
    console.log(fetchedCommunities);
    if (communities.length === 0) {
      clearInterval(intervalId);
      console.log("Done fetching communities!");
      return;
    }
    fetchedCommunities.push(...communities);
  }, delay);
  console.log(fetchedCommunities);
}

startFetching();

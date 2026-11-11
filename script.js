// The newest version of each game and of Core of Light, from GitHub's releases (all of them are test
// versions for now, so "latest" alone would find none). Without an answer the page keeps its links.
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function shortDate(iso) {
  const d = new Date(iso);
  return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

async function newest(repo) {
  try {
    const answer = await fetch(`https://api.github.com/repos/tsapZ/${repo}/releases?per_page=1`, {
      headers: { Accept: "application/vnd.github+json" },
    });
    if (!answer.ok) return null;
    const releases = await answer.json();
    return releases.length ? releases[0] : null;
  } catch {
    return null;
  }
}

for (const el of document.querySelectorAll(".version[data-repo]")) {
  newest(el.dataset.repo).then((release) => {
    if (!release) return;
    const version = release.tag_name.replace(/^v/, "");
    el.innerHTML = "";
    el.append("Newest: ");
    const strong = document.createElement("strong");
    strong.textContent = version;
    el.append(strong, `, ${shortDate(release.published_at)}`);
  });
}

newest("SkylandersCoreOfLight").then((release) => {
  if (!release) return;
  const el = document.getElementById("col-version");
  el.textContent = `version ${release.tag_name.replace(/^v/, "")} from ${shortDate(release.published_at)}`;
});

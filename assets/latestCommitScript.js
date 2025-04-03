async function getLatestCommitMessage() {
  const url =
    "https://api.github.com/repos/AbnormalNormality/PokemonUtils/commits/main";
    const commitAuthorElement = document.getElementById("latestCommitAuthor");
    const commitDateElement = document.getElementById("latestCommitDate");
    const commitMessageElement = document.getElementById("latestCommitMessage");

  try {
    const response = await fetch(url);

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const data = await response.json();

    const isoDate = data.commit.author.date;
    const formattedDate = new Date(isoDate).toLocaleString("en-Au", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      timeZoneName: "shortGeneric",
    });

    commitAuthorElement.textContent = data.commit.author.name;
    commitDateElement.textContent = formattedDate;
    commitMessageElement.textContent = data.commit.message;
  } catch (error) {
    commitMessageElement.textContent = error;
  }
}

getLatestCommitMessage();

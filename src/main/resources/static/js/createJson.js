const serverResponse = await fetch(`/api/getAllCardData`);
const data = await serverResponse.json();
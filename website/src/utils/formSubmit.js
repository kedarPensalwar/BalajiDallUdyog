export async function getMax() {
  const response = await fetch('data.json');
  const data = await response.json();

  return data.length + 1;
}

export async function insertRecord(jsonData) {
  const response = await fetch('data.json').then((x) => x.json());
  response.push(jsonData);
}

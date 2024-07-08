const API_URL = "http://localhost:3000/games";

async function fetchAPI(endpoint = "", options = {}) {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, options);
    if (!response.ok) throw new Error("Erro ao conectar com o servidor");
    return await response.json();
  } catch (error) {
    console.error(error);
    if (!endpoint) return carregarDadosLocais();
    throw error;
  }
}

async function games() {
  return await fetchAPI();
}

async function novoGame(nome, preco, imagem) {
  return await fetchAPI("", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome, preco, imagem }),
  });
}

async function excluirGame(id) {
  return await fetchAPI(`/${id}`, { method: "DELETE" });
}

async function carregarDadosLocais() {
  const response = await fetch("db.json");
  const data = await response.json();
  return data.games;
}

export const conectaAPI = {
  games,
  novoGame,
  excluirGame,
};

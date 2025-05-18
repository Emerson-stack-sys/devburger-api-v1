// Espuz o app aqui na Porta 3001 para rodar utilizei como uma API.
// lembra de fazer a instação do  yarn add sucrase -D

import app from "./app";
try {
  app.listen(3001, () => {
    console.log("Server is running on port 3001...");
  });
} catch (error) {
  console.error("Erro ao iniciar o servidor:", error);
  process.exit(1);
}

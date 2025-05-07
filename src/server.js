// Espuz o app aqui na Porta 3001 para rodar utilizei como uma API.
// lembra de fazer a instação do  yarn add sucrase -D

import app from "./app";

app.listen(3001, "0.0.0.0", () => {
  console.log("Server is running on port 3001...");
});

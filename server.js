import express from "express";
import bodyParser from "body-parser";
import pool from "./config/database.js";
import appointmentRoutes from "./routes/appointmentRoutes.js"
import agentRoutes from "./routes/agentRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import availabilityRouter from "./routes/avaliabilityRouter.js";
import calendarRouter from "./routes/calendarRouter.js"

const app = express();
app.use(bodyParser.json());

// Testar conexão com o banco
pool
  .getConnection()
  .then((conn) => {
    console.log("Conexão bem-sucedida com o banco de dados!");
    conn.release();
  })
  .catch((err) => console.error("Erro ao conectar ao banco:", err));

// Rotas
app.use("/agents", agentRoutes);
app.use("/users", userRoutes);
app.use("/appointment", appointmentRoutes);
app.use("/api/availability", availabilityRouter);
app.use("/api/calendars", calendarRouter);

// Inicializar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

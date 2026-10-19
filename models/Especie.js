import conexao from "../config/conexao.js";
const EspecieSchema = new conexao.Schema({
  nome: { type: String,required: true},
  periodo: {type: String,required: true}
});
const Especie = 
conexao.model("Especie", EspecieSchema);
export default Especie;
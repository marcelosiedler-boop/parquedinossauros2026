import conexao from "../config/conexao.js";
const DinossauroSchema = new conexao.Schema({
  nome: { type: String,required: true},
  especie: {type: String,required: true},
  peso:{type:Number, required:false},
  altura:{type:Number, required:false},
  anoDescoberta:{type:Number, required:false},
  dieta:{type:String,required:false},
  descricao:{type:String,required:false}

});
const Dinossauro = 
conexao.model("Dinossauro", DinossauroSchema);
export default Dinossauro;
// const { Pool } = require("pg");
 
async function connect() {  
    const { Pool } = require("pg");

    if(global.connection)
        return global.connection.connect();

    const pool = new Pool({
      user: process.env.USER_NAME,
      host: process.env.HOST_NAME,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      dialect: process.env.DB_DIALECT,
      port: process.env.PORT_NUMBER
    });
    
    const client = await pool.connect();
    console.log("O Pool de conexão foi criado com sucesso!")
    client.release();

    global.connection = pool;
    
    return pool.connect();
  }

  connect();

  // Função para listar clientes
async function selectCustomer() {
  // Estabelecer conexão com o banco de dados
  const client = await connect();
  // Enviar comando SQL para o banco de dados
  const res = await client.query("SELECT * FROM client");
  // Retorna as linhas (registros) da tabela
  return res.rows;
  }
  
  
//Função para inserir clientes (assíncrona) customers é objeto
async function insertCustomer(customer) {

//Estabelendo a conexão com o banco de dados
const client = await connect();

//Comando/query que vai ser usado na operação (os $ corresponde a cada coluna, no caso temos 5 colunas)
let sql = "INSERT INTO client(cpf, nome, email, idade, profissao) VALUES ($1, $2, $3, $4, $5)"

//Passar os dados que estão chegando em customer
const values= [customer.cpf, customer.nome, customer.email, customer.idade, customer.profissao ]

//Enviar os tais dados para o banco
await client.query(sql,values)

}
//Exportar as funções 

module.exports ={
  insertCustomer,
  selectCustomer
}
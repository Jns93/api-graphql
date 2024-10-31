# Introdução ao GraphQL

> Resumo sobre GraphQL: conceitos, funcionamento e exemplos práticos.

## Sumário

1. [O que é GraphQL?](#o-que-é-graphql)
2. [Como Funciona o GraphQL](#como-funciona-o-graphql)
3. [Principais Conceitos](#principais-conceitos)
   - [Query e Mutation](#query-e-mutation)
   - [Resolvers](#resolvers)
   - [Schema e Types](#schema-e-types)
   - [Introspection](#introspection)
   - [Fragments](#fragments)
4. [Vantagens e Desvantagens](#vantagens-e-desvantagens)
5. [Exemplos Práticos](#exemplos-práticos)
   - [Query](#exemplo-de-query)
   - [Mutation](#exemplo-de-mutation)
   - [Schema Completo](#schema-completo)
6. [Links Úteis](#links-úteis)

---

## O que é GraphQL?

GraphQL é uma linguagem de consulta para APIs e um tempo de execução para essas consultas, criada pelo Facebook. Ao contrário do REST, GraphQL permite ao cliente especificar exatamente os dados de que precisa, evitando problemas comuns, como **overfetching** (dados demais) e **underfetching** (dados de menos).

## Como Funciona o GraphQL

Em GraphQL, você define um **schema** que estabelece a estrutura e os tipos de dados disponíveis. As interações são feitas por meio de **Queries** (para buscar dados) e **Mutations** (para alterar dados). O servidor utiliza **Resolvers** para processar essas operações e retornar apenas o que foi solicitado.

## Principais Conceitos

### Query e Mutation

- **Query**: utilizada para buscar dados do servidor.
- **Mutation**: usada para modificar dados no servidor.

#### Exemplo de Query
```graphql
{
  user(id: "1") {
    name
    email
    posts {
      title
      content
    }
  }
}
```


#### Exemplo de Mutation
```graphql
mutation {
  updateUser(id: "1", email: "novo@email.com") {
    id
    name
  }
}
```

### Resolvers

Resolvers são funções que processam queries e mutations, definindo como o servidor responde a cada operação. Exemplo de um resolver em JavaScript:
```javascript
const resolvers = {
  Query: {
    user: (_, { id }) => getUserById(id),
  },
  Mutation: {
    updateUser: (_, { id, email }) => updateUserEmail(id, email),
  },
};
```

### Schema e types

O schema define a estrutura de dados que o cliente pode consultar. No schema, usamos Types para definir os tipos de dados:
```graphql
type User {
  id: ID!
  name: String!
  email: String!
}
```

### Introspection

Introspection permite que o cliente consulte o schema para ver quais dados e operações estão disponíveis, facilitando o uso e a documentação da API.

### Fragments
Fragments são trechos de consultas reutilizáveis, ajudando a evitar repetição de código em queries complexas:
```graphql
fragment UserFields on User {
    id
    name
    email
}
```

## Vantagens e Desvantagens

#### Vantagens

1. **Consultas Precisas:** Pede apenas os dados necessários, economizando recursos.
2. **Menos Requisições:** Facilita o carregamento de dados complexos em uma única requisição.
3. **Evolução da API sem Quebra:** Facilita a atualização da API de forma retrocompatível.
4. **Self-Documenting:** Graças à introspection, o schema serve como documentação.

#### Desvantagens

1. **Configuração Inicial:** A implementação pode ser mais complexa que uma API REST.
2. **Dificuldades de Cache:** Implementar cache pode ser mais complicado que em REST.
3. **Overhead no Servidor:** Consultas complexas podem gerar alto consumo de recursos.
4. **Segurança:** É necessário limitar consultas para evitar abusos ou ataques.
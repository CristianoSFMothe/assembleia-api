# Assembleia API

## Ferramentas utilizadas

![2023-10-16_09h11_09](https://github.com/CristianoSFMothe/assembleia-api/assets/68359459/438454d7-f8a6-4ef8-9522-2d47c2f0119c)

## Arquitetura

![arquitetura](https://github.com/CristianoSFMothe/assembleia-api/assets/68359459/d8ccab01-cb01-41a5-9279-3c5d1c0db159)

# Rest

**Definição**

### Representational State Transfer

Conjunto de princípios e definições necessários para a criação de um projeto com interfaces bem definidas

# HTTP

**Definição**

### Hypertext Transfer Protocol

É um protocolo de comunicação utilizado para sistemas de informação de hipermídia, distribuídos e colaborativos.

### Composição

* Request
* Response
* Query Params
* Métodos (GET, POST, DELETE, etc)
* Códigos de Status (200, 404, 500)
* Cabeçalhos
* Conteúdo

## Messagens HTTP

#### Request

* URL
* Headers
* Body (Conteúdo)
* Método / Verbo  HTTP
* Query Params

#### Response

* Headers
* Body
* Código de Status

#### Méodos / Verbos HTTp

Indica a ação a ser executada para um dado recurso

* GET
* POST
* PUT
* DELETE
* PATCH

#### Códigos de Status HTTP

Indica a condição da respsota de uma requisição

* 200 - OK
* 400 - BAD REQUEST
* 404 - NOT FOUND
* 500 - SERVER ERROR

# Pautas

Objetos de votações nas assembléias do condomínio

* Criar uma pauta
* Iniciar a sessão para uma pauta
* Listar pautas

## Criar uma pauta

Para criação da pauta será necessário informar a descrição da mesma, regras que deverão ser observadas:

1. Só poderá existir uma Pauta por descrição

## Iniciar a sessão para uma pauta

Para iniciar a sesão de uma pauta, é necessário informar, em minutos, a quantidade de tempo que ela estará aberta para receber a votação, regras que deverão ser observadas?

1. Se os munutos não forem passados, ela terá o valor padrão de 1o minutos.
2. Se a pauta já tiver sido iniciada não poderá ser iniciada novamente.

## Listar Pautas

Lista as pautas, informando qual status, entre os status, temos:

1. Sessão não iniciada
2. Sessão iniciada
3. Finalizada

# Votos

## Registrar voto

Regista o voto de um associado para uma pauta.

* Regras:
  1. Pauta precisa existir e estar em sessão
  2. Permitir apenas 1 voto por associado.


# Resultaodos

## Obter Resultados

Dada uma **Pauta**, retorna seu resultado.

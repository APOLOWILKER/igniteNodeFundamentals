// Quando pensamos em Stream pensamos em Netflix & Spotify

// ler ou ter pequenas partes de alguma coisa,
// e já conseguir trabalhar com esses dados, antes de ter o arquivo completo

/**
 * Importação de clientes via CSV (EXCEL)
 * arquivo de 1gb - 1m de linhas
 * Usuário faz POST do arquivo
 * pode demorar +100s
 * Sem Stremas - Node vai baixar tudo e depois ler tudo
 */

/**
 * Com Streams eu consigo, ler os dados da minha requisição HTTP
 * do meu upload - aos poucos, e porocessando ele enquanto
 * o arquivo ainda esta sendo feito o upload.
 */

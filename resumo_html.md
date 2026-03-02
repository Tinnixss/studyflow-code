# Fundamentos do HTML e Estruturação de Páginas Web

## Glossário das Principais Tags e a Importância da <div> na Organização do Código

O HTML é uma linguagem de marcação responsável por estruturar o conteúdo das páginas web, diferindo das linguagens de programação por não trabalhar com lógica, funções ou estruturas de repetição, mas sim com a organização dos elementos na tela. No desenvolvimento web, ele faz parte da chamada tríade formada por HTML, CSS e JavaScript, em que o HTML define a estrutura, o CSS cuida da aparência visual e dos layouts, e o JavaScript adiciona interatividade e dinamismo.

A base do HTML é composta por tags, que geralmente possuem uma abertura, um conteúdo e um fechamento. Essas tags podem conter atributos, que funcionam como configurações adicionais, como no caso dos links que utilizam o atributo responsável por definir o destino da navegação. Existe também o conceito de aninhamento, que consiste em organizar elementos dentro de outros para estruturar melhor a página, além das chamadas tags singulares, como a de imagem, que não precisam de fechamento por não possuírem conteúdo interno.

Todo documento HTML precisa seguir uma estrutura padrão para funcionar corretamente, começando pela declaração do tipo de documento, seguida pela tag principal que envolve todo o código. Dentro dela, há uma seção destinada às configurações e informações da página, como título e codificação de caracteres, e outra seção onde fica todo o conteúdo visível ao usuário.

Entre os principais elementos de marcação estão os títulos organizados hierarquicamente, os parágrafos para textos, as marcações semânticas para dar ênfase, os links que permitem navegação entre páginas e as listas, que podem ser ordenadas ou não ordenadas. Para transformar essa estrutura em algo visualmente atraente, utiliza-se o CSS, preferencialmente em um arquivo externo conectado ao documento principal. Com ele, é possível definir tipografia, alinhamento, cores e criar layouts modernos utilizando recursos como o modelo flexível de organização de elementos.

Por fim, destaca-se a importância de um ambiente de desenvolvimento adequado, como o uso de um editor de código profissional, além de salvar os arquivos com a extensão correta para que possam ser executados diretamente no navegador.

---

## Glossário das Principais Tags

### <h1> até <h6>
São utilizadas para definir títulos e subtítulos. A tag <h1> representa o título mais importante da página, enquanto <h6> representa o de menor hierarquia.

### <p>
Define parágrafos de texto, organizando o conteúdo escrito dentro da página.

### <a>
Cria links que permitem a navegação entre páginas ou sites diferentes. Utiliza o atributo href para definir o destino do link.

### <img>
Insere imagens na página. É uma tag singular, ou seja, não possui fechamento. Utiliza atributos como src (caminho da imagem) e alt (descrição alternativa).

### <ul>
Cria uma lista não ordenada (com marcadores).

### <ol>
Cria uma lista ordenada (numerada).

### <li>
Define cada item dentro de uma lista.

### <strong> e <em>
São tags semânticas utilizadas para dar ênfase ao texto, indicando importância ou destaque.

---

## A Importância da Tag <div> no Aninhamento e Organização

A tag <div> é um elemento de agrupamento utilizado para organizar e estruturar o código HTML. Ela permite reunir vários elementos dentro de um mesmo bloco, facilitando a aplicação de estilos com CSS e melhorando a organização da página.

O aninhamento acontece quando uma tag é colocada dentro de outra. A <div> é amplamente utilizada para isso, ajudando a dividir a página em seções lógicas, como cabeçalho, conteúdo principal e rodapé. Essa organização torna o código mais limpo, estruturado e fácil de manter.
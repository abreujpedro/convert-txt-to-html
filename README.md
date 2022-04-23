# PUT A CONTENT OF TXT INTO HTML


![Node](https://camo.githubusercontent.com/7d7b100e379663ee40a20989e6c61737e6396c1dafc3a7c6d2ada8d4447eb0e4/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6e6f64652e6a732d3644413535463f7374796c653d666f722d7468652d6261646765266c6f676f3d6e6f64652e6a73266c6f676f436f6c6f723d7768697465)



> Projeto feito para adicionar o conteúdo de um arquivo txt dentro de um arquivo HTML, criando parágrafos conforme os parágrados do arquivo TXT.
> Existem testes que verificam se as regras de negócio estão sendo aplicadas.


## 💻 Pré-requisitos

Antes de começar, verifique se você atendeu aos seguintes requisitos:
* Você instalou a versão mais recente de `npm` e `Node Js`

## 🚀 Instalando o projeto

Para instalar o projeto, siga estas etapas:

```

$ git clone https://github.com/abreujpedro/convert-txt-to-html.git

$ npm install

```

## ☕ Usando o projeto

Para criar ou alterar um HTML com o conteúdo do arquivo TXT, use a função da classe FILE:

```

$ File.txtToHtml(<filePath>, <nameNewHtml>,<options>)

```

* o filePath é o caminhão em relação a pasta do projeto
* passe apenas o nome do arquivo html sem a extensão 
* o Html será gerado na pasta do projeto
* options é opcional, ele é um objeto com as configurações que deseja usar
* options por padrão é = { minLetters: 4, minParagraphs: 2 }


## Testando o projeto

Para rodar os testes use:

```

$ npm run test

```


## 🤝 Colaboradores

Pessoas que contribuíram para este projeto:

<table>
  <tr>
    <td align="center">
      <a href="#">
        <img src="https://avatars.githubusercontent.com/u/78066198?v=4" width="100px;" alt="Foto do João Abreu no GitHub"/><br>
        <sub>
          <b>João Abreu</b>
        </sub>
      </a>
    </td>
</table>


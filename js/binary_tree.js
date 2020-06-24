class BinaryTree {
    // inicializa a raiz como nula
    constructor() {
        this.root = null
    }

    //exibe o menor valor da arvore
    min() {
        let current = this.root // current recebe o valor da raiz
        if (current == null)  // verifica se o valor de current é null
            return null   // caso for null retorna null
        while (current.left != null) // enquanto o valor da esquerda for diferente de nulo
            current = current.left  // current recebe o valor da esquerda
        return current.content // retorna o valor de current obtido na estrutura de repetição
    }

    //exibe o maior valor da arvore
    max() {
        let current = this.root // current recebe o valor da raiz
        if (current == null) // verifica se o valor de current é null
            return null  // caso for null retorna null
        while (current.right != null)  // enquanto o valor da direita for dif rente de nulo
            current = current.right // variavel current recebe o valor da dieita
        return current.content  // retorna o valor de current obtido na estrutura de repetição
    }

    //insere o elemento da arvores 
    insert(element) {    // Método que insere elemento na arvore
        this.root = this.insertNode(this.root, element)   // Inicia a partir da raiz
    }

    insertNode(rootNode, element) {
        if (rootNode == null)   // verifica se o nó raiz é nulo
            return new Node(element)  // se for nulo o valor da raiz recebe o novo elemento
        if (element > rootNode.content) // verifica se o novo elemento é maior que o nó raiz
            rootNode.right = this.insertNode(rootNode.right, element)  // sefor maior é adicionado a direita da raiz 
        else
            rootNode.left = this.insertNode(rootNode.left, element) // se for menor é adicionado a esquerda da raiz
        return rootNode
    }

    //executa a função callback para cada nó, em ordem
    inOrderTraverse(callback) {                        
        this.inOrderVisitor(this.root, callback)
    }

    inOrderVisitor(node, callback) {           //Função responsavel para colocar os nos em ordem
        if (node == null)                         //Verifica se é null
            return                 //caso seja null encerra a função  
        this.inOrderVisitor(node.left, callback) //recebe os valores da sub arvore esquerda 
        callback(node.content)                   //recebe os valores da raiz
        this.inOrderVisitor(node.right, callback)   //recebe os valores da sub arbore direita 
    }

    //executa a função callback para cada nó, em pré-ordem
    preOrderTraverse(callback) {
        this.preOrderVisitor(this.root, callback)
    }

    preOrderVisitor(node, callback) { // Função responsavel para colocar os nos em preordem
        if (node == null)                         //Verifica se é null
            return                                 //caso seja null encerra a função
        callback(node.content)                    //recebe os valores da raiz
        this.preOrderVisitor(node.left, callback)         //recebe os valores da sub arvore esquerda 
        this.preOrderVisitor(node.right, callback)         //recebe os valores da sub arbore direita
    }

    //executa a função callback para cada nó, em pós-ordem
    postOrderTraverse(callback) {                    
        this.postOrderVisitor(this.root, callback)
    }

    postOrderVisitor(node, callback) {                     // Função responsavel para colocar os nos em posordem
        if (node == null)                                //Verifica se é null
            return                                      //caso seja null encerra a função
        this.postOrderVisitor(node.left, callback)               //recebe os valores da sub arvore esquerda 
        this.postOrderVisitor(node.right, callback)              //recebe os valores da sub arbore direita
        callback(node.content)              //recebe  os valores da raiz
    }

    //retorna true se o valor já existe na arvore 
    //     Busca na árvore binária
    //    1. É nulo? o elemento não existe
    //    2. É igual ao conteúdo? achou
    //    3. É maior que o conteúdo?
    //       3.1 busca de direita
    //       3.2 busca na esquerda

    search(value) {                               // Método que pesquisa o elemento na arvore
        return this.searchVisitor(this.root, value)         // Inicia a partir da raiz
    } 

    searchVisitor(node, element) {
        if (node == null)         // verifica se o nó é null
            return false              // caso seja nulo retorna false
        if (node.content == element)         // verifica se o nó é igual ao elemento buscado
            return true;                        // caso seja igual retorna true
        if (element > node.content)
            return this.searchVisitor(node.right, element)      // se o elemento buscado for maior que o nó, busca elemento a direita 
        else
            return this.searchVisitor(node.left, element)       // se o elemento buscado for menor que o nó, busca elemento a esquerda
    }

    //remove um elemento existente na arvore o retorna
    remove(value) {                                   // Método que remove elemento na arvore
        this.root = this.removeVisitor(this.root, value)           // Inicia a partir da raiz
    } 

    removeVisitor(node, value) {
        if (node.content == value) {                                  // verifica se o valor do nó é igual ao valor buscado
            if (node.left == node.right) {                      // verifica se a raiz tem filhos
                //nao tem filhos - Grau 0
                return null                                     // retorna null
            } else if (node.right == null) {                                     // verifica se a raiz tem filhos a direita
                //não tem filhos na direita, e tem nó na esqueda - Grau 1 
                return node.left                                                  // retorna o valor a esquerda
            } else if (node.left == null) {                                               // verifica se a raiz tem filhos a esquerda
                //não tem filhos da esquerda, e tem nó da direita - Grau 1
                return node.right                                                    // retorna o valor a direita
            } else {                                                                // caso a raiz tenha os dois ramos
                // tem os dois ramos - Grau 2                               
                const newRoot = node.right           // Se a raiz for removida uma outra raiz é criada a partir do node a direita             
                let current = node.right;
                while (current.left != null)        //Enquanto o node da esquerda for diferente de null 
                    current = current.left        // current percorre os valores da arvore da esquerda 
                current.left = node.left      
                return newRoot;         //retorna uma nova raiz
            }
        } else if (value < node.content) {
            node.left = this.removeVisitor(node.left, value)              //Vai remover o node da esquerda
        } else {
            node.right = this.removeVisitor(node.right, value)             //Vai remover o node da direita 
        }
        return node;
    }

    //exibe a altura da arvore
    height() {                                       // Método que exibir a altura da arvore
        return this.heightVisitor(this.root)             // Inicia a partir da raiz
    }

    heightVisitor(node) {                            // verifica se existe algum nó na arvore
        if (!node)                                 // retorna -1
            return -1
        let leftHeight = this.heightVisitor(node.left),           // a variavel recebe o tamanho da altura da esquerda
            rightHeight = this.heightVisitor(node.right)              // a variavel recebe o tamanho da altura da direita
        return Math.max(leftHeight, rightHeight) + 1               // retorna o maior entre os valores da esquerda e da direita mais 1
    }

    // informa quantos nós existem na arvore
    size() {                                         // Método que exibi o tamanho da arvore
        return this.sizeVisitor(this.root)             // Inicia a partir da raiz
    }    

    sizeVisitor(node) {                       // verifica se existe algun nó na arvore
        if (!node)
            return 0                                 // retorna 0
        return this.sizeVisitor(node.left) + this.sizeVisitor(node.right) + 1                   // retorna o total de itens a esquerda somados com os items a diteita mais 1
    }
}

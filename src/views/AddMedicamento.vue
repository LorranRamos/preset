<template>
    <v-dialog width="500" v-model="aberto">
        <v-card width="500">
            <v-app-bar color="light-green" class="elevation-1" dense>
                <h3 class="white--text font-weight-bold">Cadastrar Medicamento</h3>
                <v-spacer></v-spacer>
                <v-btn small rounded color="red" class="mr-1 white--text" @click="fechar">cancelar</v-btn>
            </v-app-bar>
            <v-flex xs12 class="pa-2">
                <div class="flex coluna">
                    <v-text-field color="light-green" v-model="dados.nome" label="Nome"></v-text-field>
                    <v-text-field color="light-green" v-model="dados.lote" label="Lote"></v-text-field>
                    <v-text-field color="light-green" v-model="dados.validade" label="Validade" v-mask="'##/##/####'"></v-text-field>
                    <v-text-field color="light-green" v-model="dados.quantidade_disponivel" label="Quantidade"></v-text-field>
                    <v-textarea v-model="dados.descricao" color="light-green" label="Descrição"></v-textarea>
                    <v-btn class="white--text" color="light-green" @click="add_produto">Cadastrar</v-btn>

                </div>
            </v-flex>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: ['aberto', 'fechar', 'add_produto_a_lista'],
    data() {
        return {
            dados: {}
        }
    },
    methods: {
        add_produto() {
            const data = this.dados
            this.$axios.post("/produto", data)
                .then((res) => {
                    this.add_produto_a_lista(res.data)
                    this.dados = {}
                    this.fechar()
                })
        }
    }
}
</script>
<template>
    <v-dialog transition="slide-x-transition" v-model="aberto" fullscreen>
        <v-card>
            <v-app-bar color="yellow darken-3" class="elevation-1 mb-1">
                <v-list class="pa-0 ma-0" nav color="transparent">
                    <v-list-item>
                        <v-btn @click="fechar()" icon class="pa-0 ma-0">
                            <v-icon color="white">fas fa-arrow-left</v-icon>
                        </v-btn>
                        <v-list-item-content>
                            <v-list-item-title class="white--text font-weight-bold">{{ medicamento.nome }} - {{ medicamento.validade }}</v-list-item-title>
                            <v-list-item-subtitle>{{ medicamento.descricao }}</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-app-bar>
            <div class="flex">
                <v-flex xs12 md4 class="pa-3">
                    <v-card class="flex">
                        <div class="flex coluna pa-2">
                            <h3 class="yellow darken-3--text text-center">Nova Retirada</h3>
                            <v-text-field color="yellow darken-3" type="number" label="Quantidade"></v-text-field>
                            <v-textarea color="yellow darken-3" label="Observação" ></v-textarea>
                            <v-btn color="yellow darken-3" class="white--text">concluir</v-btn>
                        </div>
                    </v-card>
                </v-flex>
                <v-flex xs12 md4 class="pa-3">
                    <v-card class="flex">
                        <v-flex xs12>
                            <div class="flex coluna pa-2">
                                <h3 class="yellow darken-3--text text-center">Editar Cadastro</h3>
                            </div>
                        </v-flex>
                    </v-card>
                </v-flex>
                <v-flex xs12 md4 class="pa-3">
                    <v-card class="flex">
                        <v-flex xs12>
                            <div class="flex coluna pa-2">
                                <h3 class="yellow darken-3--text text-center">Histórico de Retiradas</h3>
                            </div>
                        </v-flex>
                    </v-card>
                </v-flex>
            </div>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: ['medicamento', 'aberto', 'fechar'],
    methods: {

    }
}
</script>
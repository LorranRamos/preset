<template>
	<div class="flex coluna">
    <v-app-bar class="elevation-1" dense color="yellow darken-3">
      <h3 class="white--text">Estoque</h3>
      <v-spacer></v-spacer>
      <v-btn @click="aberto=true" >CADASTRAR MEDICAMENTO</v-btn>
      <v-btn icon color="white"><v-icon>far fa-bell</v-icon></v-btn>
    </v-app-bar>
		<div class="scroller">
			<div class="pa-1" style="height: 90vh; overflow: auto; display: inline-block; width: 300px; border-radius: 6px">
				<v-card >
					<v-list class="pa-0 ma-0">
						<v-list-item>
							<v-list-item-content>
								<v-list-item-title>
									TODOS
								</v-list-item-title>
							</v-list-item-content>

							<v-list-item-actions>						
								<v-menu>
									<template v-slot:activator="{ on }">
										<v-btn color="yellow darken-3" icon v-on="on">
											<v-icon>fas fa-clipboard</v-icon>
										</v-btn>
									</template>
				
								</v-menu>
							</v-list-item-actions>
						</v-list-item>
					</v-list>
					
					<v-list color="transparent" dense three-line class="pa-0 ma-0">
						<template v-for="(item, index) in dados">
							<v-list-item v-if="item.coluna.nome === 'novo'" @click="abre_medicamento(item)" class="animated fadeInUp" :key="item._id">
								<v-list-item-content>
									<v-list-item-title class="black--text font-weight-bold" > {{ item.nome }} </v-list-item-title>
									<v-list-item-subtitle class="grey--text">validade: {{ item.validade }} </v-list-item-subtitle>
									<v-list-item-subtitle class="orange--text">{{ item.descricao }} </v-list-item-subtitle>
								</v-list-item-content>
								<v-list-item-action>
									
								</v-list-item-action>
							</v-list-item>
							<v-divider :key="index"></v-divider>
						</template>
					</v-list>
				</v-card>
			</div>

			<div class="pa-1" style="height: 90vh; overflow: auto; display: inline-block; width: 300px; border-radius: 6px" v-for="coluna in colunas" :key="coluna._id">
				<v-card :color="coluna.cor">
					<v-list class="pa-0 ma-0">
						<v-list-item>
							<v-list-item-content>
								<v-list-item-title class="font-weight-bold text-capitalize" :style="`color: ${coluna.cor}`">
									{{ coluna.nome }}
								</v-list-item-title>
							</v-list-item-content>

							<v-list-item-actions>
								<v-menu>
									<template v-slot:activator="{ on }">
										<v-btn icon v-on="on">
											<v-icon size="18" :color="coluna.cor !== undefined ? coluna.cor : 'grey darken-3'"> fas fa-circle </v-icon>
										</v-btn>
									</template>
									<v-color-picker @input="mudaCor($event, coluna._id)" hide-canvas hide-inputs disabled v-model="color" class="ma-2" show-swatches swatches-max-height="400px"></v-color-picker>
								</v-menu>

								<v-menu>
									<template v-slot:activator="{ on }">
										<v-btn :color="coluna.cor" icon v-on="on">
											<v-icon size="18">far fa-edit</v-icon>
										</v-btn>
									</template>

									<v-list>
										<v-list-item @click="remove_coluna(coluna._id)">
											<v-list-item-title>remover coluna</v-list-item-title>
										</v-list-item>
									</v-list>
				
								</v-menu>

								
							</v-list-item-actions>
						</v-list-item>
					</v-list>
					
					<v-list color="transparent" dense three-line class="pa-0 ma-0">
						<draggable v-model="dados">
							<template v-for="(item, index) in dados">
								<v-list-item v-if="item.coluna.nome === coluna.nome" class="animated fadeInUp" @click="(item) => { this.visualizar_medicamento = item; this.medicamento_aberto_dialog = true }" :key="item._id">
									<v-list-item-content>
										<v-list-item-title class="white--text" > {{ item.nome }} </v-list-item-title>
                    <v-list-item-subtitle class="grey--text">validade: {{ item.validade }} </v-list-item-subtitle>
                    <v-list-item-subtitle class="yellow--text">{{ item.descricao }} </v-list-item-subtitle>
									</v-list-item-content>
									<v-list-item-action>
										<v-icon :size="27" :color="$primaria">fas fa-boxes</v-icon>
									</v-list-item-action>
								</v-list-item>
								<v-divider v-if="item.coluna.nome === coluna.nome" :key="index"></v-divider>
							</template>
						</draggable>
					</v-list>
				</v-card>
			</div>
			
			<div style="height: 90vh; overflow: auto;top: 0px; display: inline-block; width: 300px; border-radius: 6px" class="">
				<div class="pa-1 expande-horizontal coluna centraliza">
					<v-text-field class="mt-1" color="yellow darken-3" append-icon="fas fa-clipboard-check" @keyup.enter="add_coluna" @click:append="add_coluna" dense outlined label="Nova coluna" v-model="nova_coluna.nome"></v-text-field>
				</div>
			</div>
		</div>
    	
		<AddMedicamento :aberto="aberto" :fechar="() => this.aberto=false" :add_produto_a_lista="(item) => {this.dados.push(item); this.dadosbkp.push(item)}"/>
		<VisualizaMedicamento :aberto="medicamento_aberto_dialog" :medicamento="visualizar_medicamento" :fechar="() => { this.medicamento_aberto_dialog = false; this.visualizar_medicamento={} }" />
	</div>
</template>

<script>
import draggable from 'vuedraggable'
import AddMedicamento from './AddMedicamento'
import VisualizaMedicamento from './VisualizarMedicamento'

export default {
	components: {
		draggable,
		AddMedicamento,
		VisualizaMedicamento
	},
	data() {
		return {
			aberto: false,
			medicamento_aberto_dialog: false,
			visualizar_medicamento: {},
			nova_coluna: {
				nome: ''
			},
			colunas: [],
			dados: [],
			dadosbkp: []
		}
	},
	computed: {
		color: {
			get(e) {
				console.log('entrada',e)
			},
			set(v) {
				console.log("saida ok", v)
			}
		}
	},
	methods: {
		abre_medicamento(item) {
			this.visualizar_medicamento = item
			this.medicamento_aberto_dialog = true
		},
		mudaCor(e, id_coluna) {
			
			const dados = {
				cor: e.hex
			}

			
			this.$axios.put('/coluna/'+id_coluna, dados)
				.then(res => {
					let novas_colunas = this.colunas.filter(coluna => {
						if(coluna._id === id_coluna) {
							coluna.cor = e.hex
							return coluna
						} else {
							return coluna
						}
					}) 
					this.colunas = novas_colunas
					
				})
				.catch(error => {
					
					this.$store.dispatch('snackbar_info', error.response.data.message)
				})
			console.log("e", e)
			console.log('col', id_coluna)
		},
		add_coluna() {
			
			this.$axios.post('/coluna', this.nova_coluna)
				.then(res => {
					this.colunas.push(res.data)
					this.nova_coluna.nome = ''
					
				})
				.catch(error => {
					
					this.$store.dispatch('snackbar_info', error.response.data.message)
				})
		},
		remove_coluna(id) {
			
			this.$axios.delete('/coluna/'+id)
				.then(res => {
					let novas_colunas = this.colunas.filter(coluna => coluna._id !== id)
					this.colunas = novas_colunas
					
				})
				.catch(error => {
					
					this.$store.dispatch('snackbar_info', error.response.data.message)
				})
		},
		list_colunas() {
			
			this.$axios.get('/coluna')
				.then(res => {
					this.colunas = res.data
					
				})
				.catch(error => {
					
					this.$store.dispatch('snackbar_info', error.response.data.message)
				})
		},
		list_produtos() {
			
			this.$axios.get('/produto')
				.then(res => {
					this.dados = res.data
					this.dadosbkp = res.data
				})
				.catch(error => {
					this.$store.dispatch('snackbar_info', error.response.data.message)
				})
		}
	},
	created() {
    this.list_colunas()
    this.list_produtos()
	}
}
</script>

<style>
	.scroller {
		position: relative;
		min-height: 100%;
		overflow:scroll;
		overflow-y: hidden;
		white-space:nowrap; 
	}
  .flex {
    display: flex;
    width: 100%;
  }
  .coluna {
    flex-direction: column;
  }
</style>
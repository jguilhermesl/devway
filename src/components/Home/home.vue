<template>
    <div class="home">
        <div class="infoHome">
            <h1>MONTE SEU HAMBÚRGUER</h1>
            <span>O melhor hambúrguer da cidade</span>
            <button>Pedir agora</button>
            <p>Nós preparamos com muito amor! ❤</p>
        </div>
        <img src="/img/burguer.png" alt="Hamburguer grande" />
    </div>
    <div class="makeYourBurguer">
        <h1>Monte seu hamburguer</h1>
        <form @submit="handleForm($event)">
            <input type="text" placeholder="Digite seu nome" class="inputInfo" v-model="nameCustomer" />
            <label>Escolha seu pão</label>
            <div class="cards">
                <CardBread :data="infoDataBreads" :breadSelected="breadSelected" :changeBread="changeBread" />
            </div>
            <label>Escolha a carne do hambúrguer</label>
            <select class="inputInfo" v-model="inputMeatType" @change="() => (meatSelected = inputMeatType)">
                <option v-for="meat in infoDataMeats" v-bind:key="meat.id">
                    {{ meat.type }}
                </option>
            </select>
            <label>Selecione os opcionais</label>
            <div class="optionalContainer">
                <div class="option" v-for="optional in infoDataOptionals" v-bind:key="optional.id">
                    <input type="checkbox" name="optional" :value="optional.type"
                        @click="() => checkOptional(optional.type)" />
                    <span>{{ optional.type }}</span>
                </div>
            </div>
            <button type="submit" class="buttonHandleForm">Registrar pedido</button>
        </form>
    </div>
</template>

<script>
import { db } from "../../services/firebase";
import { collection, addDoc } from "firebase/firestore/lite";
import { dataApiFake } from "../../api/data";

import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

import CardBread from "../CardBread/CardBread.vue";

export default {
    name: "Home",
    components: {
        CardBread
    },
    data() {
        return {
            //INPUTS
            inputMeatType: "",

            //ESCOLHAS DO CLIENTE
            nameCustomer: "",
            breadSelected: "",
            meatSelected: "",
            optionalsSelected: [],
            status: "Solicitado",
            statusNumber: 1,

            //INFO API FAKE
            infoDataBreads: dataApiFake.BREADS,
            infoDataMeats: dataApiFake.MEATS,
            infoDataOptionals: dataApiFake.OPTIONALS,

            //MODAL
            isModalActive: false,
        };
    },
    methods: {
        async handleForm(e) {
            e.preventDefault();

            console.log(this.nameCustomer)
            console.log(this.breadSelected)

            if (
                this.nameCustomer === "" ||
                this.breadSelected === "" ||
                this.meatSelected === ""
            ) {
                Swal.fire({
                    title: "Erro!",
                    text: "Preencha todos os campos.",
                    icon: "warning",
                    confirmButtonText: "Ok",
                    confirmButtonColor: '#D93A31'
                });
                return
            }

            try {
                const docRef = await addDoc(collection(db, "orders"), {
                    nameCustomer: this.nameCustomer,
                    breadType: this.breadSelected,
                    meatType: this.meatSelected,
                    optionalCustomer: this.optionalsSelected,
                    statusType: this.status,
                    statusNumber: this.statusNumber
                })
                console.log("Success")
            } catch (e) {
                console.log(e)
            }
            Swal.fire({
                    title: "Sucesso!",
                    text: "Pedido registrado com sucesso.",
                    icon: "success",
                    confirmButtonText: "Ok",
                });
        },

        checkOptional(optional, index) {
            if (this.optionalsSelected.includes(optional)) {
                this.optionalsSelected.forEach((itensOptionals, index) => {
                    if (itensOptionals === optional) {
                        this.optionalsSelected.splice(index, 1);
                        return;
                    }
                    return;
                });
            } else {
                this.optionalsSelected.push(optional);
            }
        },

        changeBread(breadType) {
            this.breadSelected = breadType
        }
    },
};
</script>

<style src="./style.scss" lang="sass" scoped />




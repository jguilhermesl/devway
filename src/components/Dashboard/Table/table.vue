<template>
    <div class="table">
        <div class="titlesTable">
            <span>Cliente</span>
            <span>Tipo do pão</span>
            <span>Carne</span>
            <span>Opcionais</span>
            <span>Status</span>
            <span class="actions">Ações</span>
        </div>
        <div class="flexContentTable">
            <div class="contentTable" v-for="(order, index) in data" v-bind:key="order.id">
                <span data-label="Cliente" class="nameContentTable">{{
                        order.nameCustomer
                }}</span>
                <span data-label="Tipo do pão">{{ order.breadType }}</span>
                <span data-label="Carne">{{ order.meatType }}</span>
                <span data-label="Opcionais">
                    <ul>
                        <li v-for="(optional, indexOptional) in data[index].optionalCustomer"
                            v-bind:key="indexOptional">
                            {{ optional }}
                        </li>
                    </ul>
                </span>
                <span data-label="Status">
                    <p v-if="order.statusType === 'Finalizado'">Finalizado</p>
                    <select v-else v-model="order.statusType" @change="() => changeStatus(order.statusType, order.id, order.statusNumber)">
                        <option v-for="status in infoDataStatus" v-bind:key="status.number">{{ status.status }}</option>
                    </select>
                </span>
                <span class="icons" data-label="Ações">
                    <div>
                        <button @click="() => finishOrder(order, order.id)" style="background: #3BCF3E">
                            <i class="fa-solid fa-check"></i>
                        </button>
                        <button @click="() => deleteOrder(order.id)">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import { db } from "../../../services/firebase";
import {
    collection,
    getDocs,
    doc,
    deleteDoc,
    updateDoc,
    orderBy, 
    query
} from "firebase/firestore/lite";
import { dataApiFake } from "../../../api/data";

export default {
    name: "Table",
    data() {
        return {
            data: [],

            infoDataStatus: dataApiFake.STATUS,

            statusType: "oiii",
        };
    },
    components: {},
    methods: {
        async loadOrders() {
            let infoApi = [];

            const q = query(collection(db, "orders"), orderBy("statusNumber", "asc"))

            const querySnapshot = await getDocs(q)
            querySnapshot.forEach((doc) => {
                let orderData = {
                    id: doc.id,
                    breadType: doc.data().breadType,
                    meatType: doc.data().meatType,
                    nameCustomer: doc.data().nameCustomer,
                    statusType: doc.data().statusType,
                    optionalCustomer: doc.data().optionalCustomer,
                    statusNumber: doc.data().statusNumber
                };
                infoApi.push(orderData);
            });

            this.data = infoApi;
        },
        async deleteOrder(id) {
            console.log("id+ +" + id);
            await deleteDoc(doc(db, "orders", id));
            this.loadOrders();
        },
        async changeStatus(status, id, statusNumber) {

            const orderRef = doc(db, "orders", id);

            if(status === 'Solicitado') {
                statusNumber = 1
            } else if (status === 'Em preparo') {
                statusNumber = 2
            } else if(status === 'Em trânsito') {
                statusNumber = 3
            } else {
                statusNumber = 4
            }

            await updateDoc(orderRef, {
                statusType: status,
                statusNumber: statusNumber
            })
            this.loadOrders()
        },
        async finishOrder(status, id) {
            console.log(status)
            const orderRef = doc(db, "orders", id);

            await updateDoc(orderRef, {
                statusType: "Finalizado",
                statusNumber: 4
            });
            this.loadOrders()
        }
    },
    mounted() {
        this.loadOrders();
    },
};
</script>

<style src="./style.scss" lang="sass" scoped>
</style>
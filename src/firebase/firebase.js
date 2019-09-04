//подключаю гугловскую базу данных с помощью синтаксиса, который пихает все named экспорты в один объект
import * as firebase from 'firebase';

//для того, чтобы подключится к базе данных
const firebaseConfig = {
    apiKey: "AIzaSyDsJv3ozklOMFujfiHwy5e5ywbdmOviI74",
    authDomain: "expensify-33c29.firebaseapp.com",
    databaseURL: "https://expensify-33c29.firebaseio.com",
    projectId: "expensify-33c29",
    storageBucket: "expensify-33c29.appspot.com",
    messagingSenderId: "180981055258",
    appId: "1:180981055258:web:a2beb2a9f195dfb7"
};


firebase.initializeApp(firebaseConfig);
const database = firebase.database();
//для аунтификации через гугл
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, googleAuthProvider, database as default };

            //примеры
//ref(путь к свойству).set(значение)

// const dataManipulations = async () => {
//
//     //fetch
//     await database.ref().once('value').then((snapshot)=>{
//         console.log(snapshot.val())
//     })
//
//     //подписываюсь на изменения в базе данных по вебсокету
//     database.ref().on('value', (snapshot)=> {
//         console.log(snapshot.val())
//     })
//
//     //set
//     try{
//         await database.ref().set({
//             name:'max',
//             age: 18,
//             goals: {
//                 first: 'get haircut',
//                 second: 'get through react'
//             },
//             stressLevel: 7,
//             job: {
//                 title: 'unemployed',
//                 company: 'Nowhere Co'
//             }
//         });
//
//         await database.ref('age').set(15);
//
//         //путь к свойтсву объекта goals
//         await database.ref('goals/first').set('get haircut tomorrow');
//
//              //update
//         //нормально обновляет только рут, вложенные объекты тупо перезапишет
//         await database.ref().update({
//             name: 'makkuso',
//             age: 16,
//             //так что для их изменения нужна такая херь
//             'goals/second': 'get through react and web in overall'
//         })
//
//         await database.ref().update({
//             stressLevel: 9,
//             'job/company': 'Musorka Co'
//         })
//     }
//     catch (e) {
//         console.log(e)
//     }
//
//     //remove
//     try{
//         database.ref('goals/first').remove()
//     }catch (e) {
//         console.log(e)
//     }
// };
//
// //dataManipulations();
//
// const websocketChallenge = async () => {
//     //слежу за изменениями через вебсокет
//     database.ref().on('value', (snapshot)=> {
//         const val = snapshot.val();
//         console.log(`${val.name} is a ${val.job.title} in ${val.job.company}`)
//     })
// };
//
// //websocketChallenge()
//
// const arrayManipulations = async () => {
//     // database.ref('notes').push({
//     //     body: 'this is my note',
//     //     title: 'first note'
//     // },)
//     //
//     // database.ref('expenses').push({
//     //     description: 'air bill',
//     //     amount: 20,
//     //     note: 'water should be free :c',
//     //     createdAt: 121
//     // })
//     // database.ref('expenses').once('value').then((snapshot)=>{
//     //     const expenses = [];
//     //
//     //     snapshot.forEach((childSnapshot)=>{
//     //         expenses.push({
//     //             id: childSnapshot.key,
//     //             ...childSnapshot.val()
//     //         })
//     //     })
//     //     console.log(expenses)
//     // })
//
//     // database.ref('expenses').on('value', (snapshot)=>{
//     //     const expenses = [];
//     //
//     //     snapshot.forEach((childSnapshot)=>{
//     //         expenses.push({
//     //             id: childSnapshot.key,
//     //             ...childSnapshot.val()
//     //         })
//     //     });
//     //     console.log(expenses)
//     // })
//
//     database.ref('expenses').on('child_removed', (snapshot)=>{
//         console.log(snapshot.key, snapshot.val())
//     });
//
//     database.ref('expenses').on('child_changed', (snapshot)=>{
//         console.log(snapshot.key, snapshot.val())
//     });
//
//     database.ref('expenses').on('child_added', (snapshot)=>{
//         console.log(snapshot.key, snapshot.val())
//     })
// };
//
// //arrayManipulations();






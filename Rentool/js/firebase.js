/// <reference path="../../firebase.d.ts" />
import { Reservation } from './domain/Reservation.js';
import { Location } from './domain/Location.js';

const firebaseConfig = {
  apiKey: 'AIzaSyA7JwpO8rrYXgeKfiokAoymg2vJia3h7Nc',
  authDomain: 'rentool-4a9e6.firebaseapp.com',
  projectId: 'rentool-4a9e6',
  storageBucket: 'rentool-4a9e6.appspot.com',
  messagingSenderId: '357202195995',
  appId: '1:357202195995:web:4a7e7342acf44dd4f4eabe',
  measurementId: 'G-B5QXJNMD7M'
};

const app = firebase.initializeApp(firebaseConfig);
let db = firebase.default.firestore();

/**
 * @description Sign-in with Email and Password
 * @async
 * @param {string} email
 * @param {string} password
 * @returns {Promise}
 */
export const signInEmailWithPassword = async (email, password) => {
  db.collection('Users')
    .where('email', '==', email).where('pswd', '==', password).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.id, ' => ', doc.data());
      });
      if (querySnapshot.size > 0) {
        alert('SignIn Success');
      }
    })
    .catch((error) => {
      console.log('Error getting documents: ', error);
      alert(`ERROR: ${error}`);
    });
};

/**
 * @description Get tool information by Category
 * @async
 * @param {string} category
 * @return {object []}
 */
export const getToolsByCategory = async (category = '') => {
  const toolsDoc = await db.collection('Tools').where('category', '==', category).get();
  const tools = [];
  toolsDoc.forEach(doc => tools.push({ toolId: doc.id, ...doc.data(), }));

  return tools;
};

/**
 * @description Get tool information by Keyword
 * @async
 * @param {string} keyword
 * @return {object[]}
 */
export const getToolsByKeyword = async (keyword = '') => {
  const toolsDoc = await db.collection('Tools').get();
  let tools = [];
  toolsDoc.forEach(doc => { tools.push({ toolId: doc.id, ...doc.data() }); });

  // Return all data when the keyword is empty
  if (keyword === '') {
    return tools;
  }

  tools = tools.filter(tool => JSON.stringify(tool).includes(keyword));
  return tools;
};

/**
 * @description Set tool data into Tools collection, mostly for testing purposes
 * @async
 * @param {object[]} tool
 */
export const setToolData = async (tool) => {
  const toolsDoc = await db.collection('Tools').add({ ...tool });
};


// @TODO: getToolsByReservationToolIndex

// @TODO: addReservationData

// @TODO: reservationRequest:

// @TODO: returnTool: change flag of reservation data

// @TODO: changeLocation of the returned tool: change location data of the tool by toolId



/**
 * @description Return tools, change reservation data and tool data
 * @async
 * @param {Reservation} reservation
 * @param {Location} locationToReturn
 */
export const returnTool = async (reservation, locationToReturn) => {
  const { reservationId, toolId } = reservation;

  //@ TODO: change reservation data's isReturned by reservationId
  //@ TODO: change toolId is isReserved:false by toolId, and location

  // Mock Request
  return setTimeout((() => {
    console.log(`${reservationId}'s is returned, ToolId: ${toolId}'s isReserved will be false`);
    console.log(`ToolId: ${toolId} will be back to ${locationToReturn.address}`);
    console.log('return complete');
  }), 500);
};
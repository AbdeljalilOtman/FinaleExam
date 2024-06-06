const firebase = require('firebase/app');
require('firebase/firestore');




// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCexHHrZO_wtwm065YUEBm6_MHGN6uBKy0",
  authDomain: "finale-exam.firebaseapp.com",
  projectId: "finale-exam",
  storageBucket: "finale-exam.appspot.com",
  messagingSenderId: "70141754263",
  appId: "1:70141754263:web:99e375d7f024928a2f22d2"
};
firebase.initializeApp(firebaseConfig);


const db = firebase.firestore();




// Data to add

const ArticleData =[
    {
      "nom": "Saumon Rôti aux Asperges Rôties",
      "description": "Un plat délicieux et nutritif, facile à préparer",
      "ingredients": [
        { "nom": "Filets de saumon", "quantité": 450, "unité": "g" },
        { "nom": "Asperges vertes", "quantité": 250, "unité": "g" },
        { "nom": "Huile d'olive", "quantité": "2 cuillères à soupe", "unité": "" },
        { "nom": "Sel et poivre", "quantité": "au goût", "unité": "" },
        { "nom": "Citron, en jus", "quantité": "1/2", "unité": "unité" }
      ],
      "instructions": [
        "Préchauffer le four à 200°C.",
        "Sécher les filets de saumon avec du papier absorbant et les assaisonner de sel, de poivre et d'herbes fraîches (facultatif).",
        "Disposer les filets de saumon sur une plaque de cuisson tapissée de papier sulfurisé.",
        "Laver et sécher les asperges vertes.",
        "Couper les extrémités dures des asperges et les enrober d'huile d'olive.",
        "Disposer les asperges autour des filets de saumon.",
        "Enfourner pendant 15-20 minutes, ou jusqu'à ce que le saumon soit cuit et que les asperges soient tendres.",
        "Servir immédiatement avec un jus de citron pressé."
      ],
      "temps_preparation": 10,
      "temps_cuisson": 20,
      "regime": "Omnivore",
      "portions": 2,
      "tags": ["facile", "rapide", "santé", "poisson"],
      "image": "https://example.com/baked_salmon_asparagus.jpg",
      "authorID": "userID_1"
    },
    {
      "nom": "Curry de Légumes",
      "description": "Un curry savoureux et épicé avec des légumes frais",
      "ingredients": [
        { "nom": "Pommes de terre", "quantité": 300, "unité": "g" },
        { "nom": "Carottes", "quantité": 200, "unité": "g" },
        { "nom": "Pois chiches", "quantité": 240, "unité": "g" },
        { "nom": "Lait de coco", "quantité": 400, "unité": "ml" },
        { "nom": "Curry en poudre", "quantité": "2 cuillères à soupe", "unité": "" },
        { "nom": "Oignon", "quantité": 1, "unité": "unité" },
        { "nom": "Ail", "quantité": 2, "unité": "gousses" },
        { "nom": "Huile de coco", "quantité": "1 cuillère à soupe", "unité": "" },
        { "nom": "Sel", "quantité": "au goût", "unité": "" }
      ],
      "instructions": [
        "Chauffer l'huile de coco dans une grande casserole à feu moyen.",
        "Ajouter l'oignon et l'ail hachés et faire revenir jusqu'à ce qu'ils soient tendres.",
        "Ajouter les pommes de terre et les carottes coupées en dés, et faire revenir pendant 5 minutes.",
        "Ajouter le curry en poudre et mélanger bien.",
        "Ajouter le lait de coco et les pois chiches, et porter à ébullition.",
        "Réduire le feu et laisser mijoter jusqu'à ce que les légumes soient tendres.",
        "Assaisonner de sel et servir chaud avec du riz."
      ],
      "temps_preparation": 15,
      "temps_cuisson": 30,
      "regime": "Vegan",
      "portions": 4,
      "tags": ["épicé", "santé", "vegan", "rapide"],
      "image": "https://example.com/vegetable_curry.jpg",
      "authorID": "userID_2"
    },
    {
      "nom": "Tacos de Poisson",
      "description": "Des tacos frais et délicieux avec du poisson grillé",
      "ingredients": [
        { "nom": "Filets de poisson blanc", "quantité": 400, "unité": "g" },
        { "nom": "Tortillas de maïs", "quantité": 8, "unité": "unités" },
        { "nom": "Chou rouge", "quantité": 150, "unité": "g" },
        { "nom": "Avocat", "quantité": 2, "unité": "unités" },
        { "nom": "Coriandre fraîche", "quantité": "1 poignée", "unité": "" },
        { "nom": "Citron vert", "quantité": 2, "unité": "unités" },
        { "nom": "Sel et poivre", "quantité": "au goût", "unité": "" }
      ],
      "instructions": [
        "Assaisonner les filets de poisson avec du sel, du poivre et du jus de citron vert.",
        "Faire griller le poisson jusqu'à ce qu'il soit cuit et se défasse facilement à la fourchette.",
        "Couper le chou rouge en fines lamelles et l'avocat en tranches.",
        "Réchauffer les tortillas de maïs dans une poêle ou au micro-ondes.",
        "Garnir chaque tortilla de morceaux de poisson, de chou rouge, d'avocat et de coriandre fraîche.",
        "Ajouter un filet de jus de citron vert et servir immédiatement."
      ],
      "temps_preparation": 20,
      "temps_cuisson": 10,
      "regime": "Pescétarien",
      "portions": 4,
      "tags": ["frais", "poisson", "rapide", "tacos"],
      "image": "https://example.com/fish_tacos.jpg",
      "authorID": "userID_3"
    },
    {
      "nom": "Salade de Quinoa et Avocat",
      "description": "Une salade fraîche et nutritive, parfaite pour l'été",
      "ingredients": [
        { "nom": "Quinoa", "quantité": 200, "unité": "g" },
        { "nom": "Avocat", "quantité": 2, "unité": "unités" },
        { "nom": "Tomates cerises", "quantité": 150, "unité": "g" },
        { "nom": "Concombre", "quantité": 1, "unité": "unité" },
        { "nom": "Coriandre fraîche", "quantité": "1 poignée", "unité": "" },
        { "nom": "Citron, en jus", "quantité": 1, "unité": "unité" },
        { "nom": "Huile d'olive", "quantité": "2 cuillères à soupe", "unité": "" },
        { "nom": "Sel et poivre", "quantité": "au goût", "unité": "" }
      ],
      "instructions": [
        "Cuire le quinoa selon les instructions sur l'emballage, puis laisser refroidir.",
        "Couper les avocats, les tomates cerises et le concombre en morceaux.",
        "Dans un grand bol, mélanger le quinoa, les avocats, les tomates cerises et le concombre.",
        "Ajouter la coriandre fraîche hachée.",
        "Assaisonner avec le jus de citron, l'huile d'olive, le sel et le poivre.",
        "Mélanger bien et servir frais."
      ],
      "temps_preparation": 15,
      "temps_cuisson": 20,
      "regime": "Vegan",
      "portions": 4,
      "tags": ["frais", "santé", "vegan", "été"],
      "image": "https://example.com/quinoa_avocado_salad.jpg",
      "authorID": "userID_4"
    }]

  

// Function to add data to Firestore

const addArticlesToFirestore = async (ArticlesData)=> {
  try {

    // Loop through each job and add it to Firestore

    for (const article of ArticlesData) {

      // Use set with merge to add or update the document

      await
db.collection('recipes').doc().set(article,
 { merge : true});

    }

    console.log("Recipces added to Firestore successfully!");

  } catch (error) {

    console.error("Error adding Recipces to Firestore: ", 
error);

  }

};
// Call the function to add jobs data to Firestore

addArticlesToFirestore(ArticleData);

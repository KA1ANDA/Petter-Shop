const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { https } = require("firebase-functions");

admin.initializeApp();

const db = admin.firestore();
const storage = admin.storage().bucket();




//updating product sales

exports.updateSalePrices = functions.pubsub
  .schedule('every 24 hours') 
  .onRun(async (context) => {
  try {
    const snapshot = await db.collection('products').get();

    const time = new Date().toLocaleString("en-US", { timeZone: "Asia/Tbilisi" });
    const date = new Date(time)
    const currentTime = date.getTime();

    await Promise.all(
      snapshot.docs.map(async (doc) => {
        const productData = doc.data();
        const { uploadTime, onSaleduration, sizes } = productData;

        const date = new Date(onSaleduration);
        const saleEndTime = date.getTime();

        // Handle sale termination for products without sizes
        if (!sizes || sizes.length === 0) {
          if (currentTime >= saleEndTime) {
            await doc.ref.update({
              onSalePrice: 0,
              isSaleActive: false,
              onSaleduration:""
            });
            console.log(`Product ${doc.id}: Sale ended and price updated.`);
            console.log('yvaviiiiii')
          }
        } else {
          // Handle sale termination for products with sizes
          console.log('else xdebaaaa')
          const updatedSizes = sizes.map((size) => {
            const individualSaleEndTime = new Date(size.onSaleduration).getTime();

            console.log('saleend' , individualSaleEndTime)
            console.log('axla' , currentTime)

            if (currentTime >= individualSaleEndTime) {
              return {
                ...size,
                additionalOnSale: 0,
                isSaleActive: false,
                onSaleduration: "",
              };
            } else {
              return size;
            }
          });


          await doc.ref.update({
            sizes: updatedSizes,
          });
        }
      })
    );

    return { success: true };
  } catch (error) {
    console.error('Error updating sale prices:', error);
    throw new functions.https.HttpsError('internal', 'Error updating sale prices');
  }
});



// Callable function to delete user document and profile image
exports.deleteUserAndProfileImage = functions.https.onCall(async (data, context) => {
  try {
    // Ensure user is authenticated
    if (!context.auth) {
      throw new https.HttpsError('unauthenticated', 'User not authenticated.');
    }

    const userId = context.auth.uid;


    // Delete the profile image from storage
    const profileImageRef = storage.file(`profileImages/${userId}`);
    const [profileImageExists] = await profileImageRef.exists();
    
    if (profileImageExists) {
      // Delete the profile image from storage
      await profileImageRef.delete();
      console.log("Profile image deleted:", userId);
    } else {
      console.log("Profile image does not exist:", userId);
    }

    await admin.auth().deleteUser(userId);
    console.log("User document deleted:", userId);


    // await admin.auth().revokeRefreshTokens(userId);

    return { success: true };
  } catch (error) {
    console.error("Error deleting user and profile:", error);
    // Log the error stack trace for debugging purposes
    console.error(error.stack);
  
    // Return a detailed error response
    throw new https.HttpsError('internal', `Error deleting user and profile: ${error.message}`);
  }
});



//add propertys for new users

exports.createUserAndAddToDB = functions.auth.user().onCreate(async (user) => {

  const displayName = user.displayName || `${user.email.split('@')[0]}`;
  try {
    // Create user in Firestore
    await db.collection("users").doc(user.uid).set({
      id: user.uid,
      displayName,
      email: user.email || '',
      photo: user.photoURL || '',
      city:'',
      district:'',
      address:'',
      inbox:[],
      phoneNumber:null,
      activity: '',
      shopWishlist: [],
      shopCart: [],
    });

    
    console.log("User added to Firestore:", user.uid);
  } catch (error) {
    console.error("Error adding user to Firestore:", error);
  }
});



//make someone admin 


exports.addAdminRole = functions.https.onCall((data , context) => {
  //check if request is made by admin
  if(context.auth.token.admin !== true){
    return {error:'only admins can add other admins'}
  }
  //get user and add custom claim (admin)
  return admin.auth().getUserByEmail(data.email).then(user =>{
    return admin.auth().setCustomUserClaims(user.uid , {
      admin:true
    });
  }).then(()=>{
    return{
      message:`Success! ${data.email} has been made an admin`
    }
  }).catch(err => {
    return err;
  })
})
 



//delete user document 

exports.userDelete = functions.auth.user().onDelete(user => {
  const doc = admin.firestore().collection('users').doc(user.uid);
  return doc.delete()
})
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
admin.initializeApp();
const db = admin.firestore();

export const app = functions.https.onRequest(async (req, res) => {
  const short = req.path.split("/")[1];

  try {
    // Check firestore database for valid short links in both collections
    const customDomainSnap = await db
      .collection("customShortUrls")
      .where("id", "==", short)
      .get();

    const regularSnap = await db
      .collection("shortUrls")
      .where("id", "==", short)
      .get();

    // Redirect appropriately
    if (customDomainSnap.size > 0) {
      res.redirect(customDomainSnap.docs[0].data().longUrl);
    } else if (regularSnap.size > 0) {
      res.redirect(regularSnap.docs[0].data().longUrl);
    } else {
      res.status(404).send("Invalid short link");
    }
  } catch (error) {
    console.error("Error redirecting:", error);
    res.status(500).send("Internal Server Error");
  }
});

export const trackClick = functions.https.onRequest(
  async (request, response) => {
    const { shortLinkId } = request.query as { shortLinkId: string };

    try {
      // Increment the click count for the short link
      await db
        .collection("shortUrls")
        .doc(shortLinkId)
        .update({
          clickCount: admin.firestore.FieldValue.increment(1),
        });

      // Save the click data in the clicks collection
      await db.collection("clicks").add({
        shortLinkId,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
      });

      // Return a success response
      response.sendStatus(200);
    } catch (error) {
      console.error("Error tracking click:", error);
      response.status(500).send("Internal Server Error");
    }
  }
);

//function to get users short links with auto generated slug
export const getUserLinks = functions.https.onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  const { userId } = req.query as { userId: string };

  try {
    const snapshot = await admin
      .firestore()
      .collection("shortUrls")
      .where("user", "==", userId)
      .get();

    const links: any[] = [];
    snapshot.forEach((doc) => {
      const link = doc.data();
      links.push(link);
    });

    res.json({ links });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

// function to get users custom links with back half
export const getCustomUserLinks = functions.https.onRequest(
  async (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    const { userId } = req.query as { userId: string };

    try {
      const snapshot = await admin
        .firestore()
        .collection("customShortUrls")
        .where("user", "==", userId)
        .get();

      const links: any[] = [];
      snapshot.forEach((doc) => {
        const link = doc.data();
        links.push(link);
      });

      res.json({ links });
    } catch (error) {
      res.status(500).json({ error: "An error occurred" });
    }
  }
);

import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, push, query, orderByChild, equalTo, update } from "firebase/database";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

let app = null;
let database = null;

try {
  app = initializeApp(firebaseConfig);
  database = getDatabase(app);
} catch (error) {
  console.error('Firebase initialization failed. Check environment variables:', error);
}

export { database };


// Helper for SHA-256 hashing using Web Crypto API
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

export async function loginUser(username, password) {
  if (!database) {
    throw new Error('Dịch vụ xác thực chưa sẵn sàng. Vui lòng kiểm tra cấu hình.');
  }
  try {
    const usersRef = ref(database, 'users');
    const q = query(usersRef, orderByChild('username'), equalTo(username));
    const snapshot = await get(q);


    if (snapshot.exists()) {
      const users = snapshot.val();
      const userId = Object.keys(users)[0];
      const userData = users[userId];

      const hashedPassword = await hashPassword(password);
      
      if (userData.password === hashedPassword) {
        // Remove password from the user object before storing/returning
        const { password: _, ...userWithoutPassword } = userData;
        const sessionUser = { id: userId, ...userWithoutPassword };
        
        localStorage.setItem('userSession', JSON.stringify(sessionUser));
        return sessionUser;
      } else {
        throw new Error('Invalid username or password');
      }
    } else {
      throw new Error('Invalid username or password');
    }
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}

export function logoutUser() {
  localStorage.removeItem('userSession');
}

export function getCurrentUser() {
  try {
    const sessionStr = localStorage.getItem('userSession');
    return sessionStr ? JSON.parse(sessionStr) : null;
  } catch {
    return null;
  }
}

export async function saveTestResult(userId, testId, resultData, userDisplayName) {
  try {
    const newResultId = push(ref(database, `users/${userId}/results`)).key;
    
    const updates = {};
    // Update user's results
    updates[`users/${userId}/results/${newResultId}`] = {
      testId,
      ...resultData
    };
    
    // Update global test results
    updates[`testResults/${testId}/${newResultId}`] = {
      userId,
      displayName: userDisplayName || 'Unknown',
      ...resultData
    };

    await update(ref(database), updates);
    return newResultId;
  } catch (error) {
    console.error('Error saving test result:', error);
    throw error;
  }
}

export async function getUserResults(userId) {
  try {
    const resultsRef = ref(database, `users/${userId}/results`);
    const snapshot = await get(resultsRef);
    return snapshot.exists() ? snapshot.val() : {};
  } catch (error) {
    console.error('Error getting user results:', error);
    throw error;
  }
}

export async function getTestResults(testId) {
  try {
    const testResultsRef = ref(database, `testResults/${testId}`);
    const snapshot = await get(testResultsRef);
    return snapshot.exists() ? snapshot.val() : {};
  } catch (error) {
    console.error('Error getting test results:', error);
    throw error;
  }
}

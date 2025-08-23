import env from '@/lib/env';
import { getParam } from '@/store';
import { AI, GoogleAIBackend, getAI, getGenerativeModel } from 'firebase/ai';
import { FirebaseApp, initializeApp } from 'firebase/app';

const getAiModelName = () => getParam('ai_model') ?? 'gemini-2.5-flash';

let firebaseApp: FirebaseApp;
let ai: AI;
export default function initConfig() {
  if (!env.VITE_FIREBASE_CONFIG || !env.VITE_ONLINE) return;

  // Initialize Firebase
  firebaseApp ??= initializeApp(env.VITE_FIREBASE_CONFIG);

  // Initialize the Gemini Developer API backend service
  ai ??= getAI(firebaseApp, { backend: new GoogleAIBackend() });

  // Create a `GenerativeModel` instance with a model that supports your use case
  const model = getGenerativeModel(ai, { model: getAiModelName() });

  return model;
}

const keys = ['apiKey', 'authDomain', 'projectId', 'storageBucket', 'messagingSenderId', 'appId'];

export function parseFirebaseConfig(configString: string | null | undefined) {
  if (!configString) {
    return null;
  }
  const values = configString.split(',').map((v) => v.trim());
  
  if (values.length !== keys.length) {
    return null;
  }
  
  const config = keys.reduce((acc, key, index) => {
    return {
      ...acc,
      [key]: values[index]
    };
  }, {});

  return config;
}

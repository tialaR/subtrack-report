import { v5 as uuidv5 } from 'uuid';

// UUID namespace fixo para gerar UUIDs determinísticos
const NAMESPACE = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';

export const generateSubMapId = (path: string) => {
  return uuidv5(path, NAMESPACE);
};

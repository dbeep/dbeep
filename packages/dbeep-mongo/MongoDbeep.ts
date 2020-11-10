interface Config {
  protocol: string;
  url: string;
  port: number;
  username?: string;
  password?: string;
  options?: ConnectionOptions;
}

interface ConnectionOptions {
  validateOptions: boolean;
  poolSize: number;
  minSize: number;
  family?: number;
  noDelay: boolean;
  keepAlive: boolean;
  keepAliveInitialDelay: number;
  connectTimeoutMS: number;
  socketTimeoutMS: number;
  forceServerObjectId: boolean;
  serializeFunctions: boolean;
  ignoreUndefined: boolean;
  raw: boolean;
  promoteLongs: boolean;
  promoteBuffers: boolean;
  promoteValues: boolean;
  pkFactory?: Record<string, unknown>;
  promiseLibrary?: Record<string, unknown>;
  loggerLevel?: string;
  logger?: Record<string, unknown>;
  tls: boolean;
}

const defaultMongoDastabaseConfig: Config = {
  protocol: 'mongodb',
  url: 'localhost',
  port: 27017,
  options: {
    validateOptions: false,
    poolSize: 5,
    minSize: 0,
    noDelay: true,
    keepAlive: true,
    keepAliveInitialDelay: 30000,
    connectTimeoutMS: 30000,
    socketTimeoutMS: 360000,
    forceServerObjectId: false,
    serializeFunctions: false,
    ignoreUndefined: false,
    raw: false,
    promoteLongs: true,
    promoteBuffers: false,
    promoteValues: true,
    tls: false,
  },
};

export class MongoDbeep {
  constructor(readonly config: Config = defaultMongoDastabaseConfig) {}
}

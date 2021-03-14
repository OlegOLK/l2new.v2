export interface Rate {
    type: string;
    amount: number;
  }
  
  export enum Premium {
    none,
    vip,
    vip_pinned,
    vip_banner,
  }
  

  export interface Server {
    name: string;
    rates: Rate[];
    chronicles: string;
    openDate: string;
    features: string[];
    premium: Premium;
    type: string;
    uri: string;
    id: string;
  }
  
  export interface UserServer {
    id: string;
    chronicles: string;
    openDate: string;
    name: string;
    platform: string;
    rates: Rate[];
    type: string;
    uri: string;
    premium: number;
    approved: boolean;
    isDirty: boolean;
    questions: UserServerQuestion[];
  }
  
  export interface UserServerQuestion {
    id: string;
    answer: string;
    question: string;
  }
  
  export interface NewServer {
    Chronicles: string;
    OpenDate: string;
    Name: string;
    Platform: string;
    Uri: string;
    Type: string;
    Rates: Rate[];
  }
  
  export interface ServersList {
    label: string;
    panel: number;
    servers: Server[];
    sortOrder: number;
  }
  
  export interface ServersDataState {
    jsonData: Server[];
    serversList: ServersList[];
    rawServerList: ServersList[];
    loading: boolean;
    serverFilter?: string | null;
    dataWasInitialized: boolean;
  }
  
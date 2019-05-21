export type Policy = {
  Version?: string;
  Statement?: Array<Statement>;
};

export type Statement = {
  Action?: string;
  Effect?: string;
  Resource?: String | Array<string>;
};

export const SWAGGER_CONFIG: SwaggerConfig = {
  title: 'Music Land API',
  description: 'This is the official API of Music Land System',
  version: '1.0',
 
  license:"Mohammed alreai"
  
};

export interface SwaggerConfig {
  title: string;
  description: string;
  version: string;
  // tags: string[];
  license:string
}

export const SWAGGER_CONFIG: SwaggerConfig = {
  title: 'Music Land API',
  description: 'This is the official API of Music Land System',
  version: '1.0',
  tags: [
    'songs',
    'music',
    'albums',
    'artists',
    'musicians',
    'singers',
    'notifications',
    'chats',
    'gateways',
    'rooms',
    'auth',
    'strategies',
    'jwt',
  ],
};

export interface SwaggerConfig {
  title: string;
  description: string;
  version: string;
  tags: string[];
}

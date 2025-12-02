import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server'; // <-- ¡Este es el import clave!
import { appConfig } from './app.config'; // Asume que este archivo existe y es correcto

// 1. Define la configuración específica del servidor
const serverConfig: ApplicationConfig = {
  providers: [
    // 2. Este proveedor es MANDATORIO para el renderizado del lado del servidor (SSR)
    provideServerRendering() 
  ]
};

// 3. Combina la configuración base (rutas, etc.) con la configuración del servidor
export const config = mergeApplicationConfig(appConfig, serverConfig);

# Configuración de Firebase para JustificaMarians

Para conectar esta aplicación con una base de datos real de Firebase, sigue estos pasos:

## 1. Crear el Proyecto en Firebase Console
1. Ve a [Firebase Console](https://console.firebase.google.com/).
2. Crea un nuevo proyecto llamado `JustificaMarians`.
3. Habilita **Google Auth** en la sección de Authentication.
   - Asegúrate de añadir `marianistasalboraya.es` en la lista de dominios autorizados.
4. Crea una base de datos **Cloud Firestore**.
5. Crea un bucket de **Firebase Storage** para guardar las imágenes de los tickets.

## 2. Estructura de la Colección `justificaciongastos`
La aplicación espera documentos con la siguiente estructura en la colección `justificaciongastos`:

```typescript
{
  userId: string;        // ID del usuario de Firebase Auth
  userName: string;      // Nombre del trabajador
  date: string;          // Fecha del ticket (YYYY-MM-DD)
  amount: number;        // Importe total reconocido por IA
  vendor: string;        // Nombre del establecimiento
  category: string;      // Categoría del gasto
  project: string;       // Proyecto asociado
  paymentMethod: string; // "PERSONAL" o "COMPANY_CARD"
  imageUrl: string;      // URL de la imagen en Firebase Storage
  status: string;        // "pending", "approved", "rejected"
  createdAt: timestamp;  // Fecha de creación del registro
}
```

## 3. Reglas de Seguridad (Firestore)
Para que solo los usuarios del dominio puedan escribir:

```javascript
service cloud.firestore {
  match /databases/{database}/documents {
    match /justificaciongastos/{document=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.token.email.endsWith('@marianistasalboraya.es');
    }
  }
}
```

## 4. Integración en el Código
Deberás actualizar `services/firebase.ts` importando el SDK de Firebase (`firebase/app`, `firebase/firestore`, `firebase/storage`) y sustituyendo las llamadas a `localStorage` por las funciones `addDoc`, `getDocs` y `uploadBytes`.

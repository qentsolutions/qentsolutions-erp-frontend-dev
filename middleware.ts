import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify, importJWK } from "jose";

// URL pour récupérer les clés JWKS de Cognito
const JWKS_URI = `https://cognito-idp.eu-west-3.amazonaws.com/${process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID}/.well-known/jwks.json`;

// Fonction pour obtenir la clé de vérification JWT
async function getSigningKey(kid: any) {
  const response = await fetch(JWKS_URI);

  // Vérifie que la réponse est valide
  if (!response.ok) {
    throw new Error("Failed to fetch JWKS");
  }

  const jwks = await response.json();

  // Vérifie que keys existe dans la réponse
  if (!jwks.keys) {
    throw new Error("No keys found in JWKS response");
  }

  const key = jwks.keys.find((key: { kid: any; }) => key.kid === kid);

  if (!key) {
    throw new Error("Key not found");
  }

  return key; // Renvoie la clé au format JWK
}

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;

  if (accessToken) {
    // Vérifie la structure du token JWT
    const tokenParts = accessToken.split(".");
    if (tokenParts.length !== 3) {
      console.error("Token format is invalid");
      const response = NextResponse.redirect(new URL("/login", request.url));
      // Supprimer le cookie accessToken
      response.cookies.set("accessToken", "", { expires: new Date(0) });
      return response;
    }

    try {
      // Décoder l'en-tête du token JWT pour obtenir le 'kid'
      const decodedHeader = JSON.parse(
        Buffer.from(tokenParts[0], "base64").toString()
      );
      const signingKey = await getSigningKey(decodedHeader.kid);

      // Importer la clé au format JWK pour la vérification
      const key = await importJWK(signingKey, "RS256");

      // Vérifier la validité du token JWT
      const { payload } = await jwtVerify(accessToken, key);

      // Optionnel : tu peux utiliser le payload ici si besoin

      if (
        request.nextUrl.pathname === "/" ||
        !request.nextUrl.pathname.startsWith("/portal")
      ) {
        return NextResponse.redirect(new URL("/portal", request.url));
      }
    } catch (error) {
      console.error("Token invalid:", error);
      const response = NextResponse.redirect(new URL("/login", request.url));
      // Supprimer le cookie accessToken
      response.cookies.set("accessToken", "", { expires: new Date(0) });
      return response;
    }
  } else {
    if (request.nextUrl.pathname.startsWith("/portal")) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

// Définir les routes protégées
export const config = {
  matcher: ["/portal/:path*", "/login", "/"],
};

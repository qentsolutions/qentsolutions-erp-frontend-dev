import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify, importJWK, JWK } from "jose"; // Importer JWK depuis 'jose'

// URL pour récupérer les clés JWKS de Cognito
const JWKS_URI = `https://cognito-idp.eu-west-3.amazonaws.com/${process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID}/.well-known/jwks.json`;

// Fonction pour obtenir la clé de vérification JWT
async function getSigningKey(kid: string): Promise<JWK> {
  const response = await fetch(JWKS_URI);
  if (!response.ok) {
    throw new Error("Failed to fetch JWKS");
  }

  const jwks = await response.json();
  if (!jwks.keys) {
    throw new Error("No keys found in JWKS response");
  }

  const key = jwks.keys.find((key: JWK) => key.kid === kid);
  if (!key) {
    throw new Error("Key not found");
  }

  return key; // Renvoie la clé au format JWK
}

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;

  if (accessToken) {
    const tokenParts = accessToken.split(".");
    if (tokenParts.length !== 3) {
      console.error("Token format is invalid");
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.set("accessToken", "", { expires: new Date(0) });
      return response;
    }

    try {
      const decodedHeader = JSON.parse(
        Buffer.from(tokenParts[0], "base64").toString()
      );
      const signingKey = await getSigningKey(decodedHeader.kid as string);
      const key = await importJWK(signingKey, "RS256");

      const { payload } = await jwtVerify(accessToken, key);

      const { cognitoId, organizationId } = payload;

      if (organizationId) {
        return NextResponse.redirect(
          new URL(`/org`, request.url)
        );
      }

      if (
        request.nextUrl.pathname === "/" ||
        !request.nextUrl.pathname.startsWith("/org/")
      ) {
        return NextResponse.redirect(
          new URL(`/org/${organizationId}`, request.url)
        );
      }
    } catch (error) {
      console.error("Token invalid:", error);
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.set("accessToken", "", { expires: new Date(0) });
      return response;
    }
  } else {
    if (request.nextUrl.pathname.startsWith("/org")) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

// Définir les routes protégées
export const config = {
  matcher: ["/org/:path*", "/portal/:path*", "/login", "/"],
};

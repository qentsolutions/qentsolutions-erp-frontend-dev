import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Vérifie si le cookie accessToken est présent
  const accessToken = request.cookies.get("accessToken");

  // Si l'utilisateur est connecté (a un accessToken)
  if (accessToken) {
    // Redirige les utilisateurs connectés qui essaient d'accéder à la racine ou à d'autres pages
    if (
      request.nextUrl.pathname === "/" ||
      !request.nextUrl.pathname.startsWith("/portal")
    ) {
      // Redirige vers le tableau de bord
      return NextResponse.redirect(new URL("/portal", request.url));
    }
  } else {
    // Si l'utilisateur n'est pas connecté et essaie d'accéder à une page protégée
    if (request.nextUrl.pathname.startsWith("/portal")) {
      // Redirige vers la page de connexion
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Permet l'accès si l'utilisateur est sur des pages publiques
  return NextResponse.next();
}

// Définir les routes protégées
export const config = {
  matcher: ["/portal/:path*", "/login", "/"], // Ajuste selon les pages protégées
};

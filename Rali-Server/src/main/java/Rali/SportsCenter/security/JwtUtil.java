package Rali.SportsCenter.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtUtil {

    // Secret key for token signing
    private final SecretKey SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    /**
     * Generate JWT Token
     * @param email - User email as payload
     * @return Generated JWT Token
     */
    public String generateToken(String email) {
        return Jwts.builder()
                .setSubject(email)  // Set token payload (email)
                .setIssuedAt(new Date())  // Token creation date
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60))  // 1-hour expiration
                .signWith(SECRET_KEY)  // Sign the token
                .compact();  // Build and return the token
    }

    /**
     * Validate and Extract Email from Token
     * @param token - JWT token received from the client
     * @return Extracted email if the token is valid
     */
    public String validateToken(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY)  // Validate with the same secret key
                .build()
                .parseClaimsJws(token)
                .getBody();

        return claims.getSubject();  // Extract the email from the payload
    }
}

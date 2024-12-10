package Rali.SportsCenter.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class JwtUtil {

    private final SecretKey SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    // Token blacklist (in-memory, replace with Redis or database in production)
    private final ConcurrentHashMap<String, Long> tokenBlacklist = new ConcurrentHashMap<>();

    /**
     * Generate JWT Token
     */
    public String generateToken(String email) {
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60))  // 1 hour expiration
                .signWith(SECRET_KEY)
                .compact();
    }

    /**
     * Validate and Extract Email from Token
     */
    public String validateToken(String token) {
        // Check if token is blacklisted
        if (tokenBlacklist.containsKey(token)) {
            throw new RuntimeException("Token has been invalidated!");
        }

        Claims claims = Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY)
                .build()
                .parseClaimsJws(token)
                .getBody();

        return claims.getSubject();
    }

    /**
     * Blacklist the Token
     */
    public void invalidateToken(String token) {
        tokenBlacklist.put(token, System.currentTimeMillis());
    }
}
